import { _toDoubleDigit, timeFromMilliSeconds, timeToMilliSeconds } from "./time"

const myFunction = () => {
  throw new Error('My Error')
}

describe('utils/time.js', () => {

  it('_toDoubleDigit', () => {
    expect(_toDoubleDigit(5)).toBe('05')
    expect(_toDoubleDigit(12)).toBe('12')

    expect(() => {
      _toDoubleDigit(5.5)
    }).toThrow()
  })

  it('timeFromMilliSeconds', () => {
    expect(timeFromMilliSeconds(51797050)).toBe('14:23:17')
    expect(timeFromMilliSeconds(980030)).toBe('16:20')
    expect(timeFromMilliSeconds(37031)).toBe('00:37')
    expect(timeFromMilliSeconds(0)).toBe('00:00')
    expect(timeFromMilliSeconds(-3)).toBe('00:00')
  })

  it('timeToMilliSeconds', () => {
    expect(timeToMilliSeconds('14:23:17')).toBe(51797000)
    expect(timeToMilliSeconds('16:20')).toBe(980000)
    expect(timeToMilliSeconds('00:37')).toBe(37000)
    expect(timeToMilliSeconds('0')).toBe(0)
    expect(timeToMilliSeconds('')).toBe(0)
  })
})