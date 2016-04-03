/*Timer to go with the course view.*/

var timeroff = 0; //if 1, clears timer

//timer updates every 1 second
function startTimer(){
  timeroff = 0;

  var hours1 = 0;
  var hours2 = 0;
  var minutes1 = 0;
  var minutes2 = 0;
  var seconds1 = 0;
  var seconds2 = 0;

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
    document.getElementById("seconds2_ele").innerHTML = seconds2;
    document.getElementById("seconds1_ele").innerHTML = seconds1;
    document.getElementById("minutes2_ele").innerHTML = minutes2;
    document.getElementById("minutes1_ele").innerHTML = minutes1;
    document.getElementById("hours2_ele").innerHTML = hours2;
    document.getElementById("hours1_ele").innerHTML = hours1;

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
