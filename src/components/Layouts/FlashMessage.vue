<template>
    <div>
        <div class="flash_message bg-success text-center py-3 my-0" id="flash_message"
            v-if="message">
            <span style="color: white;">{{ message }}
            </span>
        </div>
    </div>
</template>

<!-- -->
<script>
import {Mixin} from '../../mixin'

//
export default {
    mixins:[Mixin],
    created() {
//        console.log( this.sysConst.STORAGE_KEY_flash )
        this.load_msg()
    },
    data() {
        return {
            message : '',
        }
    },
    methods: {
        load_msg() {
            var dat = this.get_exStorage( this.sysConst.STORAGE_KEY_flash )
//console.log( dat.length )

            if(dat.length > 0){
                console.log(dat[0])
                this.message = dat[0].message
                this.remove_exStorage(this.sysConst.STORAGE_KEY_flash)
//                this.message =dat.message;
            }
        }            
    }
}
</script>

<style>
</style>

