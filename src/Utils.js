(function(){
  LifeGamification.utils = {};
  LifeGamification.startTime = 0;
  var refreshTimer;

  LifeGamification.utils.setStartTime = function () {
    return new Promise((resolve, reject) => {
      LifeGamification.repository.getTime()
      .then(function(time){
        if(time){
          LifeGamification.startTime = time;
          resolve();
        }
      });
    });
  }

  LifeGamification.utils.startTiming = function () {
    let currentTime = new Date().getTime();
    LifeGamification.repository.setTime(currentTime)
    .then(LifeGamification.utils.handleTimer());
  }

  LifeGamification.utils.endTiming = function () {
    LifeGamification.repository.setTime(0);
    clearInterval(refreshTimer);
    LifeGamification.view.setTimerTime("0");
  }

  calcWhatTimeIsIt = function () {
    let currentTime = new Date().getTime();
    const timeDiff = Math.floor((currentTime - LifeGamification.startTime) / 1000);
    return timeDiff;
  }

  LifeGamification.utils.handleTimer = function () {
    LifeGamification.utils.setStartTime()
    .then(function() {
      if(LifeGamification.startTime != 0){
        LifeGamification.view.setTimerTime(calcWhatTimeIsIt);
        refreshTimer = setInterval(function() {
          LifeGamification.view.setTimerTime(calcWhatTimeIsIt);
        }, 1000);
      }
    });
  }
})();
