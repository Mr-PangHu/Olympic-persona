export function formatTime (time) {
// 使用正则表达式拆分字符串
  var timeArray = time.match(/(\d+):(\d+):(\d+)(?:\.(\d+))?/)

  // 提取小时、分钟、秒和毫秒
  var hours = parseInt(timeArray[1])
  var minutes = parseInt(timeArray[2])
  var seconds = parseInt(timeArray[3]) // 合并毫秒到秒
  var milliseconds = timeArray[4] ? parseInt(timeArray[4]) : 0 // 如果没有毫秒，则默认为0

  seconds += milliseconds / 1000

  // 将时间转换为总秒数
  var totalSeconds = hours * 3600 + minutes * 60 + seconds
  return totalSeconds
}
