const route = {
  name: 'node',
  path: '/node',
  meta: {
    title: 'Node',
    isNav: true,
  },
  component: () => System.import('./index.vue'),
}

export default route
