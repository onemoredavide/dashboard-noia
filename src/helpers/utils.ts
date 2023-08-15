export const validatePositiveInt = (param: string | null | undefined): number | null => {
  if (!param) {
    return null
  }

  const parsedParam = parseInt(param)
  if (isNaN(parsedParam) || parsedParam < 0) {
    return null
  }

  return parsedParam
}
