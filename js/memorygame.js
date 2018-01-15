"use strict";

// code for assignment

(function(){

	var cards = [
	{
		rank:"queen",
		suit:"diamonds",
		cardImage:"images/queen-of-diamonds.png"
	},
	{
		rank:"queen",
		suit:"heart",
		cardImage:"images/queen-of-hearts.png"
	},
	{
		rank:"king",
		suit:"diamonds",
		cardImage:"images/king-of-diamonds.png"
	},
	{
		rank:"king",
		suit:"heart",
		cardImage:"images/king-of-hearts.png"
	}];

	var game = {
		matchingStatus: false,
		lastCard: null,
		isMatch: function(newCard){
			return this.lastCard.rank === newCard.rank;
		},
		gameOver: false
	}

	var board = document.getElementById('game-board');

	const BACK = 'images/back.png';

	function reset(){
		Array.prototype.forEach.call(board.getElementsByTagName('img'), function(item,index,arr){
				if(item.getAttribute('src') !== BACK){
					item.setAttribute('src', BACK);
				}
			});
	}

	function flipCard(){

		if(game.gameOver) return;

		if(!game.lastCard){
			reset();
		}

		var card = cards[ this.getAttribute('data-id') ];
		this.setAttribute('src', card.cardImage);

		if(game.lastCard){

			if(game.isMatch(card) ){
				alert('You found a match');
				game.gameOver = true;
			}else{
				alert('no match');
			}

		}

		game.lastCard = game.lastCard ? null : card;

	}

	function createBoard(){
		// randomize the board

		let randomNumbers = createRandomNumbers(4, 4);

		for(let i = 0, curr = cards[i]; i < cards.length; i++){

			let card = document.createElement('img');

			card.setAttribute('src', BACK);
			card.setAttribute('data-id', randomNumbers[i] );

			card.addEventListener('click', flipCard);

			board.appendChild(card);

		}

	}

	function createRandomNumbers(length, range){
		let nums = new Set();

		while(nums.size < length){
			nums.add( Math.floor((Math.random() * range)));
		}

		return Array.from(nums);
	}

	createBoard();


	document.getElementById('reset').addEventListener('click',function(){
		game.gameOver = false;
		game.lastCard = null;
		board.innerHTML = "";
		createBoard();
	});

}());



