<template>
  <v-dialog v-model="internalDialog" fullscreen transition="dialog-bottom-transition" :overlay="false">
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-toolbar dark class="secondary">
            <v-btn icon @click.native.stop="close()" dark>
              <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title>Settings</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn dark flat @click.native.stop="saveSettings()">Save</v-btn>
            </v-toolbar-items>
          </v-toolbar>

          <v-card-text>
            <v-list three-line subheader>
              <v-subheader>Global settings</v-subheader>

              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title>Ping interval</v-list-tile-title>
                  <v-list-tile-sub-title>Set the interval between pings in seconds</v-list-tile-sub-title>
                </v-list-tile-content>
                <v-text-field suffix="s" v-model="pingInterval"></v-text-field>
              </v-list-tile>

              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title>Notifications</v-list-tile-title>
                  <v-list-tile-sub-title>Display notifications when detecting a change in status</v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-checkbox color="primary" v-model="shouldNotify"></v-checkbox>
                </v-list-tile-action>
              </v-list-tile>

              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title>Sound</v-list-tile-title>
                  <v-list-tile-sub-title>Play a sound alongside the notification</v-list-tile-sub-title>
                  <small>(Note that notifications should be enabled if you want to change this)</small>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-checkbox :disabled="!shouldNotify" color="primary" v-model="shouldPlaySound"></v-checkbox>
                </v-list-tile-action>
              </v-list-tile>

              <v-list-tile>
              </v-list-tile>

            </v-list>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-dialog>
</template>

<script>
const fs = require('fs')
const path = require('path')

const settingsFilePath = path.join(nw.App.dataPath, 'settings.json')

export default {
  props: {
    dialog: Boolean
  },
  data() {
    return {
      pingInterval: null,
      shouldNotify: null,
      shouldPlaySound: null
    }
  },
  created() {
    fs.readFile(settingsFilePath, (err, data) => {
      const defaultSettings = {
        interval: 10,
        notification: true,
        sound: true
      }

      let settings =
        typeof data !== 'undefined'
          ? JSON.parse(data.toString())
          : defaultSettings

      if (err && err.code === 'ENOENT') {
        console.warn('No settings file found, initializing one...')
        this.saveSettings(settings)
      } else {
        console.warn('All good, retrieving values from the file')
      }

      this.pingInterval = settings.interval
      this.shouldNotify = settings.notification
      this.shouldPlaySound = settings.sound
      this.$store.commit('updateSettings', settings)
    })
  },
  computed: {
    internalDialog() {
      return this.dialog
    }
  },
  methods: {
    close() {
      this.$emit('update:dialog', false)
    },
    saveSettings(settings) {
      settings = settings || {
        interval: this.pingInterval,
        notification: this.shouldNotify,
        sound: this.shouldPlaySound
      }

      fs.writeFile(settingsFilePath, JSON.stringify(settings), err => {
        if (err) {
          console.info('There was an error attempting to save your data.')
          console.warn(err.message)
          return
        }
        console.log('Settings saved!')
        this.$store.commit('updateSettings', settings)
        this.close()
      })
    }
  }
}
</script>
