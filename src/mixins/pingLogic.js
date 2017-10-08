const Monitor = require('ping-monitor')

module.exports = {
  created() {
    this.monitor = new Monitor({
      website: this.remote.uri,
      interval: this.remote.interval / 60,
      method: 'GET'
    })

    this.monitor.on('up', res => {
      console.log('Yay!! ' + this.remote.alias + ' is up.')

      if (this.$store.getters.currentStatus(this.remote._id) !== 'online') {
        this.$store.commit('updateStatus', {
          remoteId: this.remote._id,
          status: 'online'
        })
      }
    })

    this.monitor.on('error', err => {
      console.warn('oops', err.website, 'is down :(')
      this.$store.commit('updateStatus', {
        remoteId: this.remote._id,
        status: '-'
      })
    })
  },
  destroyed() {
    if (this.monitor) {
      this.monitor.stop()
      delete this.monitor
    }
  }
}
