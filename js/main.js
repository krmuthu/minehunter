$(function() {
    var num;
    var totalBox;
    var openAlready = [];
    var gameOver = false;
    var bomb = [];
    var highscore = localStorage.getItem("ms_highscore") || 0;
    $('#highscore').html(highscore);
    var startGame = function() {
        //reset game
        gameOver = false;
        bomb = [];
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
            $( "#game" ).append( '<div class="box" data-id="'+i+'" ></div>' );
            if(isBomb === 0){
                bomb.push(i);
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
            if(id > num-1){
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
    var blast = function blast(arr) {
        bomb.forEach(function(id){
            $('div[data-id="'+id+'"]').addClass('blast');
        })
    }
    var checkForBomb = function checkForBomb(arr) {
        var numberOfBomb = 0;
        arr.forEach(function checkFn(id) {
            if(bomb.indexOf(id) !== -1){
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
        console.log(bomb.length)
        if(score == totalBox - bomb.length) {
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
        var id = $(e.target).data('id');
        if(bomb.indexOf(id) !== -1) {
            gameOver = true;
            $('#gameover').show();
            blast();
        } else {
            openBox(id);
        };
    })
    $('#game').contextmenu(function(e) {
        if($(e.target).hasClass('box')){
            if($(e.target).hasClass('flag')){
                $(e.target).removeClass('flag').html('')
            }else {
                $(e.target).addClass('flag').html('⚑')
            }
        }
        return false;
    });
    $('#new').click(startGame)
    startGame();
});