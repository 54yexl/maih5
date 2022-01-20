import {
  createRouter,
  createWebHashHistory
  // RouteRecordRaw
} from 'vue-router'

const modules = import.meta.globEager('./modules/**/*.js')
const routeModuleList = []



Object.keys(modules).forEach(key => {
  const mod = modules[key].default || {}
  const modList = Array.isArray(mod) ? [...mod] : [mod]
  routeModuleList.push(...modList)
})
export const routes = [
  {
    path: '/',
    name: 'Layout',
    redirect: '/home',
    component: () => import('@/layout/index.vue'),
    meta: {
      title: '首页'
    },
    children: [...routeModuleList]
  }
]

const router = createRouter({
  // process.env.BASE_URL
  history: createWebHashHistory(''),
  routes
})

export function setupRouter(app) {
  app.use(router)
  // 创建路由守卫
  // createRouterGuards(router)
}
export default router
