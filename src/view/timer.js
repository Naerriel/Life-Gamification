(function(){
  LifeGamification.timer = {};
  const minute = 60000;
  const second = 1000;

  const appendSkillTimer = function(skill, number){
    if(skill.timer.startTime){
      return `
        <p>
          <span class="timer__work-type" id="type${number}">Type</span>
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
        <select class="timer__task-type">
          <option value="normal">Normal</option>
          <option value="countdown">Countdown</option>
          <option value="pomodoro">Pomodoro</option>
        </select>
        <div class="timer__pomodoro-options">
        </div>
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
        info["br"] = $('#pomodoro-break-length').val();
        info["between"] = $('#pomodoro-between').val();
        info["bigbr"] = $('#pomodoro-big-break-length').val();
        info["number"] = $('#pomodoro-number').val();
      }
      const taskType = {"name": typeName, "info": info};

      if(!skill.timer.startTime){
        LifeGamification.models.startWork(skill, taskType)
          .then(LifeGamification.main.resetView);
      } else{
        console.log("Finish your current work first!");
      }
    });
    $('.timer__task-type').change(function(){
      if($('.timer__task_type').val() === "normal"){
        $('.timer__pomodoro-options').html("");
      }
      else if($('.timer__task-type').val() === "countdown"){
        $('.timer__pomodoro-options').html(`
          <p>Countdown: <input id="countdown" type="number" value="60"> minutes</p>
        `);
      }
      else if($('.timer__task-type').val() === "pomodoro"){
        $('.timer__pomodoro-options').html(`
          <p>Length of a pomodoro: <input id="pomodoro-length" type="number" value="25"> minutes</p>
          <p>Length of a break: <input id="pomodoro-break-length" type="number" value="5"> minutes</p>
          <p>Number of pomodoros between big breaks: <input id="pomodoro-between" type="number" value="4"></p>
          <p>Length of a big break: <input id="pomodoro-big-break-length" type="number" value="30"> minutes</p>
          <p>Number of pomodoros: <input id="pomodoro-number" type="number" value="8"></p>
        `);
      }
    });
  }

  const checkIfTaskIsFinishing = function(time){
    if(4 * second <= time && time < 5 * second){
      taskFinishSound();
    }
  }

  const handleTimer = function (skillsView) {
    const updateTimes = function() {
      for(let number = 0; number < skillsView.length; number++){
        const skill = skillsView[number];
        const workInfo = skill.timer.getWorkInfo();

        let text = LifeGamification.utils.displayTimeText(workInfo.time);
        if(workInfo.type.name === "normal"){
          $(`#type${number}`).html("Normal");
        }
        if (workInfo.type.name === "countdown"){
          $(`#type${number}`).html("Countdown");
          checkIfTaskIsFinishing(workInfo.time);
          if(workInfo.time < 0){
            finishTask(number);
          }
        }
        if (workInfo.type.name === "pomodoro"){
          checkIfTaskIsFinishing(workInfo.time);
          if(workInfo.currentlyWorking){
            $(`#type${number}`).html("Pomodoro break");
          }
          else {
            $(`#type${number}`).html("Pomodoro work");
          }
          if(workInfo.finished){
            finishTask(number);
          }
        }
        displayWorkingTime(number, text);
      }
    }
    updateTimes();
    LifeGamification.timer.refreshTimer = setInterval(function(){
      updateTimes();
    }, 1 * second);
  }

  const taskFinishSound = function() {
    LifeGamification.sound.beep();
    soundPlayer = setInterval(function(){
      LifeGamification.sound.beep();
    }, 1 * second);
    setTimeout(function(){
      clearInterval(soundPlayer);
    }, 5 * second);
  }

  const finishTask = function(skillNr){
    if(typeof skillNr === "object"){
      skillNr = this.id.replace('finish', '');
    }
    const skill = LifeGamification.skillsView[skillNr];
    LifeGamification.models.finishWork(skill)
      .then(function(timeWorked){
        alert(`You have gained ${timeWorked} experience in ${skill.name}`);
        LifeGamification.main.resetView();
      });
  }

  const taskFinishSound = function() {
    beep();
    soundPlayer = setInterval(function(){
      beep();
    }, 1000);
    setTimeout(function(){
      clearInterval(soundPlayer);
    }, 5000);
  }

  const finishTask = function(skillNr){
    if(typeof skillNr === "object"){
      skillNr = this.id.replace('finish', '');
    }
    const skill = LifeGamification.skillsView[skillNr];
    LifeGamification.models.finishWork(skill)
      .then(function(timeWorked){
        alert(`You have gained ${timeWorked} experience in ${skill.name}`);
        LifeGamification.main.resetView();
      });
  }

  LifeGamification.timer.handleTimerFinishButtons = function () {
    $(".timer").on("click", ".timer__finish-button", finishTask);
  }
})();
