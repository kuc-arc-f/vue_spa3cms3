<template lang="html">
    <div class="container task_create_wrap">
            <router-link :to="'/cms_category'" class="btn btn-outline-primary mt-2">Back
            </router-link>
            <hr />
            <h3>Category - new</h3>
            <hr class="mt-2 mb-2" />            
            <div class="form-group">
                <label for="TopicTitle">Name : </label>
                <div class="col-sm-6">
                    <input type="text" class="form-control" id="title"
                    v-model="name" required="required" />
                </div>
            </div>
            <hr />
            <button v-on:click="add_item();" class="btn btn-primary mt-2">Save
            </button>
            <br />
            <br />
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
console.log( config.DB_STORE )      
    },
    data() {
        return {
            name:'',
        }
    },
    methods: {
        add_item(){
            var dt = LibCommon.formatDate( new Date(), "YYYYMMDDhhmmss");
            var task = {
                save_id: "id"+ dt,
                name: this.name,
                created_at: new Date(),
            }
            db.category.add( task)
            this.$router.push('/cms_category')            
        },
    }
}
</script>
