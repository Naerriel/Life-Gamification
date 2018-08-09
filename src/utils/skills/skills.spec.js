import { addExperience, createEmptySkill, validateSkills } from "./skills"


describe('utils/skills', () => {
  it('addExperience', () => {
    let mySkill = createEmptySkill()
    addExperience(7, mySkill)
    expect(mySkill.level).toBe(2)
    expect(mySkill.exp).toBe(2)

    mySkill = createEmptySkill()
    addExperience(20, mySkill)
    expect(mySkill.level).toBe(4)
    expect(mySkill.exp).toBe(4)

    addExperience(-12,  mySkill)
    expect(mySkill.level).toBe(2)
    expect(mySkill.exp).toBe(3)

    addExperience('Nan', mySkill)
    expect(mySkill.level).toBe(2)
    expect(mySkill.exp).toBe(3)
  })

  it('validateSkills', () => {
    let mySkill = {
      id: Date.now(),
      name: "",
      level: -4,
      timer: {}
    };

    validateSkills([mySkill])
  })
})