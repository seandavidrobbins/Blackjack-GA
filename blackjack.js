// *************** BLACKJACK ***************** //

window.onload = function(){


    // **** Create Cards ***** //
  var Card = function (suit, number){
        // The number of the card in the deck. (1-52) */
      this.getNumber = function (){
          return number;
      };
      // The name of the suit.
      this.getSuit = function (){
          var suitName = '';
          switch (suit){
              case 1: suitName = "Hearts";
                  break;
              case 2: suitName = "Clubs";
                  break;
              case 3: suitName = "Spades";
                  break;
              case 4: suitName = "Diamonds";
                  break;
          }
          return suitName;
      };
      // http://www.w3schools.com/html/html_symbols.asp The HTML symbol of the suit. */
      this.getSymbol = function (){
          var suitName = '';
          switch (suit){
              case 1: suitName = "&hearts;";
                  break;
              case 2: suitName = "&clubs;";
                  break;
              case 3: suitName = "&spades;";
                  break;
              case 4: suitName = "&diams;";
                  break;
          }
          return suitName;
      };
      // The value of the card for scoring. */
      this.getValue = function (){
          var value = number;
          if (number >= 10){
              value = 10;
          }
          if(number === 1) {
              value = 11;
          }
          return value;
      };
      // The full name of the card. Suit and
      this.getName = function (){
          var cardName = '';
          switch (number){
              case 1: cardName = "A";
                  break;
              case 13: cardName = "K";
                  break;
              case 12: cardName = "Q";
                  break;
              case 11: cardName = "J";
                  break;
              default: cardName = number;
                  break;
          }
          return cardName+this.getSymbol();
      };
  };
    /** constructor **/
  var Deck = function (){
      var cards = [];
      /** Creates a new set of cards. */
      var newCards = function (){
          var i,
              suit,
              number;
          for (i = 0; i < 52; i++){
              suit = i % 4 + 1;
              number = i % 13 + 1;
              cards.push(new Card(suit,number));
          }
      };
      /* Call new cards */
      newCards();
      /** Shuffles the cards.
       *  array of Cards representing the shuffled version of the deck.
       */
      this.shuffle = function (){
          for(var j, x, i = cards.length; i; j = parseInt(Math.random() * i), x = cards[--i], cards[i] = cards[j], cards[j] = x);
          return this.getCards();
      };
      /** an array of cards representing the Deck. */
      this.getCards = function (){
          return cards;
      };
      /** Deals the top card off the deck. Removes it from the Deck. */
      this.deal = function (){
          if (!cards.length){
              console.log("New Cards!!");
              newCards();
              this.shuffle();
          }
          // .pop removes last card in the array
          return cards.pop();
      };
  };
  // /** Card constructor
  var Hand = function (deck){
      var cards = [];

      /* Deal two cards to begin. */
      cards.push( deck.deal(), deck.deal());
      /** array of Cards representing the Hand. */
      this.getHand = function (){
          return cards;
      };
      /** score of the Hand. */
      this.score = function (){
          var i,
              score = 0,
              cardValue = 0, // Saving the Card's value
              aces = 0; // Saves the # of Aces in the Hand

          for (i = 0; i < cards.length; i++){
              cardValue = cards[i].getValue();
              if (cardValue == 11) {
                  aces += 1;
              }
              score += cardValue;
          }
          /* Check to see if Aces should be 1 or 11 */
          while (score > 21 && aces > 0){
              score -= 10;
              aces -=1;
          }
          return score;
      };
      /** separated list of Card names in the Hand. */
      this.printHand = function (){
          var handArray = [],
              i;

          for (i=0;i<cards.length;i++){
              handArray.push(cards[i].getName());
          }
          return handArray.join();
      };
      /** Adds a Card from the Deck into the Hand. */
      this.hitMe = function (){
          if (cards.length < 7){
              cards.push(deck.deal());
          }
      };
      /** HTML representation of the Cards in the Hand. */
      this.toHtml = function (){
          var handArray = [],
              i;

          for (i = 0; i < cards.length; i++){
              handArray.push('<div class="card ',cards[i].getSuit(),' ',cards[i].getNumber(),'">',cards[i].getName(),'</div>');
          }
          return handArray.join('');
      };
  };

  /** GAMEPLAY */
  (function (){
      /* Set up our Game's Deck */
      var deck = new Deck();

      /* win/lose ratio */
      var wins = 0;
      var losses = 0;

      /** SCORING AND WINNER DECLARATION */
      var declareWinner = function (userHand, dealerHand){
          var outcome = '',
              dealerScore = dealerHand.score(),
              userScore = userHand.score();

          /* GAME CONDITIONS */
          if (userScore > 21 || dealerScore === 21){
              outcome = "You lose!";
              losses++;
          }else if (dealerScore > 21 || userScore === 21 || userScore > dealerHand.score()){
              outcome = "You win!";
              wins++;
          }else if (dealerScore > userScore){
              outcome = "You lose!";
              losses++;
          }else if (dealerScore === userScore){
              outcome = "You tied!";
          }
          /* Game Outcome */
          return outcome+"<br />Dealer: "+dealerHand.score()+"<br />You: "+userScore;
      };

      /** Dealer Conditions */
      var dealerHand = function (){
          var hand = new Hand(deck);

          while (hand.score() < 17){
              hand.hitMe();
          }
          return hand;
      };

      var playerHand;

      /* Variable Selectors */
      var placeBetButton = document.querySelector('#placeBetButton'),
          hitButton = document.querySelector("#hitMeButton"),
          stayButton = document.querySelector("#stayButton"),
          dealButton = document.querySelector("#dealButton"),
          score = document.querySelector("#playerScore"),
          playerHand = document.querySelector('#playerHand'),
          dealerHand = document.querySelector('#dealerHand');

          /** Show the place bet and deal button, hide others. */
          // document.getElementById(id).style.visibility = "hidden";
          // document.getElementById(id).style.visibility = "visible";
      var showDeal = function (){
          document.getElementById('#placeBetButton').style.visibility = "visible";
          document.getElementById('#dealButton').style.visibility = "visible";
          document.getElementById('#hitMeButton').style.visibility = "hidden";
          document.getElementById('#stayButton').style.visibility = "hidden";
          document.getElementById('#score').style.visibility = "hidden";
      };

          /** Show the control buttons, hide Deal. */
      var showControls = function (){
          document.getElementById('#placeBetButton').style.visibility = "visbible";
          document.querySelector('#hitMeButton').style.visibility = "visible";
          document.querySelector('#stayButton').style.visibility = "visible";
          document.querySelector('#dealButton').style.visibility = "hidden";
            };

      /** Update your score and card display. */
      var updateUI = function (){
          /* Cards */
           playerHand.innerHTML += playerHand.toHtml();
          /* Score */
          score.getElementsByClassName(".digits").toHtml(playerHand.score());
          document.querySelector("#wins").innertext(wins);
          document.querySelector("#losses").innertext(losses);
      };

      /* Deal Button */
      dealButton.addEventListener('click', function (){
          playerHand = new Hand(deck);
          updateUI();
          showControls();
      });

      /* Hit Button */
      hitMeButton.addEventListener('click', function (){
          playerHand.hitMeButton();
          if (playerHand.getHand().length >= 7 || playerHand.score() > 21){
              stayButton.trigger('click');
          }else{
              updateUI();
          }
      });

      /* Stand Button */
      stayButton.addEventListener('click', function (){
          playerHand.html(declareWinner(playerHand, dealerHand()));
          showDeal();
      });

      /* SHUFFLE DECK */
      deck.shuffle();
  }());
  };
