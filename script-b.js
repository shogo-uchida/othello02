// othello made by jQuery
$(function() {


// board
var OthelloBoard = $('<div>').addClass('grid-container');

// square
var Zone = $('<div>').addClass('grid-item');

// comment
var Msg = $('<div>').addClass('message');
// var Black = $('<div>').attr('id', 'black');
// var Whtie = $('<div>').attr('id', 'white');




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



// when you click

$('.grid-item').click(function(){
// the index you click 
	var index=($(".grid-item").index(this));

// to check if there are squares in each direction
//left

	max = $.checkMax(index);

// to judge
	var ok = false;

	if($.checkStone(index, true)){
		ok = true;
	}


    if(ok){

		$('.message').text('   ');

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

// count the number
		var num_b=$(".grid-item div[color='black']").length;
		var num_w=$(".grid-item div[color='white']").length;

		$('#blackCount').text(num_b);
		$('#whiteCount').text(num_w);

		// if the opponent does not have spot to put
		if(nextStone.attr('color') == blackStone.attr('color')){
			
			if($.allcheck()){
				console.log('hi')
				nextStone = whiteStone.clone();
				if($.allcheck()){
					$('.message').text($.gameOver());
				}else{
				$('.message').text('black cannot be put</br>white turn');
				}
			}
		}else{
			if($.allcheck()){
				console.log('hi2')
				nextStone = blackStone.clone();
				if($.allcheck()){
					$('.message').text($.gameOver());
				}else{
				$('.message').text('white cannot be put</br>black turn');
				}
			}			

		}


	}else{
		$('.message').text('you cannot put there');
	}
})

// you made div inside body of html by this
$('body').append(OthelloBoard);
$('body').append(Msg);


// to check if there are squares in each direction
//left
$.checkMax = function(index){
	var leftmax = index % 8;
	var rightmax = 7 - leftmax;
	var topmax = Math.floor(index / 8);
	var bottommax = 7 - topmax; 
	var lefttop = Math.min(leftmax, topmax);
	var righttop = Math.min(rightmax, topmax);
	var leftbottom = Math.min(leftmax, bottommax);
	var rightbottom = Math.min(rightmax, bottommax);
	var max = [leftmax, rightmax, topmax, bottommax,
				 lefttop, righttop, rightbottom, leftbottom];
	return max  
}

$.checkStone = function(index, reverse){
	ok = false;
	for(check = 0; check <= 7; check++){
		var max = $.checkMax(index);
		for(i=1;i<=max[check];i++){

			var checkAll = $.checkIndex(index);

			var stone = $('.grid-item:eq('+ (checkAll[check]) +')').children('div');
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
						if(reverse == false){
							return ok;
							break;
						}

		  				// to turn down the one in the middle
		  				// --i is if i is 3, its gonna start from 2
		  				while(--i>0){
		  					var checkAll = $.checkIndex(index);
		  					var midStone = $('.grid-item:eq('+ (checkAll[check]) +')').children('div');
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
	return ok;
}

$.checkIndex = function(index){
	var checkAll = [index-i, index+i, index-8*i, index+8*i,
							 index-9*i, index-7*i, index+9*i, index+7*i];
	return checkAll;
}


$.allcheck = function(){
	ok = true;
	for(index = 0; index < 64; index++){


		var checkAll = $.checkIndex(index);
		var stone = $('.grid-item:eq('+ index +')').children('div');
		if(stone.length == 0){

			if($.checkStone(index, false)){
				ok = false;
				console.log('can put');
				return ok
			}
		}
	}
	return ok;
}



$.gameOver = function(){
	var num_b=$(".grid-item div[color='black']").length;
	var num_w=$(".grid-item div[color='white']").length;
	if(num_b > num_w){
		return 'black won';
	}else if(num_w > num_b){
		return 'white won';
	}else{
		return 'this was even';
	}
}

$('#reset').click(function(){
	location.reload();
})









});


















