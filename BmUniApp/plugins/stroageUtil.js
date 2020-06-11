const getStorage = (key)=>{
	try {
	    let value = uni.getStorageSync(key)
	
		return value
	} catch (e) {
	    // error
		return null
	}
}

const setStorage = (key,val)=>{
	try {
	    uni.setStorageSync(key, val);
			
	} catch (e) {
	    // error
	}
}

export default {
	getStorage,
	setStorage
}