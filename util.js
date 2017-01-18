function rp (min,max,p){
  return (p * (max - min)) + min;
}
function r (min,max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function normalizeShake(start,end,min,max,input){
	var d = Math.abs(start - end);
  var p = (input - Math.min(start,end)) / d;
	return rp(min,max,p);
}
