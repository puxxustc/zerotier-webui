import moment from 'moment'

const timeFormat = 'YYYY-MM-DD HH:mm:ss'

const mixin = {
  methods: {
    formatTime (timestamp) {
      return moment(timestamp).format(timeFormat)
    },
  },
}

export default mixin
