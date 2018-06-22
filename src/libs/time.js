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

export const timeToMilliSeconds = (time) => {
  let seconds, minutes, hours = -1
  for (let i = time.length - 1; i >= 0; i--) {
    if(time[i] === ':') {
      for (let j = i + 1; j < time.length; j++) {
        //TODO I tutaj przepisujemy to do odpowiedniej zmiennej
        //Potem parsujemy na inta
        //Potem przemnażamy, dodajemy, hopsasa
        //i potem ucinamy ten fragment z time'u.
        //Tylko nie wiem jak ucinać. Jutro ten fragment zakodze.
      }
    }
  }
  return 120
}
