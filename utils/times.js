function formatTime() {
	const now = new Date();
	const year = now.getFullYear();
	let month = now.getMonth() + 1;
	let day = now.getDate();

	// 格式化月份和日期，保证是两位数
	if (month < 10) {
		month = '0' + month;
	}
	if (day < 10) {
		day = '0' + day;
	}

	// 格式化输出
	const formattedDate = year + '-' + month + '-' + day;
	console.log(formattedDate); // 输出格式化后的时间，例如：2024-03-17
	return formattedDate;
}

module.exports = {
	formatTime: formatTime
}
