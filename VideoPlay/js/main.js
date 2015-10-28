var canvas;
var ctx;

var canvasTemp;
var ctxTemp;

var drag = false;

var rect = {};

var startX;
var startY;

var endX;
var endY;

var width;
var height;

var x_canvas; // canvas의 top 좌표
var y_canvas; // canvas의 left 좌표



var posi;


// 새로운 변수 
var lastX = 0;
var lastY = 0;

//Initialize function
var init = function() {
	$(".video").multimediaview("height", 600);

	// TODO:: Do your initialization job
	console.log("init() called");


	
	
	// add eventListener for tizenhwkey
	document.addEventListener('tizenhwkey', function(e) {
		if (e.keyName == "back")
			tizen.application.getCurrentApplication().exit();
	});
	
	//canvas = document.querySelector("canvas");
	//context = canvas.getContext('2d');
	
	
	
	canvas = document.getElementById('canvas');
	container = canvas.parentNode;

	// canvas 이벤트 리스너 등록
	canvas.addEventListener('touchstart', startDraw);
	canvas.addEventListener('touchmove', drawStep);
	canvas.addEventListener('touchend', stopDraw);				
	canvas.addEventListener('mouseout', stopDraw);
	
	canvasTemp = document.createElement('canvas');
	canvasTemp.id = "canvasTemp";
	canvasTemp.width = canvas.width;
	canvasTemp.height = canvas.height;
	container.appendChild(canvasTemp);

	ctx = canvas.getContext('2d');
	ctxTemp = canvasTemp.getContext('2d');
	
	
	posi = getPosition(canvas);
	x_canvas = posi.x;
	y_canvas = posi.y;
	
	// 펜 색깔 및 두께 정의
	ctx.beginPath();
	brushSize = 1;
	ctx.lineWidth = brushSize;
};  //init function 끝
$(document).bind('pageinit', init);

// 영상 재생
function playVid()
{
	myVideo.play();
}

// 영상 정지 후 캡쳐
function pauseVid() {
	myVideo.pause();
    canvas = document.getElementById("canvas");
	ctx = canvas.getContext('2d');
	
	var cur_image = myVideo;  //비디오에서 이미지 갖고와
	var showWidth = myVideo.width; // 비디오 이미지를 가로세로 똑같이 해서 갖고와
	var showHeight = myVideo.height; //마찬가지
	
	ctx.drawImage(cur_image, 0, 0, showWidth, showHeight); //그려
}

// 최근의 좌표를 업데이트하는 함수
function updateLastPos(e)
{
   if (e.type.indexOf('touch') >= 0)
   {
      var pos = e.touches.item(0);
      lastX = pos.clientX-pos.target.offsetLeft;
      lastY = pos.clientY-pos.target.offsetTop;
   }
   else
   {
      lastX = e.offsetX;
      lastY = e.offsetY;
   }
}

var mouseBtn = false;


// 터치할때의 콜백 함수 
function startDraw(e) {
	
	//updateLastPos(e);
	//ctx.globalCompositeOperation = 'destination-out';
	//var pos = e.touches.item(0);
	//ctx.beginPath();
	//ctx.moveTo(pos.clientX, pos.clientY);
	
	
	
	e.preventDefault();
    var touch = e.touches[0];
    
    posi = getPosition(canvas);
	x_canvas = posi.x;
	y_canvas = posi.y;
    
	startX = touch.pageX - x_canvas;
	startY = touch.pageY - y_canvas;		
	
	var startX_text = document.getElementById("startX");
	startX_text.value = startX;
	var startY_text = document.getElementById("startY");
	startY_text.value = startY; 
	
	
	mouseBtn = true;
}


// 터치한채 움직일때의 콜백 함수
function drawStep(e)
{
	if (mouseBtn)
	   {
		//alert("ha");
	      //updateLastPos(e);
	      //ctx.lineTo(lastX, lastY);
	      //ctx.stroke();
		
		//var pos = e.touches.item(0);
	//	lastX = pos.clientX;
	//	lastY = pos.clientY;
		//e.preventDefault();
	    var touch = e.touches[0];
	    endX = touch.pageX - x_canvas;
	    endY = touch.pageY - y_canvas;
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			ctx.drawImage(myVideo, 0, 0, canvas.width, canvas.height); //그려
			
			var width = endX - startX;
			var height = endY - startY;
	     	ctx.strokeRect(startX, startY, width, height);
	   }
}

// 터치를 뗄 때 콜백 함수
function stopDraw(e)
{	
//	// canva 의 x,y좌표
//	var posi = getPosition(canvas);
//	x_canvas = posi.x;
//	y_canvas = posi.y;
//    
//    e.preventDefault();
//    var touch = e.touches[0];
//    
//    
//	ctx.strokeRect(0, 0, touch.pageX, touch.pageY - y_canvas);
   mouseBtn = false;
	
	
}

