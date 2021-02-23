const twoDigits = n =>
  n.toString().length > 1 ? n.toString() : `0${n.toString()}`

export const toTimeStamp = s => {
  const hours = twoDigits(Math.floor(s / 3600))
  const minutes = twoDigits(Math.floor(s / 60 - hours * 60))
  const seconds = twoDigits(Math.round(s - (minutes * 60 + hours * 3600)))
  return `${hours}:${minutes}:${seconds}`
}
