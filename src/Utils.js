(function(){
  LifeGamification.utils = {};
  LifeGamification.refreshTimer;

  const displayTime = function(time) {
    let hours = Math.floor(time / 3600);
    time %= 3600;
    let minutes = Math.floor(time / 60);
    time %= 60;
    let seconds = time;
    if(hours < 10){
      hours = "0" + hours;
    }
    if(minutes < 10){
      minutes = "0" + minutes;
    }
    if(seconds < 10){
      seconds = "0" + seconds;
    }
    return `${hours}:${minutes}:${seconds}`;
  }

  LifeGamification.utils.handleTimer = function () {
    LifeGamification.utils.setStartTime()
      .then(function() {
        if(LifeGamification.work.startTime){
          LifeGamification.view.startTimer(LifeGamification.work.skillName);
          LifeGamification.view.displayWorkingTime(
            displayTime(calcTime(LifeGamification.work.startTime)));
          LifeGamification.refreshTimer = setInterval(function() {
            LifeGamification.view.displayWorkingTime(
              displayTime(calcTime(LifeGamification.work.startTime)));
          }, 1000);
        }
      });
  }
})();
