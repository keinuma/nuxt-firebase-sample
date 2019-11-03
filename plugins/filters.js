import Vue from 'vue'
import dayjs from 'dayjs'

Vue.filter('formatDate', (isoTime) => {
  if (isoTime) {
    return dayjs(isoTime).format('YYYY年MM月DD日')
  }
  return ''
})
