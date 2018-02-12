import Vue from 'vue'
import App from './App.vue'
import data from './data' // 假数据
data();
new Vue({
  el: '#app',
  render: h => h(App)
})
