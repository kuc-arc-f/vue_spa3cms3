<template>
    <div>
        <h1>DexieTasks- test:</h1>
        <hr />
        data : {{ data1 }}
        <hr />
        <button v-on:click="test1()">[ test1 ]</button>
        <hr />
        <button v-on:click="test2()">[ test2 ]</button>
        <hr />

    </div>
</template>

<script>
import {Mixin} from '../../mixin'
import Dexie from 'dexie';

var db = null;
//var db = new Dexie("friend_database");
//
export default {
    mixins:[Mixin],
    created() {
        db = new Dexie( this.sysConst.DEXIE_DB_NAME );
        db.version(this.sysConst.DEXIE_DB_VERSION).stores(
        this.sysConst.DEXIE_DB_STORE );               
        /*
         db.version(1).stores({
              friends: 'name,shoeSize'
          });
        */
//          this.add_item()
//          this.get_items()
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
        test2(){
//            var str ="2020/7/1"
            var str ="2020-7-1"
//            const replaced = str.replace(/,/g, ' ')
            const replaced = str.replace(/\//g, '-')
            var tmp = replaced.split("-");
console.log( tmp )

            /*
            var fname = "aaa.json"
            if ( fname.match(/.json/) == null ){
console.log( "#false")
            }else{
console.log( fname )
            }
            */
        },
        test1(){
            var date_str = "2020-06-01T00:00:00.000Z"
//            var date = new Date("2020-06-01T00:00:00.000Z");
            var date = new Date(date_str);
            date.setMonth( date.getMonth() + 1);
            var end = new Date(date_str);
            end.setMonth( end.getMonth() - 1);
//             db.tasks.clear()
//            var date = new Date("2020-06-29T00:31:52.546Z");
console.log("# test1=" + date)
//console.log("# test1.bef=" + date.getMonth() )
console.log("# test1.bef=" + date )
console.log("# test1.end=" + end )
        var now = new Date()
console.log("# test1.now=" +  now.toString() )

        },
        getTasks(){
        },
        /*
        add_item(){
            db.friends.add({
                name: "Nicolas", 
                shoeSize: 8,
            });
            db.friends.add({
                name: "Kotan", 
                shoeSize: 6,
            });

        },
        */
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

