export const setAddingExp = (id, name, expToAdd) => ({
  type: 'SET_WORK_COMPLETE',
  data: { id, name, expToAdd }
})

export const clearWorkComplete = () => ({
  type: 'CLEAR_WORK_COMPLETE'
})

export const setFinishPomodoro = (id, timer) => ({
  type: 'SET_WORK_COMPLETE',
  data: { id, timer }
})
