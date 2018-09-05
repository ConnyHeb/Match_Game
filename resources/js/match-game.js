var MatchGame = {};

/*
  Sets up a new game after HTML document has loaded.
  Renders a 4x4 board of cards.
*/

$(document).ready(function(){
  var cardValues = MatchGame.generateCardValues();
  var $htmlGame = $('#game');
  MatchGame.renderCards(cardValues, $htmlGame);
});

/*
  Generates and returns an array of matching card values.
 */
 function getRandomInt(max) {
   return Math.floor(Math.random() * Math.floor(max));
 }

MatchGame.generateCardValues = function () {
  var cardsSorted = [];
  for (var i = 1; i < 9; i++){
    cardsSorted.push(i);
    cardsSorted.push(i);
  };
  var cardsRandom = [];
  while (cardsSorted.length > 0){
    var num = getRandomInt(cardsSorted.length);
    cardsRandom.push(cardsSorted[num]);
    cardsSorted.splice(num, 1);
  };
  return cardsRandom;
};

/*
  Converts card values to jQuery card objects and adds them to the supplied game
  object.
*/

MatchGame.renderCards = function(cardValues, $game) {
  var colors = ["hsl(25, 85%, 65%)", "hsl(55, 85%, 65%)", "hsl(90, 85%, 65%)", "hsl(160, 85%, 65%)", "hsl(220, 85%, 65%)", "hsl(265, 85%, 65%)", "hsl(310, 85%, 65%)", "hsl(360, 85%, 65%)"];
  $game.data('flippedCards', []);
  $game.empty();

  for (var i = 0; i < cardValues.length; i++){
    var $card = $('<div class="card col-3"></div>');
    $card.data('value', cardValues[i]);
    $card.data('flipped', false);
    $card.data('color', colors[cardValues[i]-1]);
    $game.append($card);
  };
  $('.card').click(function(){
    MatchGame.flipCard($(this), $('#game'));
  });
};

/*
  Flips over a given card and checks to see if two cards are flipped over.
  Updates styles on flipped cards depending whether they are a match or not.
 */

MatchGame.flipCard = function($card, $game) {
  if ($card.data('flipped') === true){
    return;
  };

  $card.css("background-color", $card.data('color'));
  $card.text($card.data('value'));
  $card.data('flipped', true);
  $game.data('flippedCards').push($card);

  if ($game.data('flippedCards').length === 2){
    if ($game.data('flippedCards')[0].data('value') === $game.data('flippedCards')[1].data('value')){
      $game.data('flippedCards')[0].css("background-color", "rgb(153, 153, 153)");
      $game.data('flippedCards')[0].css("color", "rgb(204, 204, 204)");
      $game.data('flippedCards')[1].css("background-color", "rgb(153, 153, 153)");
      $game.data('flippedCards')[1].css("color", "rgb(204, 204, 204)");
    } else {
      var $card1 = $game.data('flippedCards')[0];
      var $card2 = $game.data('flippedCards')[1];
      window.setTimeout(function() {
        $card1.css("background-color", "rgb(32, 64, 86)");
        $card1.text("");
        $card1.data('flipped', false);
        $card2.css("background-color", "rgb(32, 64, 86)");
        $card2.text("");
        $card2.data('flipped', false);
      }, 400);
    };
    $game.data('flippedCards', []);
  };
};
