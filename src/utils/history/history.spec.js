import { emptyHistory } from "./history"

describe('utils/history', () => {
  it('correctly exports empty history log', () => {
    let myEmptyHistory = emptyHistory;
    expect(emptyHistory).toEqual({"logs": [], "skills": []})
  })
})