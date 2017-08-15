export const storeDef = {
  state: {
    remotesList: [
      // {
      //   uri: 'http://localhost:8761/health',
      //   alias: 'Registry'
      // },
      // {
      //   uri: 'http://localhost:9999/uaa/health',
      //   alias: 'SSO'
      // },
      // {
      //   uri: 'http://localhost:8765/health',
      //   alias: 'Gateway this is a very long name 2234',
      //   status: 'online'
      // },
      // {
      //   uri: 'http://localhost:9090/health',
      //   alias: 'Homepage'
      // },
      // {
      //   uri: 'http://localhost:8010/health',
      //   alias: 'Consumer Exposure longer name'
      // }
    ]
  },
  getters: {
    allRemotes: state => {
      return state.remotesList
    },
    remotesCount: state => {
      return state.remotesList.length
    }
  },
  mutations: {
    addRemote: (state, remote) => {
      state.remotesList.unshift(remote)
    },
    deleteRemote: (state, uri) => {
      let index = state.remotesList.findIndex(({ uri }) => uri === uri)
      state.remotesList.splice(index, 1)
    }
  }
}
