export const setSessionStorage = (key: any, value: any) => {
	return sessionStorage.setItem(key, value);
};

export const getSessionStorage = (key: any) => {
	return sessionStorage.getItem(key);
};

export const removeSessionStorage = (key: any) => {
	return sessionStorage.removeItem(key);
};

export const clearSessionStorage = () => {
	return sessionStorage.clear();
};
