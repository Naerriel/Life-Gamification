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
    const expToAdd = parseInt($('.timer__time').text());
    LifeGamification.models.updateExp(skill, expToAdd);

    LifeGamification.repository.setWork({});
    clearInterval(LifeGamification.refreshTimer);
    LifeGamification.view.finishTimer();
  }

  calcWhatTimeIsIt = function () {
    let currentTime = new Date().getTime();
    const timeDiff = Math.floor(
      (currentTime - LifeGamification.work.startTime) / 1000);
    return timeDiff;
  }

  LifeGamification.utils.handleTimer = function () {
    LifeGamification.utils.setStartTime()
    .then(function() {
      if(LifeGamification.work.startTime){
        LifeGamification.view.startTimer(LifeGamification.work.name);
        LifeGamification.view.setTimerTime(calcWhatTimeIsIt);
        LifeGamification.refreshTimer = setInterval(function() {
          LifeGamification.view.setTimerTime(calcWhatTimeIsIt);
        }, 1000);
      }
    });
  }
})();
