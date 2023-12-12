export function secondToMinute (seconds) {
// 计算分钟数
  var minutes = Math.floor(seconds / 60)

  // 计算剩余的秒数
  var remainingSeconds = seconds % 60

  // 将结果格式化为字符串，以显示为分'秒.毫秒'
  var formattedTime = minutes + "'" + remainingSeconds.toFixed(2)

  return formattedTime
}
