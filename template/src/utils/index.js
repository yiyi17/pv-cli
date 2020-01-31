const utils = {
  fontSize: function () {
    var view_width = document.getElementsByTagName('html')[0].getBoundingClientRect().width
    var _html = document.getElementsByTagName('html')[0]
    view_width > 768 ? _html.style.fontSize = 100 * 768 / 375 + 'px' : _html.style.fontSize = view_width * 100 / 375 + 'px'
  },
  msgTimeNew (t) {
    function timeStr (i, ff) {
      var n = Number(i)
      var f = ff || 'HH:MM:SS.xxx'
      n > 0x7FFFFFFF ? n *= 1 : n *= 1000
      var d = n > 0 ? new Date(n) : new Date()
      return f
        .replace('yyyy', ('00' + d.getFullYear()).slice(-2))
        .replace('mm', ('00' + (d.getMonth() + 1)).slice(-2))
        .replace('dd', ('00' + d.getDate()).slice(-2))
        .replace('HH', ('00' + d.getHours()).slice(-2))
        .replace('MM', ('00' + d.getMinutes()).slice(-2))
        .replace('SS', ('00' + d.getSeconds()).slice(-2))
        .replace('xxx', ('000' + d.getMilliseconds()).slice(-3))
    }
    if (!t) return '--:--:--'
    if ((new Date().getTime() - t * 1000) < 86400000) {
      return timeStr(t, 'HH:MM:SS')
    }
    return timeStr(t, 'yyyy-mm-dd HH:MM:SS')
  },
  formatDate (time, type) {
    var date = ''
    if (typeof time === String) {
      date = new Date(time.replace(/-/g, '/'))
    } else {
      date = new Date(time)
    }
    var Y = date.getFullYear() + '/'
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/'
    var D = date.getDate() + ' '
    var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
    var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
    var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
    var str = ''
    if (type === 'hh:mm:ss') {
      str = h + m + s
    } else if (type === 'yy-mm-dd hh:mm:ss') {
      str = Y + M + D + h + m + s
    } else if (type === 'yy-mm-dd') {
      str = Y + M + D
    } else if (type === 'mm-dd') {
      str = M + D
    }
    return str
  },
  HTMLDecode (t) {
    return (typeof (t) === 'string') ? t.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#39;/g, '\'').replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/<br ?[^><]*\/?>/g, '\n') : ''
  }
}
module.exports = utils
