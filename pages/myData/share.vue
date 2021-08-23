<template>
	<view>
		<view>
			<canvas canvas-id="mini_poster" :style="{ width: canvasW + 'px', height: bgH + 'px' }"></canvas>
		</view>
		<view class="footer">
			<view style="height: 106rpx; align-items: center;">
				<button style="background: transparent; height: 106rpx; line-height: 106rpx;color: #FFFFFF;" @click="toSaveImage">保存海报并分享</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				mpWxQr: "https://img1.baidu.com/it/u=1078861629,3747050294&fm=26&fmt=auto&gp=0.jpg",
				canvasW: 0,
				canvasH: 0,
				bgH:0,
				invest_areas: [{id: 1, name: "儿童教育"}, {id: 1, name: "少儿编程"}, {id: 1, name: "生物智能"}, {id: 1, name: "万物相连"}, {id: 1, name: "大数据"}],
				nickname: "热豆Wakary",
				avatar: "https://img0.baidu.com/it/u=2980445260,41238050&fm=26&fmt=auto&gp=0.jpg",
				company: "热豆科技",
				phone: "17610998099",
				email: "redoume@163.com",
				location: "北京",
				finished: false
			}
		},
		computed: {
			showInvestAreas() {
				if (this.invest_areas) {
					const names = []
					this.invest_areas.forEach(item => {
						names.push(item.name)
					})
					return names.join(" ")
				}
				return '未设置'
			}
		},
		onLoad() {
			this.canvasW = uni.getSystemInfoSync().windowWidth
			this.canvasH = this.calculateCanvasHeight()
			this.bgH = uni.getSystemInfoSync().windowHeight
			console.log(this.bgH)
			this.toDrawCanvas()
		},
		methods: {
			toSaveImage() {
				if (!this.finished) {
					uni.showToast({
						title: '正在生成图片，稍后再试',
						icon: 'none'
					})
					return
				}
				const that = this
				uni.canvasToTempFilePath({
					canvasId: 'mini_poster',
					success: (res) => {
						console.log(res.tempFilePath)
						uni.saveImageToPhotosAlbum({
							filePath: res.tempFilePath,
							success: (res) => {
								uni.showToast({
									title: '保存成功'
								})
							},
							fail(err) {
								if (err.errMsg === "saveImageToPhotosAlbum:fail:auth denied" || err.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
									uni.showModal({
									    title: '提示',
									    content: '需要您授权才能保存到相册',
										showCancel: false,
									    success: function (res) {
									        if (res.confirm) {
									            uni.openSetting({
													success(settingdata) {
														if (settingdata.authSetting['scope.writePhotosAlbum']) {
														  uni.showModal({
															title: '提示',
															content: '获取权限成功,再次点击按钮即可保存',
															showCancel: false,
														  })
														} else {
														  uni.showModal({
															title: '提示',
															content: '获取权限失败，将无法保存到相册哦~',
															showCancel: false,
														  })
														}	
													}
												})
									        } 
									    }
									});
								}
							}
						})
					},
					fail() {
						uni.showToast({
							icon: 'none',
							title: '保存海报失败'
						})
					},
				})
			},
			async toDrawCanvas() {
				const padding = uni.upx2px(50)
				const cardHeight = uni.upx2px(380)
				const cw = this.canvasW - 2 * padding

				let ctx = uni.createCanvasContext('mini_poster', this)

				// 透明背景
				ctx.setFillStyle('#ffffff')
				ctx.fillRect(0, 0, this.canvasW, this.bgH) //绘制海报可视范围
				ctx.drawImage('../../static/img/icons/bg.jpg', 0, 0, this.canvasW, this.bgH)
				// draw card round rect
				const r = uni.upx2px(12)
				// this.drawRoundRect(ctx, padding, padding, cw, cardHeight, r, 2)
				// draw card content
				// this.drawCard(ctx, padding, padding, cw, cardHeight)
				// draw avatar
				const av = uni.upx2px(128)
				const hi = await this.downloadImage(this.avatar)
				if (hi.tempFilePath) {
					const x = this.canvasW - padding - uni.upx2px(40) - av
					const y = padding + uni.upx2px(40)
					// this.drawRoundRectAvatar(ctx, x, y, av, av, r, hi.tempFilePath)
				}
				// draw hello info
				this.drawHelloInfo(ctx, padding, padding + cardHeight + padding, cw)
				// draw qr code
				if (this.mpWxQr) {
					const hello = await this.downloadImage(this.mpWxQr)
					const padding = uni.upx2px(34)
					const av = uni.upx2px(200)
					const totalH = this.calculateCanvasHeight()
					if (hello.tempFilePath) {
						ctx.drawImage(hello.tempFilePath, this.canvasW - padding - av, totalH - padding - av, av, av)
					}
				}
				ctx.draw(false, (() => {}))
				this.finished = true
			},
			async drawCard(ctx, x, y, w, h) {
				// draw company
				let vp = y + uni.upx2px(45)
				const hp = x + uni.upx2px(52)
				ctx.setTextBaseline('top')
				const fz30 = uni.upx2px(30)
				ctx.fillStyle = '#2E3B67'
				ctx.setFontSize(fz30)
				ctx.fillText(this.company, hp, vp)

				// draw nickname
				vp = vp + 30
				const fz50 = uni.upx2px(50)
				ctx.setFillStyle('#333333')
				ctx.setFontSize(fz50)
				ctx.fillText(this.nickname, hp, vp)

				vp = vp + 42
				const iconW = uni.upx2px(30)
				const textH = hp + iconW + 6
				// #ifdef APP-PLUS
				ctx.drawImage('../../static/img/icons/edit.png', hp, vp + 3, iconW, iconW)
				// #endif
				// #ifndef APP-PLUS
				ctx.drawImage('../../static/img/icons/edit.png', hp, vp, iconW, iconW)
				// #endif
				ctx.setFillStyle('#333333')
				ctx.setFontSize(fz30)
				ctx.fillText(this.location, textH, vp)

				vp = vp + 28
				// #ifdef APP-PLUS
				ctx.drawImage('../../static/img/icons/edit.png', hp, vp + 3, iconW, iconW)
				// #endif
				// #ifndef APP-PLUS
				ctx.drawImage('../../static/img/icons/edit.png', hp, vp, iconW, iconW)
				// #endif
				ctx.setFillStyle('#333333')
				ctx.setFontSize(fz30)
				// ctx.fillText(this.showInvestAreas, textH, vp)
				const oPadding = uni.upx2px(34)
				const iPadding = uni.upx2px(40)
				const textW = w - textH + oPadding - iPadding
				this.drawTextInOneLine(ctx, this.showInvestAreas, textH, vp, textW)

				vp = vp + 28
				// #ifdef APP-PLUS
				ctx.drawImage('../../static/img/icons/edit.png', hp, vp + 3, iconW, iconW)
				// #endif
				// #ifndef APP-PLUS
				ctx.drawImage('../../static/img/icons/edit.png', hp, vp, iconW, iconW)
				// #endif
				ctx.setFillStyle('#333333')
				ctx.setFontSize(fz30)
				ctx.fillText(this.phone ? this.phone : '', textH, vp)
			},
			async drawHelloInfo(ctx, x, y, w) {
				let vp = y + 12
				const hp = x
				ctx.setTextBaseline('top')
				const fz30 = uni.upx2px(35)
				ctx.setFillStyle('#f0ad4e')
				ctx.setFontSize(fz30)
				// ctx.fillText('您好，', hp, vp)
				// const text = "我是来自 " + this.company + ' 的投资人' + this.nickname
				const text = "邀请与被邀请双方"
				const lines = this.drawTextInLines(ctx, text, hp, vp, w, 26)
				vp += 26 * lines + 30
				ctx.fillText('各获得一张3点能量券', hp, vp)
				// vp += 26
				// ctx.fillText('谢谢', hp, vp)

				vp += 26
				vp += 40
				ctx.setFillStyle('#fff')
				ctx.fillRect(hp, vp, 30, 3)
				vp += 10
				ctx.setFillStyle('#fff')
				const fz28 = uni.upx2px(28)
				ctx.setFontSize(fz28)
				ctx.fillText('长按识别二维码', hp, vp)
				vp += 20
				const ttt = '邀请兑奖码：JIODSJFISF'
				ctx.fillText(ttt, hp, vp)
			},
			calculateCanvasHeight() {
				// 400 is card height
				const ctx = uni.createCanvasContext('test_poster')
				const padding = uni.upx2px(34)
				const text = "我是来自 " + this.company + ' 的投资人' + this.nickname
				const rows = this.drawTextInLines(ctx, text, padding, 0, this.canvasW - 2 * padding, 26)
				const cardH = uni.upx2px(380)
				const h = padding * 2 + cardH + padding + 12 + 26 * 3 + rows * 26
				return h + 90
			},
			_drawRoundRect(ctx, x, y, w, h, r) {
				ctx.beginPath()
				// 左上角
				ctx.arc(x + r, y + r, r, Math.PI, Math.PI * 1.5)
				// 右上角
				ctx.arc(x + w - r, y + r, r, Math.PI * 1.5, Math.PI * 2)
				// 右下角
				ctx.arc(x + w - r, y + h - r, r, 0, Math.PI * 0.5)
				// 左下角
				ctx.arc(x + r, y + h - r, r, Math.PI * 0.5, Math.PI)
				ctx.closePath()
				// ctx.strokeStyle = '#D8D8D8';
				ctx.fillStyle = '#FFFFFF';
				// ctx.stroke()
				ctx.fill()
			},
			drawRoundRect(ctx, x, y, w, h, r, lineWidth) {
				ctx.save()
				this._drawRoundRect(ctx, x, y, w, h, r)
				ctx.clip()
				// draw left border
				ctx.fillStyle = this.company ? '#2E3B67' : '#333333'
				const bWidth = uni.upx2px(12)
				ctx.fillRect(x, y, bWidth, h)
				ctx.restore()
			},
			drawRoundRectAvatar(ctx, x, y, w, h, r, imgPath) {
				ctx.save()
				this._drawRoundRect(ctx, x, y, w, h, r)
				ctx.clip()
				ctx.drawImage(imgPath, x, y, w, h)
				ctx.restore()
			},
			// TODO: measureText not works in App
			drawTextInLines(ctx, t, x, y, w, lineHeight) {
				const chr = t.split("")
				let temp = ''
				let row = []
				for (let i = 0; i < chr.length; i++) {
					if (ctx.measureText(temp).width < w) {
						//
					} else {
						row.push(temp)
						temp = ''
					}
					temp += chr[i]
				}
				row.push(temp)
				for (const i in row) {
					// i + 1 will be 11, 21,...
					ctx.fillText(row[i], x, (y + (i * 1 + 1) * lineHeight))
				}
				return row.length
			},
			// TODO: measureText not works in app
			drawTextInOneLine(ctx, t, x, y, w) {
				const chr = t.split('')
				let temp = ''
				for (let i = 0; i < chr.length; i++) {
					if (ctx.measureText(temp + '...').width <= w) {
						temp += chr[i]
					} else {
						temp = temp.substring(0, temp.length - 1)
						temp += '...'
						break
					}
				}
				ctx.fillText(temp, x, y)
			},
			downloadImage(url) {
				return new Promise((resolve, reject) => {
					uni.downloadFile({
						url: url,
						success: (res) => {
							return resolve(res)
						},
						fail: (err) => {
							return reject(err)
						}
					})
				})
			}
		}
	}
</script>

<style lang="scss">
	.footer {
		position: fixed;
		width: 100%;
		left: 0;
		bottom: 0;
		box-shadow: none;
		background-color: $uni-color-warning;
		opacity: 0.9;
		font-weight: bold;
	}
</style>
