<template>
<div class="chat_left_wrap" style="margin-top: 10px;">
    <ul>
        <li v-for="(product, i) in getTasks" :key="i">
            name: {{ product.title }}
            , ID : {{ product.id }}
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
// console.log( "uid=" + this.user_id )        
    },
    computed: {
        getTasks(){
            return this.$store.getters.getTasks;
        }
    },    
    methods: {
    }
}
</script>

