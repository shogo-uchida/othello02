// othello made by jQuery
$(function() {


// board

var OthelloBoard = $('<div>').addClass('grid-container');

// square

var Zone = $('<div>').addClass('grid-item');


var j = 0;
while(j++<64){
	// jQueryオブジェクト.clone(論理値)
	// ture means you copy event handlar as well
	// to make 64 div inside grid-container
	$('.grid-container').append(Zone.clone(true));
}

// Stones
// attr is you can put something like class or id with some names
// in this case the name is color

var blackStone = $("<div>").addClass("stone blackStone").attr('color', 'black');
var whiteStone = $("<div>").addClass("stone whiteStone").attr('color', 'white');

// starting point
// eq is index, it assign each of grid-item(same li, div, etc) automatically
$(".grid-item:eq(27)").append(blackStone.clone());
$(".grid-item:eq(27)").off("click");
$(".grid-item:eq(28)").append(whiteStone.clone());
$(".grid-item:eq(28)").off("click");
$(".grid-item:eq(35)").append(whiteStone.clone());
$(".grid-item:eq(35)").off("click");
$(".grid-item:eq(36)").append(blackStone.clone());
$(".grid-item:eq(36)").off("click");

var nextStone = blackStone;


// turning inside down

$(function WhiteorBlack(i){
	while(--i>0){
		var midStone = $('.grid-item:eq('+ count +')').children('div');
		if(stone.attr('color') == 'white'){
			//if the one you put is white
			midStone.removeClass('blackStone');
			midStone.addClass('whiteStone');
			midStone.removeAttr('color');
			midStone.attr('color', 'white');
			console.log('hey' + count);
			console.log(midStone);
		}else{
			midStone.removeClass('whiteStone');
			//if the one you put is black
			midStone.addClass('blackStone');
			midStone.removeAttr('color');
			midStone.attr('color', 'black');
			console.log('hey' + count);
		}
	}
	ok = true;
});
 

// when you click

$('.grid-item').click(function(){
// the index you click 
	var index=($(".grid-item").index(this));

// to check if there are squares in each direction
//left
	var leftmax = index % 8;
	var rightmax = 7 - leftmax;
	var topmax = Math.floor(index / 8);
	var bottommax = 7 - topmax; 

// to judge
	var ok = false;

// to check leftside
	for(i=1;i<=leftmax;i++)function(){
	var stone = $('.grid-item:eq('+ index-i +')').children('div');
		if(i == 1){
	  		if(stone.length == 0 || stone.attr('color') == nextStone.attr('color')){ 
	  		    //now nextStone is the one you put
	  			// no stone or same color stone one left to you clicked
	  			break;
	  		}
	  	}else{
	  		// there is opposite color of stone lext next to you clicked
	  		if(stone.length > 0){
	  			if(stone.attr('color') == nextStone.attr('color')){
	  				// to judge
					ok = true;

	  				// to turn down the one in the middle
	  				// --i is if i is 3, its gonna start from 2
	  				while(--i>0){
	  					var midStone = $('.grid-item:eq('+ index-i +')').children('div');
	  					if(stone.attr('color') == 'white'){
	  						//if the one you put is white
	  						midStone.removeClass('blackStone');
	  						midStone.addClass('whiteStone');
	  						midStone.removeAttr('color');
	  						midStone.attr('color', 'white');

	  					}else{
	  						midStone.removeClass('whiteStone');
	  						//if the one you put is black
	  						midStone.addClass('blackStone');
	  						midStone.removeAttr('color');
	  						midStone.attr('color', 'black');

	  					}
	  					
	  				}
	  				break;
		  		}
	  		}else{
	  			// no turning down
	  			break;
		  		}
		  	}
		}
	}


  if(ok){



	  $(this).append(nextStone.clone(true));
	  if(nextStone == blackStone){
	  	nextStone = whiteStone;
	  }else{
	  	nextStone = blackStone;
	  }
	// prevent from dual putting store　：　IMPORTANT
	// たくさんある.grid-itemの中で、thisのclickイベントをoffすることによって
	//今回選択された　this はもうclickイベントが起こらないので2重に駒が置かれない
	  $(this).off("click");
	}else{
		alert('you cannot put there');
	}
 })
  

// you made div inside body of html by this
$('body').append(OthelloBoard);


});























