var rot = 0;
function getDate() {
	const nDat = new Date();
	getId("labe").innerHTML =
		`${nDat.getFullYear()}/${nDat.getMonth() + 1}/${nDat.getDay()} ${nDat.getHours()}:${nDat.getMinutes()}:${nDat.getSeconds()}:${nDat.getMilliseconds()}`;
}

function startTime() {
	const nDat = new Date();
	getId('digitalclock').innerHTML =
		`${nDat.getHours()}:${nDat.getMinutes()}:${nDat.getSeconds()}:${nDat.getMilliseconds()}`;
	getId("chour").style.transform = `rotate(${nDat.getHours() / 12 * 360}deg)`;
	getId("cminute").style.transform = `rotate(${nDat.getMinutes() / 60 * 360}deg)`;
	getId("csec").style.transform = `rotate(${nDat.getSeconds() / 60 * 360}deg)`;
	getId("cseco").style.transform = `rotate(${nDat.getMilliseconds() / 1000 * 360}deg)`;
	setTimeout(startTime, 60);
}
startTime();
// setInterval(getTim, 2000);

function getTim() {
	const nDat = new Date();
	let da = `${nDat.getHours()}:${nDat.getMinutes()}:${nDat.getSeconds()}:${nDat.getMilliseconds()}`;
	getId('pageloaded').innerHTML = da;
}
getTim();

function getId(element) {
	return document.getElementById(element);
}