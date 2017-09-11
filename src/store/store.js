export const storeDef = {
  state: {
    defaults: {
      interval: 15
    },
    remotesList: [
      {
        id: '1',
        uri: 'http://localhost:8761/health',
        alias: 'Registry',
        interval: 10
      },
      {
        id: '2',
        uri: 'http://localhost:9999/uaa/health',
        alias: 'SSO'
      },
      {
        id: '3',
        uri: 'http://localhost:8765/health',
        alias: 'Gateway this is a very long name 2234',
        status: 'online'
      },
      {
        id: '4',
        uri: 'http://localhost:9090/health',
        alias: 'Homepage',
        interval: 5
      },
      {
        id: '5',
        uri: 'http://localhost:8010/health',
        alias: 'Consumer Exposure longer name'
      }
    ]
  },
  getters: {
    allRemotes: state => {
      return state.remotesList
    },
    remotesCount: state => {
      return state.remotesList.length
    },
    remote: state => id => {
      return state.remotesList.find(remote => remote.id === id) || {}
    },
    defaultInterval: state => {
      return state.defaults.interval
    }
  },
  mutations: {
    saveRemote: (state, remote) => {
      let index = state.remotesList.findIndex(({ id }) => id === remote.id)
      if (index !== -1) {
        state.remotesList[index] = remote
      } else {
        remote.id = '' + Date.now()
        state.remotesList.unshift(remote)
      }
    },
    deleteRemote: (state, idParam) => {
      let index = state.remotesList.findIndex(({ id }) => id === idParam)
      state.remotesList.splice(index, 1)
    }
  }
}
