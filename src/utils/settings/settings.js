export const defaultSettings = {
  expAtATime: 30,
  time: "25:00",
  expPerSession: 30,
  isPomodoro: true,
  breakLen: "5:00",
  bigBreakLen: "30:00",
  pomodoros: 8,
  bigBreaks: 1
}

export const isATime = (text) => {
  let regexForTime = /^(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)?([0-5]?\d)$/
  return regexForTime.test(text)
}

const ensureFormat = (time) => {
  // Preferred format is that after a ':' minutes or seconds have 2 digits

  for(let i = 1; i < time.length; i++) {
    if(time[i - 1] === ':' && (i + 1 === time.length || time[i + 1] === ':')) {
      time = time.substring(0, i) + "0" + time.substring(i)
    }
  }
  return time
}

export const validateSettings = (settings) => {
  for(let name in settings) {
    switch (name) {
      case 'time':
      case 'breakLen':
      case 'bigBreakLen':
        if (!isATime(settings[name])) {
          settings[name] = defaultSettings[name]
        } else {
          settings[name] = ensureFormat(settings[name])
        }
        break;
      case 'expPerSession':
      case 'expAtATime':
      case 'pomodoros':
      case 'bigBreaks':
        const num = settings[name]
        if (isNaN(num) || !Number.isInteger(num) || num <= 0) {
          settings[name] = defaultSettings[name]
        }
        break;
      case 'isPomodoro':
        if (typeof(settings[name]) !== typeof(true)) {
          settings[name] = true
        }
        break
      default:
        delete settings[name]
    }
  }
}
