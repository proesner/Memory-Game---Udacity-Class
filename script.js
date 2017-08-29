var $memoryGame = $('#memory-game');
var $memoryGameEl = $memoryGame.find('i');
var $mainControls = $('#main-controls');
var $restartBtn = $mainControls.find('#restart');
var $movesEl = $mainControls.find('#moves span');
var $ratingEl = $mainControls.find('#star-rating');
var $ratingElItems = $ratingEl.find('i');

var cardSymbol = ["address-book", "address-book",
                  "adjust", "adjust",
                  "area-chart", "area-chart",
                  "asl-interpreting", "asl-interpreting",
                  "audio-description", "audio-description",
                  "bank", "bank",
                  "battery-4", "battery-4",
                  "bell", "bell",
                  "bluetooth", "bluetooth",
                  "calculator", "calculator",
                  "camera-retro", "camera-retro",
                  "coffee", "coffee"];

var flipped = [];
var match = 0;
var moves = 0;

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
  for (var i = 0; i < cardSymbol.length; i++) {
    $memoryGame.append($('<li class="card white-shadow"><i class="fa fa-' + cardSymbol[i] + '"></i></li>'));
  }
}

// set star rating
function setStarRating(moves) {
  if (moves > 10 && moves < 20) {
    $ratingElItems.eq(2).remove();
  }
  else if (moves > 21 && moves < 28) {
    $ratingElItems.eq(1).remove();
  }
  else if (moves > 29) {
    $ratingElItems.eq(0).removeClass('fa fa-diamond').html('Outta diamonds!');
  }
}


// click card behavior
// Reference: https://stackoverflow.com/questions/9478413/not-selector-on-click-event
$memoryGame.on('click', '.card:not(".match, .open")', function(e) {
  var $this = $(this);
  var card = $this.get(0).innerHTML;

  $this.addClass('open show');
  flipped.push(card); //put i element into array, compare later

  //compare with first flipped card, compare match or no match
  if (flipped.length > 1) {
    if (card === flipped[0]) {
      // if match, add match class, animate and
      $memoryGame.find('.open').addClass('animated infinite bounce match');
      setTimeout(function() {
        $memoryGame.find('.match').removeClass('open animated infinite bounce');
      }, 1000);
      match++; //verified match
    } else {
      // if not a match, animate
      $memoryGame.find('.open').addClass('animated infinite jello nomatch');
      setTimeout(function() {
        $memoryGame.find('.open').removeClass('animated infinite jello');
      }, 500);
      //if not a match, hide flipped cards
      setTimeout(function() {
        $memoryGame.find('.open').removeClass('open nomatch animated infinite');
      }, 1000);
    }

      flipped = []; // reset flipped array to compare new set
      moves++
      setStarRating(moves);
      $movesEl.html(moves);
    }
    console.log('cardPairs= ' + cardPairs + ' match= ' + match);
})

//restart game
$restartBtn.on('click', function() {
  alertify.confirm("Are you sure you want to restart the game!?", function () {
    go();
}, function() {
    return;
})
})

//endgame if all cards are flipped
if (cardPairs === match) {
  //setRating(moves);
  var score = score // to do, set score
  setTimeout (function() {
    alertify.confirm("Congrats! You've won in " + moves + " moves. Would you like to play again?", function () {
      go();
  }, function() {
      return;
  })
  }, 500);
}

//start game
go();
