
// ========== Game.js ==========
/*
	Version: 2.0
	Description: Creates a game object that plays Hangman Game with a Castlevania Based Theme
*/

// ========== Hangman Game ==========
var game = {
	// ========== Game Variables ==========
	availableWords: ["simon", "ricther", "zombie", "axeman", "alucard", "dracula", "maria", "belmont", "vampire", "trevor", "death", "soma", "ferryman", "sypha", "isaac", "shaft", "librarian", "nathan", "gabriel"],
	currentWord: "",
	displayWord: [],
	availableLetters: [],
	guesses: 0,
	wins: 0,
	goodLetterGuess: 0,
	isGameOver: false,
	isShown: false,
	// ========== Display Hooks ==========
	wordDisp: {},
	guessDisp: {},
	winDisp: {},
	guessLtrDisp: {},
	warnDisp: {},
	// ========== Sound Variables ==========
	goodGuess: new Howl({
		src:['assets/sounds/22.wav'],
	}),
	badGuess:new Howl({
		src:['assets/sounds/Blade Toss.wav'],
	}),
	gameOverSound: new Howl({
		src:['assets/sounds/36.mp3'],
	}),
	// warningSound: new Howl({
	// 	src:['assets/sounds/Candle Cut.wav'],
	// 	buffer: true,
	// }),

	// ========== Game Functions ==========

	/*
		========= startGame() =========
		startGame takes in objects as arguments and passes them into the game object where it stores them
		into the appropriate variables for each display for the game. 

		It will then initalize all game variables
		and display them to the user using the provided display objects

		NOTE: arguments must be objects

		startGame(obj currentWordDisp, obj currentGuessDisp, obj winsDisp, obj guessLetterDisp, obj warningDisp)
	*/
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
        this.currentWord = this.availableWords[Math.floor(Math.random() * this.availableWords.length)];
        this.goodLetterGuess = 0;

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
	    this.warnDisp.textContent = "";

	},

	/*
		========= displayGame() =========
		displayGame will update the game display for the user.

		NOTE: Display Hooks have to already be provided to startGame() or this will not work

		displayGame()
	*/
	displayGame: function(){
		
		//Updates Game Display
		this.guessDisp.textContent = this.guesses;
		this.winDisp.textContent = this.wins;
	},

	/*
		========= checkGuess() =========
		checkGuess will take a users input and run the game logic on it.


		========= Game Logic ========
		First Check: Is the user input valid? 
						Valid input is all lowercase letters a - z
						Invalid input is anything else (example: Shift, Enter, 0 - 9, etc.)
						If it is then we can check to see if it is in the currentWord
						If not then we need to see if it is already guessed or if it is invalid
			Second Check: Is the user input in the currentWord? 
							If it is then we process the letter
								Loop through the displayWords Array and replace all the _ with the user's letter. 
									From there we track the goodGuesses, 
									remove the letter from avaiable guesses, and update the display.
								Then check if they have guessed all the letters in currentWord
									If they have
										Game is won.
										Update Display
										set isGameOver to true and game ends
							If it is not then we check how many guesses they have left.
								If they do then 
									we remove a guess, 
									remove the user guess from avaiable guesses 
									update the game
								If they have none then we set 
									Update Display for game over
									isGameOver to true and the game ends



		NOTE: User Input must be a string

		checkGuess(string UserGuess)
	*/
	checkGuess: function(userGuess){

		// Check if what they selected is available
		if(this.availableLetters.indexOf(userGuess) > -1){
			this.warnDisp.textContent = "";

			// if it is we check it versus the current word
			if(this.currentWord.includes(userGuess)){
				
				// We found a match
				for(var i=0; i<this.currentWord.length; i++){
			        if(this.currentWord.charAt(i)===userGuess){
			          this.displayWord[i] = userGuess;
			          this.goodLetterGuess++;
			          this.wordDisp.textContent = this.displayWord.join(" ");
			          this.availableLetters = this.availableLetters.filter( a => a !== userGuess);
			        }
			    }

			    // Play goodGuess Sound Effect
			    this.goodGuess.play();
			     

			     
				// check if user's amount of good guesses has reached length of the word
				if(this.goodLetterGuess === this.currentWord.length ){
					// if so user has won!
					this.wins++;
					this.isGameOver = true;
					this.wordDisp.textContent = this.displayWord.join(" ");
					this.warnDisp.textContent = "You Won!!! Press Any Key to restart!";
				}
						
				
			} else {
				// otherwise then we see if they still have guesses left
				if(this.guesses > 0){
					this.badGuess.play();
					// if they do then we remove a guess and add their current guess to the list of guessed letters and remove from valid guesses
					this.availableLetters = this.availableLetters.filter( a => a !== userGuess);
					this.guesses--;
					this.guessLtrDisp.textContent += userGuess + " " ;
				} else {
					// play Game Over
					this.gameOverSound.play();
					// if they dont then Game Over
					this.warnDisp.textContent = "You lost! Press Any Key to restart!";
					this.wins = 0;
					this.isGameOver = true;
					

				}
			}
		} else {
			//this.warningSound.play();
			// Check User Input
			if(userGuess.match(/^[a-z]+$/)){
				this.warnDisp.textContent = "You have already guessed " + userGuess;
			} else {
				// Else they didn't enter a valid key tell
				this.warnDisp.textContent = "You didn't enter a valid letter. Please try again.";
			}
		}
	}
}

// ========== Javascript Setup ==========
/*
	This section is where we setup the javascript to grab the displays we are using in HTML.
	We will pass the selected objects into the game object using the startGame method later.
	
	Aftewards we run the game.startGame() passing in the neccesary Display Hooks for the game object to use.
	
	Then we setup an onkeyup event on the DOM to get the user's input.

	Finally we will check if the isGameOver is true and if not we will check the user's input and see if they
	entered a valid guess.
*/

// Grab Display Hooks from HTML

var currentWordDisp = document.querySelector("#currentWord");
var currentGuessDisp = document.querySelector("#guesses");
var winsDisp = document.querySelector("#wins");
var guessLetterDisp = document.querySelector("#guessedLetters");
var warningDisp = document.querySelector("#warning");

// Starts Game
game.startGame(currentWordDisp,currentGuessDisp, winsDisp, guessLetterDisp, warningDisp);

// User Input Runs the game loop
document.onkeyup = function(e){
	// Check if Game is Over
	if(game.isGameOver === false){
		// Check User Input for Key pressed	
		game.checkGuess(e.key);
		game.displayGame();
	} else {
		// Restart the game
		game.startGame(currentWordDisp,currentGuessDisp, winsDisp, guessLetterDisp, warningDisp);
		console.log("Restarted Game");
		
	}
}

