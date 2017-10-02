
// Game Displays

var currentWordDisp = document.querySelector("#currentWord");
var currentGuessDisp = document.querySelector("#guesses");
var winsDisp = document.querySelector("#wins");
var guessLetterDisp = document.querySelector("#guessedLetters");
var warningDisp = document.querySelector("#warning");


//Game Object
var game = {
	availableWords: ["simon", "ricther"],
	currentWord: "",
	displayWord: [],
	availableLetters: [],
	guesses: 0,
	wins: 0,
	lettersGuessed: 0,
	isGameOver: false,
	isShown: false,
	wordDisp: {},
	guessDisp: {},
	winDisp: {},
	guessLtrDisp: {},
	warnDisp: {},
	startGame: function(currentWordDisp, currentGuessDisp, winsDisp, guessLetterDisp, warningDisp){

		// Initializes the Game So that a new round can be played when Game Over has happened.
		// Setup the Display Objects
		this.wordDisp = currentWordDisp;
		this.guessDisp = currentGuessDisp;
		this.winDisp = winsDisp;
		this.warnDisp = warningDisp;
		this.guessLtrDisp = guessLetterDisp;

		// Setup Game Values
		this.isGameOver = false;
		this.guesses = 16;
		this.availableLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
        'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
        't', 'u', 'v', 'w', 'x', 'y', 'z'],
        this.currentWord = this.availableWords[0];
        this.lettersGuessed = 0;
        console.log(this.currentWord);

        // Reset Game Display
		this.displayGame();
		this.wordDisp.textContent = "_";
		this.guessLtrDisp.textContent = "";
		this.displayWord = [];
		for(var i=0; i<this.currentWord.length; i++){
	        if(this.currentWord.charAt(i).match(/[a-z]/i)){
	          this.displayWord.push("_");
	        } else {
	          this.displayWord.push(" ");
	        }
	    }

	    this.wordDisp.textContent = this.displayWord.join(" ");

	},
	displayGame: function(){
		
		//Updates Game Display
		this.guessDisp.textContent = this.guesses;
		this.winDisp.textContent = this.wins;
	},
	checkGuess: function(userGuess){

		// Check if what they selected is available
		if(this.availableLetters.indexOf(userGuess) > -1){
			this.warnDisp.textContent = "";
			// if it is we check it versus the current word
			if(this.currentWord.includes(userGuess)){
				console.log("Letter Pressed " + userGuess);
				

			     for(j=0; j<this.currentWord.length; j++){
			     	console.log("Display ran");
			        if(this.currentWord.charAt(j)===userGuess){
			          this.displayWord[j] = userGuess;
			          this.lettersGuessed++;
			          this.wordDisp.textContent = this.displayWord.join(" ");
			          console.log(this.letterGuessed);
			        }
			     }

			     
				// check if user guesses has reached length of the word
				if(this.lettersGuessed === this.currentWord.length ){
					// if so user has won!
					console.log("User won!");
					this.wins++;
					this.isGameOver = true;
					this.wordDisp.textContent = this.displayWord.join(" ");
				}
						
				
			} else {
				// otherwise then we see if they still have guesses left
				if(this.guesses < 1){
					// if they dont then Game Over
					this.isGameOver = true;
				} else {
					// if they do then we remove a guess and add their current guess to the list of guessed letters and remove from valid guesses
					this.availableLetters = this.availableLetters.filter( a => a !== userGuess);
					this.guesses--;
					this.guessLtrDisp.textContent += userGuess + ", " ;
				}
			}
		} else {
			this.warnDisp.textContent = "You didn't enter a valid letter. Please try again.";
		}
	}
}

// Start Game
game.startGame(currentWordDisp, currentGuessDisp, winsDisp, guessLetterDisp, warningDisp);

// Check User Input for Key pressed
document.onkeyup = function(e){

	// Check if Game is Over
	if(game.isGameOver === false){
		// Check User Input and see if they won
		game.checkGuess(e.key);
		game.displayGame();
	} else {
		// Restart the game
		game.startGame(currentWordDisp,currentGuessDisp, winsDisp, guessLetterDisp, warningDisp);
		console.log("Restarted Game");
		
	}
	
}