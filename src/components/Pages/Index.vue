<template>
<div class="task_index_wrap">
    <navbar />
    <div class="container">
        <FlashMessage></FlashMessage>
        <div class="row" style="margin-top: 10px;">
            <div class="col-sm-4"><h3>Pages - ver2</h3>
            </div>
            <div class="col-sm-4">
                <router-link :to="'/edit/pages/new'" class="btn btn-primary">Create
                </router-link>
            </div>
            <div class="col-sm-4" style="text-align: right;">
                &nbsp;&nbsp;
            </div>
        </div>
        <hr class="mt-2 mb-2" />
        <br />
        <ul v-for="item in page_items" v-bind:key="item.id">
            <li>
                <router-link :to="'/edit/pages/show/' + item.id" style="margin-right: 10px; font-size: 1.4rem;">
                    {{ item.title }}
                </router-link>
                <router-link :to="'/edit/pages/edit/' + item.id"
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
import Dexie from 'dexie';
import LibDexie from '@/libs/LibDexie';
import LibCmsEdit_3 from '@/libs/LibCmsEdit_3';
import navbar from '@/components/Layouts/Navbar'

var db = null;
//
export default {
    mixins:[Mixin],
    components: { FlashMessage, navbar },
    created () {
        var config = LibCmsEdit_3.get_const()
        db = new Dexie( config.DB_NAME );
        db.version( config.DB_VERSION).stores( config.DB_STORE ); 

        this.get_items()
    },
    data () {
        return {
            page_items: [],
        }
    },
    methods: {
        get_items(){
            var self = this
            db.pages.toArray().then(function (items ) {
                self.page_items = LibDexie.get_reverse_items(items)
// console.log( items )
            });
        },
                
    }
}
</script>
