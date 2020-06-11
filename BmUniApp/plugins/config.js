const apiUrl = 'https://myloveqwy.cn/bmapi'
const showToast = (title,icon='none') => {
	uni.showToast({
	    title: title,
	    duration: 500,
		icon: icon
	});
}
export default {
	apiUrl,
	showToast
}