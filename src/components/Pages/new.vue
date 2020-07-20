<template lang="html">
    <div class="container task_create_wrap">
            <router-link :to="'/edit/pages'" class="btn btn-outline-primary mt-2">Back
            </router-link>
            <h3>Pages - new</h3>
            <hr class="mt-2 mb-2" />
            <div class="form-group">
                <label for="TopicTitle">Title : </label>
                <div class="col-sm-6">
                    <input type="text" class="form-control" id="title"
                    v-model="title" required="required" />
                </div>
            </div>
            <div class="form-group">
                <label for="TopicContent">Content :</label>
                <div class="col-sm-10">
                    <textarea class="form-control" id="content" rows="12"
                     v-model="content"></textarea>
                </div>
            </div>
            <hr />
            <button v-on:click="add_item();" class="btn btn-primary mt-2">Save
            </button>
            <br /><br />
    </div>
</template>

<script>
import {Mixin} from '../../mixin'
import Dexie from 'dexie';
import LibCmsEdit_3 from '@/libs/LibCmsEdit_3';
import LibCommon from '@/libs/LibCommon';

var db = null
//
export default {
    mixins:[Mixin],
    created() {
        var config = LibCmsEdit_3.get_const()
        db = new Dexie( config.DB_NAME );
        db.version( config.DB_VERSION).stores( config.DB_STORE ); 
//console.log( config.DB_STORE )
    },
    data() {
        return {
            title:'',
            content:'',
            category_save_id : 0,
            category_items: [],
        }
    },
    methods: {
        add_item(){
            var dt = LibCommon.formatDate( new Date(), "YYYYMMDDhhmmss");
            var task = {
                save_id : "id"+ dt,
                title: this.title,
                content: this.content,
                created_at: new Date(),
            }
            db.pages.add( task)
            this.$router.push('/edit/pages')            
        },
    }
}
</script>
