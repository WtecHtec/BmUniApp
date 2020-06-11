<template>
	<view class="page-warp">
		<uni-nav-bar right-icon="plus"  title="总览"></uni-nav-bar>
		<mescroll-body  class="mescroll-flex"
		 ref="mescrollRef"  bottom="50"
		 @init="mescrollInit" @down="downCallback" 
		 @up="upCallback" :down="downOption" :up="upOption">
				<view v-for="data in dataList"> 
				  <hm-sms-list-card :options="data"></hm-sms-list-card>
				</view>
		</mescroll-body>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import HmSmsListCard from '@/components/hm-sms-list-card/index.vue'
	export default {
		 components: {uniNavBar, HmSmsListCard },
		data() {
			return {
				mescroll:null,
				// 列表数据
				dataList: [],
				downOption:{
					auto:false
				},
				upOption:{
					
					textNoMore: '你以为你是土豪么？这么多钱借！'
				},
				searchData: {
					pageNum: 1,
					pageSize: 10,
					userId: this.strogeUtil.getStorage('userId')
				},
				options: {
				    paybak: 'IM PAYBAK',
				    company: '公司',
				    txt: '3:46 PM',
				    desc: '糟糕的星期三！通常用于演示',
					side: '../../static/img_right.png',
					primary:'../../static/money.png',
				}
				
			}
		},
		onLoad(){
			
		},
		mounted(){
			
		},
		methods:{
			getRecordData(){
				this.http({api:'/getRecordRecord', params: this.searchData, method:'get'})
				.then((res)=>{
					console.log('handleLogin：',res)
					let data = res.data
					
					if(data.statusCode === 200) {
						let  records = data.responseData.list
						let datas = []
						records.forEach((item)=>{
							let options = {
							    paybak: '',
							    company: item.payeename,
							    txt: item.money,
							    desc: item.repaytime,
								side: '../../static/img_right.png',
								primary:'../../static/money.png',
							}
							datas.push(options)
						})
						if (this.searchData.pageNum === 1) this.dataList = []
						this.dataList = this.dataList.concat(datas) 
					    if(this.dataList.length ===  data.responseData.total) {
							this.mescroll.endUpScroll(true)
						} else {
							this.searchData.pageNum += 1
						}
						this.mescroll.endDownScroll()
						// this.mescroll.showDownScroll()
					}
				})
			},
			/*mescroll组件初始化的回调,可获取到mescroll对象 (此处可删,mixins已默认)*/
			mescrollInit(mescroll) {
				this.mescroll = mescroll;
			},
			downCallback(){
				// this.mescroll.endDownScroll()
				console.log(' downCallback ')
				this.searchData.pageNum = 1
				this.getRecordData()
			},
			upCallback(){
				console.log(' upCallback ')
				
				this.getRecordData()
				
				
			}
		}
	}
</script>

<style scoped>
	
	.page-warp{
		height: 100%;
		display: flex;
		flex-direction: column;
		background: #F2F6FC;
	
	}
	

		.mescroll{
			position: fixed;
			top: 44px;
			bottom: 50px;
			height: 100px;/*如设置bottom:50px,则需height:auto才能生效*/
			overflow-y: auto;
		}
		
	
	.mescroll-flex{
		flex: 1;
		overflow: auto;
	}
	.bottom-warp {
		height: 50px;
		content: '';
		background: #fff;
	}
</style>
