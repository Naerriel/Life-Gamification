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
      const typeName = $('.timer__task-type').val();
      let info = {};
      if(typeName === "countdown"){
        info["countdown"] = $('#countdown').val();
      } else if (typeName === "pomodoro"){
        info["length"] = $('#pomodoro-length').val();
        info["break"] = $('#pomodoro-break-length').val();
        info["number"] = $('#pomodoro-number').val();
        info["big-break"] = $('#pomodoro-big-break-length').val();
      }
      const taskType = {"type": typeName, "info": info};

      if(!skill.timer.startTime){
        LifeGamification.models.startWork(skill, taskType)
          .then(resetView);
      } else{
        console.log("Finish your current work first!");
      }
    });
    $('.timer__task-type').change(function(){
      if($('.timer__task-type').val() === "pomodoro"){
        $('.timer__pomodoro-options').html(`
          <p>Length of a pomodoro: <input id="pomodoro-length" type="number" value="25"> minutes</p>
          <p>Length of a break: <input id="pomodoro-break-length" type="number" value="5"> minutes</p>
          <p>Number of pomodoros between big breaks: <input id="pomodoro-number" type="number" value="4"></p>
          <p>Length of a big break: <input id="pomodoro-big-break-length" type="number" value="30"> minutes</p>
        `);
      } else if($('.timer__task-type').val() === "countdown"){
        $('.timer__pomodoro-options').html(`
          <p>Countdown: <input id="countdown" type="number" value="60"> minutes</p>
        `);
      } else {
        $('.timer__pomodoro-options').html("");
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
