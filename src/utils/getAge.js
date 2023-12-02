export function getAge (d) {
  var y = new Date().getFullYear()
  var tmpYear = d.substring(0, 4)
  return y - tmpYear
}
