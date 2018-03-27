(function(){
  LifeGamification.timer = {};

  const appendSkillTimer = function(skill, number){
    if(skill.timer.startTime){
      return `
        <p>
          <span class="timer__time-worked" id="time${number}">HH:MM:SS</span>
          <span>Working on:</span>
          <span class="timer__skillName">${skill.name}</span>
          <button class="timer__finish-button" id="finish${number}">Finish</button>
        </p>
      `;
    }
    return "";
  }

  LifeGamification.timer.render = function (skills) {
    let code = `
      <div class="timer__wrapper">
        <p class="timer__header">Current Timers:</p>
      `;
    for (let name in skills){
      if(skills[name].timer.startTime){
        code += appendSkillTimer(skills[name], LifeGamification.skillsView.length);
        LifeGamification.skillsView.push(skills[name]);
      }
    }
    code += `
        <span class="timer__message">Select skill:</span>
        <select class="timer__select-skill">
    `;
    for (let name in skills){
      code += `<option value="${name}">${name}</option>`;
    }
    code += `
        </select>
        <button class="timer__start-button">Start</button>
      </div>
    `;
    $(".timer").html(code);
    handleTimerStartButton();
    handleTimer(LifeGamification.skillsView);
  }

  const displayWorkingTime = function (number, timeText){
    $(`#time${number}`).html(timeText);
  }

  const handleTimerStartButton = function () {
    $(".timer__start-button").click(function(){
      const skillName = $(".timer__select-skill").val();
      const skill = LifeGamification.skillsCollection[skillName];
      if(!skill.timer.startTime){
        LifeGamification.models.startWork(skill, "normal")
          .then(LifeGamification.main.resetView);
      } else{
        console.log("Finish your current work first!");
      }
    });
  }

  const handleTimer = function (skillsView) {
    const updateTimes = function() {
      for(let number = 0; number < skillsView.length; number++){
        const skill = skillsView[number];
        const timeLapsed = LifeGamification.utils.calcTime(skill.timer.startTime);
        displayWorkingTime(number, 
          LifeGamification.utils.displayTimeText(timeLapsed));
      }
    }
    updateTimes();
    LifeGamification.timer.refreshTimer = setInterval(function(){
      updateTimes();
    }, 1000);
  }

  LifeGamification.timer.handleTimerFinishButtons = function () {
    $(".timer").on("click", ".timer__finish-button", function (){
      const skillNr = this.id.replace('finish', '');
      const skill = LifeGamification.skillsView[skillNr];
      LifeGamification.models.finishWork(skill)
        .then(LifeGamification.main.resetView);
    });
  }
})();
