// javascript file
var $mainControls = $('#main-controls');
var $memoryGame = $('#memory-game');
var $restartBtn = $mainControls.find('#restart');
var $movesEl = $mainControls.find('#moves span');
var $ratingEl = $mainControls.find('#star-rating');

var cardSymbol = ["bluetooth-connected", "bluetooth-connected", "camera-alt",
                  "camera-alt", "dock", "dock", "gps-dot", "gps-dot",
                  "headset-mic", "headset-mic"];
var flipped = [];
var match, moves;

var cardCount = cardSymbol.length / 2;

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
  return moves;
} 

// set rating


// click card behavior
// Reference: https://stackoverflow.com/questions/9478413/not-selector-on-click-event
$memoryGame.on('click', '.card:not(".match, .open")', function() {
  if($('.show').length > 1) {
    return true;
    console.log('show greater than 1')
  }
  var $this = $(this);
  // var card = $this.context.innerHTML;
  $this.addClass('open show');
  // match.push(card);

  if (flipped > 1) {

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
if (cardCount === match) {
  //setRating(moves);
  var score = score // to do, set score
  setTimeout (function() {
    //trigger modal
  }, 500);
}

//start game
go();
