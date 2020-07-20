<template>
    <div>
        <h1>CmsEdit- test:</h1>
        <hr />
        data : {{ data1 }}
        <hr />
        <button v-on:click="test1()">[ test1 ]</button>
        <hr />

    </div>
</template>

<script>
import {Mixin} from '../../mixin'
import Dexie from 'dexie';
import LibCmsEdit_3 from '@/libs/LibCmsEdit_3';
import LibCommon from '@/libs/LibCommon';

var db = null;
//
export default {
    mixins:[Mixin],
    created() {
        var config = LibCmsEdit_3.get_const()
        db = new Dexie( config.DB_NAME );
        db.version( config.DB_VERSION).stores( config.DB_STORE );        
    },
    data() {
        return {
            user : [],
            message : "data: Hello-TestChild-123",
            child_data : "hoge",
            data1 : "",
        }
    },
    methods: {
        test1: function(){
            for(var i = 1; i<= 1000; i++){
                this.add_item(i)
            }
        },
        add_item: function(num){
console.log(num)
            var dt = LibCommon.formatDate( new Date(), "YYYYMMDDhhmmss");
            var task = {
                category_id: 0,
                show_id: dt,
                title: "title-" + num,
                content: "content-"+ num,
                created_at: new Date(),
            }
            db.cms_edit.add( task)
        },
        get_items(){
            db.friends
                .toArray()
                .then(function (items ) {
                    console.log( items );
                });
        },

    }
}
</script>

