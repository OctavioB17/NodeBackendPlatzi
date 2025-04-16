export const isNumber = (number: number): boolean | null => {
  try {
    if (number === null || number === undefined || isNaN(number)) {
      return false
    } else {
      return true
    }
  } catch (error) {
    return null
  }
}