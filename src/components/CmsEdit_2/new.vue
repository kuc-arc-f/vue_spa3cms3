<template lang="html">
    <div class="container task_create_wrap">
            <router-link :to="'/edit'" class="btn btn-outline-primary mt-2">Back
            </router-link>
            <h3>CmsEdit - new</h3>
            <hr class="mt-2 mb-2" />
            <div class="form-group">
                <label for="TopicTitle">Category : </label>
                <div class="col-sm-6">
                    <select v-model="category_save_id" required="required"  class="form-control">
                        <option value="0">選択下さい</option>
                        <option v-for="item in category_items" v-bind:key="item.save_id"
                            v-bind:value="item.save_id"> {{item.name}}
                        </option>
                    </select>                    
                </div>
            </div>            
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
        this.get_category_items()       
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
        get_category_items(){
            var self = this
            db.category.toArray().then(function ( data ) {
                self.category_items = data
console.log( self.category_items )
            });       
        },        
        add_item(){
            var category = LibCmsEdit_3.get_category_item( 
                this.category_items, this.category_save_id
            )
console.log( category )
            var dt = LibCommon.formatDate( new Date(), "YYYYMMDDhhmmss");
            var task = {
                show_id : dt,
                category : category,
                title: this.title,
                content: this.content,
                created_at: new Date(),
            }
            db.cms_edit.add( task)
            this.$router.push('/edit')            
        },
    }
}
</script>
