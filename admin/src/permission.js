import router from '@/router'
import store from '@/store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

NProgress.configure({ showSpinner: false }) // NProgress Configuration

// 路由前置守卫
router.beforeEach((to, from, next) => {
  NProgress.start()

  // 是否需要登录
  if (to.matched.some(record => record.meta.requireAuth)) {
    if (store.state.token) {
      next();
    } else {
      // store.dispatch('LoginOut').then(()=> {
      //   next({
      //     name: 'login',
      //     query: {
      //       redirect: to.fullPath
      //     } // 将跳转的路由path作为参数，登录成功后跳转到该路由
      //   })
      // })
      next();
    }
  } else {
    next()
  }
})

// 路由后置守卫
router.afterEach(() => {
  NProgress.done()
  // if(to.name === 'login') { // 处理头部是否显示
  //   store.commit('setHeadShow', false)
  // } else {
  //   store.commit('setHeadShow', true)
  // }
})