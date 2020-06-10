const apiUrl = 'http://101.200.158.40/bmapi'
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