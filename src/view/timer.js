(function(){
  LifeGamification.timer = {};

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
      if($('.timer__task-type').val() === "pomodoro"){
        $('.timer__pomodoro-options').html(`
          <p>Length of a pomodoro: <input id="pomodoro-length" type="number" value="25"> minutes</p>
          <p>Length of a break: <input id="pomodoro-break-length" type="number" value="5"> minutes</p>
          <p>Number of pomodoros between big breaks: <input id="pomodoro-between" type="number" value="4"></p>
          <p>Length of a big break: <input id="pomodoro-big-break-length" type="number" value="30"> minutes</p>
          <p>Number of pomodoros: <input id="pomodoro-number" type="number" value="8"></p>
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
        const type = skill.timer.history[skill.timer.startTime].type;
        let text;
        if(type.name === "normal"){
          $(`#type${number}`).html("Normal");
          text = LifeGamification.utils.displayTimeText(timeLapsed);
        }
        else if (type.name === "countdown"){
          $(`#type${number}`).html("Countdown");
          const time = type.info.countdown * 60000 - timeLapsed;
          text = LifeGamification.utils.displayTimeText(time);
          if(4000 <= time && time < 5000){
            taskFinishSound();
          }
          if(time < 0){
            finishTask(number);
          }
        }
        else if (type.name === "pomodoro"){
          $(`#type${number}`).html("Pomodoro");
          let pomodorosFinished = 0;
          let currentlyWork = true;
          let sinceBigBreak = 0;
          let nextTaskTime = 0;
          while(nextTaskTime <= timeLapsed){
            if(currentlyWork){
              nextTaskTime += type.info.length * 60000;
              currentlyWork ^= 1;
              pomodorosFinished++;
            } else {
              if(sinceBigBreak === type.info.between - 1){
                nextTaskTime += type.info.bigbr * 60000;
                sinceBigBreak = 0;
              } else {
                nextTaskTime += type.info.br * 60000;
                sinceBigBreak++;
              }
              currentlyWork ^= 1;
            }
            if(pomodorosFinished == type.info.number){
              finishTask(number);
            }
          }
          const time = nextTaskTime - timeLapsed;
          if(4000 <= time && time < 5000){
            taskFinishSound();
          }
          if(currentlyWork){
            $(`#type${number}`).html("Pomodoro break");
          }
          else {
            $(`#type${number}`).html("Pomodoro work");
          }
          text = LifeGamification.utils.displayTimeText(time);
        }
        displayWorkingTime(number, text);
      }
    }
    updateTimes();
    LifeGamification.timer.refreshTimer = setInterval(function(){
      updateTimes();
    }, 1000);
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

  function beep() {
    var snd = new Audio("data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=");  
    snd.play();
  }
})();
