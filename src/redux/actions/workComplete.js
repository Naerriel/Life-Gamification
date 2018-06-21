export const setAddingExp = (id, name, expToAdd) => ({
  type: 'SET_ADDING_EXP',
  data: { id, name, expToAdd }
})

export const clearWorkComplete = () => ({
  type: 'CLEAR_WORK_COMPLETE'
})
