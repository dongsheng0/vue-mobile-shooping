import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const routes = [{
    path: '*',
    redirect: '/home'
  },
  {
    name: 'home',
    component: () => import('../pages/home/index'),
    meta: {
      title: '首页'
    }
  },
  {
    path: '/user',
    component: () => import('../pages/user/index'),
    name: 'user',
    meta: {
      title: '我的'
    }
  },
  {
    path: '/user/order',
    component: () => import('../pages/user/order/list'),
    meta: {
      title: '我的订单'
    }
  },
  {
    path: '/user/order/:id',
    component: () => import('../pages/user/order/info'),
    meta: {
      title: '订单详情'
    }
  },
  {
    path: '/user/profit',
    component: () => import('../pages/user/profit/list'),
    meta: {
      title: '提现记录'
    }
  },
  {
    path: '/user/profit/detail',
    component: () => import('../pages/user/profit/detail'),
    meta: {
      title: '收益详情'
    }
  },
  {
    path: '/user/withdrawal',
    component: () => import('../pages/user/profit/withdrawal'),
    meta: {
      title: '提现'
    }
  },
  {
    path: '/user/share',
    component: () => import('../pages/user/share/list'),
    meta: {
      title: '推广记录'
    }
  },
  {
    path: '/cities',
    component: () => import('../pages/cities/index'),
    meta: {
      title: '城市'
    }
  },
  {
    path: '/search',
    component: () => import('../pages/search/index'),
    meta: {
      title: '搜素'
    }
  },
  // 详情
  {
    path: '/goods/:id',
    component: () => import('../pages/product/goods/detail'),
    meta: {
      title: '商品详情'
    }
  },
  {
    path: '/goods/order',
    component: () => import('../pages/product/goods/order'),
    meta: {
      title: '商品提交预定'
    }
  },
  {
    path: '/hotel/:id',
    component: () => import('../pages/product/hotel/detail'),
    meta: {
      title: '酒店详情'
    }
  },
  {
    path: '/room/:id',
    component: () => import('../pages/product/hotel/room'),
    meta: {
      title: '房型介绍'
    }
  },
  {
    path: '/hotel/order',
    component: () => import('../pages/product/hotel/order'),
    meta: {
      title: '酒店提交预定'
    }
  },
  {
    path: '/scenic/:id',
    component: () => import('../pages/product/scenic/detail'),
    meta: {
      title: '景区详情'
    }
  },
  {
    path: '/scenic/order',
    component: () => import('../pages/product/scenic/order'),
    meta: {
      title: '景区提交预定'
    }
  },
  {
    path: '/detail/:id',
    component: () => import('../pages/detail/test'),
    meta: {
      title: '测试商品详情'
    }
  },
];

// add route path
routes.forEach(route => {
  route.path = route.path || '/' + (route.name || '');
});

const router = new Router({
  routes
});

router.beforeEach((to, from, next) => {
  const title = to.meta && to.meta.title;
  if (title) {
    document.title = title;
  }
  next();
});

export {
  router
};