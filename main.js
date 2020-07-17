
var north = "<b>&uarr;</b>";
var east = "<b>&rarr;</b>"
var south = "<b>&darr;</b>"
var west = "<b>&larr;</b>"

let o_Cells,o_Table,color,direction,delay;
let ROWS = 80;
let COLS = 80;
var Cells = [],x,y;
let max_timeout = 1500;
let gen = 0;
let GEN_OUT = document.getElementById('generation');
let SPEED = document.getElementById('speed');
let RANDOM = document.getElementById('random')
RANDOM.addEventListener('click',randomizeIt,false);
SPEED.addEventListener('change',updateSpeed,false);
let speed = SPEED.value;
window.onload = setup();

function randomizeIt(){
	for(var cell=0;cell<o_Cells.length;cell++){
		if( Math.floor(Math.random() * 2) < 1){
			o_Cells[cell].className='black';
		}
		else{
			o_Cells[cell].className='white';
		}
	}
}
function antCrawl(){

//=====================  vacate cell  and switch classes  =================
	Cells[y][x].className = ( Cells[y][x].className == "white" ) ? "black" : "white";
	Cells[y][x].innerHTML = "";
//=====================  move ant to next cell accordingly  ===============
	if( color == "white" ){
		if( direction == north ){
			x = (++x) % COLS;
			direction = east;
		}
		else if( direction == east ){
			y = (++y) % ROWS;
			direction = south;
		}
		else if( direction == south ){
			x = (--x) % COLS;
			direction = west;
		}
		else {
			y = (--y) % ROWS;
			direction = north;
		}
	}
	else{
		if( direction == north ){
			x = (--x) % COLS;
			direction = west;
		}
		else if( direction == east ){
			y = (--y) % ROWS;
			direction = north;
		}
		else if( direction == south ){
			x = (++x) % COLS;
			direction = east;
		}
		else {
			y = (++y) % ROWS;
			direction = south;
		}
	}
	if( y < 0 ){
		y = ROWS - 1;
	}
	if( x < 0 ){
		x = COLS - 1;
	}
	color = ( Cells[y][x].className == "white" ) ? "white" : "black";
	gen++;
	GEN_OUT.value = gen;
	Cells[y][x].innerHTML = direction;
	delay = 1000 - speed * 100;
	if(speed > 0){
		setTimeout(antCrawl,delay);
	}
}
function insertAnt(e){
	if( e.target.tagName == "TD" ){
    direction = prompt("Which direction for ant to face?","north, south ,east , or west");
    direction = direction.toLowerCase();
    direction = direction.slice(0,1);
		color =  e.target.className == "white" ? "white" : "black";
		switch(direction){
			case 'n' :
				direction = north;
				break;
			case 'e' :
				direction = east;
				break;
			case 's' :
				direction = south;
				break;
			case 'w' :
				direction = west;
				break;
			default:
				direction = north;
				break;
		}
		e.target.innerHTML = direction;
		x = e.target.x;
		y = e.target.y;
	}
	antCrawl()
}

function setup(){
	var o_Insert = document.getElementById("insert");
	var html = "<table id='table'>";
	var cell = 0;
	for(var row = 0; row < ROWS; row++){
		html += "<tr>";
		for(var col = 0; col < COLS; col++){
			html += "<td class='white'>&#9899;</td>";

		}
		html += "</tr>";
	}
	html += "</table>";
	o_Insert.innerHTML = html;
	o_Table = document.getElementById("table");
	o_Cells = document.getElementsByTagName("td");
	for( var i = 0; i < ROWS; i++){
		Cells[i] = [];
		for( var j=0; j < COLS; j++){
			o_Cells[cell].x = j;
			o_Cells[cell].y = i;
			Cells[i][j] = o_Cells[cell];
			cell++;
		}
	}
	o_Table.addEventListener("click",insertAnt,false);
}
function updateSpeed(){
	speed = this.value;
	if(speed > 0)
		antCrawl()

}