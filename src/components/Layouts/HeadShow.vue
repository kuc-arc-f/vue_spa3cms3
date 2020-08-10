<template>
    <!-- navi -->
    <div id="div_navigate_index">
        <div id="div_head" class="cover">
            <div class="container">
                <div class="row">
                    <div class="col-sm-4">
                        <a href="./"><p>CMS 3</p></a>
                    </div>
                    <div class="col-sm-8" style="text-align: right;">
                    <!-- nav -->	  
                    </div>
                </div>
            </div>
        </div><!-- end_div_head -->
        <!-- mobile-nav -->
        <div id="nav-mobile" style="width:100%;">
            <a class="toggle" v-on:click="toggle_click()">
                <span style="font-size: 34px; color: #FFF">
                    <i class="fas fa-bars"></i>
                </span>
            </a>            
            <div class="mobile-child">
                <ul class='ul_mobile-child'>
                    <!--
                    <li class="mobile-menu-item"><a href='#post_items_box'>posts</a></li>
                        -->
                </ul>
            </div>
        </div>
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
