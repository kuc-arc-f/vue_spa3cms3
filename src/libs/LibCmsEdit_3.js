// LibCmsEdit_3

//import LibCommon from '@/libs/LibCommon';

//
export default {
    get_const: function(){
        return {
            DB_NAME: "cms_edit3_idx_kuc_db",
            DB_VERSION: 1,
            /*
            DB_STORE_ver2: {
                cms_edit: '++id, category_id, show_id , title, content , created_at',
                category: '++id, name, created_at',
            },
            */
            DB_STORE: {
                cms_edit: '++id, category, show_id , title, content , created_at',
                category: '++id, name, save_id, created_at',
                pages: '++id, save_id , title, content , created_at',
            },
//            file_version: 2,
            file_version: 3,
        }
    },
    get_show_item: function(items, id){
        var ret = null;
        items.forEach(function(item){
//console.log(item.show_id );
            if(item.show_id == String(id) ){
                ret = item
            }
        });
        return ret
    }, 
    get_page_item: function(items, id){
        var ret = null;
        items.forEach(function(item){
//console.log(item.show_id );
            if(item.save_id == String(id) ){
                ret = item
            }
        });
        return ret
    },        
    get_category_item: function(items, id){
        var ret = {
            id: 0,
            name: "",
            save_id: "id0",
        };
        items.forEach(function(item){
//console.log(item.show_id );
            if(item.save_id == String(id) ){
                ret = item
            }
        });
        return ret
    },    
    get_category_data: function(items, id){
        var ret = [];
        items.forEach(function(item){
//console.log(item.category.save_id );
            if(item.category.save_id == String(id) ){
                ret.push(item)
            }
        });
        return ret
    },

}
