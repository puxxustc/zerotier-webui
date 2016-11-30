const route = {
  name: 'controller',
  path: '/controller',
  meta: {
    title: 'Controller',
    isNav: true,
  },
  component: resolve => require(['./index.vue'], resolve),
  children: [
    {
      name: 'controller/network',
      path: 'network/:nwid',
      component: resolve => require(['./Network.vue'], resolve),
    },
  ],
}

export default route
