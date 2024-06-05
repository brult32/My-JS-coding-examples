function getRandomColor() {
	var letters = '0123456789ABCDEF';
	var color = '#';
	do {
		color = '#';
		for (var i = 0; i < 6; i++) {
			color += letters[Math.floor(Math.random() * 16)];
		}
	} while (color == '#ffffff');// || color == '#000000');
	return color;
}