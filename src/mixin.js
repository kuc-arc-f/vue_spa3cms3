export const Mixin =  {
    created:function(){
        this.set_sysConst()  
    },
    methods:{
        mtd(){
        console.log('mixin mtd')
        },
        set_sysConst(){
            this.sysConst={
                STORAGE_KEY_showId : 'key_show_id',
                STORAGE_KEY_tasksData : 'key_tasks_dat',
                STORAGE_KEY_flash : 'strage_flash_key',
                STORAGE_KEY_userData : 'key_user_dat',
                KEY_NEXT_ACTION : 'key_next_action',
                KEY_CHAT_JOIN_ITEMS : 'key_chat_join_items',
                KEY_MDAT_MONTH : 'key_mdat_month',
                KEY_CMS_EDIT_ITMES : 'key_cms_edit_items',
                INDEX_DB_NAME : 'test_idx_db4',
                DEXIE_DB_NAME : 'test_idx_db6',
                DEXIE_DB_VERSION : 3,
                DEXIE_DB_STORE : {
                    person: '++id, name, age',
                    tasks: '++id, title, content ,created_at',                    
                    todos: '++id, title, content , complete, created_at', 
                    file_items: '++id, name, created_at',                   
                },
            }
        },
        /* local storage */
        set_exStorage(key, message){
            localStorage.setItem( key, JSON.stringify(message))
        },
        get_exStorage(key){
            var dat = JSON.parse(localStorage.getItem(key) || '[]')
//            console.log( 'dat.len='+ dat.length )
            return dat
        },
        remove_exStorage(key){
            localStorage.removeItem( key );
        },  
        /* user */
        check_userState(key, self){
            var store = this.get_exStorage(key)
            if( store.length >0){
                /* var user = store[0] */
                /* console.log(user.uid ) */
            }else{
                self.$router.push('/users/login')            
            }
        },
        valid_login(key){
            var ret = false;
            var store = this.get_exStorage(key)
            if( store.length >0){
                ret = true;
            }
            return ret;
        },
        get_userId(key ){
            var ret = '';
            var store = this.get_exStorage(key)
            if( store.length >0){
                var user = store[0]
                /* console.log(user.uid ) */
                ret = user.id
            }       
            return ret
        },
        
    }
}
