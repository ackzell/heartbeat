import RemotesList from './components/RemotesList.vue'
import RemoteForm from './components/RemoteForm.vue'

export const routes = [
  { path: '', component: RemotesList },
  { path: '/remote', component: RemoteForm },
  {
    path: '/remote/:id',
    name: 'editRemote',
    component: RemoteForm,
    props: true
  }
]
