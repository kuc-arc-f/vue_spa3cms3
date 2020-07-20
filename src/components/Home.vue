<template>
    <div>
        <h1>Home</h1>
        welcome, idx-kuc.netlify.app
    </div>
</template>

<script>
import {Mixin} from '../mixin'

export default {
    mixins:[Mixin],
    created () {
        var url = this.get_exStorage( this.sysConst.KEY_NEXT_ACTION )
        this.remove_exStorage(this.sysConst.KEY_NEXT_ACTION )
//console.log("url="+ url );
        if(url.length > 0){
            this.$router.push( url )
        }
    }
}
</script>
