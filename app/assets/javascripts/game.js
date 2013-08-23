// JavaScript Document
(function(doc){
	var
	start = function(){
        gameover = false;
        changeTurn();
    },			
    newGame = function(message){
        if (confirm(message)){
            start();
            allCells(clearCell);
        }
    },                         
    element = function(id){
        return doc.getElementById(id);
    },
    cell = function(x,y){
        return element("x"+x+"y"+y);
    },
	allCells = function(action){
        for (var row = 1;row<7;row++){
            for (var col = 1;col<8;col++){
                action(row,col);
            }
        }
    },
	clearCell = function(x,y){
        cell(x,y).className = "";
    },

	horizontalVictory = function(x,y){
        for(var min=y-1;min>0;min--)if(cell(x,min).className !== turn)break;				
        for(var max=y+1;max<8;max++)if(cell(x,max).className !== turn)break;	
        return max-min>4;
    },
                                
    verticalVictory = function(x,y){
        for(var max=x+1;max<7;max++)if(cell(max,y).className !== turn)break;
        return max-x>3;
    },                        
    diagonalDownVictory = function(x,y){
        for(var min=x-1,row=y-1;min>0;min--,row--)if(row<1||cell(min,row).className !== turn)break;
        for(var max=x+1,row=y+1;max<7;max++,row++)if(row>7||cell(max,row).className !== turn)break;
        return max-min>4;
    },                      
    diagonalUpVictory = function(x,y){
        for(var min=x-1,row=y+1;min>0;min--,row++)if(row>7||cell(min,row).className !== turn)break;
        for(var max=x+1,row=y-1;max<7;max++,row--)if(row<1||cell(max,row).className !== turn)break;
        return max-min>4;
    },         
	addClick = function(x,y){
        if(!gameover) {
			cell(x,y).onclick = function(){
				for(x = 6; x > 0; x--) {
					if(cell(x,y).className !== red[0] && cell(x,y).className !== blue[0]) {
						cell(x,y).className = turn;
						counter += 1;
						if(verticalVictory(x,y) || horizontalVictory(x,y) || diagonalUpVictory(x,y) || diagonalDownVictory(x,y)){
							gameover = true;
							;
							winGame();
						} 
						else {
							changeTurn();
						}
						break;
					}
				}
				if (x==0) {alert("This column is full!!");}
			}
		}
    },
	changeTurn = function(){
        turn = (turn === red[0]) ? blue[0] : red[0];
		doc.getElementById("turn").innerHTML = turn + "'s Turn";
    },
	winGame = function(){
        gameover = true;
		if(turn === "Red") doc.getElementById("red").innerHTML = ++red[1];
		else if(turn === "Blue") doc.getElementById("blue").innerHTML = ++blue[1];
		newGame(turn + " is the winner! " + message);
    },
	markCell = function(x,y) {
		cell(x,y).innerHTML = "X";
	}
	unmarkCell = function(x,y) {
		cell(x,y).innerHTML = ""
	}
	turn = blue[0],
	message = "Start a new game??",
	counter = 0,
	red = ["Red",0],
	blue = ["Blue",0],
	gameover = true;
	start();	
	allCells(addClick);
	doc.getElementById("btnStart").onclick = function(){newGame(message);};
	doc.getElementById("btnIns").onclick = function() {alert("THe goal of the game is to connect 4 of the same color either vertically, horizontally or diagonally. Good Luck!");};
})(document);