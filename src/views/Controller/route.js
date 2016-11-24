const route = {
  name: 'controller',
  path: '/controller',
  meta: {
    title: 'Controller',
    isNav: true,
  },
  component: resolve => require(['./index.vue'], resolve),
}

export default route
