export const copyJSONWithoutReference = (array) => {
  return JSON.parse(JSON.stringify(array))
}
