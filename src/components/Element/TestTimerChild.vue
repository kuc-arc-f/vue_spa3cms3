<template>
<div class="chat_left_wrap" style="margin-top: 10px;">
    Child-message : {{ child_data }}
    <!-- -->
    <ul v-for="task in tasks" v-bind:key="task.id">
        <li>
            <router-link :to="'/tasks/show/' + task.id">{{ task.title }}</router-link>
            &nbsp;&nbsp;
            <br />
            ID : {{ task.id }}
        </li>
    </ul>    

</div>
</template>

<!-- -->
<script>
import {Mixin} from '../../mixin'
//
export default {
    mixins:[Mixin],
    created () {
        this.get_data()
    },
    data () {
        return {
            child_data : "",
            objects : [],
            tasks : [],
        }
    },
    methods: {
        get_data: function(){
            var self = this
            setTimeout(function () {
                console.log("# timer.cb")
                var store = self.get_exStorage( self.sysConst.KEY_CHAT_JOIN_ITEMS )
                self.tasks = self.get_exStorage( self.sysConst.KEY_CHAT_JOIN_ITEMS )
                console.log( store )

            }, 3000)
        },
    }
}
</script>