function draw() {
//	ctxTemp.strokeRect(rect.startX, rect.startY, rect.w, rect.h);
//	startX.value = rect.startX;
//	console.log(startX);
//	startY.value = rect.startY;
//
//	var posi = getPosition(canvas);
//
//	x_canvas = posi.x;
//	y_canvas = posi.y;
}

function getPosition(element) {
	var xPosition = 0;
	var yPosition = 0;

	while (element) {
		xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
		yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
		element = element.offsetParent;
	}
	return {
		x : xPosition,
		y : yPosition
	};
}

function cropandsave()
{
//	// canvas에 캡쳐된 이미지와 원본 비디오 이미지의 크기간의 비율
//	// 이는 후에 canvas에서 크랍한 좌상단, 우하단 좌표를 이용하여 실제 원본 이미지의 좌상단, 우하단 간의 비율을 구하는데 사용된다 
//	var ratio;
//	
//	ratio = myVideo.width / canvas.width;
//	
//	alert(ratio);
	
	//var image = myVideo;
	
	var crop_canvas;
    
	crop_canvas = document.createElement('canvas');
	crop_canvas.width = endX - startX;
	crop_canvas.height = endY - startY;
	crop_canvas.getContext('2d').drawImage(canvas, startX, startY, endX-startX, endY-startY, 0, 0, endX-startX, endY-startY);
	var cropImage = crop_canvas.toDataURL("image/png")
	
	localStorage.setItem("cropImage", cropImage)
	
	// draw_canvas 에 크랍한 이미지를 뿌린.ㅋ
	draw_canvas.getContext('2d').drawImage(canvas, startX, startY, endX-startX, endY-startY, 0, 0, endX-startX, endY-startY);
}

/*
var container, canvas, canvasTemp, ctx, ctxTemp;
var drag = false;

var rect = {};

var startX;
var startY;
var endX;
var endY;
var x_canvas; // canvas의 top 좌표
var y_canvas; // canvas의 left 좌표
*/
/*
window.onload= function (){

	var width = document.getElementById('width');
	var height = document.getElementById('height');
	
	canvas = document.getElementById('canvas');
	container = canvas.parentNode;
	
	
	canvasTemp = document.createElement('canvas');
	canvasTemp.id = "canvasTemp";
	canvasTemp.width = canvas.width;
	canvasTemp.height = canvas.height;
	container.appendChild(canvasTemp);
	
	
	ctx = canvas.getContext('2d');
	ctxTemp = canvasTemp.getContext('2d');
	
	startX = document.getElementById('startX');
	startY = document.getElementById('startY');
	
	endX;
	endY;
	
	width = document.getElementById('width');
	height = document.getElementById('height');

	//pauseVid();
	init();
	alert(" onload 완료");
	

}
*/







/*
function getPosition(element) {
	var xPosition = 0;
	var yPosition = 0;

	while (element) {
		xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
		yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
		element = element.offsetParent;
	}
	return {
		x : xPosition,
		y : yPosition
	};
}

function draw() {
	alert("draw");
	ctxTemp.strokeRect(rect.startX, rect.startY, rect.w, rect.h);
	startX.value = rect.startX;
	console.log(startX);
	startY.value = rect.startY;

	var posi = getPosition(canvas);

	x_canvas = posi.x;
	y_canvas = posi.y;
	///////0921
	width.value = Math.abs(rect.w);
	height.value = Math.abs(rect.h);
}

function mouseDown(e) {
	alert("down");
	
	var posi = getPosition(canvas);
	x_canvas = posi.x;
	y_canvas = posi.y;

	rect.startX = e.pageX - x_canvas;
	rect.startY = e.pageY - y_canvas;

	drag = true;
}

function mouseUp(e) {
	drag = false;

	var posi = getPosition(canvas);
	x_canvas = posi.x;
	y_canvas = posi.y;

	endX = e.pageX - x_canvas;
	endY = e.pageY - y_canvas;
}

function mouseMove(e) {
	if (drag) {
		rect.w = (e.pageX - x_canvas) - rect.startX;
		rect.h = (e.pageY - y_canvas) - rect.startY;
		ctxTemp.clearRect(0, 0, canvas.width, canvas.height);
		draw();
		}
	}

function init()
{
	canvasTemp.addEventListener('mousedown', mouseDown, false);
	canvasTemp.addEventListener('mouseup', mouseUp, false);
	canvasTemp.addEventListener('mousemove', mouseMove, false);
	alert("init");
	 //canvas.addEventListener("touchstart", handleStart);
}

function handleStart(e)
{
	alert("handle start");
}

function mouseDownCallback()
{
	alert("mouse down callback");
}

*/