var animCall = setTimeout(animateCamera,100);
var animateCamera = function(){
	this.values = [
		function(){return r(0,50)},
		function(){return r(50,100)},
		function(){return r(0,100)},
		function(){return r(100,135)}
	];
	if(typeof this.alternate == 'undefined'){
		this.alternate = false;
		this.startingPosition = [50,50,100];/*this.values[0]*/
		this.endingPosition = [this.values[1](),this.values[1](),this.values[3]()];
	} else {
		this.alternate = !this.alternate;
		for(var i = 0; i < this.endingPosition.length; i++){
			this.startingPosition[i] = this.endingPosition[i];
		}
		this.endingPosition[0] = this.alternate ? this.values[0]() : this.values[1]();
		this.endingPosition[1] = this.alternate ? this.values[2]() : this.values[2]();
		this.endingPosition[2] = this.alternate ? this.values[3]() : this.values[3]();
	}
	console.log("moving background ["+this.startingPosition+" -> "+this.endingPosition+"]");
	this.startNoise = tNoise.noise3d(this.startingPosition[1],this.startingPosition[0],this.startingPosition[2]);
	this.endNoise = tNoise.noise3d(this.endingPosition[1],this.endingPosition[0],this.endingPosition[2]);
	Velocity(mainImage,{
		tween: [2*Math.PI,0],
		backgroundPositionY: [
			toPercentage(this.endingPosition[0]+this.endNoise),
			toPercentage(this.startingPosition[0]+this.startNoise)
		],
		backgroundPositionX: [
			toPercentage(this.endingPosition[1]+this.endNoise),
			toPercentage(this.startingPosition[1]+this.startNoise)
		],
		backgroundSize: [
			toPercentage(this.endingPosition[2]+this.endNoise),
			toPercentage(this.startingPosition[2]+this.startNoise)
		]
	},{
		duration: animLength*r(75,100)/100,
		complete: function(){
            animCall = setTimeout(animateCamera,r(animLength+100,animLength+1250)); 
        },
		progress: function(elements, complete, remaining, start, tweenValue) {
		},
        easing: 'cameraShake'
	});
};
function toPercentage(val){
	return val.toString().replace(/\%$/,'')+"%";
}
