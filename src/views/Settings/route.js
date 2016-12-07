const route = {
  name: 'settings',
  path: '/settings',
  meta: {
    title: 'Settings',
    isNav: true,
  },
  component: () => System.import('./index.vue'),
}

export default route
