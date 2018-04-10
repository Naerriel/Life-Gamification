(function(){
  LifeGamification.models = {};
  const expTable = [];
  const skillsCollection = {};
  const minute = 60000;
  LifeGamification.skillsCollection = skillsCollection;

  class Skill{
    constructor(name, exp, timerData){
      this.name = name;
      this.exp = exp;
      this.calcLevel();
      this.calcExpTillNextLevel();
      if(!timerData){
        timerData = {
          history: {},
          startTime: null,
        }
      }
      this.timer = new Timer(timerData);
    }

    addExp(exp) {
      this.exp += exp;
      this.calcLevel();
      this.calcExpTillNextLevel();
    }

    calcLevel() {
      // TODO calc it in the better way.
      let level = 0;
      while(this.exp >= expTable[level + 1]){
        level++;
      }
      this.level = level;
    }

    calcExpTillNextLevel() {
      const levelExp = this.exp - expTable[this.level];
      const totalExpNeeded = expTable[this.level + 1] - expTable[this.level];
      this.expInThisLevel = levelExp;
      this.expTillNextLevel = totalExpNeeded;
    }
  }

  class Timer{
    constructor(timerData){
      this.history = timerData.history;
      this.startTime = timerData.startTime;
    }

    startWork(taskType) {
      if(this.startTime === null){
        this.startTime = new Date().getTime();
        this.history[this.startTime] = {
          type: taskType,
          finishTime: null
        };
      } else{
        console.warn(`You are trying to
          start new work without finishing previous one.`);
      }
    }

    finishWork() {
      if(this.startTime !== null){
        const finishTime = new Date().getTime();
        this.history[this.startTime].finishTime = finishTime;
        const timeWorked = finishTime - this.startTime;
        this.startTime = null;
        return timeWorked;
      } else {
        console.warn(`You are trying to finish work without starting one.`);
      }
    }

    findNumberOfSessions(minTime, maxTime){
      //We have to change it to handle pomodoros as well
      let sessionsNum = 0;
      for (let startTime in this.history){
        const finishTime = this.history[startTime].finishTime;
        const totalTime = (finishTime - startTime) / minute;
        if(minTime <= totalTime && totalTime <= maxTime){
          sessionsNum++;
        }
      }
      return sessionsNum;
    }
    
    getWorkInfo() {
      const type = this.history[this.startTime].type;
      const timeLapsed = LifeGamification.utils.calcTime(this.startTime);
      if(type.name === "normal"){
        return {"type": type, "time": timeLapsed};
      }
      if(type.name === "countdown"){
        const time = type.info.countdown * minute - timeLapsed;
        return {"type": type, "time": time};
      }
      if(type.name === "pomodoro"){
        let pomodorosFinished = 0;
        let currentlyWorking = true;
        let sinceBigBreak = 0;
        let nextTaskTime = 0;
        let finished = false;

        //Iterating by each pomodoro and break
        while(nextTaskTime <= timeLapsed){
          if(currentlyWorking){ //pomodoro time
            nextTaskTime += type.info.length * minute;
            currentlyWorking ^= 1;
            if(nextTaskTime <= timeLapsed){
              pomodorosFinished++;
            }
          } else { // break time
            if(sinceBigBreak === type.info.between - 1){ // big break
              nextTaskTime += type.info.bigbr * minute;
              sinceBigBreak = 0;
            } else { //short break
              nextTaskTime += type.info.br * minute;
              sinceBigBreak++;
            }
            currentlyWorking ^= 1;
          }
          if(pomodorosFinished == type.info.number){
            finished = true;
          }
        }
        currentlyWorking ^= 1; /*Because it changes on entering a
         pomodoro or break time, not on leaving and we need current state */
        const time = nextTaskTime - timeLapsed;
        return {
          "type": type,
          "time": time,
          "currentlyWorking": currentlyWorking,
          "finished": finished
        };
      }
      return type;
    }
  }

  LifeGamification.models.startWork = function (skill, type) {
    return new Promise((resolve, reject) => {
      skill.timer.startWork(type);
      saveSkillsCollection()
        .then(resolve);
    });
  }

  LifeGamification.models.finishWork = function (skill) {
    return new Promise((resolve, reject) => {
      const addedExp = Math.floor(skill.timer.finishWork() / 60000);
      LifeGamification.models.updateExp(skill, addedExp)
        .then(function(){
          resolve(addedExp);
        });
    });
  }

  LifeGamification.models.createSkillsCollection = function (skillsJSON) {
    return new Promise((resolve, reject) => {
      for (let skillName in skillsJSON) {
        const skillData = skillsJSON[skillName];
        const newSkill = new Skill(skillName, skillData.exp, skillData.timer);
        skillsCollection[skillName] = newSkill;
      }
      resolve(skillsCollection);
    });
  }

  LifeGamification.models.updateExp = function (skill, addedExp){
    return new Promise((resolve, reject) => {
      if(!addedExp && addedExp !== 0) {
        console.log("Error: Added experience is NULL.");
        return reject(addedExp);
      }
      if(addedExp + skill.exp < 0){
        addedExp = -skill.exp;
      }
      skill.addExp(addedExp);
      saveSkillsCollection()
        .then(function (){
          return resolve(skill);
        });
    });
  }

  const saveSkillsCollection = function () {
    return new Promise((resolve, reject) => {
      LifeGamification.repository.updateSkills(skillsCollection).then(resolve);
    });
  }

  LifeGamification.models.addSkill = function (skillName) {
    return new Promise((resolve, reject) => {
      if(!skillName){
        console.log("Error: Skill name is NULL or 0.");
        return reject();
      }
      if(skillName in skillsCollection){
        console.log(`Error: skill ${skillName} already exits.`);
        return reject();
      }
      const newTimerData = {startTime: null, history: {}};
      const newSkill = new Skill(skillName, 0, newTimerData);
      skillsCollection[skillName] = newSkill;
      saveSkillsCollection()
        .then(function() {
          resolve(newSkill);
        });
    });
  }

  LifeGamification.models.fillExpTable = function () {
    expTable[1] = 0;
    for (let i = 2; i < maxLevel; i++) {
      expTable[i] = expTable[i - 1] + (4 + (i - 1) * (Math.log10(i - 1) + 1));
    }
    for (let i = 2; i < maxLevel; i++) {
      expTable[i] = Math.floor(expTable[i]);
    }
  }

  LifeGamification.models.removeSkill = function (skill) {
    return new Promise((resolve, reject) => {
      const skillName = skill.name;
      delete skillsCollection[skillName];
      LifeGamification.repository.updateSkills(skillsCollection);
      saveSkillsCollection
        .then(resolve());
    });
  }

  LifeGamification.models.clearCollection = function () {
    for (let name in skillsCollection) {
      delete skillsCollection[name];
    }
  }
})();
