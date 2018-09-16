import { validateSettings, isATime } from "./settings"

describe('utils/settings', () => {

  it('validateSettings', () => {
    const settings = {
      expAtATime: 'maslo',
      time: "-1",
      expPerSession: 1234,
      isPomodoro: "true",
      breakLen: "15:0",
      bigBreakLen: "30:60",
      pomodoros: 16,
      bigBreaks: -1,
      unnecessaryField: 'Hola'
    }
    validateSettings(settings)
    expect(settings).toEqual({
      expAtATime: 30,
      time: "25:00",
      expPerSession: 1234,
      isPomodoro: true,
      breakLen: "15:00",
      bigBreakLen: "30:00",
      pomodoros: 16,
      bigBreaks: 1
    })

    const newSettings = {
      expAtATime: '0.3',
      time: "-1",
      expPerSession: 1234,
      isPomodoro: "true",
      breakLen: "15:00",
      bigBreakLen: "1130:20",
      pomodoros: 16,
      bigBreaks: -1,
      unnecessaryField: 'Hola'
    }
    validateSettings(settings)
    expect(settings).toEqual({
      expAtATime: 30,
      time: "25:00",
      expPerSession: 1234,
      isPomodoro: true,
      breakLen: "15:00",
      bigBreakLen: "30:00",
      pomodoros: 16,
      bigBreaks: 1
    })
  })

  it('isATime', () => {
    expect(isATime('123:23:22')).toBeFalsy()
    expect(isATime('23:22:21')).toBeTruthy()
    expect(isATime('23;22;21')).toBeFalsy()
    expect(isATime('22.21.20')).toBeFalsy()
    expect(isATime('15:22')).toBeTruthy()
    expect(isATime('23')).toBeTruthy()
    expect(isATime('70')).toBeFalsy()
    expect(isATime('72:21')).toBeFalsy()
  })
})