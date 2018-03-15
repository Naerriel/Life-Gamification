(function(){
  LifeGamification.utils = {};
  LifeGamification.work = {};
  LifeGamification.refreshTimer;

  LifeGamification.utils.setStartTime = function () {
    return new Promise((resolve, reject) => {
      LifeGamification.repository.getWork()
        .then(function(result){
          if(result){
            LifeGamification.work = result;
            resolve();
          }
        });
    });
  }

  LifeGamification.utils.startTiming = function () {
    if(!($('.timer__select-skill').val())){
      console.log("Error: Add a skill first.");
      return;
    }
    let currentTime = new Date().getTime();
    let developedSkillName = $('.timer__select-skill').val();
    LifeGamification.repository
      .setWork({startTime: currentTime, skillName: developedSkillName})
      .then(LifeGamification.utils.handleTimer());
  }

  LifeGamification.utils.endTiming = function () {
    const skill = LifeGamification.
      skillsCollection[LifeGamification.work.skillName];
    const expToAdd = Math.floor(calcTime(LifeGamification.work.startTime) / 60);
    LifeGamification.models.updateExp(skill, expToAdd);

    LifeGamification.repository.setWork({});
    clearInterval(LifeGamification.refreshTimer);
    LifeGamification.view.finishTimer();
  }

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

  const calcTime = function (startTime) {
    const currentTime = new Date().getTime();
    return Math.floor(
      (currentTime - startTime) / 1000);
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
