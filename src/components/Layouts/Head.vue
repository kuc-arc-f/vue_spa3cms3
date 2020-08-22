<template>
    <!-- navi -->
    <div id="div_navigate_index">
        <div id="div_head" class="cover">
            <div class="container">
                <div class="row">
                    <div class="col-sm-4">
                        <a href="./" class="home_link"><p><i class="fas fa-home"></i></p>
                        </a>
                    </div>
                    <div class="col-sm-8" style="text-align: right;">
                    <!-- nav -->
                    </div>
                </div>
            </div>
        </div><!-- end_div_head -->
        <!-- mobile-nav -->
    </div>
    
</template>

<!-- -->
<style>
</style>
<!-- -->
 <script>
 import $ from 'jquery'

 //
export default {
    created() {
    },
    methods: {
        toggle_click(){
            $(".mobile-child").slideToggle(300);
//console.log("#-demo01")
        },
    }    
}
</script>