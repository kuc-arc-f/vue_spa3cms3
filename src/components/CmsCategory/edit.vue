<template lang="html">
    <div class="container task_edit_wrap">
        <router-link :to="'/cms_category'" class="btn btn-outline-primary mt-2">Back
        </router-link>
        <hr class="mt-2 mb-2" />
        <h3>Category - edit</h3>        
        <div class="form-group">
            <label for="TopicTitle">Title :</label>
            <div class="col-sm-6">
                <input type="text" class="form-control" v-model="name" >
            </div>
        </div>
        <hr />        
        <button v-on:click="update_item(id);" class="btn btn-primary mt-2">Save
        </button>
        <hr />
        <button v-on:click="delete_item(id);"
             class="btn btn-outline-danger btn-sm mt-2">Delete
        </button>
        <br /><br />
    </div>
</template>

<script>
import {Mixin} from '../../mixin'
import Dexie from 'dexie';
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
    data() {
        return {
            id: 0,
            tasks: [],
            name:'',
        }
    },
    methods: {
        async get_item(id){
            const item = await db.category.get(id);
            this.name = item.name
//            console.log(item);                          
        }, 
        update_item(task_id){
console.log( this.title )
//console.log( id )
            db.category.update(parseInt(task_id) , {
                name: this.name,
                //content: this.content,
            });
            this.$router.push('/cms_category')
        },        
        delete_item(id){
console.log( id )
            db.category.delete(parseInt(id) );
            this.$router.push('/cms_category')
        },
    }
}
</script>
