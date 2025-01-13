import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../views/LoginPage.vue'
import HomePage from '../views/HomePage.vue'
import FolderPage from '@/views/FolderPage.vue'
import PlayerPage from '../views/PlayerView.vue'

const routes = [
  { path: '/', name: 'Login', component: LoginPage, meta: {title: "Panda Video - Login"}},
  { path: '/home', name: 'Home', component: HomePage, meta: {title: "Panda Video - Home"}},
  { path: '/folder/:id', name: 'Folder', component: FolderPage, meta: {title: "Panda Video - Pastas"}},
  { path: '/player/:id', name: 'Player', component: PlayerPage, meta: {title: "Panda Video - Player"}}
]

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.afterEach((to) => {
  document.title = to.meta.title || "Panda Video";
});

export default router