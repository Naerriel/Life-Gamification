const toDoubleDigit = (timeUnit) => {
  if(timeUnit < 10) {
    return "0" + timeUnit
  } else {
    return "" + timeUnit
  }
}

export const timeFromMilliSeconds = (timeInt) => {

  let time = ""
  timeInt = Math.floor(timeInt / 1000)

  let hours = Math.floor(timeInt / 3600)
  timeInt %= 3600

  let minutes = Math.floor(timeInt / 60)
  timeInt %= 60

  let seconds = timeInt

  if(hours > 0) {
    time += `${hours}:`
  }

  time += `${toDoubleDigit(minutes)}:${toDoubleDigit(seconds)}`
  return time
}

const extractTimeUnit = (obj) => {
  let result = ""
  let time = obj.getValue()
  let foundAColon = false

  for (let i = time.length - 1; i >= 0; i--) {
    if(time[i] === ':') {
      result = time.substring(i + 1, time.length)
      obj.setValue(time.substring(0, i))
      foundAColon = true
      break
    }
  }
  if(!foundAColon) {
    result = time
    obj.setValue("")
  }
  return result
}

export const timeToMilliSeconds = (time) => {
  let seconds, minutes, hours = -1

  let timeObj = function () { // To let it be modified in external function
    let _time = time

    this.setValue = function(val) { _time = val }
    this.getValue = function() { return _time }
  }
  seconds = parseInt(extractTimeUnit(timeObj), 10)
  minutes = parseInt(extractTimeUnit(timeObj), 10)
  hours = parseInt(extractTimeUnit(timeObj), 10)

  let result = 0
  if(!isNaN(seconds)) {
    result += seconds * 1000
  }
  if(!isNaN(minutes)) {
    result += minutes * 60 * 1000
  }
  if(!isNaN(hours)) {
    result += hours * 60 * 60 * 1000
  }
  return result
}
