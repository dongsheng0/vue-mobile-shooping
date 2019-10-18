import Vue from 'vue';
import Router from 'vue-router';
import Utils from '../assets/js/utils'
Vue.use(Router);

const routes = [{
    path: '*',
    redirect: '/home',
  },
  {
    name: 'home',
    component: () => import('../pages/home/index'),
    meta: {
      title: '呼啦啦',
    },
  },
  {
    path: '/user',
    component: () => import('../pages/user/index'),
    name: 'user',
    meta: {
      title: '我的',
    },
  },
  {
    path: '/user/order',
    component: () => import('../pages/user/order/list'),
    meta: {
      title: '我的订单',
    },
  },
  {
    path: '/user/order/:id',
    component: () => import('../pages/user/order/info'),
    meta: {
      title: '订单详情',
    },
  },
  {
    path: '/user/profit',
    component: () => import('../pages/user/profit/list'),
    meta: {
      title: '提现记录',
    },
  },
  {
    path: '/user/profit/detail',
    component: () => import('../pages/user/profit/detail'),
    meta: {
      title: '收益详情',
    },
  },
  {
    path: '/user/withdrawal',
    component: () => import('../pages/user/profit/withdrawal'),
    meta: {
      title: '提现',
    },
  },
  {
    path: '/user/share',
    component: () => import('../pages/user/share/list'),
    meta: {
      title: '推广记录',
    },
  },
  {
    path: '/city',
    component: () => import('../pages/cities/index'),
    meta: {
      title: '城市',
    },
  },
  {
    path: '/search',
    component: () => import('../pages/search/index'),
    meta: {
      title: '搜索',
    },
  },
  {
    path: '/list',
    component: () => import('../pages/product/list'),
    meta: {
      title: 'listtest',
    },
  },
  // 详情
  {
    path: '/goods/:id',
    component: () => import('../pages/product/goods/detail'),
    meta: {
      title: '商品详情',
    },
  },
  {
    path: '/goods/order/:id',
    component: () => import('../pages/product/goods/order'),
    meta: {
      title: '商品提交预定',
    },
  },
  {
    path: '/hotel/:id',
    component: () => import('../pages/product/hotel/detail'),
    meta: {
      title: '酒店详情',
    },
  },
  {
    name: 'name',
    path: '/hotel/room/:id',
    component: () => import('../pages/product/hotel/room'),
    meta: {
      title: '房型介绍',
    },
  },
  {
    path: '/hotel/order/:id',
    component: () => import('../pages/product/hotel/order'),
    meta: {
      title: '酒店提交预定',
    },
  },
  {
    path: '/scenic/:id',
    component: () => import('../pages/product/scenic/detail'),
    meta: {
      title: '景区详情',
    },
  },
  {
    path: '/scenic/order/:id',
    component: () => import('../pages/product/scenic/order'),
    meta: {
      title: '景区提交预定',
    },
  },
  {
    path: '/detail/:id',
    component: () => import('../pages/detail/test'),
    meta: {
      title: '测试商品详情',
    },
  },
];

// add route path
routes.forEach(route => {
  route.path = route.path || '/' + (route.name || '');
});

const router = new Router({
  routes,
  beforeEach: (to, from, next) => {
    const title = to.meta && to.meta.title;
    if (title) {
      document.title = title;
    }
    next();
  },
  routerbeforeRouteUpdate(to, from, next) {
    //   // 在当前路由改变，但是该组件被复用时调用
    //   // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    //   // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    //   // 可以访问组件实例 `this`
    let userid = Utils.getUrlParam('userid')
    let webToken = Utils.getUrlParam('webToken')
    let nickName = Utils.getUrlParam('nickName')
    let avatarUrl = Utils.getUrlParam('avatarUrl')
    console.log(userid)
    console.log(webToken)
    if (userid) {
      let userInfo = {
        userid,
        webToken,
        nickName: decodeURIComponent(nickName),
        avatarUrl: decodeURIComponent(avatarUrl)
      }
      localStorage.setItem('userInfo', JSON.stringify(userInfo))
    }
  }
});

// router.
//,
export {
  router
};