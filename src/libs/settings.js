export const defaultSettings = {
  expAtATime: 30,
  time: "25:00",
  expPerSession: 30,
  isPomodoro: "true",
  breakLen: "5:00",
  bigBreakLen: "30:00",
  pomodoros: 8,
  bigBreaks: 1
}

export const isATime = (text) => {
  let regexForTime = /^(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)?([0-5]?\d)$/
  return regexForTime.test(text)
}

export const validateSettings = (settings) => {
  for(let name in settings) {
    switch(name) {
      case 'time':
      case 'breakLen':
      case 'bigBreakLen':
        if(!isATime(settings[name])){
          settings[name] = defaultSettings[name]
        }
        break;
      case 'expPerSession':
      case 'pomodoros':
      case 'bigBreaks':
        if(isNaN(settings[name])){
          settings[name] = defaultSettings[name];
        }
        break;
      case 'isPomodoro':
        if(typeof(settings[name]) != typeof(true)){
          settings[name] = true;
        }
        break
    }
  }
}
