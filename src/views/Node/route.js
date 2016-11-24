const route = {
  name: 'node',
  path: '/node',
  meta: {
    title: 'Node',
    isNav: true,
  },
  component: resolve => require(['./index.vue'], resolve),
}

export default route
