<template>
<div >
    <Head />
    <div class="container">
        <!--
        <router-link :to="'/'" class="btn btn-outline-primary mt-2">Back
        </router-link>
        <hr class="mt-2 mb-2" />        
        -->
        <h1>{{ title }}</h1>
        ID : {{ id }}<br />
        date : {{ create }}<br />
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
import Head from '@/components/Layouts/Head'
//import HeadShow from '@/components/Layouts/HeadShow'
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
console.log( data.page_items )
                var items = LibCommon.convert_items(data.page_items )
                var item  = LibCmsEdit_3.get_page_item( items, String(id) )
console.log( item )
                this.title = item.title
                this.content = marked(item.content)
                this.create = item.created_at
                this.id = item.id
            })
        },
    }

}
</script>

<!-- -->
<style>
</style>

