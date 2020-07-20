<template>
    <div class="container">
        <router-link :to="'/edit/pages'" class="btn btn-outline-primary mt-2">Back
        </router-link>
        <hr class="mt-2 mb-2" />        
        <h3>title : {{ title }}</h3>
        ID : {{ id }}<br />
        date : {{ create }}<br />
        <hr />
        <div id="post_item" v-html="content"></div>
        <hr />
    </div>
</template>

<!-- -->
<script>
import {Mixin} from '../../mixin'
import marked from  'marked'
import Dexie from 'dexie';
import LibCommon from '@/libs/LibCommon';
import LibCmsEdit_3 from '@/libs/LibCmsEdit_3';

var db = null
//
export default {
    mixins:[Mixin],
    created() {
        this.id = parseInt(this.$route.params.id)
        var config = LibCmsEdit_3.get_const()
        db = new Dexie( config.DB_NAME );
        db.version( config.DB_VERSION).stores( config.DB_STORE );        
        this.get_item( this.id )
    },
    data: function( ) {
        return {
            id : 0,
            title:'',
            content:'', 
            create : '', 
        }
    },
    methods: {
        async get_item(id){
            const item = await db.pages.get(id);
            this.title = item.title
            this.content = marked(item.content)
            this.create = LibCommon.formatDate(item.created_at, 'YYYY-MM-DD hh:mm') 
console.log('data: ', item) 
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

