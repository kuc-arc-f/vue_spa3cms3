<template>
<div class="chat_left_wrap" style="margin-top: 10px;">
    <h3>Chat </h3>
	<div class="left_menu_wrap">
		<div class="menu_home">
			<!-- /chats -->
			<a href="" class="btn btn-outline-primary"
                v-on:click="proc_home();">
				<i class="fas fa-home"></i> Chat Home
			</a>
		</div>
		<div class="menu_join_chat" style="margin-top: 20px;">Join Chat
		</div>  
        <p class="p_load_messages">Loading , join chat items ...
        </p>     
        <div class="left_chats_wrap" style="padding-top:10px;">
            <div v-for="chat in chats" v-bind:key="chat.id">
                <p class="li_join_chat">
                    <a href="" v-on:click="proc_next(chat.id);">{{ chat.name }}
                    </a>
                </p>
            </div>
        </div>

	</div>
</div>
</template>


<!-- -->
<style>
.menu_home{ background: #fff; }
.menu_join_chat{
	padding: 10px;
	background: #EEE; 
}

.li_join_chat{ /*padding: 10px; */ 
	border-bottom: 1px solid #000; 
} 
</style>
<!-- -->
<script>
import {Mixin} from '../../mixin'
// import axios from 'axios'
import $ from 'jquery'

//
export default {
    mixins:[Mixin],
//    props: ['join_chats' ],
    created () {
        this.check_userState(this.sysConst.STORAGE_KEY_userData, this)
        this.user_id = this.get_userId(this.sysConst.STORAGE_KEY_userData )
console.log( "uid=" + this.user_id )        
//console.log( "c-len="+ this.join_chats.length  )
        this.getTasks()
    },
    data () {
        return {
            user_id : 0,
            chats: [],
        }
    },
    methods: {
        getTasks(){
            var self = this
            setTimeout(function () {
                self.chats = self.get_exStorage( self.sysConst.KEY_CHAT_JOIN_ITEMS )
                $('.p_load_messages').css('display','none');
// console.log(  self.chats )
                self.remove_exStorage( self.sysConst.KEY_CHAT_JOIN_ITEMS )
            }, 3000)
       },
        proc_next: function(id){
            this.set_exStorage(this.sysConst.KEY_NEXT_ACTION , '/chats/show/' + id )
            window.location.href = this.sysConst.HTTP_URL
        },          
        proc_home: function(){
            this.set_exStorage(this.sysConst.KEY_NEXT_ACTION , '/chats')
            window.location.href = this.sysConst.HTTP_URL
        },          
    }
}
</script>

