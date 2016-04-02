//timer to go with the course view

var hours = 0;
var minutes = 0;
var seconds = 0;
var timeroff = 0; //if 1, clears timer

//timer updates every 1 second
function startTimer(){
  timeroff = 0;
  var timer = setInterval(function(){ increment() },1000);

//begins when user arrives at first checkpoint
  function increment(){
    seconds = seconds + 1;
    if (seconds > 59){
      seconds = 0;
      minutes = minutes + 1;
      if (minutes > 59){
        minutes = 0;
        hours = hours + 1;
      }
    }
    document.getElementById("seconds_ele").innerHTML = seconds;
    document.getElementById("minutes_ele").innerHTML = minutes;
    document.getElementById("hours_ele").innerHTML = hours;

    if (timeroff == 1){
//      alert("cleared");
      clearInterval(timer);
    }
  }
}

//called when user completes course
function clearTimer(){
  timeroff = 1;
}
