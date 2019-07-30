
import StoriesPrivate from './components/private/StoriesPrivate'
import HelloWorld from './components/HelloWorld'
import StoryPrivateDetail from './components/private/StoryPrivateDetail'
import StoryPrivateAdd from './components/private/StoryPrivateAdd'
import StoryPrivateUpdate from './components/private/StoryPrivateUpdate'

export default [
  { 
    id: 1, 
    path: '/', 
    title: 'Dashboard', 
    icon: 'mdi-desktop-mac-dashboard', 
    isBackOffice: true, 
    component: HelloWorld
  },
  { 
    id: 2, 
    path: '/storiesPrivate', 
    title: 'Stories', 
    icon: 'mdi-notebook-multiple', 
    isBackOffice: true, 
    component: StoriesPrivate
  },
  { 
    id: 3, 
    path: '/storiesPrivate/detail/:id', 
    title: null, 
    icon: null, 
    isBackOffice: true, 
    component: StoryPrivateDetail
  },
  { 
    id: 4, 
    path: '/storiesPrivate/create', 
    title: null, 
    icon: null, 
    isBackOffice: true, 
    component: StoryPrivateAdd
  },
  { 
    id: 4, 
    path: '/storiesPrivate/update/:id', 
    title: null, 
    icon: null, 
    isBackOffice: true, 
    component: StoryPrivateUpdate
  }
]