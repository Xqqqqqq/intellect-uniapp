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
			background: url("data:image/jpg;base64,iVBORw0KGgoAAAANSUhEUgAAAr4AAADmCAYAAAAzxYbGAAAgAElEQVR4Xu29y64kMZIl5vHIrJKg/1KPFvqA0U4LoXsWgjQfoZYAbaTFTE9jpH/rJ6APqKnKvDfCBSNppJFO8pBO9wiPCLtAIjOv83loJA+NRrPTf/u3/zBPT/w53ceqn+ex/KjrqPzTfK8WAfOfThNKU6tgnur1o/6VvnObzoPwjvTNtm0M3wnIx2kQ/xS/3v6S/PTm6RlTWPZpTH5g+ZnGyjyX6QS7s6YOWKhLgMo+ueahdK31aTpFQBFQBBSB5yJwUuJbHwC04W1BfKkFqJ4iQVXiiwaw+p2I7wj+WxDfLevvbs8TiK/sbwvxfSY+Snyfu0Fp7YqAIqAIbI3AyxNfBMhaQsnlovyI+KL2ye+ormxZp7pKdlWZgoi/usYX6xMDqmuxGhlDKT9b1P8qxJfJbCvx3Yv8IsyV+PasYJpWEVAEFIHjI/D2xHd0w4QbIzB16BUBVN+iPCW+VYh7iO+orKzJnx6cuscfCBgs70kaX25278EK9qdzwqHylPh2AqrJFQFFQBE4OAIfQXxbtberxup+W5WtlAltxI8mvkgj193epAM4/5iN76cTXySc8zQmv3j86i14NvFF+EyTvVEZ7SeuR1MoAoqAIqAIPAKBjyK+u2xgGxPf7jburPH9NOLbjX83kY8z5ExlHkmy9ia+6PFgL/EdHZ/+RVWJbz9mmkMRUAQUgeMioMR3cGyQje9aEtOcDxBf1L1SPfz7oxNf1D/k1WEzzbsrqHncXPqS/HA5/Phu63ZyeaPEF+IPcFlDfB9LfpX4to6xplMEFAFF4BUQ+Djiu/WmuRfxbW6nEt/6PBtwd9dLYpvHTLS4Jj9U/7sQ3xI2a4nvGqzXLchKfNfhprkUAUVAETgmAqe/+tt/rroF2FsjhMhFqnFE6XthHi0P5UfEGLUXlY/yTxuaQuTasoVGeKSP87yvjeqZXzcVgEZtR9/h+D3blAY1cOfHcSPE+BHkGI/voCNshL9+VwQUAUVAEehCQInvgEawZWN9J+Kb6+8WxLcFx5JUK/Htmu8+MSZsjeUq8QVAKfFtlCRNpggoAorAQxBQ4jtIfOEoDWrshgnKhhrfPYnvevI75vUBjR/yCoHGB32H9Q9GBqyVP9o2U7YSXyW+SIj1uyKgCCgCB0JAia8S325xlIRpK40vNyIlY8grwHBIY9D7dya+6w8bAjQlvkp8u1cQzaAIKAKKwPMQeDrxRV0/3eOrwvSxzyZaq0ojhssf1PgifGD7Ntb4yvZQ3Y8gviVSbH9/bI3v6PghUxk4/qgBiLahg6ESX4Tg4AhodkVAEVAEFIEtEVDii7YttPGj0Xhj4ktdR4+P1hAzmQcfdJT41kQQa8zrAgzHT4kvWkHQCqHfFQFFQBFQBB6IgBJftG0p8a0itAfxpQpLfmyXRKxOfNFcQsRu1NRhuP5BG18+OKB+onaWvo96fUHtQvKF2o3KR/nRd1y+Pm5DGOp3RUARUAQeiYASXyW+Q/KGiAkmBuXqKW/Oj21cphJfpPHl7yNjocQ3jwDGVInv0AKjmRUBRUAR2BgBSHxhfeCqE28MsAaocRypA+Ud1Zjh8mev3cx1FMWnQOWPoTtNM7ChReWnNtpp+r3xLdkAr8Etl4f8/K4pK4fbqnKAKc3WATB624g0wqPtQwevFOfe9iP57v2+fLxpS3h2u3r7oekVAUVAEXhVBN6C+I5sHGjD2ZuYnRyzLbVDiW99aqHx25L45uSMA1zgdrQtEd3lKPFtA9al6sa3q3ScWIkvxkhTKAKKgCKwJwJvQ3xHyG8LwPttmOGqPleHEt/XIL5byV+vnCGvD0i2e+vrTX80P7/d7UcAdn5X4tsJmCZXBBQBRWBjBN6K+G5FPnIY77dhxjaqi40RmAju1y6Lgpo6LKVBYp6GNF4Sm35TCFkG8srw7sQXzWk1ddh4R9DiFAFFQBF4cwSU+DYO8H4Ec4z4ouaPtnuU+LYSk7XtxPnyj99wPoSstctsIb5cUm+dlF7awOZvBPZ93Jei0NuHUY2vrD9Xd6t8rR0DLAV9KVTj24eXplYEFAFFYGsE3o74Ig3RWgC7N/zmipbEJdL4DT4KH223Et/6QObcnaUaW0TemkUl8wjqEzS+NfyU+PZIj6ZVBBQBRUAReEviuwf5HSWQZVGraySRjS8S4eF2D0Z+ayUmw+0sADHPt+wXrm/Uq0DJz2+p/NF+Lk1hnqvxhfhNefyR3Ja+p/1vlS/V+K5FXPMpAoqAIvBeCLwt8d2a/I4Sll7iy+1X4js24Z5FfP34nZbUeFSW4huBzyK+6bxW4js2PzS3IqAIKAKfhsA48R1FzPkBHiUDrRqiNF3vxom6u3U/0FX2VvWtLmeFRrinrp7x6Sk3jCMmjr3lRsQUCQz43lv3sri615Dz1P/4TtYx3L6d/YD3yE9uKIb7Nzz+WD4Hq9DsioAioAh8FAJKfAdtaFNp2XqjfEfi26ON7yUu/fi3EYvecr2pw+By0ltvjfjmcCfi2zMem8u7Et+qhMwgZPWgeGl2RUARUAQ+DgElvkp8h4jPtELjy7OshdQdhfiuIYfUv5IN8FYrDcaw7jWEie+a/q3NE/Vdia8S360mg5ajCCgCikADAkp8dya+yA8rGqN31fi2kt9e4ttPxto0vq3tXYznvLGAJRX0Et8UH0l8+7HbINSuEl8lvmgR1O+KgCKgCGyIwNsTX4TV6b4tMVm8uhePmzBJWbb23YnvnuPThve+xBdpfNvaWEYJ5y/3j/KOEl80frB9gPiOlr/m4CTrhO1HDRz8rqYOgwBqdkVAEVAEEgSU+D6Q+K7RqL068V3TZymjowcTTFz6iG/aH6TRPzLxpb7kLFUwZu3rKCxLia9qfNvFSVMqAoqAIjCMgBJfJb5GiCBBKYlao7+1teUjjR0qF32fpn7iK/FiP7alehDxRTMYtR99R/0rDR8uF7XcfoflDBJf1Ir9D06oBWPfVeM7hp/mVgQUAUUgRUCJ74OJbxMZEKP0Dhpf7g4kQZn5eVTiy+MIQwoPrjkIM/R9LfHtldNSN2H7lPhWJUSJ7+AE0uyKgCKgCCQIPJ/4giHZe+NE5SPihSQKlY80hrj8emSsRoVssRrU/lzGKM9oAwot4zouwB3XmvZjzINd+Ok0Y61mpUCpER5t67r8dY03DV9vuTI9PBhkAnxIuObByG+o7Wh+o/xIVvb+rsR4b4S1fEVAEXg3BJT4glf3aGNEAoE2znckvpG28A2Jr+wfEd8R7WhqCoHkZVTelvkx8V3TP+5HGtI47d/eIY8Rnmh+o/xoPPb+rsR3b4S1fEVAEXg3BJT4vjjxRVfZ06Apx8jGb/I+mfiiCTvaPya+a8gh5XkV4rumf4StEl8kgWPflfiO4ae5FQFF4PMQUOKrxLcq9SPE0JCllY/H0FRsNXVoLQelK3+vB4hA5eYevw1j3uU7uE3jy/0YbVtKoFXjiySk/l2J7xh+mlsRUAQ+D4GPJ75oyEdfhaPyxwkF8ErwRI2v6dtAZLcadlsRXzQ+mOhtT3zHZcKWgNtOqR5PfGX/jk58x+UDlTD2XYnvGH6aWxFQBD4PASW+YMyV+NYDfCA/tq9OfDGBXBLHNsJpBQ+5O+spKyfKOH8f8U3xgOM/uKY++3Ebaj7GF5Uw9l2J7xh+mlsRUAQ+DwElvkp8N5H6IgF4cY0v1r7miWMrIULEFw1Oaz2lcuZ5nVeQ9PHaaDuK7XuyV4e98Uflo+9KfBFC+l0RUAQUgRgBJb5KfDebE1ny8ybEt6z5rYcERuC+KvFlPJC7MtR/9F01vnWElPgiCdLvioAioAi8GPFFAza6MaLy0fdRU4i9NGWh3feqred50A8uerWP8JOmEKNY5PIjP7+wfc22sqGkuB3rIsNxaYgYI8zQd9z/flOI8iFhWRtq3142wKhejItNgdyhcTlb1dfartZ0SpxbkdJ0ioAi8C4IHF7ji4BW4osQssSltPEeifj2EKZSr9N+bkF817QrtEOJb01CESFU4ovm99h3Jb5j+GluRUAReD0ElPgOjtmoxhdVj4gByi9f7efKQsQXlx+n6G5vYgrRnT9p4F7Edz35fS7xReOH8d5X44vah76vPfjifqOa7XfV+LbhpKkUAUVAETgKAkp8B0filYhvjrwdjfiuIZjpEEpSs5XGl+voJUzo8RgSv1FTB1Q+7o8S3xqGSnyRhOl3RUARUASOhYAS38HxUOK7rcZXloZJWX3wKP+ziS/yk4v6uDfxReKPiHvp7SLqF6q39btqfFuRyqdTU4cx/DS3IqAIvB4CSnwHx+zViG+qUT2ixndL8ssauS2JmCwL+7Gta0xRu5T4gsPNSndnCPfWZUE1vq1IaTpFQBFQBI6BgBLfwXF4ReIrye/RiS8aHkRg9iC+Ej9+fFVux5iN79QVfniJFsIH4zvm5xeVP/p9VOMLH89tFNJ8dBxGcSrlV43vXshquYqAInBUBJT4Do7MqxJfJm9KfNcLAJEZ7MdWie96hHFOJb4Yo1oKJb5j+GluRUAReD0EXp74IsjXboyo3NbvW2scU80R1jjWW4o0Uad5jLih8ltxTNP5ckGADFT+6MEF9a+HGKOycn2RphBr8iN8hsu81zXGqH70HbbvNGZqgupH30umENzuUY0zqh99h/hN9ZDlqHz9rggoAorA0RBQ4rvziCjx3WfjfCXiWycXMTHDRCQW2NQGuDc/Ev/h8pT4ZiFW4oskT78rAoqAIrAPAkp898HVl6rE97OJLxav9ya+6MZglFjD/EDji8YHlg8KUI0vQli/KwKKgCLwWASU+O6MtxLffYnv6VyOStcytHubOuA2LK/ie8hWzutDn9eJegt72pIrSYlvHl/V+OKZoSkUAUVAEdgDASW+e6Aqyjw68YXdf/ZVdaGBnjicQ4I1JA25o1pTZgnTfFllG9SWumvuztoe30EJqCZAbdyb+KLW723jj/qvGl80QvpdEVAEFIHHIqDEd2e8lfjuo1HMEV+qCRGRtDXPJL6WmNY14qg/yM9v2l9UXu90QOUp8VWNb69MaXpFQBFQBPZEQInvnuhO06TEV4lvnZCPec3o9fOLiGrvdEDlPZv4Tjt7dUD9P7rGF423ujtDCOl3RUAReDUElPjuPGJKfB9LfHu1vntrfBExQiGNoXiuCHCB2wRr9QlQWUp8j63xRSOtxBchpN8VAUXg1RB4e+ILB2RnjRCqf/RxFSofEZPR/IjYoPLT773thelX+PmVZV6mujFBrv70cZnsI2xvBbBeG+GWQ8D5dOo2Dyk1cVXfdrYhb8GgJqN72wijgxeaP6swR4V2fMf17/O4taOJmlQRUAQUgQgBJb5KfKtTAm1s70h8JVlaQ3xl/jRAAcITrU/L/GMBGoj4jpLDIWL/AOI70j8lvnWJxPKsxBfNaf2uCCgCj0VAia8S3zGJ25i44I20r7nztN6Gltqylvgy2Xo28UVobR35rXf80MGpt7yq9naFWcjeNsKq8UUSqt8VAUVAEdgWASW+SnzHJGpn4kvEcYj8nOah/IiY9LatN31ucGJTirH+7RH5LTX1qPX5kcR3leZ3cH1A8ovkC03OLeQJ1TF2mFCN7wi+mlcRUAS2R0CJ7+DGNjoke9v4ovaNbpxbE5e0PVJjuqqtwsZ3TX5ETHrL7E2PSId0h7am7D2IL7eZ2oPGb2v52VzeByO/yfbkxgfJ1+b9QQV2fscyp8S3E1JNrggoAjsjoMRXie+QiG1NXGrEd53GLt54c+XXNu8WYoI3/wBxT9q2gdk25PEqjNsaalIt8J/HbJQ7qvZJu8ZgQ+Kb63+LfKHDzxoMtsqDsVTiuxXWWo4ioAhsg4ASXyW+Q5L0DsS3RvZaiQkmABZmROzTwcDlbk989yS/RyC+sn+pDfYC/+k2ND/QeLbKV6kRWD42bf6iMFy/Et99R0BLVwQUgV4ElPgq8e2VmSj9o4lvNynLuDNLbVC5Q6NX0ZgE7E98e/FBIY+HhKOQOcL/CRpfOd6PJr7p+Cjx3UPCtExFQBFQBMoIKPEdlI5Rd0eILO39OKa1+6idJc3WeRoLydtbb60/2bJW+PmVdexto437vzQVwHlaR30CXoxxiOjxttRNIdDwofrRd4jUoClErn75O+RVBLVvuH+oAvBdA2AMAqjZFQFFYHMElPgOQvoI4lvT4o1qjFq737uBcvojEd8sjog5AYCOSHx7tb61LtbDdyjxRe7O0PwqzSv+vRJfhKB+VwQUAUWgDwElvn14LVKPEt+e6kev4nvqKmlwW8vYivii+tYScl/umxLfrcjvKPEdH799Nb7D7dtB48ttItlW4otGSL8rAoqAItCHgBLfPryeSnxzZObdNb5oeHqJ7wLDNya+W5DfTye+EMMdiS/VPTq/18wPNOd6vqupQw9amlYRUAQegYAS30GUH6nxVeK7HKyRjZ3yns51AUDlI2KC8iPxw/nXR6aDpG4at/Hdu3/o3ILxQy0M3/M24vvij+QLtX7L/qO6ct+V+K5BTfMoAorAnggo8R1E99HENyUroxtja/d7N9Cjmjos+guYE+o3wh/lR/ij/BTAAqWp1YHyqsY3Rm+B16DGFx0+kHyNyg/KP/pdie8ogppfEVAEtkZAie8gos8gvnKzRDaAiNi0dr+3nEcRX9R+2O6DE1/Uv2myGkfYz0JBKB8ivqh9qHz0nftXqueRGt8szhsQ39r4KfFFEqbfFQFFQBHoQ0CJbx9ei9TPIr68WSrxrQ8gJFZvQnzXkl+EjxLfpXxFmG1EfEvjp8R3cIHW7IqAIqAIJAgo8d1ZJJ5JjKlro+62EDFC8KH8dFVf/bmP+QFG7YPfB00JUPk944OwRHXxd1nOGlOJKH9rpZ3p2vu6vdeH9rqnCfnZRu7OeurqhNAk75GvNeWP5lFTiFEENb8ioAj0IqDEtxexzvRKfOvE9RWIb0kb1ykK2eS9xGQrosTlMP695fr8W4CQKaO9PdsT357x5shvxfZ+eGRIJB5KfBFC+l0RUAS2RkCJ79aIJuV9OvHF8IJX8UDji8pvJ1CFkoRGerisTBXPIr5M7uTBo7d/lP58qhtD9JbJELXn24f4BnzajT2ybR40hWjHIS+/yFRitHw0/9B3Jb4IIf2uCCgCWyOgxHdrRJX4diL6OsS3RxPYCgIRk17y0Zu+3pYY/96yES3sLe9IxLd1DGW6RX+V+FZhVOK7Rso0jyKgCIwgoMR3BL2GvK+u8UVdXEtsQrlKfPvJns1B2PNVe2mc8Pgo8UUy3vNdiW8PWiTDY36Q+2rT1IqAIqAITJMS352lQIkvAvi1iO/WWt/0KhoTVYTn8nu9zCX+8eO3U1Uj/eoa363Hc1GeanxV49s/ZTWHIqAI7IiAEt8dwTWb4HTbuYZ68b02pL2NHSdq+xJf1B/Y/oLXCZgPVey+P4L41sldHv/w+M1S21J/EfFFMJTKTesvlTPP9fmFnIZwuVuN56I8Jb5KfNEk0O+KgCLwUASU+O4MtxJfBPBrEt+tNIW5x0dbk7A6uSvjn5pS5Nr1LsR3q/GU0m7wUuKrxBctgfpdEVAEHoqAEt+Hwr2sTIlxfQAQCTyttBFE5TaLBdAII3dXqB3oVT5qJyo/lz82dYjd0fWWJ4lxljg7rxAt5ZbyD5lyADfSCN+W7y19K5Yz6A5tVH5Q/4b6hgpvikj4gAFsaKcmUQQUgddBQInvk8dKia8S3xoCo8RlLTEJpgbbEd+cVhUdDFJs0v7g/MCU40G8ae04II0xKndUftDyiOpH+dF3XP6DBhA1VL8rAorAyyCgxPfJQ6XE97OJLxK/URttTBzKLbCmDq9BfHOk2vasbspxnvbxQ4w06Wjc/XfV+AKolPg2y5ImVAQUAYOAEt8nC4ISXyW+SOM7Sl7HRLzu7gyF7M3RytiUov54DhHI1J3bEqv9AlyswbV7LJX4KvFdI2iaRxFQBIoIKPF9snAo8R0cgPs6rxntXgOARmnQxhf1Xl5Vd5MmVHiTDSUmvlxN7+M3+XhuTd9k/nIblPg2iMHqJGvGracyXL5qfHvw1LSKgCKgGt+ny4AS38Eh+CDiS0hhItCPZ8/jsJKNbYl4tnp92LJfsUZ5rvshBrxpy3bVDghl1USduKP2qY1v/3zQHIqAIvDeCKjG98njq8R3cACU+A4CaLOXCVS7xjdXzjOIr2wH2yiX+of8/CJiuRb85nIH3aGN2oij/jX3AxVU+I7LV43vSmg1myLwsQgo8X3y0CvxHRyADyO+e2l9y+X2Ed+0nGcRX26HfJyXNcV4gsa3S/OrxBcsEEp8B1dQza4IfBwCSnwPPuRQ4zG4MaLuj2qMUPuxOyrUQvC9gxhniZHzM9tFVkST5opXgZGecVsviVcChPeCmJ7qIYlxGwMxbqk7LQ/laSXOtXb2mHKk5ZQ0wqjda+UF452kGHz8hupD8z99XNg7vqj+0e/zSj/fo/VqfkVAETguAkp8jzs2pmVwg1XiWx/BDuKbwxt7DahXf0TiK/s5fvCoa4TR9ELyvQXxrc+jdY/fULuV+FoEWnFCcrL2uxLftchpPkXgfRFQ4nvwsYUbx8GJbyu8sJ+tBaXpnkx8J2BEurbfIxpfScoksV/XljHiC4eVwv5u9JPv377EFzV9Heai1J01vqOP44b7hwAE35X4DgKo2RWBN0RAie/BBxVuHEp86yPYSXxTLdWoxvfIxDcHHJS3RaYlcewvozKEGxLfnAaSbIBr7R01dUDLyzBWSnyrECvxRRKo3xWBz0NAie/BxxxujEp8Nye+JY1ojjhB8Tmwxncv4ivxg/iABMjUAc6PpPw0/drHb731rsUB1jM4/1H5qvFdO3KaTxFQBI6KgBLfo46MaxfamKbBjQ91Hz1uQflbv8N+thaUpluh8a1V1d3OJxNfFFltnPyO+ZlFw7o18U0PLygk894aX9R/KG+D8x+Vr8QXjZB+VwQUgVdDQInvwUcMbUx7E1+08cH2NeK7VTmL6pT4Gkh68eX0+NX+ush5rVrhPYivxGOU+GJ8xmyU4bgp8a2uMGrq0LgAazJF4IMQUOJ78MHee+ND3VfiGyMExyMF9AAa31aSmTad+oqJ3WsSXya/KfFdaIQLvLX9YKDEF60xe35X4rsnulq2IvCaCCjxfc1x863eOwAGInqpH9kceapBjMrfa3g8cdnQz+eavsA8KLQYAGjUVAW2D9Q/z3ViPGqKgTTCueaN9kmWeSrIz5Z1VA8uKzW+W7VvVL72mt/th72xg8ne7dfyFQFFYHsElPhuj+lDS1Tiuw7uPYhvqi1saRkkIB9AfEdwW0N819RXGstHEt9su5X4VqcZnF+TEt+WdUrTKALvhIAS3xcfzb2JL4Jnb1MIvHGhFua/H4X4otaPBsAY1ciN419//Cb731uXMcVAAFa+99aXK+rTie/e839geE1WPMZKfEcx1vyKwKshoMT31UYsae+nE981V+VyQywRlxGxwJtte+mfRHzbiEo6AcaICxorJF+PJr4LjJ6s8VXi2z6XNaUioAgcAwElvscYh9WteHfi2wMMIjE57eIexJfr6WlPqZ+jxHdvYoL72K7xXUN8kcYXt69dwnJlPYP4RvI1SHzx48X6wQLJF0J3y/HJ1YXLHzs4of7pd0VAETgeAkp8jzcmXS1S4hvDhTc6m34vU4d08Frbo8Q3ICAxgxrXhtkyOga5AxP/7pnE18jxtM6rhpf/U/3ogLBT4tsggJpEEVAEDoWAEt9DDUd/Y9ZufP015XOgjQ9tnFu1I9KCNRT6KOKLmoLwObrGF/dvG2JWwglpfHvlAvcn1hAi4juqUYXt2Zn4ovqfb0NebyGaX3R00B9FQBH4LASU+L74eCvxXQ4g3uwep/FF4oXa+qnE12gzEz/CWVMDBLD4jrBuLSrSSAN3Zkp8R4lp66jk0+ExV+I7hrDmVgReDwElvq83Ztu22NkI4g1iXbWo3FGN8SixQO3D3sT6bFh7NZCofRNu4LqBc7n21ujt4ec36vC8HbHJEm9nKlAepyAfuTTn6dTgeWD9EI4ejKH8gaah+Y16Nlo/Kh991wAYCCH9rgi8HgJKfF9vzLZtsRLfKp6YVyrxrQGIiEsL8WXt7yrB35D45trBB68W4pvLT8R3qH8AFCW+q6TGZ1LiO4af5lYEjoiAEt8jjsoj23Rw4jsKBSJesPw70hjuS3xR+0ZNIVD5e2t8p6kdv1Vj+SLEdy/yq8QXSXj9uxLfMfw0tyJwRASU+B5xVB7ZpjcnvsOEYmfii7wWIFE4OvHF+LcTX1xWBq2NiW/ahl6Nb5qfNb7c8lXkviIkSnzRDFLiO4aQ5lYEXg8BJb6vN2bbtnhn4osaO6pRROXL72tIBTJ1QFf1pfbl3EmtaR+y8V1Vpmj0luOTb8u+xBd5fRjBRz6+azV1SOXx6MQXzS+En9r4IgT1uyKgCDwaASW+j0b8aPV9EPFdozF8JPFd075XIr75/vUR316M9iS+bYeqev9y8oXIZM8SMqrxRXWhtirxRQjqd0VAEXg0Akp8H4340epT4lsdESW+yMa5T6CXRKmf+PaQ31ckvj39g+iDyG6IuMLyQYLRG4O924f6pza+CCH9rgi8HgJKfF9vzLZt8YcR315S8Wji29u+V9P4Lvu3jvi24vSqxLe1f3AxUOILIaolUOI7BJ9mVgQOiYAS30MOy3EatfdVaXoVmmp48OOhMazWapRCvv6r7FKL17YFqaxHykV5L8AdF8o/+riPvEKgOmr4SGI8Us5mRFWE06YyS5HhuE9ofoz2aXoycS6ZSgz3a2zZ8LmVGG8EpBajCDwQASW+DwT7FatS4psftT2I75bkybfaqazXEgWUbwviO9Zve/BA7SzNvVQjvLYcLn80f1qOEl80/567qirxfS7+WrsisAYBJb5rUPugPEp80ca7ncZ3hMAVRVLYamxFymRdrJHboux1ZdQjo6Gpep+Ud4sAACAASURBVFTiy7IwSnxR/yHmQOM7XD4oQDW+CGH9rggoAr0IKPHtRezD0r878V1LNvfS+KbtGTYFSIyUIdHplO8tie+6sYgPHr39y9kAyzLW4N/bhirk91v1MzJ1QMMJ26rEtwqhanyRhOl3ReB4CCjxPd6YHKpFn0B8GXBIAsTIcNoTev0GA2CUh5vqYGKzjhQaI9Gogp4+tgjiOxJfKQ8j+G+BNdL4rpFdOa6wjUp8lfi2LASaRhF4IQSU+L7QYD2jqZ9EfHvI5SOIb268IVFJM2WIeXcZFcHbmvj2jIFt1tLUpKd/yOtD2vWeslv6gjTKSnzzwtc7Dnutnarx3QtZLVcR2A8BJb77YfsWJSvxrW+8SOOLFMK9G3hv+pK7s+5yCtK8B/FtIYyhOXkb69b+HYH41vqrxBfNv/oItsrB2sVaie9a5DSfIvA8BJT4Pg/7l6j504hvK+lq1fhuTXxb2+eFq9KALUjBXsS3vZ/lx4Ut/eslvu3tsiOA2oBMKZT4KvF9iY1CG6kIvBACSnxfaLCO2FS0sSM/oKN9Go0MldYP+9PZ4HkGj5NWBkYLxPsEyVWtyXPGVKCzi9nk3L7RkLUt5LHaP4A/6muJGG8lJ7icuikHOlih/qH6kSlGbn6njwNzbUD1cp5ny88ofij/NK1cAHDBmkIRUAQKCCjxVdEYQgBuYIOPY1DjlPhaagbHoQDkKxDfof69IfGVeDyC+FbxL8xveTB7NvEdkR+0/qydd6FcJb4IY/2uCGyNgBLfrRH9sPLgwq/EtyoRa4lLjljAsci05FWI71rygjTuaLoeUePLbabxXis/qN/NZLUyv037TnkEW2V1C42vxGtNv2t5WvtRLkOJ79ZjouUpAggBJb4IIf1eRQAu/Ep8q/idp3WmCiWNGhyPpDWvRHzXkN93Jr5mKIG7PGiq0Lm+LeRr5fxuldMtie8a+UHwtPZDiS9CUr8rAo9DQInv47B+y5rgwr9yY2wF6+imDjl3W7JvUmMHsRQZtyK+SGXY0ybZL87HIY1L49lbfm96hD8qb2+NL5JzRNx7NL6or6gtWeK4cn63tuXoxBdhhvupGl+EoX5XBLZGQInv1oh+WHlwYV+5MbbC+E7Et0cjVbOhhGNSYt4Z0LvKyhDzrYlvD0a2OfWQ0qh/zya+1P5aG3uIbz92+Vko23M6z6vsyxHuXPPWxHcrDFrXJ9xPJb6tWGo6RWArBJT4boXkh5YDF3YlvlXJSIkLxNOVViO+XZt7L3NKelNq714aX66+Fae9iW/JhrW/nSUxscS91N/e4WvHrb6geflzzLS33Nb0exDfrvkxuK7jfirxHYRYsysC3Qgo8e2GTDNIBODCrsS3i/i2bsqI+LaWg0wdkLQ/i/g2929nje+jiG+pv73Etx03NPKWjJPGdw3Jh+uGK3Qv4rslDjWkcD+V+GJJ0xSKwLYIKPHdFk8tLUFg7wAYCPBRUwi8caEW9H1P62sNYFA6jIw+btrr8Ru3NyU2o3i35I+u6gVzzOVlYttbLvdvTYCMroMlEC8kPy39WkNsfbMyB9+eOkcPFqPEuaetfTPdpsblKzFeg6vmUQRqCCjxVfnYFQElvn3wbkF85YbaQ9xyLX1H4hvjExOLBf7OHRcmKHki807Et42oJVIE/Pyi2aHEV4kvkhH9rgj0IqDEtxcxTd+FwKsTX9TZVkKEyilp1ZDGrlauuYoWflRXtRXcpa8qUzT6GRpfifUp6Z8S37qkdo/3Sj+/a+dLmk81vq1IajpF4HMQUOL7OWP9lJ4q8e2DfSuNb6nWfuKCNU7dZR6E+NpmgJDAnRrfVCu6t8YXmbKgg9OasevKs7ONP2rLKPFdpeXumPKo/RrSuANMTaoINCKgxLcRKE22DoF3J74IFbyxxSW8IvEtaasRNvT9mRrfEvGNNcLrQ0LTWJ4LkctGMOs51OxBfHP4FNs03VrEYHUaNL+2IL57jFV7mfjguRo8zagIfCgCSnw/dOAf1W0lvn0bVy/xRRq/3DgjshDl6XQb0FX2A4gvxqfu57edoORnFNL49uKF5m2v/Gxd/6J9p7ofYtQf9B21f0viS21B9aH2pt9xeX3rR2/9ml4R+EQElPh+4qg/sM9KfPs2rnQjPE9t+fEGGg96c/o3IL51wqLEd9flwJk6NMtbZ2NQuUp8OwHV5IrAByCgxPcDBvmZXVTi20ZcS5rFVuK7RhuFSINpUyfx7W3H3qYO+HHfexHfFP89TR2a1hVh49skb02FhkSozK2Jb698o+6g9quNL0JQvysC/Qgo8e3HTHM8EIG9iTPaeEY3TlT+Wii5XERsUPmj7YP5VxBn2eZRP8yyLNjWDFjzvK+NKplC9LZLpsfEHkjAfd/+IfmbNtAI9+In2/Ts+Y3ajt25tR3c4DhoAkXggxBQ4vtBg/2KXVXimx81Jb7rpBkRjbTURxDfNVpEP/7J47ne/k1vQHzX4MfjrMR33TzSXIrAKyOgxPeVR+8D2q7E99jEF4ngaACMLTW+6whSXaPWTTQTwOTjt96yKH2qEewtA90Y9JaH5GHxfQONL5e5pq3PJr7deCUZ5lk1vqMYav7PQ0CJ7+eN+Uv1WImvEt+tBbaPIGFi0Vde3JvU68NIWWsI4DsR3zUHGyW+W88uLU8ROD4CSnyPP0Yf3UIlvnXiix6/jRKp4fyZABE9Ao2IyUj72vJi4ruGcHKePYhvT3sQ8UVj1YZhpZQNNb5KfNFo6XdFQBEgBJT4qhwcGgElvkp8awI6Srxw/nbiu4Z45fz8po/XcBvLCKG870Z8e8cAHazQ4ojwRflHv6upwyiCmv8TEVDi+4mj/kJ9VuL72sQXuUNDxAERE5QfiTrO/3jiK8kb2/DidtblpITDOxLfHvKL5AvJD/q+dtxQufxdiW8rUppOEQgIKPFVaTg0Akp8lfi+ksa3h3RR2lpkt/Tx2hoShfK8K/FtHQclvode/rVxisAuCCjx3QVWLfRRCOxNjNHGiIjFKA495efSHt0GeFQjjPBB4yfHB5WVH8ulRnhLU4U1fn7H+xRKQO7czgl178WwN/1iDESAjFy/ccjq+gztkR8019f0FeVRP78Idf2uCCwRUOKrUvHSCCjxjYcv3SiV+PaJNyIay9LyphBczqipAmuE+9tlW7o2H/fzHYjvCA5bEd+144DyKfHtm9+aWhEgBJT4qhy8NAJKfD+b+CLh7fUDjIhGK/FlsjUaWW3Ezy/Cpo0Q1m2c08B8/fjVWwnLa9D4BhLfFz6c8m1BfGEfWgZqZRq1AV4JnGZ7awSU+L718L5/555NfNvIw/pxWLNpyjx7a3yH+w9CGq/pv0S7l/im/cFX5Y99/DaKR04S62U+l/hC+eogvrCsDDijxHeP8epZTZT49qClaT8FASW+nzLSb9rPIxDfEY0SGpaRjZPyPoL4DvX/gMRX9gdrbF+f+NbH7/nEt9o+Jb7VJUSJL1ph9fsnIqDE9xNH/Y36fCTiu0ajhIZihPhS2ejV/mj5afu7yzsw8W3Rjp5Oc7cdbQ9GyM8vkp/e78u2HYf4ZudXJ/HtnaN7anzxbULv6C3TK/Edx1BLeD8ElPi+35h+VI+U+NaH+9OJLyIuPSQ0R5qI+PaSqZ70JXdnve1uXRQ+gfhK/NHjsDWmMhLr0jiNPnpsH8++G4nWcjWdIvDKCCjxfeXR07ZPRyO+PaSmZfhGCc6jiW93/3fW+G5NfNP+MfHt7nejxwXk57dFhnrTxDJ3LI3vAucVGl/Gg/r5DOKLzWd6R6ycXjW+22GpJb0PAqf/7m//2T91vU9n3zOyDqSf0/Rd7e19qr+URQsLhPK+LD9aOAo7g3cnNNmFu9iOOfQZtkUTvBwCexPjFJCFO7H+h+RdGI8T43p1OXdWo3WiDsryT2B69rQll3aUGOPrarv++PXoZBcsvx7NNwHHeZlu+ra/m88TrbU2n7XcZuKW9issiUvSmvrd/eOPeH2k8uVa+fNco951d2nUrpuTf/q3/MOY/HLrb+n75fzT56N++x/Xrvn27ds7+6YGHBc27o4o87RM/STbvtuvpO29u/EqySySnx5ZR2lz3+8n63ki1iBbrA0cbgIVNc9wfapPwNu57sf6TLJb23/XdFrzKAKDCJz+zf/2D0YyaQLZFfo8hQVkms4ZjUy0MYGFoWdjyvXlUo1thHs/8wLpJuAihxJfDOILp1DiWx88oHCdSn5cR+c1EilPFDckvpKAcv2IuKB+oitrxi89eIeDuW0Jfb+7Ncp+O9vf3S2xk4SU81pyE4grjaWp53T3ROjn1eYlwmv+PttyfXvudcUGujFgHMtX+pdoqNN0tNfI/sgxot//+rIHAyL98/0UkWdL/IOA3JiwThffv/ts+7dQfLh960L7nd8bwiHF/+4ivy+J/vD+VNqX0ARx36nPLMOhj5L4Lg8uW+7f9WORAd7SisF+NsKhyRSBJgRO/+b/+Ic5COXyDfjpttSY9lzVDGt8C91INSil3t4ki9eTZ5NQvFMiJb77EF/ezND8HtnwDLF5MvHtmQu5vpaIL5d7Ol0WmlBJdI3GVDygO90tESQ6QWYWP8+W1BGhvZzP09n9n8u4TF8L0kEEORwsfvguLkipISv9NqJozCOZmesaw4kVF448GeW30x5Tw399sSY5IcWuV+bwYFWfAQdBdqV45Q4n94IpBZPpvWyAW+WONb7xAcSr2adZnDty+/bJa7wKNVb6bzBINMYpho4+5A8frZ3UdIrAxgic/up//8fCWcwtCYmpQVFzUdD8IuKBNk7SQMeTOkYAGSrcMnZcsM6NQdbinocAkr+tW5Zu+kijOFo/Ihmo/LUaX1Su/D7Uxh1sgGV7th6fZV/zxJGJ6dfdmi/wmkTtud/vQgt6898v52miPz/O5+l6vRqye56/PNQBKlHnKZhS5KC873DjFeHrVII9MiDT0sGBsbF/Ww0sa4pP09X0n8nwbb5b/Jx2+C83h4/v52mSypDrOWh0aa+wP2JXOcUa8XTvOBrxte0PGt8bUMmeE8XQcl4DWwikyS3wAsaxRy561hxNqwjUEDj91d/+a1GyjcaFVtrkqqJFWMMC0a8xQNS256qGddh5bUbF9lfl5i0QUOJbH8ZHEN/awRUK2Q7EV7Znb+Kbe/xmr+gt2Z0N8UjsgCdrqkB//qsf9tr+fDHGDxNZ+nrzg9M8nU9WpWfWN6MJjcuaLkHlZ8p0qz2vz/ebtDFerodsfgHHqXCdfTkLTasoxK/HGZW+XKsvC2LFGlzb57O3QQ5X6tRmLuN2ngwJJjJ8v9OhYpput9tE+hxDll1+Q5YT0ktDc8m8YZEa5yOZOlDz7bg6+SLJgrwV2XDH8pHKAeNXko/Y0EVNHlrmkabZH4GI+JrTKxv/uwWHT4zypBudet3MymlRzTWTs7Fa25XzKZzoZRl+cSw8vuDvl+QqLW2nfNC3to2a77gIKPEdI77GuhJpdTqGPy3Lkr/K7rwj8TVEATGDjr7lCX6wt2WCGhGn6L0WEbmz0eheLhfz5zz/8ja6xFoZDjahkBpbR/0iDekXP1KO7IcDAbkWiOmaw0puHE/g8fM81W2Ar057ye0xN/NCS32ebl5+wq29sGFObEzv7s0IkWH6IY0wtZuIL2mCzb+pze7fyIZ19OA0OrfY1CEux1F4mlsFvVPrrSdqHx0sFmRYzOcznTQyJoZe47tifmkWRWAUAf+4jYWTtQl+YtBiK14iy2s5o4mY44U9FfLWCVbqyPd3uGrKTcJv8Wo4t1i7t61FnO7uqmwUSM1/TASeTXyRRghtLKOoovKRxjfVRm7dHnjluTPxRcQF4VfCI+SLN37+Pa+jl/tvQ3DJdOHHlWx0z0ar6/M7xQGTZb/+zkFjnNbFBNtyROdFAr7etz1Z298S+YHrPzhUBXdcgoKK/YiJFbd7QX6dRrtkyko3mveb1RCTPTUR4G+jGbYmEzdng51i4/fEwYPTKN40viTDJeI73eLHfbHZyGRuEmo/aPy+v2JmLdthDhHg5MDeo0bXFc2vCPQgcPrv/89/MkuiuUZzDyNosz6dLeElYlv7YXclnAZNlNICWaojLS9dKO7CRksuTpzu92wfb/CpnjcQ/luJb4+4vF5aJb7A3SAkRGH+j27SuYOpnN/Z8l+U+Ia1KONSTGh0/+srf3d3T+7xGmt3+eDOppj0GI5y8PpFCrdIMWF99AjinKlfjPk3cFeG7sqRxh7JTGrKkK73t4m9OuQZ1MV1z5tueJtiK20XR0wNfuKhlg884m7yT2TUQA4xTmdD1ox5xDRPf7oJEnyz2mV5eEEHJ7RiInxQfvbqwAcis2efnQeP02m6ngPxlWn8fu3wLdVjTXHKP+wej/uR/v01XT1mbLvOfxsspT016qx+VwQ2QuD0P/zf/1Ld+kYnJmonIsqofpQf1U+vTiUZpscR0m3Ob2ODJuyczTWbvN+JNxZrKRa+n93jEgbZ9kd+Z5V1fGfkN7roWi+x33OvasOmSPZvyUa3w+MVhOkrfUfyJTfLPfq1x1W7bCfsX6ZTMo+0Uc32f1DjJQ+rrfhG7Rv0+rAkLvT4KZAbMgUIP3dLiuRVrns2b7Vb8VJK8/L6fTMKhcv1ZEwYSMN2IYJ1tm6o2KtDue/tASTWjDXCfMsy15SVo12xfCIb1XVvTLgO0r7bo4R9BPd9uxsb4W/y8UtaYUfseBoYDbtzCUrpc+5AGXP6TkqmVCsq+3cxpiD2IENmI7Tfkd2xIbin0/TzR3LwWTwmW9d/JBeyD/W09Qn65TTSrHW3dtjUX2cCRQc9OefcTYepc2GmY+cf40lr11mCK8xeAsbuRkT4b5ZljB5sWnHUdI9F4OOJr1lQyBbKzqQF+nfHKs3G5idlIMu/WUOT5OX5Zl5pF0+15+k+/zZ1GgIvSSpvuNKGWvjn5IayO5rwItl+MRP7dJ/YRvqxYvU6tcHNGLjzGe3pEYmvJKOPIL6yvlY8vdZtc+JL8zWQKXocS3Wxj1ieq6w9m+le3AeWcGYNYrf844+rITdBC2ddhNlmU/rl4+EYg3biuwZHhDecH6iA5HtveSVa68cf+pFfR/xS4ju7R4T+URwRs9M00fJ/u83T1/1mibA5FAUyW7vRiPtgSbBUwtC/f/y8uNvY83Q9T84URjyO9PtP6aH2uv63DiseTzBBpZ99R3allvnLzK/g6cSYogiXdmQaRL6CU5y5XeTiz+zdiUlNuCXh9oXDrhLf1tF/3XQfT3zvd3KXE0/OQISnSV7F2cnES7HN8+3ysk0YvxqmjdKkl44UzVYXL+VMLGQAESlOd3AVRRojT4KTF9t7bISvK+r5lsOF+0OJL8vOo4jvGlk1h9aNiW8qD3OuAuFX19hw3+nKlu7M78bd2PVqH6b9OF+sZtfPeUt4fR3EooRGOS+LSnxLaw4rLWpr0tqQvZL40n4QlBfxcz3W2H8T8XVmEZ4EG08RwuuGaGgwzbCa/0DUJmfzTUSXpIXe0FhSa3cOJw/8EH2+Lkhfz8FpdD2H6yc0ZZDybYOrhD2WY+gFRZP3zuH2119fwZ2fV1ydQgAT0s6nds3cZtpzL3zhmomuOIqN5j8uAh9PfE/u1SkPETs75/9fREhRSTL5+yLuEYfgdIvVfLcO6mkJDOTY+ZqcJwpIGkkH18FEOG+HEnZ7E8ZUJAqbLPn4pGuffU/8xxXttpbBhXtn/I6q8Q3oAfnZwNRBjhQcj3RYN7QBXj4SMlTWBIrgH9YAM1Enokv85Hq+OI3cyZBfe0WePvzJPDRLbGyX/e8jvmsOEHXiCI3A2yaaSNUzxsirAqp8lPjy41Sp8TfBMLhiGZJXXKWzHeuffkmfzBksnau6H5frdLmQTe7ZuKszml+i24b82h/j01gWQTeAUwhAkh/7fdd/PJb1kymbkoROhvREWNnG25LXcDvi/Tifz9P9PhvzE9K8377n6dvgJ00Y7MFBmht6bbuUSw1whabT23xX4psQX3O6N3PGThw6r4fJHXxFsgTkbtpoLQx2Rj6lXbwS0fm+WWJMC6skxvSm0NR7pscszmm7X2T5IQa1J1Dv0yLYB52gt9+43kb6W16xK/GtD/erE1/zoinMkeCFg69Yec47M4bTbCKk2UdEk/HEQP++ku2l2ZfJzy4tAM7NlvmdpG9EbASNTuRrC+IbiNL+cx8Tn7L4tGhsyTfxyM9WxLfknYDlhdfwtK3ny09rE/z9bf7QGk8/HDr6Ska65ofkxj7akDcEdgeivSAmsN7URtij53F6MeLrhdeR3MlqdL1CKOmkUfzwrad3R3cy2ncak6/vX+bNjr+BdWUxfhQS3JZviTUNwYhMj8iq5n0cAkp8gcbX2926DWrxmE44gJff7hwL3uXjl9h2EZOueayfYvnDdsX0u68ve/onG15jY+ypM59+eWEgwu5Oy/qgrXkGwUXuzYmv0YRUycVjNb52fgSyA9s3qvENr0jtBmiIfDBIktek5pEa/SH3Y86ukB6tGVMHQ0BII8f2l/YmJsxXQ3e8XHK5Oezj3/VrfKXwQ/lunin5hHuXb1yyDZDfUeJbejztNYZ88Ev2B85HZNeYvfz4Yf5meTZBNO736UvsH7Kfvnznx97zwcQfMzBxXhVyukck8NjUNb584+VxTtbb1HaXZkP4HSmEXAhvYfJnngE6nOiAYdzSuQeJRjP8zfM1BDBJyS8dVu1Y7Xtw6MFa026HgBLfxP1NtGk4XU06ueX/pRtE1hTLySpNKYIWONgxkTs4Li81swiTkfZW51x9tlGIbk6LdPttia+5iuMHFyenITZbLXDUuJ0svWVJe7tDe7apQ42A2QF9PPGV5Be2b5T4urlCF6E0D9kvOb3Gp7qtKYP1r8teGWyVFpfZ2RB6DZJwNWaoLh9CxYYeWzXWCSW8sQEad0xMxqbt3uWzimB9PXWNcancQDzFQ0dhi8vrAvlYMOu0e9Bo5dXJxjxP/80f/2DlxK3z8iBlrvJJqeE0wl83ZwLnbFTP56vREst9gG3CPbETJC8/kvsSNzwugPgC5n4SpobpI3Fz6+I8Xvg91IEg1w1pokikWHqN+POXfVzuvUiwOYUS37GF4eC5P574LkituFYxG5e7CpHjGGt2zbIUDXOwJTpNMnKcnLhcxsVd5bDiiSMKcYHz9BWuYfg6xviZtNqk6/TT/E1u2ci26Xa3Nk5MlKEH8YML6LOb9ynEV5LNGPPnEF9uT6rxWcjDhsSXyiYFrtHoXsiU4TydHWG9uHpMgB/ylmJIED08kjaY9AjKrBpBK3UjDZV05B/jWaMFtDYp8Q0jjklWbrXYlvhaFhqCNjmnAzaUtDF/oah7JxOQxNjnfv3Zh5+WZIz7Yv4+WXmhyHEUROP3N2mCLQm+nB2Jdl1b2K7ym5KiVvzYxDfeO2PPCnY+Ov8n3qVZvNdyHAE+eLAEsG2wPY+Em9BUufTliLCxDzZaeHdI8Xv6mKnNs/cvrT+PwOnf/l//XB3Z0lXPUQBFi+Fo+/cuf28cv35T2Gj2OemcsTubYVoQbsbBeVgYLAEP2/Hl5l7N+kc4yYMd70sxaJnN3sDRlWZpyhHypn7RF/yFNWRPNtvYm/gi+drSjySqa40sojI5EmSpbJY0LxmJIHD/uR662TCy5QSIva6wSYEJQCAqY6MFa73nrPjci3gq50p3J6TZvZynK4UIdkF8iHCivpUPC6EBwOlEN+Rpm5BGvIR/TqOZpY0ZQiXbgNbXFgzTemvlL/oPEKQbNxnNLU1uRCkxH6A0fNC5mcdjzr7byRBrISnfzzP5abYhptlu12j/2VtAg5lGDaM//bIaX+Nfnm77WIrJNJ3oNpnX+Eh2IqQ1ewMy6+968ovGb4/xl2Pkb0y6Z0pbhtR2m80i+L0NBaZjhZVZcmYKcBLINwVQsQdU+1bAmEeYtzwuMorYv9hsRx5m9wjgEY0Jkr8kpDejVlsfYmVEG86lVHL+9awDuXaGURE8o+BVRIkvGLfRiT8mFuO5zaR0UYno36wJpkWUSMQvd9XDsemZ9PJktw517E8OC5rg8vqO6QWnvwpXTv46Spo4J6YYvg62mXuyqcY7Ed8WotYrcXB+ABu5Wn670RB1tRqxVGMmF2e6zsxp1M4XS2DJpMTY4JqHRdYLgzFfuDhXUSYgAOsAROSzwfXhHYmvlKO9iE9p4+0lvtJGk7Xzss0398aDg0PI8s2/SRvrzGBIfsjrgpSfy8muf4sDiPS/3jCpSvPg5kxxSCNpXKbdiQSTLLs6z8JeVXiY4DZFT1juDTcISVvh/IZ+lMc0pnsTXz5I526WqO83Ug4ZjxE3o4mn35nnh27MKYiI2Vcd0NxbuSdKkuZ/736Z+hduEJWuJLWDsSXsyBQlVJc7IKL5jxqbO+TmykzlMF0f0u80LmadKjRAie/gxjY68EgwRr+fZqsxYAfsbPhvJvA8T9eff7AT1/mg5Ose6xJmnr6cbbHVsrlJYkJiOtvh2WmEZ7sYmHKFFuXKC4Jz78b9Ydzoei/7oxpfA8uWGt8jEt/UZtG2MciEDy3r5JW1K35BP7mQ5HQAY7LhyLZJc/uL84t6NR4Y7AMjgasMYyttdzMamzVz0Xh42PBnQfwKGhs/zwoHjxKxTJtaPZiwpqvSP0ScatDwWMs0vcRXbn25TZZMw+iH9v+c1QybMJAs0a2BN2Vwnj34cZUkN6a8FcOew8p6LbDrLSkgrEaSSbA1hyCtJdsas99pS9DITXT8eDXFFN3IjIruyPjb9W/ro2Pco1Tjm+7nLB+Ui47grBH+cqYRYT8zJ2j3X7YjtvIS/6wQjNFByOQPhDhpXRrog285kgNOyO802yvbmItcGckMfL2Z8oc2fJX4ggFDE/foxPfsNnC2HTaLpHASTgE82M7K94UWG2fa8OUedHDUOgrZ6e2gZuvSKRAqe80sNSB88Wwf3y0XMb42jBYgeT0EBX/ljGvM9m4asnrqpAAAIABJREFU3zBWjQAMzg/p9zZXVOz1wGx1Lpn9O943nMYlcuHknPxb5ZwJ58omC6Sru/5gt4Qn/wDJzGnnvSEEqHDupHjr8jYW1oRn7c87E98WTEawy5XfT3y5FDuGi/zWB53V2EVaWmuz+5MCkLjHjcbHrnu8xjJUPLebcNTIY8qyhznNll+XfZSz4FbzN7lIm07Oa4GzTzUs3mklhc4rKts9hD6Lx2Mt49mbZnT89ya+FGJatnGhOUyIK4kI+2imtL85dLUItczY27WMiaEdM++f360pezw9l5yEfBzzT46rxOFYbMo4HbtxDLcacn//QfHXB37oAMHzkpVxPAb28FY/+ISDnG2fxJe+lfBV4ju4sR+d+MowmOkEMIIiQl5KKJZ+K93ENSu9IwPzefrl3PHIxUBGp/teRKpzfildZVcTsjkIt4nLLip/Nr57E1+0Zuzp9WF0U0JtN4uo0Djm6vsmv6VubbZjbf3chhsB6afaqtKkTJCNLhMTEzUtMlmYJnMx4d2NOe2eu6Y0xMR7dYkDweQ0omvwQvqq3jIXxO2JGt+W8e/tHyqzl/ga17h2a/VyY+TtZA9R1kd6MNciWWKCa0xhTt+RGUOqyV0e3FwPOk0dPD1PNW5SsZAEZTC9Im969LCZQvmaQA7O9aXz9mBt289ezn09DpVPJ745/8zywOJtvYV5CRM/+vuLNO5OC29dpgUPEcYXf7JecThrXsPSAFpI/rf+bvxLuTUkslH37liDRje7Fxf4Q3M7zzaOQenn+85uW+0NNfMMT5ZdxtC2mPwq8W0eiTghWrifTcxQt04lz+teYPIPHzjb2YR0duyANA7+FbEt4FuE5CR7JSuc4VT8yy28LKiUP2hJztP17tzJuEd18trO50Gd3PH7OxPfR+CbXqUu5pOMXOZ9olqbXNM+MqsRiyu7FyOTBfo3uRgzXhayYYHv5qW8nKO8qbF24eQ0fpakB0HKEd81eL068V3TZzkdW9ZPlKZWHtI3eZtLofmULrLM0yWn0bWkNzxwNDJxCwcv2U5/1VuyaeDNvKQSrqxZOTykDFtNGHt7sPJt/1wsAf4mEmztUrms4FEoJsFq6hAGwo+pIGIU4IJ+fxF23J500V53du7sRJAp8sjBwUpo/QnjaY8h5gEuh6FO4ghssZVJ+eF3C55oi37YfsWKBJnOyL+Q76xcrr8MM10Nj5LjmezHwkW+lZjz2k2/48Ak9nesvz6ZfYN+2OtHiqtqfIGkoUX56MQ3XAUITwuGVCyv/nIcuWZjarSzTjuXThi6oqC67Wvk2Whx2X+iOSE7EwqzgLvNga6dWQtjBJ1sMRON8RYLQ08Z7058ERZI/lF+RHxpzL1fXK/9NdZ0pmhy/E+yxe7F+ARP36Vsp6QkbGJWYxHbDYdFlgiCXeDDS3zZp9SdWC8e70B8R8gvwitHNmoy1avxJbtLk8dEE6E17y5IzH36w4+rII6xX1jKx+cyY+Er9ubQjuVVsukTe4pY6VDBH7wuzlvOLTy4pPLPF3e1666KU8w4/1++Lfll+1QfBdQ9alLiu5S23AHHprJjQHM6KIOu3kezLMnseadp+vXb4W/2vOCLn9OO8gepnc7t9deTWN+cuz0+KEliK/sczTHzIDJ/vBxte2ldKeO/HCvPIwzXcG+MxA1yaf1R4vvmxJcIbhj8YK9jTkPGTU68NZuJJE55pzubJkgjdgql7Gwn3VW2qUOGTOYTF/uE8N/sVQSbM/xyu8n9Rouz1Rbb6yK7cKx5JILIWM93Jb5jR/rcxhovRiH87/XMASOsbS+/zCUZ5utpkge2GzcbutO4WHZrNSl2QbV/X91mFZNZe71mkiwet1miERb1oPHjMhCZk3W9C/FdS34RVqkmE83NXuLrpdeFArYeGayv3Ys5dLGfdJYb8/zXN8Osh5kgEZ6YClOZSMacPTER5rU/vAZagmIrIvnnuiM59X6muTanET7/NFrgKHKZZ/DSZ8/aVtbzofFHte5t41u6EM0dyIKsurDkbs2xAxN8O89GZvjA/SN6kEh7m3mQuOImIIeVJL78nW8w6NsfwOvoeVqub7k5WSK5szNFKI0jJMeOmJfWlzOy8XUVG23vKXAHimtg5k/BjOL0P/6Hf5xNAicBHMGENSQ3M98qF0qL00CwyaCcFxl5JSrGESe38Ui7TimM0t0GO42XLbqhyC87P44andhIMFD5KD9aWEbL3yO/XNi/bpakmCsNXjQMmXeaHL6qTkwo/BWn0OjlsJiTEJlpf4I7tjySRa8UPCEz7mJkHfw2IK3Xb6xnXkDzBHR4Y0hstFJ5+ganfW+SYBaYoN5iTb15le5uBaivNihECOv7xytwpwMEOB2/RXIQ2QzND/k9J+vS68SastbTorba0PxEPl7RwROXv76dhthlbFzDgchGtAzEkIKLWM2ubdd9ujpPDNZ1nQ0wEcbMPMVta2AhFeo/wm9t5aheXy77o3bEgH5P5Iuu4um249v4KQ4/qblPHNE7Vl+P7j0tfUf9HF7/WhpRS5OEqk6ThgMS3VG5W1Byjfb1bU1RjCdxZ4dtJdn7Dab/8eN0LpfL4zlwnb68qU6syR2T61FYjpL/LzI8tYieePqf/v5faFsKp8g7/9uuOF/SxsmT47AJxyTVmErHE4n9JIoXdzKNtMHgq/MaaPRYK/xgfdzekxNNTCQAqH2ofJQf1T9a/mj+XPtkmeyDmNLZ35PT9iB/v387B+/sa9NFtAsLTmzenrY3F01PYiofr+T6ehYnVtkXTnsFJ3t63FXDUIbbzJWfHuhTeUDjw7ZQ8rARsLaRzNJFN9ooE+0Yz08mFz9/2I2V/k9kmCIsUZuZT6P2oeX7kcRX4sIYKPEduxGg8Y/me3LQYndQnM7PazcAJ1Lheld3HD3NHrBoLvw0rhftnxDahM0GwtM3tE6WvkP5HYOn2CxUr8/oI2mEh5y05nGAht/OlSWVx75oZeTBxfLlzEUY0+Z2rAQYlX8U4lvax0gOqQ98DW/WZ/NWxq5sf/n9ZU1RbjbyKtupBoWfUxL4CoJNOpVFtNmur2GlNAfGnRV+K4fz4dl+C87Ka4iR3b/5+38VUzM2xKZW3lkj666y04Xq19dSVW565662IxIh/Lsy+eWNu+TOija20uZHecHbrd0FAE1MNNJIQFH5KD+qf7T8vfPTidf0UZhRxGPu3mx7mzpj/em7/WcKveN+pOz6dp9+WnFNrkT4//bGI/ws8M64A5JlXZLHC2n+G1D5zc7UpDiOicY6TYf8AKP5c73Zx4fc7vRv8o3L3wPBIBsVS0L41bKF8T75g6tr9/dcd+ijxBfN4Pp3ND+PoPGttZHnsjk0JZs75ePIfWTxYsitCzBhzBiiwBIUisDKoPzB+Izhzy7SBktZZG9utyC+3mBZuNWiWPd8/W49Qjjy5TxecB7CMlfns22Ej0x8zaCdrQ2w3GPIdIZlmTS3dOD4NkEybNhkMwZOAWn9jruDm3OtJudBqnjxB0MlvhZzd2WUjsHpb/7TPwnim/ispBfRtY3ZvD5yBsXuVR2fJJlkSHdW7GQ70hLT7ZQbJPP71NerczuznPmuYWDjHyWGaMFqXoAKBaH2ofJR/tH2o/JH21dz52IWW+8HMdOTgr9fGVJyFjagqfBTiV+/k0VJBEqg73Ssq/ZxtsRZLmyypfdLXeVzTpl12s2KfNt2hY08N1azu7FJv/k5F4U8lS/ELeX8gyMU9G9JJDwBdiGtF+Xzq3Oj2RAmEEbJFv5/m2RI6+UYH434puN8dI1vSS4D0vXXV+iqHs1/tP6k3xcH0IydP3s0oLb9II8eLmSwJQl2vtHuYDVtYf4x8U0JdG8bu9JvaGoj612Lu9TgEg7G258zIyPCZUkwmUPQo6yTsQ+2c/+ycIlmfg8iM3ZhlVvigQ/tIxHf3PpLeMp1M52PfAvByp3YS8E8kd/8OD9LsZXrHP5ozx4dk1fO7w8G/+7vJPHlJSNs5OWrxBCpi4GQhvwMPhFfJsHs5sqQY3c1fT6FjU/KuLV7oSsrufUl2yDZddaI0cIZ8/ZDtnYB8piBkxkqf1TIR8sfzZ+6G6HyZJ+QRjJnoxe3qU48pQ15ri+UWxJmlmX+3e0u5TfUxd+/CppkP/6ZoB6yHbSRVzEW7mhSbSz9X5oqSFz53z8SYr5I4/w0lzZdMl2wC3BIYTFyV3DncDDgFEhmZF2jxHdP4mZlNT44ta4wjAG5Sar99GCF6s6X9VziG8t6Bgsn/yade2FOD9P4AQ8dzPiHya48aHHESnMDkZDQdK3J4TeK/17y5zfwBvnhOW3mpbgPM4TKu6u0QS/svmwJL/1NIe3pb5KSUOfFP242d/Q7/iD8j0R8o3XLjQsT30B47Xxj92ikmDAHkIsNoS5Neyjd7y+7/n+ZgwjvBcYXml13K368W+R7x6E7RNFynkRrzb/7O7Lxzf/IhT1eXsL/Sg68+SAYna79uhbUyBR5hgMiSFJhwt4aZ3fCE4F/tY22w9C+UWKIRg9NTJQftQ+Vj/Kj+kfLH81PxLdWBhvSyAct0hk97WWxNLgDk5NqT8wKIRdTd1UpntKdWtpO+n+q0U3TnOe8RpPTxX4e7WjJMtCrWfg4WJhi5GRFPj7NbvyRedIyRUSUHea2/XbefgONbsnPIteEZjqy8d2LeMgVMB0zNOdk+kcS33w7n0t8JVYs99EGZQJP2Ohp5I3BePtwBIF+z27t7MPn5VYWIlXaMNXR3GqwhUTrGxrrveRvDfGl0+miP/Iw4GxP5ZoSzCAoOIO1AzZesx90lY7wfzbxpf0llSm/diW+fw1RdcSIbdBTP7qL+XC++jDJjD/xItYMp1fy6W3Go8YJzYNnfU/nif//X//dP1dVYqkf1TDIzraS3aiIiWDV9u5E4jWyIgKH2M3YP2I4zbAbCpvIEmMmBNZAP/YAUd8a9x54NDHRgKP2ofJRflT/aPmj+b0NaIOvQPN0UuwkxsabHYg7zaOVV3H9n9kM08UhxSju09KUIM4PiAMYgJpXEmoH34iUcPbeLRxhTudRvW9+mvpkqTxFJCQzRkTcpR0x3cDIMmg8/Eaa0W6HBzV5oPYmvqPzg2UNzYPSOCjxDcikskZy9MOEDLZk19rtWqJh/LwkxNU+miSJCSZ7N/H4B9m752Shd1zTMo5KfP06Ov8wtzMRQRC3GOeLJV7GDtV51fEEzLic3CPobl4mcuNzNOJryK1cJ51G3UeXzPAleSC1Mi2iSLr9jX7PShIboe9mH8QlihKjxX/QoQStnUf4LiNzRgeSv/6PVuNrwMrM0vCr/BZE5z9ZoPm3ODJepi8fkpYGb0ETIlMGR44jxPjxUrh+sTZJ1oTiG9gA7S0Ewwtjw1VVTYBG+4faj8ofzU/LJteRq4vcEQUBI/+J9D93C0AaRWeELh+umDQsuMKURuLo250hYzIda4yzeUmynR/DEk5fGa8PETFENoDAa0TJCD9cgSWP/xIN+6+k/+l4hpfwFoH0+2zwjbUekmBcEj+RweaS5/q+7swQ8UCLM5LvVyO+yzF8rsaXDz5yDWCbXfr7p5d/284gj87ExD34MWTY2UVFEnUJ18MlrXBNBvD41yUIyd/a8iOiioSY523UGGs7er//FDb3LgKiOVzEgV8sP6ADxWn6otC8398mCBGR4T1/ED7PJr6RH3ARCp0JqI3VZn0H0e9MeGxpFhY9onL7mgjZbueHcWpux8uUxCYp8/SXL3sokQqPPcfj1couWSSc/uY/lU0dXqGTRjDmk3+NShursSWObIjdm3JwbRv11xGCi3+IY8tg22NJ9mPbMWfz6B/sjdrw1W1ULwUHz7xgUHtTUobIbET8ADGjSxeJRZTXhUSk3+XIbU87XkEWc21ECzd6Vf+ofvPCye3lvzlWeqkdOUfsss/szqd0cEAaXdT/+uyIH9KhsrLfgfzvMb4Rfqsa3Z4Jtd9s1JXDeUrsjBxFg8oj5G4AzabuAoiQdmu6GY0uB5WgGwKj4XVdgLwKPG5mJEr9bNECI4xa0V5TzihxRmssbBNowJ9/38x+Sw/j2AxCErWZIgmIH77a9/uTUFyFw3qY1bnfyf0kPTan/Snl9+ncwak0hktFQJzy5znsr+keZ4kuXKFaxSebjjTuhDuFSSYt8JeL5MeeI27Cq4F83BmcfQQEzS2AWO+o7Uh+hhr/xMwvT3z5KtUEN3COoIn8WoE7m5Mp/ZjFmB7DJa5FUtdYi4E2j3vcaUuaaLCLrWThlQspJUGm/3hiLBcBKS93Iag5IZW/y9VV8qfKacP1YZ68cvyIIvnlR04NpgxPnAe7VY3HF27tu7WtREYj+XIURBJjOYfKzgZdKUCj7kOscfJko+DHHiUCA7eVRmJUBPkJxNesVw6HZwe4QI8r/QZqbvPCod9fuXLI8si7QvAecr1ae1EmRFZDFjS7KECM1LjVJsoI8ZXjMToZ8XoQ13B04nubLPGyphDWBphNIqgnlwuZUix9NbPmXnrdyGGb7mlL/PIzpER4JWmWcibHWNYhyazX4pKPaKeVpch/8ufRRJHvQagNHPmUNPLkGo3GwrAXoYnmfvKYBD/xTts/KuAvkv8NiC9vfVb9Tww3ddkSNm02lwjOusnPm9/IMy4EgsbKhtotLYKlCYomQu9C2CtXbIFVrEeGbE1eippFQly75E60J/B4Km1v6UTe269XSY/H97nEl9tXltOwsaR9of9z6yUx5qs3u8nUbQBzGuPosAb8ID+b+CI55CtjlC73nTA9OvFN5WehIYs0elaDRK6f2eYxHGzYjIkMZ27eblwGmMli2HiwGSW+W5FfvB70Ed81ciXzwPYg5i00ikt/wGSXGs9/1oIGuamEla3cNIT8ofzc+pS7cZL9j9yJiQ+8BnFkzZQAs0LoPhfiGIwOTGd+ah9HhiMcSPFLf9MbKeOVg8whjPLPBdAw5Z+n1CsH4iudzTps8pcnvkt3KtYehn9yGk+hQ51+OyMlu3EH12v+ZJRsPXNyNVJaOHhDTzWiiAim39FVHEfeKi1m9HhMYrD49ylM3PRkSGWikL01dzZmkQMhe999osGNZWn1/pTFothOp/HMHXqooXTFyT/+ACnIDm188vdpGkntcrIwC+Kb/Y7QaiRGpWJo38djWG7ECPE1B4e9r0ph+RzlbHnjE7RGiV8VuiJ1uP2goBLk/cp5ZJAR/Mxm7dZc6zArWsUM+aWQJ9WfxvHdgvjynoBEDn3vkSfEO1Fd6DtsC2gA5ffaVedfxxyInTu0P7kAQqGe9Chnx72kEKkdzO23uLzSflLqp4x8Jvc/f2PhrGpz+Q000RulsbUCjVXuO92QmHlozDiDizNClZQORutLNtl3awZhI8MF8lsbXjm2a9p25DwvT3yRA20psJaIhZe/ZsKJycoLuXwp721m2HZNmEuYjUmEYo72EPe6eLmgJ8s72HjiEM1LUboB4sSPw0rEJTVxSif4peCgPLcgZYmJIL7ZxePNX6DCjeXAxJfannp16V3MyMYsJb48z+yGF0hTjjinpg7pJgl1oo3EqEZ8U2Lfh0Fdo4/kA2l8UX7UVpx/SXwlHp70GHvdYOpgvTA4213njcH7PDYXsLPxq5sqElLyi9z5PcrUYUwG8qOAsc++N0dD2vUdtmEl8+Zt47cLj0wmh+Y5jrslYmKZPm4s4ZxTYNn9N6/x5X6RCQ3v06nWln7PpjWcRoJn2piaMrCbTH7DU4wr2zUMqxPL9rOpp1wjyT8wYUF+mUkLTCYQpOsjIkzYk6cU8yPCKHN+oxx+cv9WAwMyvjzx5YGHE9gBYUitUFBkN1a3V5kyTWQ6qwk2pyd/mrWnJz9RnQ2xNYdodymC2o38nHJoWDlx5QSvCS6lS1/tp/KCNFZoXcxpfNPFZS/hPkK5aHyf/bitplExMhX55k1oCZEdvgtM/Q+zjer5R5gj4pDH9bKNXzh0Og2GT1unfo8kvnJDaZctbMpSk5EjEN9cX73cuMezdi3JmDL4jVNo9ijampMrFKBGuq7MYt54sClhjG7Uan1vl4FySrQ+oPV1tA2o/pynp1KdWcXG2WodUzMI74ngZEPylnBOv8k66N/0KLL2Q8tTessp/8/EuGduyz215DVgdFx688sDaJzXeYVwvpCIs/iHiPcpPIbzij12U2txlcS6t01HTv/yxHdJ1ILzfLtxy1eLPKhETZ07pXswTg8TQtg1ijlpJp0ju8x5v77s8zUb2ca4UzeP6Nj7g4wMtmYRpZL4J10E6P+Cd2Q9J/RunKlmGBFfSf7XCLqaOmBitAbX1jyI+ObGV47Z/R6bypg5t0KLL4mv3IR+AxO6dyC+tU23d/62jnt7uqUpC4+xIbvO68PlSlECrZ9dT9Yo3LxbZ9n0IV1fpruNXEU/8CFbrtFPIL49JAnhjIjn0Ykvv/2MXEgW1gATbsR4ILB+aM2fgrtJhJvfE13kMyOL9OhM/G2JW96UorX82ckmz0M0Xq3l7pkumGmQhnfJH8zNt1Ms/OXbKhr4YMLjSQorq/F+7v60F04vT3zv8vHEYsLRgwkWWefSbPFq3O2szoShdsLka5XIXY+7yrUnKetKjU5UHF0lF1JXDiaaSFcOCSsenkUa3cGQkTWSQm0rnyRtL3pJTtrf3vx7TYS9ykXj+2yNL/e71E52PVXChxQuqRZGlonGl6/HS+XfpvAqnG9dIpKMHOg3EqNS/TnigcdUlta+ceTKfTbxzR18zYHbhVj9cSErXNYO2Adq4cErRTZ0pi6zfQkfZMPmIWISHaSSgYBYN47vlhpfNGd61hLUv1cgvpFGlfQ+wnyLNYbe+4vbLzkYw59+yQBVsSvQ9IDBhE7uf39Ixn+x3mT2x9oen44duwPj36P52DP2W6SVUfRyJJ+IO8lYaHd4REr13y5/8IcR45uZzI+M9leJ7xbj87JloIVH2gjnOnl3j3u+jZ9DZ+MkYzJELoB44ru/z/P0w0Uhin1jOqE0Dsid02uvZbOC7RdUF/nlZQfgxRuONjbcvXbihMvaPsV4/+ptQuV/C29CTIjlhskbV46AS81Husn6VgFildOIyLpKhwIuv2cTziFl3ixkCKUvf/7y0cykJIV2ya3cktBIu3W/TeeL1aaRPaD1yCBt/8ZsmJFEovFH+eX3bFlgfJEpxJbty45v4Q1ISSGRtuciHl/xN5kGyV/Ja0qovz4COT/P6ZjQFkY2p7dvCkhlr+ZPF7vH/ThZmczO33AB64vsVazsPX498vmMtLR+2XdPbAvsxsK5Q/s+kamatfOXHp54vTRP5dzbKeNRy5lM2DG7LLxGPKOPuTpfXuM7CmSL4COtFbchV5ZfIERQDZrY3n9h0etCSmi5FqtBsaYV1saprK1bvnodxUvz9yHQIl/1EpX41vFxJkuJf25emGVkqZaNP60rPnCGr1wW2tjR49EaCSmScdHIvHydvRZ2PsfuolIMfrjHL+HQEDSwZMt4dQSETBgovDJ7ZbBtqwe3aGk/mk3j8yeuYVHeixLf0sEpxRwpbojNVDGuPE6mfIlTg2VkxyQIQrqXXskG2ERitfsZPcBim2D6v7TBlSNZ2pOV+KIZFX+XxJe+kCbeBiKxJPbXFz2fz5wwXDF+HXSKN+tdIhyXjvo4Tolv5kSdamyqxDdxcJ+mPU+/jf/f8/m6OLnSBQRrgXnB4gWAhYfMJsLVTnjBysSZNqMy8R2Ni9U3iTT1EoHxjfuziW+PTOWwZhtlSfjkv5FdKRq/EjH2xAQ6Gt5OY8ptlTpcGSAgupJm06mbvWo2Gpqz/ZvIiPez66+tnebN3CbdjFbYandGI1PWRxjh3yMfWSL+4sS3t/8t6UvERf7eE57k7n+5/+UDMHE6s38JGSLCZWx/v+khObniKpg/OBPGNKS8Et+WEQ5pUuIr/WbT2kZjYcw3XVS4OFaCvf4hl4sBdw6pcWzu8fHEt09MMv4GnfG3vI6R/77M9vFGjjybjeN69ZFtyC6YfseuS80J2BHr+PWovQZanO69i5XgJqp0Yu7tt6Zfh8D4xq3Et4b8DB5fnFM/3MlBl6JNyXmUakTTAArpeKbEF10dp31JTSV65SU110gf4cgAI1w3pWHXYld6jOYeBFlzhrBWpSFM2R6dSa+5AgU21r39SfEZzZ+TnajMgxPftXj4Q1DhRjDV1GUPBcKriz/IJQedMwiARKYx9fnLj69CQnoYbkz45vP02/ie5T9BycPzMt3flPj27VM5HiHthglf1sDTWkk3aMRJWCs8na/eFILXlfC4tawp7mvl9qmV+GYwlZMHmTlIP7lBMys2D7Exs72YLP92lsSGJ39YBL7dlYMlxPRoLpBvs+nyxm14sDRht/9X4rv9pOkpcXzjVuILtk60s9a/Cz/DOQJ8vwkPLzl3bM5Gv1QJ0gjXAsC0yJnVaAezqHQFsIdoeWtENrxBu/vzbNcqMsnwJNo9cLH1B/kz6VK3dTtrfBEGI/PL5B0kvnu2D5J2aw1rkuVvO6w7TvmzIIbgRkLaCMv9LRDhuIClxjdev9L6z44lRdpk8Wj6a75a4kUPr5wWmGxHWZm0OIgmB1u0f4/IDxr7V/ieI77cbmNtfXfmTMYkxTxFnSgk8jdr5L0/Qn4fEIKAkUHmGT0+fhJIH098keCnDq7TyZ8Sy4XGxx1oZb6zMF/4FiEPbZr4iOxfw3qXaVYjzKdgXvSsJwknReeyb8QnydnHVovkCwOjxLeGUeoVYhzvuDZpyZRqgymlNJVI52St3aV29mqMw3pBj1qZhAQXToYgEP/xD9RsFDX6PWl3yR0d1xnb45XdQPUoBrYejxTT0fIpPHLtBz1uQ/N3tH2o/LDo16OG5cxcqOz0wZL5nTjMoP3NByXJHAplWSUccsQ3kOrTxAFwyDmD1Txae2Cz3xn74Tiyn2p8ocRkE8gxj+a3uNEmTw/stjWERLbjYDXAzuRhtodpdOjaMcNnAAAZMUlEQVRY19JtcinxjWLJx6djGjgOaciTOF1AkLuj08WaMliCekv8gdMpKQ3JGSIl2SG2RNifzFwTbZlkI2zT0x92EcOeJiifJM7biIyW0oPA+ManxLeKd8XUwWyMKMR4Zf7n6l2Mp3v8k5Ji/r+IuJx1+4ZGF8kPvR0w/ZyZwLH217b+548fjtzYNYiJjA/8k7Q/rGfyce3yAS2bXiEH96j9PXNpTVpYP/LakbzhWNOGWh7YPlRhIv9LjWvdxjZN36uxTU1t7D6XrzPblQK+XIa34XVKIetvlgIvfBu70zkJaa3EFwlM/L2s8bUaXPLkwsTW8Azn5ow5CbtwteNhTSGMlwjiLXTbsPP86ettSK3EV7w6zZkq/IQhZfNbF0/Am9h4SdPLPz6U8fzT/Yo3Go6J6IzEnRG/ET6fO7bxNYuP28B8hBx3XanEd+3U2Cbf8MYG5W+bdq4tZbx/a2u2+dDBkwlacYMHNsJoI0X9l4fQHDlmW0U+vPLfraic2U+5I3DG1RjZ6l7O09k5oLcmCvzoxB6S+f+3009HVALRjdwhioakLhUt/vUIIwif1n6uTQfrPzjx9QSwYFKCTBHOp7pGm8JG+z0pUwcKYGReblf8uaemPsvxEAGmfFOkLH67KpxJh/GIxNfpp+nPSYQbNF9TOYLysVbwXiRfSnztITr2rS27kqantcY8gptPRhtPwUmMLfCNFHJxgK0jQfJ04lua2LwBpCGF042OTUxa3xCm+dlPYGnyHlld3yJIfCVBsbo5uIbxt+d895kTmbMD80LtHtmZSZAE0PB1Osfg8gRI33oXnpY+fHKa8YUZ6RT3RXe8/WPtQwEyUPvMHKiEVEWtCw78864F7+6qnU0STJBQeW1Mw+dcTvGaGF1P338HDwzns/l37ad1fiJcPFmKfAhDFxaLps0oAAX4jkIaI3derf0sYYpCvlM4h9qPNKVIzejsnrT0ahCVh/ADAopMOUbxQfMDfgcaQzKFIM3v72/rCcIrepwXJbJRlRxDEje6LSV/wT3zBbb3wxKUNP4cme/Pd3r8xh5gLDgyKJK/eZK22Sc6mPNBp5XZ9QF/GOKbI54lUhw5bM/gYk8tDHK8cMjFxbxCTE436UC+OvENfvWs72Afq9u5iZEaJns6D6YVcpGQ2qra9RjSUPSJp6Ye33iU+I5sbKPEt1R3TtMi0zK5Jcf+vAmYcMDOdo7z//EaNG4sK9L8Sc7VnCxFJBu4duQNDM1KWebo+kk2uLU5gMofnT+IGCIszqmj2yRDiHoXfwjysdTYRmMKbJRh+8BZZRQ/VD/83kB8Wd6ND2AKhyyCRZmHnC7Agtzr2M4d9Q99h+1/8wQlvmRsfu/36S/CUxWNi9G4+TlxnmYRchqtVVtCeSjiyx2TAFBIYrPYN/Q6Pd3bTcKG68uZMdj0dVMFtLA2NOupSayTeWdHbATuPJH21y4CVvNL/2ZBNRPda4TpSikgn9usUw2TEt9th3t84VXi+1Tim70+Dn4vLy5ikjmp+00+jBnZ5DLZZd+6QTt8L3olYLlJiVurxpcx48iQJTnkG7fSd9L81H6uIkBCy8wZnw95glmqG/DWhgc89fnXqpEu3jp8OPGVphTG64DzOUtX7cYHrSO+6d5FrtLmczABKo3/1vLWIuOvlKZFUUh8w9r/WhtgDlhCf9duqAj7vQJgPJ34okGWB1KiYKkgpl4XqDwaDHqxTD9884cWGNSOV/1Oj17MbanfgK1NDuNEzwPMIuAeyNFGZ0/MdsG+eRuu2FNEieD2bqyviuuj2j2+8CrxRWNVw3hU4yttfOna28xD+fgnMoK0tres2aV2X527MXlwJxdcRGht22zveuWkdf5K7FrqWKzPyPRCvv5DAyW+tx6wW9pcq3b48R4yRWAbbdeI3vUTeaVAkLZotEcxRG2ofkePoxy+hiK5YE6krLGmfffp69seMtkEgogWEWTe75C7z6f2fQi452c2PMzQ3JMNRjLT3/QwcTZE2GuAWfYTl6yGvwFTobW9PCzxRQubN2U4Wz9zNIFZM8KkzvydebwS3P6QcjP1qrAWymPm44ltzRzkMcKFejW2vkGrSzzX+gu2v2MbYYKRXZaE69aLJ8gSc1nPq2vMnz2q4wuvEt/WMcxhjYgvkm9a9G25lgKHOuy4XO50oLRz8HyxNp30ktrbdgpmEvsBt3PZPC7JuJLi39EDt9JP2t9c/3H/lqX3yGytfS2kGz2+GlV4wL4gYguEj6gBOnhVixisv4X4cv0Qi9aJ1pOulfgan8yxO1Bq7/d0MZrf76+bJVqOIPOjUmSj/ZQ+9+Bz8LRn9jZD3iHEA3wOTf1ffn9ZDxCR56qwpn0c8Q3jSf4p7f9SYisjEMkFOn6VnN/4fYQjvmoUAoQW+4PLWtK8uilHSBxrguXvrcsSe4JmIkxqY/tiPn4c8F7YPX+kxxdeJb49o5gjg8Vr5srDtzxZCGsZH0gpPHA4SFrTLENoXdAJcyNDa58nAPGbBdrUI20w6GyrRtErHkR5WVkUxHqVrGbsimUXJPZ5Yl43Ul3VJtkAQLzQejdcv2tLsZwHEl9qylb9aZ6TAH9+HBkOqOl+dHHa32kie3n7AC7/0DTXpof3txmYYySUioHsXHCP4C1/u/jbZlKskW7t62Z5hfdG5eyAJdfbo6dP1/iWtIMMIrlj4VNpCoZN41yfFF4X8ynDAC/S5AapdVPYYyD2KtNcNDhteFxHTIikLa9Z4FgT7CK3yNMa4UQ3lMZWx2ks6Hd+swTRnPbq6zuWO77wKvHtkYutiS8HiCBbNdLokk1r0OrSJBNOCt36JNvAxNeQYa8ACD3ygZMKBDWn0RuRqTSv1NiuKRcRR8Kv/gNi4nYeBNLkfBApFcMmYaXvqH/Izynap7yf20ID0Jj0aHyPSXzjjjNevB+ZABlkyudcbtG+xQSYNMBLP/pxeQi/nrXlE9Km8hrMT9yBPTqn3qf58tMHJqFDPJlBmLEz12MtL7vWoXoo4mtPBSHqB/2b3I3Jn+XVlf2eCijb+JK7k+gnOUGycTXnfzvyew7xzc3pLCH/rEkirOUmykT4PP028HH8bibAfFX0dbdBNPgPYw0X/HXy+nG5xhdeJb69QiMxlxqNtJzaN07782pNqYig0At+Nr2i/xPpuNPjW2eva/PEflEl8eUybXo7rvcND5k5WZNeB7Ia10GvADOyRUAazcRGdjHWQKOMZAPNP0SMYf4KfpQ33Z8W7UXu3kD/e4nvw8kv0PjeLyFks1SQMU4Xsi3liGInG3aX9jYTcMGE3a1LABo/JD/v/p2Jba6flsBaUx4zNvQ2waxvIbrAjUzBDOez6ySNx28KT23sgG+0cO4C4SrimxOG9PWdT8MNzyxw9KuLc7CdmjGYLcCF29yl51roRgi4g4eL8GIXlZvVCBMhFo/qDLlODilXd5XLgQZso0KADru7y9UpODc3i/BOE2MjcHYvBi/MzyW+owDg/sU7V0ifOtaPn5lxu1if6G+YTHGhzDkiVkZ6vYcZIj32bZZd0FONrlnDALNA/Stl53y1jaeEvawzPaAu21NnBlInk+0L0tog4jsoQAjfweKLXoF8uchGdUUDauOXFgf7/+QAHiu6H2cZxPe/kOmD8TpA9Pg0mUiIRJCdModNkqS5JTfAayaHO/G5Bcj1S2rrGf8/f9HhxJqmmJWXFlm34tLfl0wAHanELHmNgMQXThwxZpKociesQbmnM5btCy3F9Rw/rjKbhfi+87r4uRK3Wc8D8TWUwbzcZLOHs4ngYn/Pr2t5I2VymxIze8LjMq7Jq/BYHu5KfKFG65OI7zKKVKy9dYcmcfiaL3YhtQTTyqbU5M43EcDCBxMINyfXq3XQzhpc6z7RmjBYjW59oqH1tYX4cpt7prQkzjLfCPHNtkOJb8+wNKctjV9aAJIvaWqTq1xGdmtu3CMTDhLfb/f41Lja+v52+5XbmygIhg8Fbjtl1gbx5ihW2Dyy4+9RV+ngznyBbuyNecr3tzGDoOHm4FuWb67b31YT39JVtp+QXlFgiS794cdonDe12c1OPHAV8R7D/8q9IPJpqIPohH0razS8wmewN4ngqyehzLWyEDxssGaYSy1ppj7dpAJubAcPeYwkH/cPlbCgApaoul+Tn3D+4d9ZWXQkmG7b3P/pbzqIyUASofTwcE2+FH8U8V1LfrfU+CrxzcjiIDGrSbc8oJXSwfkDNL7IFAKW3zs9e9MP4stvWYyrLfL+8H134Xbd/Dc2+S4IBit05nAjOepOrre775a+dmNlvhkOYW+PrR/gEIGWgpVwIBLGhW+AWS5LXiEg8cVA521s+UEVaXTNRuPJb3iQZhZKcVWdm0R7OTDG/dIULQiEkKPOPZp/6c6UNT6RkRDTOHMQDfYTXDJ1MGElM3aMbGOM/DC29OGV0+CNZ92J+CiYoP6dFqYItuU+3yICQWzyYGUrrGHpDdMff1qNrlnDzCPRgmmF0/AG3NzGifzYrrTBbNfY9o3kqMZ3QX5V49s3ABunRvMHaXzfnfhS/9kHsJVda6r3Re7PyGTPKWP8HjSfo1ucVCO88fC9fXHSvEF2lvkiPx6l/9PhxHIHq503YZEn94bCcQTikyzztKqzKWUK5DDxlX4UrVY3fpzG2g82ak4bEMyc82OsxPfYsi+Jb7rIWrdy1t2S1OgabxBuwyc/i/Rv1gzTKc7b6JBJjzF+ZyIT/P1ZqnI2bp8++QdubC+OD+qfJL65h0bkvMiQ1sUD2NgbDGkO6JDOGgR/GyXc8VjyS4R2KXP5m4cZPj5D/Ws1deA5gMpDc2UL4ivbwj46S/VSaIE9f0bxwG0D7R/USOL66ylg/wc1vqh9sH5UAPo+iC+ZjEq/9aeLJU4cAe6XU9RYAsa+7y3ZonSfvv+g4UHf4U2uW3+lgpQJMOFPNsBmvEwgLvfQUWjpp2T95vZA4ps6CE8batyFJN4Y+CWwVGPL8MDxZAhX5J9+bY2E5IjfWVPrzVcSl0ykkbXG6fwTO6uWBx+266VTNxNhXmAM+XWhvqVZxafLDN5Y9iUWe8sk6t/ZnPjt4mcXIhmoJdwW8AHaE1q34f9wfnT9gihsxkyZibsxaabFslnD4JGmDpJw+v64aFat47Ql8bXsoG7krMS3PjK1q+CWMUXzZ1Tji9oA60cFoO+DxJds88mnbOkG5Ws+G/dnpGE0Shlh1ke3jkp80QBh+ZYppLyYtXq2a/vSnNLmovHhx4lsA2yXHWeiUrABbia+6YLPZPdHEvnL7T2+L0Fb5/elSGOC/OiNwaq590ZAEt/U0JwoLtnoGMF1xMT7C3ZX0OlrWd4nbfqzfW1rTnT2GorjfLNcfbr84I3l3Ykvx99mGZP9vU8/BbE1N1LORpfmhblNyJgaGLnlRy2XYMIT3I6F381CJcvRDuWce4RXh9wcTzdyLCe2lHcjvmj9a8WlXM6+Gt/SVTDqF3+H/ftwja/xc5+Y0kXWTGcKfzzZa3VysXV3t5Mf7k2oVf5QOok9lFUZ3Y3XbRO50tpnczhkQ4TdgaikGIPEV17rhStre3VNP+QnLx8gwS2kRkCCRkZqBunfww7AEbL6fVcEpG2u91HqHjJSxVLbyyRVKoFIfnjD5S2E0vkFX5g52AhyNnAGn76tO6nP/cGLxWsDBPt3n42rR0tq47/pdxejCI7NGjwpmG7GuT3/2H8lNumRvy7S8MQ/OXSlfFsHfuUf1L9eUwdZE5Xdu7Eo8e1dSx5DfHmN7G0dkq9P1/jGihaLruQoTIzpd6RR5Mdv5kZSyW+vOC7Sl2400nWrpJHnNY5c0Fm+QdHgnA1w5Tbg9Dd/96/Okc9yApNG5KdYeWVjPv2KeXjEtYBNEPh2V9smBKJ78Wk1zLZ4NrIIZCQ2rclp6WTDEHHIafTgZtPRc+TOD74dEgW0tKtkc9Xa5DT/990efEvrRUok+fDkFzrhU9d7U3BrEpX5h+AIpLWJcToQAAFihgIsrGuVzwXrz5Qv86DHSah5uP52P7+5unD5qIVj3/euH87fxF3WWG/aczf3+8l+flE7EQ9B+RFi6a0Qrbd8tU7mD7/u1yhk+OKmxdk6mXae7Dpo07AycJ8ADahfn/L9T3/+ZcJl0CM4cl1HP/Tg7fTXf/fPfuWyD9OClsBqTPKbFhK4TwFW+/lcBG5u3TCLCYWmNKQ3qOnIPssQYPq9O9uZfwtNcnqgQ2RX9hgtrM+eJ6h9ePSQxni5cEfEy3s1CLc+UZtIY8tXjW7tkQ9ar9fgOog3D2oz5znfv3AXainekPiyvNPfSnzr4jE+P+rlK/EdnJ7A6wlaX0fH1z7QtmZUhrS6rYV/9+ubFS70jDY87OdeR4oVd4iw5NfuS7Eb0DGsNPcSAeOmzkSDu0+/TWCt+/SDzN3+5j/+40wDYUiu8FfpBaqgLkYCp4OgCDwCAQpIaWUx9iPMCx7TNl6oiBT7f9PpPYlZuVwo8ydyny5xl9WiMe0h1qMY5uZp32ZQJ772cVn4ScueJxsbLW5HOExfXSQeqRExoX0dGY7d2UmNia0TmRJA/N6U+DL5HSW+CD8OnVxKB+J3ZG2sUZ1bfu+bC/01vzvxRfK1N75oREbrl8TX8tSY3NK1OofXpWBNHFyB36R4fLKa8+ApAvVDv69DgPYReoTI5JdsgenB/el//vt/MhpfJr9LX5X1jV8J8LoB0VzbIMDu0kJpwY+fWafI+F2c0m0657ImIWyBHNsTPv35dgEMOCnLO/+NYr0/e37ghR9pdJfjFBF3F5lPriGS6F7d9Z79ndWa8B9LzvjgEuqRZHZhirK1acEbE1+D+eCrdzxLpReNjKyAArB84haMpNi7fiW+z41ANTy+ySOp1LSMxte8Obk729Ibhdi1b1vorUrqZ364PSPC/ol577fpdHFhqM043af5dp9O/8t//hcjmdLPrhyc0qt5TvPsjf0Tx1L7LEhS5L6Kfx8Oa6mfaUN6C2qo3KI0n36YQkMEuuBz2KR3DxwWmk4YSrhxFBcBGJJ8gNig+VlaiDmfdDeVmoRQS6729VhEZiWxJeIV8i1JNkU+YnIg20KaRKMtcSGFLUkWUdbYYfkozm9OfPfXyIUxyckS0viiWfBsojBa/6cT32eP7+j4sYmDP8y79dbzHzfByKMvXatTcIUbRX+7kzciDo4Tu/AcbRPCVL8LfkDu0JxrM95DzJgq8VUxeWUEsputI0XmmuNur9rlT8knYB6H5Y2HJIDk6oZ/uC2yTdJrSZZYA+IGH68NKlTYBDdHas2B2Lj/CvRlQaTnvyxgi9Kbx21LjPg1+YlMJTJaXNZUSj+4frOR5hWjGuAXJ76EdW0jfSTxTQ8nhiwMLi7PJgmj9SvxrQvAKL5IvLYs3xAmdhfOB2/yDGMeUdt1krwLWO2vjSxG5g88L9gkzysVRg/tqPP6XTwmtIoTf+P4v/4/1quDH5xFWE41dVD5OS4CN/diLafZNEKeOLBOo8BdQMjsGrE2qCQa2d6FFrlji4N/LMeB7PJrPyku6f/TADVclrSxleWn+dNY6Kj/Jr8gq2wpEREE8Z0jKfk2pER19FU8IL5I8kljfYSfEu5KfMdGB8kzKv3oxBfeCAH5RvKF8EHfR/EfzS+5kVnuxVHOKFZEFFJ500Xr+vf9Pn0Zv7/hlpDK8G49lfii4d/8O8v76d//v//fzJufFBIUKthrX8DGu3nLtUBFQCCw9KUYTth2oQoq0eBzWLg0AxpTdDqP7F0zC1nk0zUzV6QHitzAwo0JLp6xecGyvLqNb2njDvM/hO/MtT+EtE6+Mrmdr/5DLqz5/SSIpSCpjNvJPZ5bPSnehPhS/3ObPCIm48RgOYFkmarxrUtm6eC5Wp4bM7bu3+hgh+SrsTnFZKPyOZo/PfRLsyyjQRQBbuQc5EA5v+4Xq/n9th4F7A97H1oGzxjFS/PHCHB0vfRm7PTv/3PQ+CpoioAioAj0IPCsjbu1jXDjGzSVQH6gUYCA1n6U0sH+gQpCNLrRlhRbaD6U2omIMeofOphu3SvUntb6uBysYNr3RgH1B+J78MhvqH9ovJDGHuW/z9/WVOx0sS61vq35A2l9KaqpeyLhruEvQk3j5szg+oTa96nflfh+6shrvxWBDRBQ4guo284b1+jGLjV2o2XlxclqhJX4xugchfi2LgFF2VDiW4WQvDXenW95eg9CN1X08O3762b+Ps3WNth4HxL+5entg9FSHsSUqlVOXiWdEt9XGSltpyJwQASU+L4P8WXx2pYAjxHfVpHfts3lWreqR4lv28huhffaG5NRjS+ZerHveGv+cDGuzijqG/25yde7Np6bSc/2wnv3v20U3i+VEt/3G1PtkSLwMASU+L4f8d2WACvxzU1GJb5tS9TexA+VP058l/00ml335y/f9uGbsf+lByEuQEa4JdGQxm2S0pdKiW8fXppaEVAEBAJKfJX41ieEEl8lvuuXTERM15dsc6LyR4kvaXCltwcmvPy774kfv31bAuzeioZ0cWTM0f5qfouAEl+VBEVAEViNgBLf9yO+iAz0CYsSXyW+fRIjU28ri3nta611o8T3Zh63WXtd+0OBLoQnlPPFkG8ivWz3y322ngjQ88/12H5yzv8fpQQVC3ujDvkAAAAASUVORK5CYII=") no-repeat;
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
			    color:rgba(62,119,240,1);
			    text-align: center;
			    line-height: 144rpx;
			    padding-top: 11rpx;
			    box-sizing: border-box;
				.check-in-btn-inner{
				    width:144rpx;
				    height:144rpx;
				    background:rgba(255,255,255,1);
				    box-shadow:4rpx 9rpx 23rpx 2rpx rgba(50,78,218,0.61);
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
