// setup variables
var $memoryGame = $('#memory-game');
var $mainControls = $('#main-controls');
var $restartBtn = $mainControls.find('#restart');
var $movesEl = $mainControls.find('#moves span');
var $ratingEl = $mainControls.find('#star-rating');
var $ratingElItems = $ratingEl.find('i');

var cardSymbol = ["address-book", "address-book",
    // "adjust", "adjust",
    // "area-chart", "area-chart",
    // "asl-interpreting", "asl-interpreting",
    // "audio-description", "audio-description",
    // "bank", "bank",
    // "battery-4", "battery-4",
    // "bell", "bell",
    // "bluetooth", "bluetooth",
    // "calculator", "calculator",
    // "camera-retro", "camera-retro",
    // "coffee", "coffee"
];

var flipped = [];
var match = 0;
var moves = 0;
var standardDelay = 1000;
var longDelay = standardDelay * 2;
var cardPairs = cardSymbol.length / 2;

// game timer
// Reference: https://stackoverflow.com/questions/19429890/javascript-timer-just-for-minutes-and-seconds
var sec = 0;
var min = 0;
var getTime;
var handler = function() {
    sec++;
    if (sec == 60) {
        sec = 0;
        min++;
        if (min == 60) min = 0;
    }
    return (min < 10 ? "0" + min : min) + ":" + (sec < 10 ? "0" + sec : sec);
};
setInterval(handler, 1000);

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
    $memoryGame.empty(); // clear deck
    shuffle(cardSymbol);
    // reset vars
    match = 0;
    moves = 0;
    sec = 0;
    min = 0;
    $movesEl.html(moves);
    for (var i = 0; i < cardSymbol.length; i++) {
        $memoryGame.append($('<li class="card white-shadow animated"><i class="fa fa-' +
            cardSymbol[i] + '"></i></li>'));
    }
}

// set star rating and track diamond count
function setDiamonds(moves) {
    var diamonds = 3;
    if (moves > 10 && moves < 20) {
        $ratingElItems.eq(2).remove();
        diamonds = 2;
    } else if (moves > 21 && moves < 28) {
        $ratingElItems.eq(1).remove();
        diamonds = 1;
    } else if (moves > 29) {
        $ratingElItems.eq(0).removeClass('fa fa-diamond').html('Outta diamonds!');
        diamonds = 0;
    }
    return {
        loot: diamonds
    }; // return object key:value pair to use later
}

// click card behavior
// Reference: https://stackoverflow.com/questions/9478413/not-selector-on-click-event
$memoryGame.on('click', '.card:not(".match, .open")', function() {
    if ($('.opened').length > 1) {
        return true;
    } //if card opened, no click event
    var $this = $(this);
    var card = $this.get(0).innerHTML;

    $this.addClass('open opened flipInY');
    flipped.push(card); // put i element into array, compare later

    // compare with first flipped card to compare match or no match
    if (flipped.length > 1) {
        setTimeout(function() {
            $memoryGame.find('.open').removeClass('flipInY');
        }, standardDelay);
        if (card === flipped[0]) {
            // if match, add match class, animate bounce
            setTimeout(function() {
                $memoryGame.find('.open').addClass('match infinite bounce');
            }, standardDelay);
            setTimeout(function() {
                $memoryGame.find('.match').removeClass('open opened infinite bounce');
            }, longDelay);
            match++; // verified match count up
        } else {
            setTimeout(function() {
                $memoryGame.find('.open').removeClass('open opened');
            }, standardDelay);
        }

        flipped = []; // reset flipped array to compare new set
        moves++;
        setDiamonds(moves);
        $movesEl.html(moves);
    }

    // endgame if all cards are flipped
    if (cardPairs === match) {
        var loot = setDiamonds(moves).loot; // get latest diamond count
        setTimeout(function() {
            alertify.confirm('Congrats! It took you ' + handler() + ' in ' + moves +
                ' moves, and have ' + loot + ' diamonds left. Would you like to play again?',
                function() {
                    go();
                },
                function() {
                    return;
                });
        }, standardDelay);
    }
})

// restart game
$restartBtn.on('click', function() {
    alertify.confirm('Are you sure you want to restart the game!?',
        function() {
            go();
        },
        function() {
            return;
        });
})

// start game
go();
