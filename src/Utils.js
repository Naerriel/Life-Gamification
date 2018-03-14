(function(){
  LifeGamification.utils = {};
  LifeGamification.work = {};
  LifeGamification.refreshTimer;

  LifeGamification.utils.setStartTime = function () {
    return new Promise((resolve, reject) => {
      LifeGamification.repository.getWork()
      .then(function(work){
        if(work){
          LifeGamification.work = work;
          resolve();
        }
      });
    });
  }

  LifeGamification.utils.startTiming = function () {
    let currentTime = new Date().getTime();
    let skillName = $('.timer__select-skill').val();
    LifeGamification.repository
      .setWork({startTime: currentTime, name: skillName})
    .then(LifeGamification.utils.handleTimer());
  }

  LifeGamification.utils.endTiming = function () {
    const skill = LifeGamification.
      skillsCollection[LifeGamification.work.name];
    const expToAdd = calcTime();
    LifeGamification.models.updateExp(skill, expToAdd);

    LifeGamification.repository.setWork({});
    clearInterval(LifeGamification.refreshTimer);
    LifeGamification.view.finishTimer();
  }

  displayTime = function(time) {
    console.log("here, time = " + time);
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

  calcTime = function () {
    let currentTime = new Date().getTime();
    let timeDiff = Math.floor(
      (currentTime - LifeGamification.work.startTime) / 1000);
    return timeDiff;
  }

  LifeGamification.utils.handleTimer = function () {
    LifeGamification.utils.setStartTime()
    .then(function() {
      if(LifeGamification.work.startTime){
        LifeGamification.view.startTimer(LifeGamification.work.name);
        LifeGamification.view.setTimerTime(displayTime(calcTime()));
        LifeGamification.refreshTimer = setInterval(function() {
          LifeGamification.view.setTimerTime(displayTime(calcTime()));
        }, 1000);
      }
    });
  }
})();
