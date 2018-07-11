$(function() {
    var startGame = function() {
        var level = $('#level').val();
        var totalRow = 5+level*4;
        var totalBox = totalRow*totalRow;
        $( "#game").css('width', 30*totalRow+'px');
        $( "#game" ).html( "" );
        for (let i = 0; i < totalBox; i++) {
            var isBomb = Math.floor(Math.random()*5);
            $( "#game" ).append( "<div data-bomb="+isBomb+"></div>" );
        }
    }
    
    $( "#game" ).click('div',function clickFn(e) {
        console.log(e.target)
    })
    $('#new').click(startGame)
    startGame();
});