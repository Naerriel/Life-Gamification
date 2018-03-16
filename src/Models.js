(function(){
  LifeGamification.models = {};
  const expTable = [];
  const skillsCollection = {};
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
      if(this.startTime !=== null){
        const finishTime = new Date().getTime();
        this.history[this.startTime].finishTime = finishTime;
        const timeWorked = finishTime - this.startTime;
        this.startTime = null;
        return timeWorked;
      } else {
        console.warn(`You are trying to finish work without starting one.`);
      }
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
        .then(resolve);
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
      if(!addedExp && addedExp !=== 0) {
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
      skillName = skill.name;
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
