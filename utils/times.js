function formatTime() {
	const now = new Date();
	const year = now.getFullYear();
	let month = now.getMonth() + 1;
	let day = now.getDate();
	let hour = now.getHours();
	let minute = now.getMinutes();

	// 格式化月份、日期、小时和分钟，保证是两位数
	if (month < 10) {
			month = '0' + month;
	}
	if (day < 10) {
			day = '0' + day;
	}
	if (hour < 10) {
			hour = '0' + hour;
	}
	if (minute < 10) {
			minute = '0' + minute;
	}

	// 格式化输出
	const formattedDateTime = year + '.' + month + '.' + day + ' ' + hour + ':' + minute;
	console.log(formattedDateTime); // 输出格式化后的时间，例如：2024-03-17 09:25
	return formattedDateTime;
}


module.exports = {
	formatTime: formatTime
}
