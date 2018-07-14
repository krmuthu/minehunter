$(function() {
    var num;
    var totalBox;
    var checkAlready = [];
    var startGame = function() {
        var level = $('#level').val();
        num = 5+level*4;
        totalBox = num*num;
        $( "#game").css('width', 30*num+'px');
        $( "#game" ).html( "" );
        for (let i = 0; i < totalBox; i++) {
            var isBomb = Math.floor(Math.random()*5);
            if(isBomb){
                $( "#game" ).append( '<div data-id="'+i+'" ></div>' );
            }else {
                $( "#game" ).append( '<div data-id="'+i+'" data-bomb="1"></div>' );
            }
    
        }
    }
    var getNeighbour = function getNeighbour(id,camefrom) {
        var neighbour = [];
        checkAlready.push(id);
        if(id%num != 0){
            neighbour.push(id-1);
            if(id > 8){
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
        if(id > 8){
            neighbour.push(id-num);
        }
        if(id < totalBox-num){
            neighbour.push(id+num);
        }
        return neighbour.filter(function (params) {
            return  checkAlready.indexOf(params) == -1;
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
    
    var openBox = function openBox(id,camefrom) {
        var neighbour = getNeighbour(id,camefrom);
        
        var numberOfBomb = checkForBomb(neighbour);
        console.log(id,camefrom,neighbour,numberOfBomb)
        if(numberOfBomb === 0){
            // open neighbour
            neighbour.map(function name(params) {
               openBox(params,id);
            });
        }else {
            // reveal number
            $('div[data-id="'+id+'"]').html(numberOfBomb);
        }
    }
    
    $( "#game" ).click('div',function clickFn(e) {
        if($(e.target).data('bomb') == 1) {
            console.log('you clicked on bomb');
        } else {
            var id = $(e.target).data('id');
            console.log(id);
            checkAlready = [];
            openBox(id);
        };
    })
    $('#new').click(startGame)
    startGame();
});