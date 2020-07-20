import Vue from 'vue'
import Router from 'vue-router'

//import home from '../components/Home'
import about from '../components/About'
import top from '../components/Top'
import show from '../components/show'

/* CmsEdit_2 */
import CmsEdit2 from '../components/CmsEdit_2/Index'
import CmsEdit2New from '../components/CmsEdit_2/new'
import CmsEdit2Show from '../components/CmsEdit_2/show'
import CmsEdit2Edit from '../components/CmsEdit_2/edit'
import CmsEdit2Import from '../components/CmsEdit_2/import_item'
//import CmsEdit2Test from '../components/CmsEdit_2/test'

/* CmsCategory */
import CmsCategory from '../components/CmsCategory/Index'
import CmsCategoryNew from '../components/CmsCategory/new'
import CmsCategoryEdit from '../components/CmsCategory/edit'

//
Vue.use(Router)
//
export default new Router({
	/* mode: 'history', */
	routes: [
		{ path: '/', component: top },
		{ path: '/show/:id', component: show },
		{ path: '/about', component: about },
		/* edit */
		{ path: '/edit', component: CmsEdit2 },
		{ path: '/edit/new', component: CmsEdit2New },
		{ path: '/edit/show/:id', component: CmsEdit2Show },
		{ path: '/edit/edit/:id', component: CmsEdit2Edit },
		{ path: '/edit/import', component: CmsEdit2Import },
		//{ path: '/edit/test', component: CmsEdit2Test },
		/* CmsCategory */
		{ path: '/cms_category/new', component: CmsCategoryNew },
		{ path: '/cms_category', component: CmsCategory },
		{ path: '/cms_category/edit/:id', component: CmsCategoryEdit },

	] 
})
