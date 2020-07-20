<template>
<div class="chat_left_wrap" style="margin-top: 10px;">
    Child-message : {{ week.day_disp }}

</div>
</template>

<!-- -->
<script>
import {Mixin} from '../../mixin'
//
export default {
    mixins:[Mixin],
    props: [ 'message', 'week'],
    created () {
// console.log( "uid=" + this.user_id )        
    },
    data () {
        return {
            user_id : 0,
        }
    },
    methods: {
    }
}
</script>

