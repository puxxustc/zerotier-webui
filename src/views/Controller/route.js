const route = {
  name: 'controller',
  path: '/controller',
  meta: {
    title: 'Controller',
    isNav: true,
  },
  component: () => System.import('./index.vue'),
  children: [
    {
      name: 'controller/network',
      path: 'network/:nwid',
      component: () => System.import('./Network.vue'),
    },
  ],
}

export default route
