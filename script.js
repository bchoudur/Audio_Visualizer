// JavaScript Document


var audio = new Audio();
audio.src = 'The_Glass_Child_-_Sister.mp3';
audio.controls = true;
audio.loop = true;
audio.autoplay = false;

var canvas, ctx, source, context, analyser, fbc_array, bars, bar_x, bar_width, bar_height;


window.addEventListener("load", initMp3Player, false);
function initMp3Player(){
	document.getElementById('audio_box').appendChild(audio);
	context = new AudioContext(); // AudioContext object instance
	analyser = context.createAnalyser(); // AnalyserNode method
	canvas = document.getElementById('analyser_render');
	ctx = canvas.getContext('2d');
	// Re-route audio playback into the processing graph of the AudioContext
	source = context.createMediaElementSource(audio); 
	source.connect(analyser);
	analyser.connect(context.destination);
	frameLooper();
}

function frameLooper(){
	
	window.requestAnimationFrame(frameLooper);
	fbc_array = new Uint8Array(analyser.frequencyBinCount);
	analyser.getByteFrequencyData(fbc_array);
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	// The actual code that draws the circle and lines
	var valueForRadius = -(fbc_array[0] / 2);
	var radius = (valueForRadius * -1);
	//var radius = Math.floor(Math.random() * 100) + 50;
	var angle = (Math.PI/180);
	ctx.beginPath();
	ctx.arc(300, 300, radius, angle*0, angle*360, false);
	ctx.fillStyle = '#FF6A6A';
	ctx.fill();
	//ctx.closePath();
	
	ctx.beginPath();
	for(var i = 0; i < 360; i = i + 5){
		var value = -(fbc_array[i] / 2);
		var height = ((value * -1) / 100) + 1;
		ctx.moveTo(300 + radius*Math.cos(angle * i), 300 + radius*Math.sin(angle * i));
		ctx.lineTo(300 + (height*radius*Math.cos(angle * i)), 300 + (height*radius*Math.sin(angle * i)));
		ctx.fill();
		console.log(value);
	}
	
	ctx.closePath();
	ctx.stroke();
	
}

