<template>
<div class="task_index_wrap">
    <navbar />
    <div class="container">
        <FlashMessage></FlashMessage>
        <div class="row" style="margin-top: 10px;">
            <div class="col-sm-4"><h3>CmsCategory</h3>
            </div>
            <div class="col-sm-4">
                <router-link :to="'/cms_category/new/'" class="btn btn-primary">Create
                </router-link>
            </div>
            <div class="col-sm-4" style="text-align: right;">
                &nbsp;&nbsp;
            </div>
        </div>
        <hr class="mt-2 mb-2" />
        <br />
        <ul v-for="item in category_items" v-bind:key="item.id">
            <li>
                <span style="margin-right: 10px; font-size: 1.4rem;">
                    {{ item.name }}
                </span>
                &nbsp;&nbsp;
                <router-link :to="'/cms_category/edit/' + item.id"
                    class="btn btn-outline-primary btn-sm">Edit
                </router-link>                
                <br />
                ID : {{ item.id }}
                , {{ item.created_at }}
            </li>
        </ul>
        <hr />
    </div><!-- end_container -->
       
</div>
</template>

<!-- -->
<style> 
.page_info_wrap{
    background: #EEE;
    padding : 10px;
    margin-top : 20px;
}
</style>
<!-- -->
<script>
import {Mixin} from '../../mixin'
import FlashMessage from '../../components/Layouts/FlashMessage'
import navbar from '@/components/Layouts/Navbar'
import Dexie from 'dexie';
import LibDexie from '@/libs/LibDexie';
import LibCmsEdit_3 from '@/libs/LibCmsEdit_3';

var db = null;
//
export default {
    mixins:[Mixin],
    components: { FlashMessage ,navbar },
    created () {
        var config = LibCmsEdit_3.get_const()
        db = new Dexie( config.DB_NAME );
        db.version( config.DB_VERSION).stores( config.DB_STORE );        
        this.get_items()
    },
    data () {
        return {
            category_items : [],
        }
    },
    methods: {
        get_items(){
            var self = this
            db.category.toArray().then(function (items ) {
                self.category_items = LibDexie.get_reverse_items(items)
                console.log( items )
            });
        },
    }
}
</script>
