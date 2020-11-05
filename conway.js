/* the js file for the 'Conway's Game of Life' webpage */

/****** naughty global vars ******/
var haltVar = false;

//the size of the pixels
var pixelSize = 20;

//the generation counter
var generationCounter=0;

//the colour of the pixels
var pixelColour = "white";

//the iteration sleep delay/speed
var delayTime = 200;

//the aray to store the pixel colour data
var pixelArray = [];
/****** naughty global vars ******/


//intialise the canvas on load
window.onload = function(){
	initialise();
	//setListener();
}

//iterate through the canvas and fill it up with black pixel elements
function initialise(){
	//console.log("initialising...");
	generationCounter=0;
	
	var elem = document.getElementById("pixel");

	elem.style.width = pixelSize;
	elem.style.height = pixelSize;
	var pixel;

	clearCanvas();  //clear the previous pixelClass array

	//clear/empty the pixel matrix
	pixelArray.length = 0;  //initialise the pixelArray to zero length -> clear the array

	//fill the canvas with 'pixel' elements
	for(var i=0; i<600; i+=pixelSize){
		for(var j=0; j<1200; j+=pixelSize){
			pixel = elem.cloneNode(true);
			pixel.onclick = function() {flipColour(this);};
			pixel.style.top = i;
			pixel.style.left = j;
			pixel.classList.add("pixelClass");
			document.getElementById("canvas").appendChild(pixel);
		}
	}
	//this fixes the bug which required each pixel to be pressed twice to change colour
	var arr = document.getElementsByClassName("pixelClass");
	for(var i=0; i < arr.length; i++)
		arr[i].style.backgroundColor = "black";

	//fill the pixelArray with the relevant pixel data
	for(var j=0; j<arr.length; j++){
		pixelArray.push(0);
	}
}

//flip the colour of the pixel in question
function flipColour(pixel){
	//console.log("flipColour...");
	if(pixel.style.backgroundColor == "black")
		pixel.style.backgroundColor = pixelColour;
	else
		pixel.style.backgroundColor = "black";
}

//the main function for the gameplay mechanics/logic
async function gameLogic(){
	//console.log("gameLogic...");
	haltVar = false;  //needs experimenting
	var arr = document.getElementsByClassName("pixelClass");

	var aliveCount=0;  //how many adjacent pixels are alive?

	while(1){
		//update the display, each pixel should have a colour corresponding to the value in pixelArray, 0->dead, 1->alive

		//main gameplay logic...
		for(var k=0; k<arr.length; k++){
			if(arr[k].style.backgroundColor == "black"){  //the pixel is currently dead
				//resurrection requires exactly 3 live neighbours...
				aliveCount = checkNeighbours(arr, k);
				if(aliveCount == 3)   //resurrect the pixel
					pixelArray[k] = 1;
			} 
			else if(arr[k].style.backgroundColor != "black"){  //the pixel is currently alive
				aliveCount = checkNeighbours(arr, k);
				if(aliveCount < 2)  //underpopulation -> dead
					pixelArray[k] = 0; 
				else if(aliveCount > 3)  //overpopulation -> dead
					pixelArray[k] = 0;
				else if(aliveCount == 2 || aliveCount == 3)  //pixel survives another generation
					pixelArray[k] = 1;
			}
			//console.log(aliveCount);
		}

		for(var j=0; j<pixelArray.length; j++){
			if(pixelArray[j] == 1)
				arr[j].style.backgroundColor = pixelColour;
			else
				arr[j].style.backgroundColor = "black";
		}

		if(haltVar)  //needs experimenting!
			return;
		
		generationCounter++;
		await sleep(delayTime);
	}
}

function sleep(ms){
	return new Promise(resolve => setTimeout(resolve, ms));
}

