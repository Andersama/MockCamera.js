var camera = function (){
	this.tweens = [];
  this.steps = 512;
  /*Simplex Noise Ranges from -1 -> 1*/
	this.tweensMax = -2;
	this.tweensMin = 2;
	this.tweensMinIndex = -1;
	this.tweensMaxIndex = -1;
	this.direction = null;
	this.stepFunction = function(i){
		var y = Math.cos(((i/(this.steps*2))*Math.PI));
		var x = Math.sin(((i/(this.steps*2))*Math.PI));
		return [x,y];
	}
	this.cameraStep = function(p){
		var i = this.tweensMinIndex + Math.floor(p * (this.tweensRange));
		if(!this.tweensDirection){
			i = this.tweensMinIndex - Math.floor(p * (this.tweensRange));
		}
    return i;
	}
  this.cameraValue = function(i){
      if(typeof this.tweens[i] != 'undefined')
        return this.tweens[i];
			var n = this.stepFunction(i);
			return this.tweens[i] = perlinNoise.noise(n[0],n[1]);
  }
	this.init = function(){
		for(var i = 0; i < this.steps; i++){
			var n = this.stepFunction(i);
			this.tweens[i] = perlinNoise.noise(n[0],n[1]);
			if(this.tweens[i] < this.tweensMin){
				this.tweensMin = this.tweens[i];
				this.tweensMinIndex = i;
			}
			if(this.tweens[i] > this.tweensMax){
				this.tweensMax = this.tweens[i];
				this.tweensMaxIndex = i;
			}
		}
		this.tweensRange = Math.abs(this.tweensMaxIndex - this.tweensMinIndex);
		this.tweensDirection = this.tweensMinIndex < this.tweensMaxIndex;
	}
	this.init();
}
