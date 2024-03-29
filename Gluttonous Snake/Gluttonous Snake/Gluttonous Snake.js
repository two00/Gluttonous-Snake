var oul = document.getElementsByTagName('ul')[1],
		onewGame = document.getElementsByClassName('new-game')[0],
		timer,
		timer_speed = 100;
	var arr = chessboard(16, 30),
		arrli = arr[0],
		snakeIndex = arr[1],
		foodIndex = arr[2],
		boolen_nav = true,
		boolen_keydown = true,
		snakeArr = [snakeIndex],
		num = 1,
		boolen_y = true,
		boolen_x = true;
// 初始化
	startWork();
	function startWork() {
		var oulnav =document.getElementsByTagName('ul')[0],
			olinav = oulnav.children;
		for (var i = 1; i < 4; i ++) {
			olinav[i].onclick = (function (i) {
				return function () {
					if (!boolen_nav) {
						return false;
					}
					for (var j = 1; j < 4; j ++) {
						olinav[j].style.backgroundColor = '#FFB';
					}
					olinav[i].style.backgroundColor = 'orange';
					if (i == 1) {
						timer_speed = 100;
					}else if(i == 2) {
						timer_speed = 250;
					}else if (i == 3) {
						timer_speed = 400;
					}
				}
			})(i);
		}
	}
	onewGame.onclick = function() {
		onewGame.style.fontWeight = '700';
		setTimeout(function() {
			onewGame.style.fontWeight = null;
		},300);
		clearInterval(timer);
		arr = chessboard(16, 30);
		arrli = arr[0];
		snakeIndex = arr[1];
		foodIndex = arr[2];
		boolen_nav = true;
		boolen_keydown = true;
		num = 1;
		snakeArr = [snakeIndex];
		boolen_x = true;
		boolen_y = true;
	}
// 棋盘生成函数
	function chessboard(height, width) {
			var arrli = [],
				html = '',
				snakeindex,
				foodindex;
			for(var i = 0; i < height; i++){
				for(var j = 0; j < width; j++){
					html += '<li></li>';
				}
			}
			oul.innerHTML = html;
			var oli = oul.children,
				len = oli.length
			for(var p = 0; p < len; p ++) {
				arrli[p] = oli[p];
			}
			for(var h = 0; h < 1; h ++) {
				snakeindex = Math.floor(Math.random() * height * width);
				foodindex = Math.floor(Math.random() * height * width);
				if (snakeindex == foodindex) {
					i --;
				}
			}
			arrli[snakeindex].className = 'snake';
			arrli[foodindex].className = 'food';
			return [arrli, snakeindex, foodindex];
		}
// 键盘事件绑定
	document.onkeydown = function (e) {
		var event = e || window.event;
		boolen_nav = false;
		if (!boolen_keydown) {
			return false;
		}
		if (event.keyCode == 37) {
			if (boolen_x) {
				clearInterval(timer);
				timer = setInterval(function() {
					snakeMove(-1);
				},timer_speed);
				boolen_x = false;
				boolen_y = true;
			}
		}else if (event.keyCode == 38) {
			if (boolen_y) {
				clearInterval(timer);
				timer = setInterval(function() {
					snakeMove(-30);
				},timer_speed);
				boolen_y = false;
				boolen_x = true;
			}
		}else if (event.keyCode == 39) {
			if (boolen_x) {
				clearInterval(timer);
				timer = setInterval(function() {
					snakeMove(1);
				},timer_speed);
				boolen_x = false;
				boolen_y = true;
			}
		}else if (event.keyCode == 40) {
			if (boolen_y) {
				clearInterval(timer);
				timer = setInterval(function() {
					snakeMove(30);
				},timer_speed);
				boolen_y = false;
				boolen_x = true;
			}
		}
	}
// move
	function snakeMove(speed) {
		var nextIndex = speed + snakeIndex;
		if ((!arrli[nextIndex]) || (speed == -1 && nextIndex % 30 == 29) || (speed == 1 && nextIndex % 30 == 0) || (arrli[nextIndex].className == 'snake')) {
			alert('游戏结束');
			clearInterval(timer);
			boolen_keydown = false;
			return false;
		}
		if (foodIndex == snakeIndex) {
			for(var i = 0; i < 1; i ++) {
				foodIndex = Math.floor(Math.random() * 16 * 30);
				if (arrli[foodIndex].className == 'snake') {
					i --;
				}else {
					arrli[foodIndex].className = 'food';
					num ++;
				}
			}
		}
		arrli[snakeArr[snakeArr.length - num]].className = '';
		arrli[nextIndex].className = 'snake';
		snakeIndex = nextIndex;
		snakeArr.push(snakeIndex);
	}