function checkNeighbours(arr, i){
	var value = 0;
	var canvas = document.getElementById("canvas");

	//RETRY WITH !==

	if(arr[i+1] !== undefined){
		if(arr[i+1].style.backgroundColor != "black")  //pixel to the right
			value++;
	}
	if(arr[i-1] !== undefined){
		if(arr[i-1].style.backgroundColor != "black")  //pixel to the left
			value++;
	}
	
	//check the below adjacent pixels
	if(arr[i + 1200/pixelSize] !== undefined){
		if(arr[i + 1200/pixelSize].style.backgroundColor != "black")  //pixel directly below
			value++; 
	}
	if(arr[i + 1200/pixelSize + 1] !== undefined){
		if(arr[i + 1200/pixelSize + 1].style.backgroundColor != "black")  //pixel diagonally below, right
			value++; 
	}
	if(arr[i + 1200/pixelSize - 1] !== undefined){
		if(arr[i + 1200/pixelSize - 1].style.backgroundColor != "black")  //pixel diagonally below, left
			value++; 
	}
	
	//check the above adjacent pixels
	if(arr[i - 1200/pixelSize] !== undefined){
		if(arr[i - 1200/pixelSize].style.backgroundColor != "black")  //pixel directly above
			value++; 
	}	
	if(arr[i - 1200/pixelSize + 1] !== undefined){
		if(arr[i - 1200/pixelSize + 1].style.backgroundColor != "black")  //pixel diagonally above, right
			value++; 
	}
	if(arr[i - 1200/pixelSize - 1] !== undefined){
		if(arr[i - 1200/pixelSize - 1].style.backgroundColor != "black")  //pixel diagonally above, left
			value++; 
	}
	//debugging
	//console.log( "value: " + value);
	return value;
}

//suspend the gameplay, maybe set a dummy variable here, that pauses the game
//in the gameLogic
function _halt(){
	//console.log("halt...");
	haltVar = true;   //needs experimenting
}

function showGrid(){
	//console.log("grid...");
	var arr = document.getElementsByClassName("pixelClass");
	
	if(arr[0].style.border == "thin solid grey"){
		//turn off the grid
		for(var i=0; i < arr.length; i++)
			arr[i].style.border = "";
	} else{
		//turn on the grid
		for(var i=0; i < arr.length; i++)
			arr[i].style.border = "thin solid grey";
	}
}

function reset(){
	//console.log("reset...");
	var arr = document.getElementsByClassName("pixelClass");
	//reset every element to a black background, and every pixelArray element to zero
	for(var j=0; j<pixelArray.length; j++)
		pixelArray[j]=0;
	
	for(var i=0; i<arr.length; i++)
		arr[i].style.backgroundColor = "black";

	haltVar=true;
}

//change the size of the pixels, re-initialise the canvas
function changePixelSize(){
	//console.log("change...");
	var value = document.getElementById("sizeMenu").value;
	//console.log(value);

	switch(value){
		case "small":
			pixelSize = 10;
			initialise();
			break;
		case "medium":
			pixelSize = 20;
			initialise();
			break;
		case "large":
			pixelSize = 40;
			initialise();
			break;
	}
	haltVar=true;
}

//change the pixel colour to a specified value
function changePixelColour(){
	//console.log("change...");
	var value = document.getElementById("colourMenu").value;
	console.log(value);

	switch(value){
		case "white":
			pixelColour = value;
			break;
		case "blue":
			pixelColour = value;
			break;
		case "red":
			pixelColour = value;
			break;
		case "grey":
			pixelColour = value;
			break;
		case "purple":
			pixelColour = value;
			break;
		case "green":
			pixelColour = value;
			break;
	}
}

// speed up/slow down the speed of the game
function changeTime(value){
	delayTime = value;
}

//delete the pixelClass elements from the document
function clearCanvas(){
	var arr = document.getElementsByClassName("pixelClass");

	for(var i=0; i<arr.length; i++)
		arr[i].classList.remove("pixelClass");
	
	for(var j=0; j<arr.length; j++)
		arr[j].parentNode.removeChild(arr[j]);
}