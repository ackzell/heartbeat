const Datastore = require('nedb')
const db = {}

const path = require('path')

const filePaths = {
  dbPath: path.join(nw.App.dataPath, 'remotes.db')
}

// TODO: figure out how to force this to use the node storing
// instead of the IndexDB engine
db.remotes = new Datastore({
  filename: filePaths.dbPath,
  autoload: true,
  onload: err => {
    if (err) {
      console.error('Error while loading db', err)
    }
    // assign the persisted list of remotes to the UI state once the db is loaded
    db.remotes.find({}, (err, result) => {
      storeDef.state.remotesList = result
    })
  },
  timestampData: true
})

export const storeDef = {
  state: {
    defaults: {
      interval: null,
      notification: null,
      sound: null
    },
    remotesList: []
  },
  getters: {
    currentStatus: state => _id => {
      return state.remotesList.find(remote => remote._id === _id).status
    },
    allRemotes: state => {
      return state.remotesList
    },
    remotesCount: state => {
      return state.remotesList.length
    },
    remote: state => _id => {
      return state.remotesList.find(remote => remote._id === _id) || {}
    },
    defaults: state => {
      return state.defaults
    }
  },
  actions: {
    storeRemote({ commit }, remote) {
      return new Promise((resolve, reject) => {
        remote.uri =
          remote.uri && remote.uri.includes('http://')
            ? remote.uri
            : `http://${remote.uri}`

        let callback = (err, newRemote, updatedRemote) => {
          if (err) {
            console.error(err)
            reject(err)
          }

          const remoteToSave = updatedRemote ? updatedRemote : newRemote
          commit('saveRemote', remoteToSave)

          resolve()
        }

        if (remote._id) {
          db.remotes.update(
            { _id: remote._id },
            remote,
            { returnUpdatedDocs: true },
            callback
          )
        } else {
          db.remotes.insert(remote, callback)
        }
      })
    },
    removeRemote({ commit }, _id) {
      return new Promise((resolve, reject) => {
        db.remotes.remove({ _id: _id }, {}, (err, numRemoved) => {
          if (err) {
            console.error(err)
            reject(err)
          }
          commit('deleteRemote', _id)
          resolve()
        })
      })
    }
  },
  mutations: {
    saveRemote: (state, remote) => {
      remote.status = '-'

      let index = state.remotesList.findIndex(({ _id }) => {
        return remote._id === _id
      })

      // editing an existing remote
      if (index >= 0) {
        state.remotesList[index] = remote
      } else {
        state.remotesList.unshift(remote)
      }
    },
    deleteRemote: (state, _idParam) => {
      let index = state.remotesList.findIndex(({ _id }) => _id === _idParam)
      state.remotesList.splice(index, 1)
    },
    updateStatus: (state, { remoteId, status }) => {
      let index = state.remotesList.findIndex(({ _id }) => _id === remoteId)
      if (index !== -1) {
        const newRemote = Object.assign({}, state.remotesList[index], {
          status
        })
        state.remotesList.splice(index, 1, newRemote)
      }
    },
    updateSettings: (state, settings) => {
      state.defaults = settings
    }
  }
}
