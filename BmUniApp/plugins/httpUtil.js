import  config   from './config.js'
import strogeUtil  from './stroageUtil.js'
const requestUtil = ({
	api,
	params,
	method = "post"
})=>{
	uni.showLoading({title:''})
	let url = config.apiUrl +  api
	let header = {
	      'Authorization': 'Bearer ' + strogeUtil.getStorage('token')
	    }
	return new Promise(function(resolve, reject){
		uni.request({
		    url: url, 
		    data: params,
		    header: header,
			method:method,
		    success: (res) => {
				uni.hideLoading()
				let data = res.data
				if(api!== '/login' && (data['code'] === 401|| data['code'] === 401 ) ) {
					
					uni.showModal({
					    title: '提示',
					    content: '登陆失效,请重新登陆!',
					    success: function (res) {
					        if (res.confirm) {
					            console.log('用户点击确定');
								// uni.redirectTo({
								//     url: ''
								// });
								strogeUtil.setStorage('userId', '')
								strogeUtil.setStorage('token', '')
								uni.reLaunch({
								    url: '../index/index',
									complete:function(res){
										console.log('reLaunch:', res)
									}
								});
					        } else if (res.cancel) {
					            console.log('用户点击取消');
					        }
					    }
					});
				}
		        resolve(res)
		    },
			fail:(err)=>{
				uni.hideLoading()
				reject(err)
				
			}
		});
	})
	.catch((res)=>{ uni.hideLoading() })
}

 export default  requestUtil
