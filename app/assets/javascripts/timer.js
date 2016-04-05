/*Timer to go with the course view.*/

var hours1 = 0; //left digit
var hours2 = 0;
var minutes1 = 0;
var minutes2 = 0;
var seconds1 = 0;
var seconds2 = 0;

var timeroff = 0; //if 1, clears timer
var started = 0; //if started > 0, then startTimer is already running


function timerMode(){
  if(started == 0){
    started = 1;
//    alert("first if: "+started);
    timeroff = 0;
    document.getElementById("startButton").innerHTML = "Pause";
    startTimer();
  }
  else{
    started = 0;
//    alert("2nd if: " +started);
    timeroff = 1;
    document.getElementById("startButton").innerHTML = "Resume";
    document.getElementById("resetButton").disabled = false;
  }
}

//resets timer when reset button clicked
function resetTimer(){
  timeroff == 0;

  hours1 = 0;
  hours2 = 0;
  minutes1 = 0;
  minutes2 = 0;
  seconds1 = 0;
  seconds2 = 0;

  timeDisplay();

  document.getElementById("resetButton").disabled = true;
  document.getElementById("startButton").innerHTML = "Start";
  started = 0;
}


//timer updates every 1 second
function startTimer(){

  var timer = setInterval(function(){ increment() },1000);

//begins when user arrives at first checkpoint
  function increment(){
    seconds2 = seconds2 + 1;
    if (seconds2 > 9){
      seconds2 = 0;
      seconds1 = seconds1 + 1;
      if (seconds1 > 5){
        seconds1 = 0;
        minutes2 = minutes2 + 1;
        if (minutes2 > 9){
          minutes2 = 0;
          minutes1 = minutes1 + 1;
          if (minutes1 > 5){
            minutes1 = 0;
            hours2 = hours2 + 1;
            if (hours2 > 9){
              hours2 = 0;
              hours1 = hours1 + 1;
              if (hours1 > 9){
                hours1 = 0;
              }
            }
          }
        }
      }
    }

    timeDisplay();

    if (timeroff == 1){
      clearInterval(timer);
    }
  }
}
//called when user completes course, or when pause button pressed
function clearTimer(){
  timeroff = 1;
  started = 0;
}

//updates the timer display
function timeDisplay(){
  document.getElementById("seconds2_ele").innerHTML = seconds2;
  document.getElementById("seconds1_ele").innerHTML = seconds1;
  document.getElementById("minutes2_ele").innerHTML = minutes2;
  document.getElementById("minutes1_ele").innerHTML = minutes1;
  document.getElementById("hours2_ele").innerHTML = hours2;
  document.getElementById("hours1_ele").innerHTML = hours1;
}
