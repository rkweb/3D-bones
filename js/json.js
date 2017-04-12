var fs = require("fs");
function jsonFile(arr){
	var animations = [];
	var returnData = null;
	var time = 0;
	for(var i=0;i<arr.length;i++){
		var data = fs.readFileSync(arr[i],"utf-8");
		data = JSON.parse(data);
		time++;
		console.log(data.animations[0].name);
		animations.push(data.animations[0]);
		if(time==1){
			returnData = data;
		}
		if(time == arr.length){
			returnData.animations = animations;
			fs.writeFile('animation.js', JSON.stringify(returnData), function (err) {
			    if (err) console.error(err);
			});
		}
	}
}
jsonFile(["ZouLu.js","PaoBu.js"]);