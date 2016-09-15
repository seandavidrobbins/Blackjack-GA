// ******************** BLACKJACK ********************** //
window.onload = function(){


console.log("Deal em Up!");


// ************ Place Bet ************** //
function placeBet() {
    console.log("line 10");
    var betAmount = document.getElementById("betAmount").value;
    console.log(betAmount);
    var bank = document.getElementById("bank").innerText;
    document.getElementById('bank').innerText = bank - betAmount;
    document.body.appendChild('bank');
};
// ********* Card Constructor Create Deck *********** //
var gameDeck;
var Card = function (suit, number) {
    var cardSuit = suit;
    var cardNumber = number;

    this.getSuit = function () { return cardSuit; };
    this.getNumber = function () { return cardNumber; };
    this.getValueStr = function () {
        switch (cardNumber) {
            case 1: return "Ace";
            case 11: return "Jack";
            case 12: return "Queen";
            case 13: return "King";
            default: return "" + cardNumber;
        }
    };
    this.getSuitStr = function () {
        switch (cardSuit) {
            case 1: return "diamonds";
            case 2: return "hearts";
            case 3: return "spades";
            case 4: return "clubs";
            default: return "[unknown suit value: "+ cardSuit +"]";
        }
    };

    // Get the card's score value.
    // 1 (Ace) : 1 or 11
    // 2 - 10 : card value
    // 11,12,13 (face cards) : 10
    this.getValue = function () {
        if (cardNumber === 1) { return 11; } // Ace
        else if (cardNumber >= 10) { return 10; } // Face card
        else { return cardNumber; } //Any other card type
    };
};

var Deck = function () {
    var fullDeck = [];
    // Create deck programatically (saves typing, should be hard coded)
    for (var i = 1; i <= 52; i++) { fullDeck.push(i); }

    // shuffle deck
    this.shuffle = function () {
        var i,j,x;
        // Iterate over array in reverse
        for (i = fullDeck.length -1; i > 0; i--) {
            // Only select random position based on what is left.
            j = Math.floor(Math.random()*i);
            // Exchange a[j] with a[i]
            x = fullDeck[i];
            fullDeck[i] = fullDeck[j];
            fullDeck[j] = x;
        }
    };

    this.getNewCard = function() {
      // Card number is the full deck less the last number in the array
      console.log("Get new card function line 74");
        var cardNum = fullDeck.pop();
        var val = cardNum % 13 + 1; //
        var suit = Math.ceil(cardNum / 13);
        return new Card(suit, val);
    }
  };


function deal() {
return gameDeck.getNewCard()
};

var Hand = function () {
    var myHand = [];

    // Adds two cards top the hand
    myHand.push(deal());
    myHand.push(deal());

    this.getHand = function () {
        return myHand;
    };
// ****************** SCORING/DECLARING WINNER ******************* //
    this.score = function () {
      // if current hand is equal to 11 return
        var i,x;
        var sum = 0;
        var aces = 0;
        for (i = 0; i < myHand.length; i++) {
            x = myHand[i].getValue();
            if (x === 11) {
                aces++;
                sum++; // Lowest value of an ace
            }
            else { sum += x; }
        }
        while (sum < 21 && aces > 0) {
            // Calulate based on 10 since a 1 was already
            // added above as a minimum for an ace.
            if (sum + 10 <= 21) {
                sum += 10;
                aces--;
            }
            else { break; }
        }
        return sum;
    };

    this.printHand = function () {
        var output = [];
        for (var i = 0; i < myHand.length; i++) {
            output.push(myHand[i].getValueStr() +" of "+ myHand[i].getSuitStr());
        }
        return output.join(", ");
    };

    this.hitMe = function () { myHand.push(deal()); };

    this.busted = function () { return (this.score() > 21); };
};
// While dealer score is less than 17 keep hitting
function playAsDealer() {
    var dealerHand = new Hand();
    while (dealerHand.score() < 17) { dealerHand.hitMe(); }
    return dealerHand;
}
// While player is not busted keep prompting for new card
function playAsUser() {
    var playerHand = new Hand();
    var continueLoop = true;
    while ( continueLoop && !playerHand.busted() )
    {
        continueLoop = console.log(
            "You have: " + playerHand.printHand() +
            "\nScore: " + playerHand.score() +
            "\n\nWould you like another card?");
        if (continueLoop) { playerHand.hitMe(); }
    }
    return playerHand;
}

function declareWinner(userHand,dealerHand) {
    var s = {
        win: "You win!",
        lose: "You lose!",
        tie: "You tied!"
    };
    var dealerScore = dealerHand.score();
    var playerScore = userHand.score();
    if (playerScore > 21) {
        if (dealerScore > 21) { return s.tie; }
        else { return s.lose; }
    }
    else if (dealerScore > 21) { return s.win; }
    else if (playerScore > dealerScore) { return s.win; }
    else if (playerScore < dealerScore) { return s.lose; }
    else { return s.tie; }
}
// ************* GAMEPLAY *********** //
function playGame() {
    gameDeck = new Deck();
    // Shuffle the deck
    gameDeck.shuffle();

    var player = playAsUser();
    var dealer = playAsDealer();

    var winner = "";
    var playerPrompt = (player.busted()) ? "You busted! Score" : "Your score";
    var dealerPrompt = (dealer.busted()) ? "Dealer busted! Score" : "Dealer's score";

    winner += "\n"+ playerPrompt +": "+ player.score();
    winner += " ("+ player.printHand() +")\n";
    winner += dealerPrompt +": "+ dealer.score();
    winner += " ("+ dealer.printHand() +")\n";
    winner += "\n"+ declareWinner(player, dealer);

    console.log(winner);
}

// playGame();


// ************** BLACKJACK LISTENERS/HANDLERS *************** //
var hitMeButton = document.getElementById("hitMeButton");
hitMeButton.addEventListener("click", playGame);

};
