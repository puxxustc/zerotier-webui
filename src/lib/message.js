import Vue from 'vue'
import Message from 'vue-bulma-message'

const MessageComponent = Vue.extend(Message)
const openMessage = (propsData = {
  title: '',
  message: '',
  type: '',
  direction: '',
  duration: 1500,
  container: '.messages',
}) => {
  return new MessageComponent({
    el: document.createElement('div'),
    propsData,
  })
}

export default openMessage
