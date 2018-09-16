import { copyJSONWithoutReference } from "./other"

describe('utils/other', () => {
  it('copyJSONWithoutReference', () => {
    let oldArray = ['zero', 'one', 'two', 'three']
    let newArray = copyJSONWithoutReference(oldArray)
    newArray[2] = 2
    expect(oldArray).toEqual(['zero', 'one', 'two', 'three'])
    expect(newArray).toEqual(['zero', 'one', 2, 'three'])
  })
})