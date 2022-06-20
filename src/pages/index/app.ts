import Vue from 'vue'
import App from './App.vue'

import 'normalize.css'
import 'css.preset'

import router from '@/plugins/router'
import pinia from '@/plugins/store'

new Vue({
    router,
    pinia,
    render: (h) => h(App),
}).$mount('#app')
