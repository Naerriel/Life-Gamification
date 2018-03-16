(function(){
  LifeGamification.utils = {};
  LifeGamification.refreshTimer;

   LifeGamification.utils.displayTimeText = function(time) {
    time = Math.floor(time / 1000);
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

  LifeGamification.utils.calcTime = function(startTime){
    const now = new Date().getTime();
    return now - startTime;
  }
})();
