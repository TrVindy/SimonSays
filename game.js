var gamePattern=[];
var buttonColours =["red","blue","green","yellow"];
var userClickedPattern = [];
var start = false;
var level = 0;
startGame();
function startGame(){
$(document).keydown(function(){
    if(!start){
        $("#level-title").text("Level "+ level);
        start = true;
        gamePattern =[];
        nextSequence();
        buttonClick();
    }
});
}
function nextSequence(){  
    userClickedPattern = [];    
    level++;
    $("#level-title").text("Level "+ level);
    var randomNumber = (Math.round(Math.random()*3));
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push (randomChosenColour);
    console.log ("this is from nextsq function "+gamePattern);
    $("#"+randomChosenColour).fadeOut(250).fadeIn(250);
    playSound(randomChosenColour);
}
function buttonClick(){
$(".btn").click(function(){
    var userChosenColour = (this.id);
    //console.log (userChosenColour);
    userClickedPattern.push (userChosenColour);
    //console.log ("this is from buttonclick function "+userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.lastIndexOf(userChosenColour));
});
}
function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColor){
    var buttonActive=document.querySelector("."+currentColor);
    $(buttonActive).addClass("pressed");
    setTimeout(function(){
        $(buttonActive).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel){
    for (let i = 0; i < userClickedPattern.length; i++) {
        if(gamePattern[i]!==userClickedPattern[i]){
            gameOver(); 
        } 
    }
    if(currentLevel===gamePattern.length-1){
        if (compareArrays(userClickedPattern,gamePattern)){
            console.log ("Success!"); 
            setTimeout(nextSequence(), 1000);    
           } else{
            console.log ("Error!");
            gameOver();
          }     
    }
}
function compareArrays (a, b){
    return a.toString() === b.toString();
  };
function gameOver(){
    $("#level-title").text("Game Over!, Wait a Movement to Restart"); 
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    }, 200); 
    playSound("wrong");
    setTimeout(function(){
        location.reload();
    }, 2000); 
}
