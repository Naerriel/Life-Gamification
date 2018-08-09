export const _toDoubleDigit = (timeUnit) => {
  if (!Number.isInteger(timeUnit) || timeUnit < 0) {
    throw new Error('Invalid digit')
  }
  if(timeUnit < 10) {
    return "0" + timeUnit
  } else {
    return "" + timeUnit
  }
}

export const timeFromMilliSeconds = (timeInt) => {

  timeInt = Math.max(timeInt, 0)

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

  time += `${_toDoubleDigit(minutes)}:${_toDoubleDigit(seconds)}`
  return time
}

export const _extractTimeUnit = (timeObj) => {
  let result = ""

  let time = timeObj.getTime()
  let foundAColon = false

  for (let i = time.length - 1; i >= 0; i--) {
    if(time[i] === ':') {
      result = time.substring(i + 1, time.length)
      timeObj.setTime(time.substring(0, i))
      foundAColon = true
      break
    }
  }
  if(!foundAColon) {
    result = time
    timeObj.setTime("")
  }
  return result
}

class TimeObject {
  _time
  constructor (time) {
    this._time = time
  }
  getTime = () => this._time
  setTime = val => { this._time = val }
}

export const timeToMilliSeconds = (time) => {
  let seconds, minutes, hours = -1
  let myTimeObj = new TimeObject(time)
  
  seconds = parseInt(_extractTimeUnit(myTimeObj), 10)
  minutes = parseInt(_extractTimeUnit(myTimeObj), 10)
  hours = parseInt(_extractTimeUnit(myTimeObj), 10)

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
