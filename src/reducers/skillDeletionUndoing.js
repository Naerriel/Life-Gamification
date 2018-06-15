export const skillDeletionUndoing = (state = {}, action) => {
  switch (action.type) {
    case 'SET_SKILL_DELETION_UNDOING':
      return action.skill;
    case 'ERASE_SKILL_DELETION_UNDOING':
      return {};
    default:
      return state
  }
}
