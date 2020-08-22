<template>
<div >
    <Head />
    <div class="container">
        <router-link :to="'/'" class="btn btn-outline-primary mt-2">Back
        </router-link>
        <hr class="mt-2 mb-2" />        
        <h1>{{ title }}</h1>
        ID : {{ id }}<br />
        date : {{ create }}<br />
        <span style="font-size: 20px; margin-right: 10px;">
            <i class="fas fa-folder"></i>  {{ category_name }}<br />
        </span>        
        <hr />
        <div id="post_item" v-html="content"></div>
        <hr />
    </div>    
</div>
</template>

<!-- -->
<script>
import {Mixin} from '../mixin'
import marked from  'marked'
import axios from 'axios'
//import HeadShow from '@/components/Layouts/HeadShow'
import Head from '@/components/Layouts/Head'
import LibCommon from '@/libs/LibCommon';
import LibCmsEdit_3 from '@/libs/LibCmsEdit_3';

//
export default {
    components: { Head },    
    mixins:[Mixin],
    created () {
        var show_id = String(this.$route.params.id)
        this.get_item( show_id )
    },
    data () {
        var itemDat = {title : '', content : ''}
        return {
            id : 0,
            item: itemDat,
            tasks : [],
            title:'',
            content:'', 
            create : '',   
            cms_items: [],
            category_name: "",        
        }        
    },
    methods: {
        async get_item(id){
//console.log( id ) 
            var dt = LibCommon.formatDate( new Date(), "YYYY-MM-DD_hhmmss");
            axios.get('./cms.json?' + dt).then(res =>  {
                var data = res.data
                var items = LibCommon.convert_items(data.items )
                var item  = LibCmsEdit_3.get_show_item( items, String(id) )

                this.title = item.title
                this.content = marked(item.content)
                this.create = item.created_at
                this.id = item.id
                this.category_name = item.category.name
//  console.log( item )
            })
        },
    }

}
</script>

<!-- -->
<style>
div#post_item > p > img{
    max-width : 100%;
    height : auto;
}
div#post_item > hr {
  height: 1px;
  background-color: #000;
  border: none;
}
</style>

