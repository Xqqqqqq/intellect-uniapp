<template>
	<!-- 打卡日历页面 -->
	<view class='all'>
		<view class="all-banner">
			<view class="bar">
				<!-- 上一个月 -->
				<!-- <view class="previous" @click="handleCalendar(0)">
					<button class="barbtn" v-if="langType=='ch'">上一月</button>
					<button class="barbtn" v-else>Last</button>
				</view> -->
				<!-- 显示年月 -->
				<view class="date">{{cur_year || "--"}}年 {{cur_month || "--"}}月</view>
				<view class="bar-right">
					<image src="../../static/img/icons/shandian.png"></image>
					累计 <text>3</text> 格能量
				</view>
				<!-- 下一个月 -->
				<!-- <view class="next" @click="handleCalendar(1)">
					<button class="barbtn" v-if="langType=='ch'">下一月</button>
					<button class="barbtn" v-else>Next</button>
				</view> -->
			</view>
			<view class='check-in-btn'>
				<view class='check-in-btn-inner'>
					<view class='en-text'>Check</view>
					签到
				</view>
			</view>
		</view>
		<!-- 显示星期 -->
		<view class="all-calendar">
			<view class="week" v-if="langType=='ch'">
				<view v-for="(item,index) in weeks_ch" :key="index">{{item}}</view>
			</view>
			<view class="week" v-else>
				<view v-for="(item,index) in weeks_en" :key="index">{{item}}</view>
			</view>
			<view  class="myDateTable">
				<view v-for="(item,j) in days" :key="j" class='dateCell'>
					<view v-if="item.date==undefined||item.date == null" class='cell'>
						<text :decode="true">&nbsp;&nbsp;</text>
					</view>
					<view v-else>
						<!-- 已签到日期 -->
						<view v-if="item.isSign == true" class='cell greenColor bgWhite'>
							<text>{{item.date}}</text>
						</view>
						<!-- 漏签 -->
						<!-- <view @click="clickSignUp(item.date,0)" class="cell redColor bgGray" 
						v-else-if="cur_year<toYear||(cur_year==toYear&&cur_month<toMonth)||(cur_year==toYear&&cur_month==toMonth&&item.date<today)">
							小程序不兼容这个 v-else-if="(new Date(cur_year+'-'+cur_month+'-'+item.date))<(new Date())">
							<text>{{item.date}}</text>
						</view> -->
						<!-- 今日未签到-->
						<view @click="clickSignUp(item.date,1)" class="cell whiteColor bgBlue" v-else-if="item.date==today&&cur_month==toMonth&&cur_year==toYear">
							<text>签到</text>
						</view>
						<!-- 当前日期之后 -->
						<view class="whiteColor cell" v-else>
							<text>{{item.date}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="calcendar-rule">
			<view class="train-title">
				<view class="train-title-box">签到规则</view>
			</view>
			<view class="calcendar-rule-text">1.就腐蚀雕刻路径飞升渡劫飞升渡劫副教授副教授的假分数带分数考虑到金粉世家风尚大奖</view>
			<view class="calcendar-rule-text">1.就腐蚀雕刻路径飞升渡劫飞升渡劫副教授副教授的假分数带分数考虑到金粉世家风尚大奖</view>
			<view class="calcendar-rule-text">1.就腐蚀雕刻路径飞升渡劫飞升渡劫副教授副教授的假分数带分数考虑到金粉世家风尚大奖</view>
		</view>
		<view class="calcendar-pos animated" @click="gotoUrl('/pages/myData/share')">
			<image src="../../static/img/icons/zhongjiang.png"></image>
			<view>分享获能量</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				days: [],
				SignUp: [],
				cur_year: 0, //当前选的年
				cur_month: 0, //当前选的月
				today: parseInt(new Date().getDate()), //本日
				toMonth: parseInt(new Date().getMonth() + 1), //本月
				toYear: parseInt(new Date().getFullYear()), //本年
				weeks_ch: ['日', '一', '二', '三', '四', '五', '六'],
				weeks_en: ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat']
			};
		},
		props: {
			sendYear: {
				type: Number,
				default: new Date().getFullYear()
			},
			sendMonth: {
				type: Number,
				default: new Date().getMonth() + 1
			},
			dataSource: { //已签到的数据源
				type: Array,
				default: () => {
					return []
				}
			},
			langType: { //只是示例一个翻译而已，要想所有都翻译自己可以再加加
				type: String,
				default: "ch"
			},
		},
		created() {
			this.cur_year = this.sendYear;
			this.cur_month = this.sendMonth;
			this.SignUp = this.dataSource;

			this.calculateEmptyGrids(this.cur_year, this.cur_month);
			this.calculateDays(this.cur_year, this.cur_month);
			this.onJudgeSign();
		},
		watch: {
			dataSource: 'onResChange',
		},
		methods: {
			gotoUrl(url){
				uni.navigateTo({
					url: url
				})
			},
			// 获取当月共多少天
			getThisMonthDays(year, month) {
				return new Date(year, month, 0).getDate()
			},
			// 获取当月第一天星期几
			getFirstDayOfWeek(year, month) {
				return new Date(Date.UTC(year, month - 1, 1)).getDay();
			},
			// 计算当月1号前空了几个格子，把它填充在days数组的前面
			calculateEmptyGrids(year, month) {
				//计算每个月时要清零 此处调接口获取days数组
				this.days = [];
				const firstDayOfWeek = this.getFirstDayOfWeek(year, month);
				if (firstDayOfWeek > 0) {
					for (let i = 0; i < firstDayOfWeek; i++) {
						var obj = {
							date: null,
							isSign: false
						}
						this.days.push(obj);
					}
				}
			},
			// 绘制当月天数占的格子，并把它放到days数组中
			calculateDays(year, month) {
				const thisMonthDays = this.getThisMonthDays(year, month);
				// this.columnsLen=Math.ceil(thisMonthDays/7);
				// console.log(this.columnsLen);
				for (let i = 1; i <= thisMonthDays; i++) {
					var obj = {
						date: i,
						isSign: false
					}
					this.days.push(obj);
				}
				// console.log(this.days);
			},
			// 监听已签到的数据源，如有改变，则赋值
			onResChange(newD, oldD) {
				this.SignUp = newD;
				this.onJudgeSign();
			},
			//匹配判断当月与当月哪些日子签到打卡
			onJudgeSign() {
				var signs = this.SignUp;
				var daysArr = this.days;
				for (var i = 0; i < signs.length; i++) {
					var current = new Date(signs[i].replace(/-/g, "/"));
					var year = current.getFullYear();
					var month = current.getMonth() + 1;
					var day = current.getDate();
					day = parseInt(day);
					for (var j = 0; j < daysArr.length; j++) {
						//年月日相同则打卡成功   						
						if (year == this.cur_year && month == this.cur_month && daysArr[j].date == day) { //&& signs[i].isSign == "今日已打卡"
							// console.log(daysArr[j].date, day);
							daysArr[j].isSign = true;
						}
					}
				}
				this.days = daysArr;
			},
			// 切换控制年月，上一个月，下一个月
			handleCalendar(type) {
				const cur_year = parseInt(this.cur_year);
				const cur_month = parseInt(this.cur_month);
				var newMonth;
				var newYear = cur_year;
				if (type === 0) { //上个月
					newMonth = cur_month - 1;
					if (newMonth < 1) {
						newYear = cur_year - 1;
						newMonth = 12;
					}
				} else {
					newMonth = cur_month + 1;
					if (newMonth > 12) {
						newYear = cur_year + 1;
						newMonth = 1;
					}
				}
				console.log(newYear, newMonth)// 2020 9
				this.calculateEmptyGrids(newYear, newMonth);
				this.calculateDays(newYear, newMonth);
				this.cur_year = newYear;
				this.cur_month = newMonth;
				this.SignUp = []; //先清空
				this.$emit('dateChange', this.cur_year+"-"+this.cur_month); //传给调用模板页面去拿新数据				
			},
			clickSignUp(date, type) { //type=0补签，type=1当日签到		
				console.log('date',date)
				var str = "签到";
				if (type == 0) {//如果不需要补签功能直接在这阻止不执行后面的代码就行。
					str = "补签";
				}
				uni.showToast({
					title: str + "成功" + date + "号",
					icon: 'success',
					duration: 2000
				});
				// this.SignUp.push(this.cur_year + "-" + this.cur_month + "-" + date); //自动加假数据，写了接口就不用了
				// console.log(this.SignUp);
				// this.$forceUpdate();
				this.$emit('clickChange', this.cur_year + "-" + this.cur_month + "-" + date); //传给调用模板页面
				//refresh
				this.onJudgeSign();
			}
		}
	}
