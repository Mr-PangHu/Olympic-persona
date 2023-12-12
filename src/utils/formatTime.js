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

export function formatSeconds (seconds) {
  const hasYinhao = seconds.indexOf('"') !== -1
  if (hasYinhao) {
    var seconds1 = parseInt(seconds.split('"')[0])
    var seconds2 = parseInt(seconds.split('"')[1] || 0)

    // 计算总秒数
    var totalSeconds = Number(seconds1 + '.' + seconds2)

    return Number(totalSeconds.toFixed(2))
  } else {
    return Number(seconds.toFixed(2))
  }
}

export function formatMMToSeconds (timeString) {
  var timeParts = timeString.split("'")
  var minutes = parseInt(timeParts[0])
  let secondsParts = timeParts[1]
  if (secondsParts.indexOf('.') !== -1) {
    var tmp = secondsParts.split('.')
    var seconds = parseInt(tmp[0])
    var milliseconds = parseInt(tmp[1])
    var totalSeconds = minutes * 60 + seconds + milliseconds / 10
    return totalSeconds
  } else {
    var seconds1 = parseInt(secondsParts)
    var totalSeconds1 = minutes * 60 + seconds1
    return totalSeconds1
  }
}
