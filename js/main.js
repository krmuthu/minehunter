$(function() {
    var num;
    var totalBox;
    var openAlready = [];
    var gameOver = false;
    var totalBomb = 0;
    var highscore = localStorage.getItem("ms_highscore") || 0;
    $('#highscore').html(highscore);
    var startGame = function() {
        //reset game
        totalBomb = 0;
        gameOver = false;
        openAlready = [];
        $('#gameover').hide();
        $('#score').html('0');
        $('#win').hide();
        var level = $('#level').val();
        num = 5+level*4;
        totalBox = num*num;
        $( "#game").css('width', 30*num+'px');
        $( "#game" ).html( "" );
        for (let i = 0; i < totalBox; i++) {
            var isBomb = Math.floor(Math.random()*5);
            if(isBomb){
                $( "#game" ).append( '<div class="box" data-id="'+i+'" ></div>' );
            }else {
                totalBomb++;
                $( "#game" ).append( '<div class="box" data-id="'+i+'" data-bomb="1"></div>' );
            }
        }
    }
    var getNeighbour = function getNeighbour(id,camefrom) {
        var neighbour = [];
        if(id%num != 0){
            neighbour.push(id-1);
            if(id > (num-1)){
                neighbour.push(id-num-1);
            }
            if(id < totalBox-num){
                neighbour.push(id+num-1);
            }
        }
        if(id%num != (num-1)){
            neighbour.push(id+1);
            if(id > 8){
                neighbour.push(id-num+1);
            }if(id < totalBox-num){
                neighbour.push(id+num+1);
            }
        }
        if(id > (num-1)){
            neighbour.push(id-num);
        }
        if(id < totalBox-num){
            neighbour.push(id+num);
        }
        return neighbour.filter(function (params) {
            return  openAlready.indexOf(params) == -1;
        });
    }
    var checkForBomb = function checkForBomb(arr) {
        var numberOfBomb = 0;
        arr.forEach(function checkFn(id) {
            if($('div[data-id="'+id+'"]').data('bomb') === 1){
                numberOfBomb++;
            };
        });
        return numberOfBomb;
    }
    var openBox = function openBox(id) {
        if(openAlready.indexOf(id) !== -1) return false;
        var neighbour = getNeighbour(id);
        var numberOfBomb = checkForBomb(neighbour);
        $('div[data-id="'+id+'"]').addClass('revealed');
        openAlready.push(id);
        var score = openAlready.length;
        $('#score').html(score);
        if(score > highscore){
            $('#highscore').html(score);
            localStorage.setItem("ms_highscore", score);

        }
        if(score == totalBox - totalBomb) {
            $('#win').show();
        }
        if(numberOfBomb === 0){
            // open neighbour
            neighbour.map(function name(params) {
               openBox(params,id);
            });
        }else {
            // revealed number
            $('div[data-id="'+id+'"]').html(numberOfBomb);
        }

    }
    $( "#game" ).click('.box',function clickFn(e) {
        if(gameOver || $(e.target).hasClass('revealed')) return false;
        if($(e.target).data('bomb') == 1) {
            gameOver = true;
            $('#gameover').show();
            $('div[data-bomb="1"]').addClass('blast');
        } else {
            var id = $(e.target).data('id');
            openBox(id);
        };
    })
    $('#new').click(startGame)
    startGame();
});