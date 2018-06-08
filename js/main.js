$(function() {
    var startGame = function() {
        var level = $('#level').val();
        var totalRow = 2+level*2;
        var totalBox = totalRow*totalRow;
        for (let i = 0; i < totalBox; i++) {
            $( "#game" ).add( "div" );
            console.log(i)
        }
        console.log($( "#game" ));
    }
    $('#new').click(startGame)
    startGame();
    
    
    
  });