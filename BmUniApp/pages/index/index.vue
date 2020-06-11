<template>
	<view class="content">
		<view class="main">
			<view class="swicth-view">
				<view :class="btnActive==='login'?'swicth-btn-active':''"  class="swicth-btn"
				@click="btnActive = 'login'"
				> 登陆 </view>
				<view :class="btnActive==='reg'?'swicth-btn-active':''"  class="swicth-btn"
				@click="btnActive = 'reg'"
				> 注册 </view>
			</view>
			
			<view class="form-login" v-show="btnActive ==='login' ">
				<view>
					<input v-model="loginInfo.useremail" class="uni-input" focus placeholder="输入邮箱" />
				</view>
				<view>
					<input  v-model="loginInfo.pwdVal" class="uni-input" password placeholder="输入密码" />
				</view>
				<view>
					<button  type="primary" plain="true" @click="handleLogin">登陆</button>
				</view>
			</view>
			
			<view class="form-login" v-show="btnActive ==='reg' ">
				<view>
					<input v-model="regInfo.username" class="uni-input" focus placeholder="输入真实姓名" />
				</view>
				<view>
					<input v-model="regInfo.useremail" class="uni-input" focus placeholder="输入邮箱" />
				</view>
				<view>
					<input v-model="regInfo.pwd" class="uni-input" password placeholder="输入密码" />
				</view>
				<view>
					<button  type="warn" plain="true" @click="handleReg">注册</button>
				</view>
			</view>
			
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				btnActive: 'login',
				loginInfo: {
					useremail: '',
					pwdVal:'',
					pwd:''
				},
				regInfo: {
					useremail: '',
					username:'',
					pwd:''
				}
			}
		},
		onLoad() {

		},
		methods: {
			checkLoginInfo(){
				if (!this.loginInfo.useremail) {
					this.config.showToast('邮箱不能为空！')
					return false
				} 
				if (!this.loginInfo.pwdVal) {
					this.config.showToast('邮箱不能为空！')
					return false
				} 
				return true
				
			},
			handleLogin(){
			    if(!this.checkLoginInfo()) return
				this.loginInfo.pwd = this.md5(this.loginInfo.pwdVal)
				this.http({api:'/login', params: this.loginInfo, method:'post'})
				.then((res)=>{
					console.log('handleLogin：',res)
					let data = res.data
					if(data.statusCode === 200) {
						this.strogeUtil.setStorage('userId', data.responseData.userid)
						this.strogeUtil.setStorage('token', data.responseData.token)
						uni.switchTab({ url: '/pages/main/index'	});
					} else {
						this.config.showToast(data.responseData
.statusMsg)
					}
				})
			},
			checkRegInfo(){
				if (!this.regInfo.username) {
					this.config.showToast('真实姓名不能为空！')
					return false
				} 
				if (!this.regInfo.useremail) {
					this.config.showToast('邮箱不能为空！')
					return false
				} 
				if (!this.regInfo.pwd) {
					this.config.showToast('密码不能为空！')
					return false
				} 
				return true
			},
			handleReg(){
				if(!this.checkRegInfo()) return
				this.http({api:'/registered', params: this.regInfo, method:'post'})
								.then((res)=>{
									console.log('handleLogin：',res)
									let data = res.data
									if(data.code === 200) {
										this.config.showToast('注册成功。')
										this.regInfo = {
											useremail: '',
											username:'',
											pwd:''
										}
										this.btnActive = 'login'
									} else {
										this.config.showToast(data.responseData
				.statusMsg)
									}
								})
				
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100%;
		background-image: url('../../static/loginBG.png');
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}
	
	.main {
		width: 80%;
		height: 50%;
		border-radius: 5px;
		background-color: #660BAB;
		padding: 5px;
	}
	
	.swicth-view {
		height: 45px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.swicth-btn {
		text-align: center;
		width: 50%;
	    background-color: transparent;
		height: 100%;
		line-height: 45px;
		font-size: 16px;
	}
	.swicth-btn-active {
		background-color: #fff;
		color: #007aff;
	}
	
	.form-login {
		padding: 0px 5px;
		background-color: #fff;
		display: flex;
		flex-direction: column;
		height: calc(100% - 45px);
		justify-content: space-evenly;
	}
	.uni-input {
		height: 46px;
		border: 1px #F2F6FC solid;
		border-radius: 5px;
	}

</style>
