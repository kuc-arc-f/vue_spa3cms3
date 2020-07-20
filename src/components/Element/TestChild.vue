<template>
<div class="chat_left_wrap" style="margin-top: 10px;">
    Child-message : {{ child_data }}
    <ul v-for="object in objects" v-bind:key="object.id">
        <li>
            {{ object.id }} / 
            {{ object.number }} / 
            {{ object.name }}  
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
    props: ['child_data', 'objects'],
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

