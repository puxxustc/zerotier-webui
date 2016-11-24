const route = {
  name: 'settings',
  path: '/settings',
  meta: {
    title: 'Settings',
    isNav: true,
  },
  component: resolve => require(['./index.vue'], resolve),
}

export default route
