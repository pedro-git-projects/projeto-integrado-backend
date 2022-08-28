export const idGenerator = ():number => {
	const uid: number = new Date().getTime();
	return uid;
};
