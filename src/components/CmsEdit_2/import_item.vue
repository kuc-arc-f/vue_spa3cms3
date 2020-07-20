<template>
    <div class="container">
        <router-link :to="'/edit'" class="btn btn-outline-primary mt-2">Back
        </router-link>   
        <hr class="mt-2 mb-2" />     
        <h3>CmsEdit 3- import:</h3>
        <hr />
        <p>select , json file
        </p>
        <div><input type="file" id="file1" class="btn btn-outline-primary">
        </div>
        <hr />
        <div class="loading hide"></div>
        <h3 id="complete_msg" 
        style="color: green; display: none;"> Complete , import data !!
        </h3>
    </div>
</template>

<script>
import {Mixin} from '../../mixin'
import Dexie from 'dexie';
import $ from 'jquery'
import LibCmsEdit_3 from '@/libs/LibCmsEdit_3';

var db = null;
//
export default {
    mixins:[Mixin],
    created() {
        var self = this
        window.addEventListener("load", function() {
            window.document.getElementById("file1").addEventListener("change", function() {
                //console.log("#-change")
                self.change_proc()
            });
        });
        var config = LibCmsEdit_3.get_const()
        db = new Dexie( config.DB_NAME );
        db.version( config.DB_VERSION).stores( config.DB_STORE );  
    },
    data() {
        return {
            user : [],
        }
    },
    methods: {
        change_proc: function(){
            console.log("#-change_proc")
            $('.loading').removeClass('hide');
            var self = this
            var files = window.document.getElementById('file1').files;
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                console.log("i: " + i );                
                console.log("Name: " + file.name);
                console.log("Size: " + file.size);
                console.log("Type: " + file.type);
                console.log("Date: " + file.lastModified);
                console.log("Date: " + file.lastModifiedDate);
                var reader = new FileReader();
                reader.onload = async function(evt) {
                    console.log("State: " + evt.target.readyState);
                    var result =evt.target.result;
                    var dat = JSON.parse(result || '[]')
console.log( dat.save_date ) 
                    if( dat.file_version != null){
console.log( dat.file_version )
                        await self.add_item( dat )
                        if(dat.category_items != null){
                            //console.log( dat.category_items ) 
                        }
                        self.items = dat
                    }else{
                        $('.loading').addClass('hide');
                        alert("Error, file version can not import, version 2 over require")
                    }
//                    console.log( dat.items ) 
                };
                reader.onerror = function(evt) {
                    console.log(evt.target.error.name);
                };
                reader.readAsText(file, "utf-8");             
            }            
        },
        add_category:async function(dat ){
            db.category.clear()
            await dat.category_items.forEach(function(item){
                var data = {
                    save_id: item.save_id,
                    name: item.name,
                    created_at: new Date(item.created_at),
                }
//console.log( item )
//console.log(  data )
                db.category.add( data )
            });
        },          
        add_item:async function(dat ){
            db.cms_edit.clear()
            await dat.items.forEach(function(item){
console.log( item.category  )
                var data = {
//                    category_id: item.category_id,
                    category: item.category,
                    show_id: item.show_id,
                    title: item.title,
                    content: item.content,
                    created_at: new Date(item.created_at),
                }
                db.cms_edit.add( data )
//console.log( data )

            });
            await this.add_category( dat )
            //var self = this
            setTimeout(function () {
                $('#complete_msg').css('display','inherit');
                $('.loading').addClass('hide');
                alert("Complete ,import data success.");
                console.log("# timer.cb")
            }, 1000)           
        },  

    }
}
</script>
<!-- -->
<style>
.hide {
  display: none;
}
.loading {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0,0,0,.5);
  background-image: url(/img/load_img.gif);
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center center;
  background-size: 88px 88px;
}
</style>
