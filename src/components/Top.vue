<template>
<div class="body_main_wrap">
    <Head />
    <div id="div_img_main2"  class="cover" valign="bottom">
        <div id="div_img_layer">
            <h1>CMS - Sample<br />
            </h1>
        </div>
    </div>     
    <!-- -->
    <div class="container">
        <TopContent1></TopContent1>
        <div class="btn_menu_area_wrap">
            <div class="row conte mt-2 mb-2" >
                <a href="#" class="ml-4 mt-2 mb-2 menu_display_btn">
                    <i class="fas fa-bars"></i>
                </a>                
            </div>
        </div>
        <div class="btn_hidden_ara_wrap">
            <!-- pages_wrap -->
            <div v-if="pages_display==1" class="category_wrap">
                <div class="row conte mt-2 mb-2">
                    <div class="col-sm-12">
                        <h2 class="h4_td_title mt-2" >Pages</h2>
                        <div class="page_btn_wrap mb-0">
                            <span v-for="item in page_items" v-bind:key="item.id">
                                <router-link :to="'/pages/' + item.save_id"
                                class="btn btn-outline-dark ml-2 mb-2"
                                target="_blank">
                                    {{ item.title }}
                                </router-link>
                            </span>
                        </div>

                    </div>
                </div>
            </div>
            <!-- category_wrap  -->
            <div class="category_wrap">
                <div class="row conte" style="margin-top: 20px; margin-bottom:20px;">
                    <div class="col-sm-12">
                        <h2 class="h4_td_title mt-2" >Category</h2>
                        <div class="category_btn_wrap mb-0">
                            <span v-for="item in category_items" v-bind:key="item.id">
                                <button class="btn btn-outline-dark ml-2 mb-2" 
                                v-on:click="get_category_items(item.save_id )">
                                    {{item.name}}
                                </button>
                            </span>
                        </div>

                    </div>
                </div>
            </div>            
        </div>        
        <!-- body_wrap -->
        <div class="body_wrap mb-2" >
            <div id="post_items_box" class="row conte mt-2" style="margin-bottom:20px;">
                <div class="col-sm-12">
                    <div id="div_news">
                        <h2 class="h4_td_title mt-2" >New Posts</h2>
                    </div>
                    <TopPostItems v-for="item in cms_items" v-bind:key="item.id"
                        v-bind:item="item">
                    </TopPostItems>
                    <!-- paginate -->
                    <div v-if="pagenate_display==1" class="paginate_wrap" 
                        style="text-align: center;">
                        <button v-on:click="get_next_items()" class="btn btn-lg btn-outline-primary">
                            次ページを読む
                        </button>
                    </div>
                    <br />
                </div>
            </div>            

        </div><!-- end_body_wrap -->
    </div><!-- end_container -->

</div>
</template>

<!-- -->
<script>
import {Mixin} from '../mixin'
import axios from 'axios'
import $ from 'jquery'
import LibCommon from '@/libs/LibCommon';
import LibPaginate from '@/libs/LibPaginate';
import LibCmsEdit_3 from '@/libs/LibCmsEdit_3';

import Head from '@/components/Layouts/Head'
import TopContent1 from '@/components/Element/TopContent1'
import TopPostItems from '@/components/Element/TopPostItems'
//
export default {
    components: { Head , TopContent1 ,TopPostItems },    
    mixins:[Mixin],
    created () {
        var url = this.get_exStorage( this.sysConst.KEY_NEXT_ACTION )
        this.remove_exStorage(this.sysConst.KEY_NEXT_ACTION )
        if(url.length > 0){
            this.$router.push( url )
        }
        this.get_page_items(1)
    },
    data () {
        return {
            cms_items: [],
            category_items : [],
            page_items: [],
            items_all : [],
            pagenate_display : 0,
            page_one_max : 20, /* 1 page max */
            page_number : 1,
            page_max : 0,
            pages_display : 0,
            URL_BASE: "",
        }
    },
    methods: {
        get_page_items (page ){
            var dt = LibCommon.formatDate( new Date(), "YYYY-MM-DD_hhmmss");
            var url = './cms.json?' + dt
//console.log(url)
            axios.get(url).then(res =>  {
                var data = res.data
                var items = []
                if(data.file_version != null){
                    items = LibCommon.get_reverse_items(data.items )
                    if(data.category_items != null){
                        this.category_items = data.category_items
                    }
                    if(data.page_items != null){
//console.log( data.page_items.length )
                        if(data.page_items.length > 0){
                            this.pages_display = 1
                        }
                        this.page_items = data.page_items
                    }
                    this.items_all = items;
                }else{
                    alert("Error, file version can not import, version 2 over require")
                }
                this.page_max = LibPaginate.get_max_page(items, this.page_one_max)
                this.cms_items = LibPaginate.get_items(items, page , this.page_one_max )
// console.log( this.cms_items )
                if(this.page_max >=2 ){
                    this.pagenate_display = 1
                }
            })            
        },
        get_next_items: function(){
            this.page_number += 1
            var items  = LibPaginate.get_items(
                this.items_all, this.page_number , this.page_one_max 
            );
            this.cms_items = LibPaginate.add_page_items(this.cms_items, items );
//onsole.log( items )
        }, 
        get_category_items: function( id ){
//console.log( id )
            this.pagenate_display = 0
            this.cms_items = LibCmsEdit_3.get_category_data(this.items_all ,id)
        }               
    }

}
//
$(function(){
	$( '.menu_display_btn' ).click( function() {
		$('.btn_hidden_ara_wrap').css('display','inherit');
	});
});
</script>

<!-- -->
<style>
.body_main_wrap{
    background-color: #EEE;
}
div#div_img_main2 {
    height: 300px;
    color: #FFF;
    margin: 0 0 0px;
    width: 100%;
    background:#ddd url(https://raw.githubusercontent.com/kuc-arc-f/screen-img/master/web/img-4.jpg) no-repeat center center;
    background-size: cover;
    text-align: center;
}
</style>

