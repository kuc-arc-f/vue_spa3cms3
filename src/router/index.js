import Vue from 'vue'
import Router from 'vue-router'

import about from '../components/About'
import top from '../components/Top'
import show from '../components/show'
import page from '../components/page'

//
Vue.use(Router)
//
export default new Router({
	/* mode: 'history', */
	routes: [
		{ path: '/', component: top },
		{ path: '/show/:id', component: show },
		{ path: '/pages/:id', component: page },
		{ path: '/about', component: about },

	] 
})