</script>

<style lang="scss">
	.all {
		.all-banner{
			width: 100%;
			height:300rpx;
			// background-color: $uni-color-primary;
			background: url(../../static/img/icons/bj.jpg) no-repeat;
			background-size: 100% 100%;
			box-shadow:0px 1px 5rpx 0px rgba(145,160,221,0.75);
			padding:40rpx 24rpx;
			box-sizing: border-box;
			.bar {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				font-size: 30rpx;
				font-weight: bold;
				color: #FFFFFF;
				.barbtn {
					height: 30px;
					line-height: 30px;
					font-size: 12px;
				}
				.bar-right{
					display: flex;
					line-height: 50rpx;
					image{
						width: 50rpx;
						height: 50rpx;
						margin-right: 10rpx;
					}
					text{
						color: #FFDF5D;
						margin-left: 5rpx;
						margin-right: 5rpx;
					}
				}
			}
			.check-in-btn{
			    width: 166rpx;
			    height: 166rpx;
			    background: #fff;
			    border-radius: 50%;
			    margin: 0 auto;
			    // margin-top: -18rpx;
			    font-size:34rpx;
			    font-weight:bold;
			    color:$uni-color-primary;
			    text-align: center;
			    line-height: 144rpx;
			    padding-top: 11rpx;
			    box-sizing: border-box;
				.check-in-btn-inner{
				    width:144rpx;
				    height:144rpx;
				    background:rgba(255,255,255,1);
				    box-shadow:4rpx 9rpx 23rpx 2rpx rgba(46,59,103,0.61);
				    border-radius:50%;
				    margin: 0 auto;
				    position: relative;
					.en-text{
					    font-size:40rpx;
					    font-weight:bold;
					    color:rgba(61,114,237,0.1);
					    position: absolute;
					    top: 0rpx;
					    left: 14rpx;
					}
				}
			}
		}
		.all-calendar{
			width: 90%;
			margin:5% auto;
			background: #FFFFFF;
			border-radius: 20rpx;
			box-shadow:1px 2px 6px 0px rgba(108,143,197,0.3);
			.week {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				padding: 20rpx 40rpx;
				margin: 20rpx;
				margin-bottom: 0;
				view{
					color: #333333;
					font-weight: bold;
					font-size: 28rpx;
				}
			}
			.myDateTable {
				width: 100%;
				display: flex;
				flex-wrap: wrap;
				padding: 20rpx;
				.dateCell {
					width: 14%;
					padding: 1vw;
					text-align: center;
					font-size: 32rpx;
					.cell {
						display: flex;
						border-radius: 50%;
						height: 10vw;
						justify-content: center;
						align-items: center;
					}
				}
			}
			.whiteColor {
				color: #666;
			}
			.greenColor {
				color: #01b90b;
				font-weight: bold;
			}
			.bgWhite {
				background-color: #fff;
			}
			.bgGray {
				background-color: rgba(255, 255, 255, 0.42);
			}
			.bgBlue {
				font-size: 28rpx;
				background-color: #2E3B67;
				color: #FFFFFF;
			}
			.redColor {
				color: #ff0000;
			}
			.TipArea{
				word-break:break-all;
				word-wrap:break-word;
				font-size: 14px;
				padding: 10px;
			}
			.impTip{
				display: inline-block;
				color: #ff0000;
			}
		}
		.calcendar-pos{
			position: fixed;
			right: 24rpx;
			bottom: 10%;
			text-align: center;
			color: $uni-color-error;
			font-size: 26rpx;
			font-weight: bold;
			animation: bounce 1s infinite;
			image{
				display: inline-block;
				width: 80rpx;
				height: 80rpx;
			}
		}
		.calcendar-rule{
			width: 90%;
			margin: auto;
			padding-bottom: 30rpx;
			box-sizing: border-box;
			.train-title{
				width: 100%;
				padding: 30rpx 20rpx;
				box-sizing: border-box;
				font-size: 28rpx;
				font-weight: bold;
				color: $uni-text-color;
				.train-title-box{
					padding-left: 15rpx;
					box-sizing: border-box;
					border-left: 6rpx solid $uni-color-primary;
				}
			}
			.calcendar-rule-text{
				line-height: 40rpx;
				color: #666666;
				font-size: 24rpx;
				width: 100%;
				padding: 0rpx 20rpx;
			}
		}
	}
</style>
