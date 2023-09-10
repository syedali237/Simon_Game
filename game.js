var userClickedPattern = [];

var gamePattern = [];
var buttonColours =  ["red", "blue", "green", "yellow"];


//FIFTH STEP

// a keyboard key is pressed 
var level = 0 ; 
var started = false ; // keeping track of game


$(document).keypress(function(){
if (!started){
    $("#level-title").text("Level " + level); 
    nextSequence(); 
    started = true;
 }
})


// SECOND STEP
// using jquery detecting a click event 
$(".btn").click(function(event){

    var userChosenColour = $(this).attr("id") ; // assinging it to with the id of the button clicked
    userClickedPattern.push(userChosenColour);
    
    // console.log(userClickedPattern);

    
    playSound(userChosenColour); // playing sounds when clicked

    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
})

//

function checkAnswer(currentLevel){

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){

        console.log("success");

        if (userClickedPattern.length === gamePattern.length){

            setTimeout(function(){
                nextSequence();

            }, 1000);
        }

    }

    else{
        console.log("wrong");

        animateBody(); // flashing body red when game gets over (answer gets wrong) 

        playSound("wrong"); 

        $("h1").text("Game Over, Press Any Key to Start!");

        startOver();
    }
}


// FIRST STEP
function nextSequence(){

    // Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
    userClickedPattern = [];

    level++; // incereasing level of Levels in heading when this function is called
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4); // selecting a random number between 0-3

    var randomChosenColour = buttonColours[randomNumber]; // selceting a colour from the array above
    gamePattern.push(randomChosenColour);  

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100); //animating the box

    playSound(randomChosenColour);


}

//THIRD STEP

function playSound(name){

        // audio playing 
        var audio = new Audio("sounds/" + name + ".mp3"); 
        audio.play();

}


// FOURTH STEP
function animatePress(currentColor){

    $("#" + currentColor ).addClass("pressed");

    // setting a timeout to the animation

    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
      }, 100);
}

function animateBody(){
    $("body").addClass("game-over");

    setInterval(function(){
        $("body").removeClass("game-over");
    }, 200);
}

function startOver(){
    gamePattern.length = 0 ;
    started = false ; 
    level = 0;
}



