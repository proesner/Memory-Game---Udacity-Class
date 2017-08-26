var $memoryGame = $('#memory-game');
var $mainControls = $('#main-controls');
var $restartBtn = $mainControls.find('#restart');
var $movesEl = $mainControls.find('#moves span');
var $ratingEl = $mainControls.find('#star-rating');

var cardSymbol = ["bluetooth-connected", "bluetooth-connected",
                  "camera-alt", "camera-alt",
                  "dock", "dock",
                  "gps-dot", "gps-dot",
                  "headset-mic", "headset-mic",
                  "smartphone-setting", "smartphone-setting",
                  "gamepad", "gamepad",
                  "network-locked", "network-locked",
                  "videocam", "videocam",
                  "car", "car",
                  "twitter-box", "twitter-box",
                  "closed-caption", "closed-caption"];
var flipped = [];
var match, moves;

var cardPairs = cardSymbol.length / 2;

// shuffle the deck
// Reference: https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
    return a;
}

function go() {
  var board = shuffle(cardSymbol);
  $memoryGame.empty();
  match, moves = 0;
  $movesEl.html(moves);
  $
  //moves.html(moves)
  // $memoryGame.empty();
  for (var i = 0; i < cardSymbol.length; i++) {
    $memoryGame.append($('<li class="card"><i class="zmdi zmdi-' + cardSymbol[i] + '"></i></li>'));
  }
} 

// set rating


// click card behavior
// Reference: https://stackoverflow.com/questions/9478413/not-selector-on-click-event
$memoryGame.on('click', '.card:not(".match, .flipped")', function() {
  var $this = $(this);
  var card = $this.get(0).innerHTML;

  if($('.show').length > 1) {
    return true;
  }

  $this.addClass('open show');
  flipped.push(card);

  //compare with first flipped card
  if (flipped.length > 1) {
    if (card === flipped[0]) {
      $memoryGame.find('.open').addClass('animated infinite bounce match');
      setTimeout(function(){
        $memoryGame.find('.match').removeClass('flipped show animated infinite bounce');
      }, 1000);
      match++; //verified match
    } else {
      $memoryGame.find('.open').addClass('animated infinite bounce nomatch');
      setTimeout(function(){
        $memoryGame.find('.open').removeClass('animated infinite bounce');
      }, 1000);
      setTimeout(function(){
        $memoryGame.find('.open').removeClass('flipped show animated infinite nomatch');
      }, 1000);
      }
      flipped = [];
      moves++
      // setRating(moves);
      $movesEl.html(moves);
    }
  moves++
  //setRating(moves);
  $movesEl.html(moves);
})

//restart game
$restartBtn.on('click', function() {
  alertify.confirm("Are you sure you want to restart the game!?", function () {
    go();
}, function() {
    return;
});
})

//endgame if all cards are flipped
if (cardPairs === match) {
  //setRating(moves);
  var score = score // to do, set score
  setTimeout (function() {
    //trigger modal
  }, 500);
}

//start game
go();
