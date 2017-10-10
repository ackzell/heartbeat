const Monitor = require('ping-monitor')

module.exports = {
  methods: {
    createMonitor() {
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

          const notification =
            notification ||
            new Notification(`${this.remote.alias} is online.`, {
              //icon: 'http://cdn.sstatic.net/stackexchange/img/logos/so/so-icon.png',
              requireInteraction: true,
              body: '\n \n Health endpoint is responding.'
            })

          notification.onshow = () => {
            const audio = new Audio('public/audio/just-like-magic.ogg')
            audio.play()
          }
        }
      })

      this.monitor.on('error', err => {
        console.warn('oops', err.website, 'is down :(')

        if (this.$store.getters.currentStatus(this.remote._id) !== 'offline') {
          this.$store.commit('updateStatus', {
            remoteId: this.remote._id,
            status: 'offline'
          })

          const notification =
            notification ||
            new Notification(`${this.remote.alias} is offline.`, {
              //icon: 'http://cdn.sstatic.net/stackexchange/img/logos/so/so-icon.png',
              body: 'No response from the health endpoint.'
            })

          notification.onshow = () => {
            const audio = new Audio('public/audio/you-wouldnt-believe.ogg')
            audio.play()
          }
        }
      })
    },
    destroyMonitor() {
      if (this.monitor && this.monitor.interval) {
        this.monitor.stop()
        this.monitor = {}
      }
    }
  },
  created() {
    if (this.remote.monitoring) {
      this.createMonitor()
    }
  },
  destroyed() {
    this.destroyMonitor()
  }
}
