<template>
<div class="body_main_wrap" style="background-color: #EEE">
    <Head />
    <div id="div_img_main2"  class="cover" style="" valign="bottom">
        <div id="div_img_layer">
            <h1>〇〇 Blog<br />
            </h1>
        </div>
    </div>     
    <!-- -->
    <div class="container">
        <div class="row conte" id="id_row_service" style="margin-top:10px;">
            <div class="col-sm-12" style="text-align:center;">
            <h2 class="h4_td_title mt-2">トピック</h2>
            <hr class="hr_ex1"/>
            </div>
        </div>
        <div class="row conte">
            <div class="col-sm-4">
            <img class="img_kao" src="/img/pc1.png" style="margin : 10px;">
            </div>
            <div class="col-sm-8">
            <h3>このサイトの紹介 1</h3>
            <p> <br>
            </p>
            </div>
        </div>
        <div class="row conte">
            <div class="col-sm-4">
            <img class="img_kao" src="/img/pc1.png" style="margin : 10px;">
            </div>
            <div class="col-sm-8">
            <h3>このサイトの紹介 2</h3>
            <p> <br>
            </p>
            </div>
        </div>   
        <!-- pages_wrap -->
        <div v-if="pages_display==1" class="category_wrap" style="padding-bottom: 0px;">
            <div class="row conte" style="margin-top: 20px; margin-bottom:20px;">
                <div class="col-sm-12">
                    <h2 class="h4_td_title mt-2" >ページ</h2>
                    <div class="page_btn_wrap mb-0">
                        <span v-for="item in page_items" v-bind:key="item.id">
                            <router-link :to="'/pages/' + item.save_id"
                            class="btn btn-outline-primary" style="margin-left: 10px; margin-bottom: 10px;"
                            target="_blank">
                                {{ item.title }}
                            </router-link>
                        </span>
                    </div>

                </div>
            </div>
        </div>

        <!-- category_wrap  -->
        <div class="category_wrap" style="padding-bottom: 0px;">
            <div class="row conte" style="margin-top: 20px; margin-bottom:20px;">
                <div class="col-sm-12">
                    <h2 class="h4_td_title mt-2" >カテゴリー</h2>
                    <div class="category_btn_wrap mb-0">
                        <span v-for="item in category_items" v-bind:key="item.id">
                            <button class="btn btn-outline-primary" 
                            style="margin-left: 10px; margin-bottom: 10px;"
                            v-on:click="get_category_items(item.save_id )">
                                {{item.name}}
                            </button>
                        </span>
                    </div>

                </div>
            </div>
        </div>
        <!-- body_wrap -->
        <div class="body_wrap" style="padding-bottom: 20px;">
            <div id="post_items_box" class="row conte" style="margin-top: 10px; margin-bottom:20px;">
                <div class="col-sm-12">
                    <div id="div_news">
                        <h2 class="h4_td_title mt-2" >新着の投稿</h2>
                    </div>
                    <div class="post_items_wrap" v-for="item in cms_items" v-bind:key="item.id"
                        style="margin-bottom: 20px;">
                        <div class="div_news_rows" style="width:100%;">
                            <span  style="font-size: 28px; float :left; margin-right: 10px;">
                                <i class="fas fa-arrow-circle-right"></i>
                            </span>
                            &nbsp;&nbsp;
                            <h3 class="ml-10"> 
                                <router-link :to="'/show/' + item.show_id">{{ item.title }}
                                </router-link>
                            </h3>
                        </div>
                        <div style="width:100%;">
                            <ul class="ul_time_box">
                            <li>
                                <p class="mb-0">&nbsp;&nbsp;
                                    <span style="font-size: 20px; margin-right: 10px;">
                                        <i class="far fa-calendar"></i>
                                    </span>
                                    {{ item.created_at }} , ID: {{item.id}}
                                </p>
                                <div v-if="item.category.name!=''">
                                    <span style="font-size: 20px; margin-right: 10px;">
                                        <i class="fas fa-folder"></i> {{ item.category.name }}
                                    </span>                                    
                                </div>
                            </li>
                            </ul>
                        </div>                
                        <hr class="hr_ex1"  />
                    </div>
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

<script>
import {Mixin} from '../mixin'
import axios from 'axios'
// import $ from 'jquery'
import LibCommon from '@/libs/LibCommon';
import LibPaginate from '@/libs/LibPaginate';
import Head from '@/components/Layouts/Head'
import LibCmsEdit_3 from '@/libs/LibCmsEdit_3';
//
export default {
    components: { Head },    
    mixins:[Mixin],
    created () {
        this.get_page_items(1)
        var url = this.get_exStorage( this.sysConst.KEY_NEXT_ACTION )
        this.remove_exStorage(this.sysConst.KEY_NEXT_ACTION )
//console.log("url="+ url );
        if(url.length > 0){
            this.$router.push( url )
        }
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
        }
    },
    methods: {
        get_page_items (page ){
            var dt = LibCommon.formatDate( new Date(), "YYYY-MM-DD_hhmmss");
            axios.get('/cms.json?' + dt).then(res =>  {
                var data = res.data
                var items = []
                if(data.file_version != null){
                    items = LibCommon.get_reverse_items(data.items )
                    if(data.category_items != null){
                        this.category_items = data.category_items
                    }
                    if(data.page_items != null){
console.log( data.page_items.length )
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
</script>

<!-- -->
<style>
div#div_img_main2 {
    height: 300px;
    color: #FFF;
    margin: 0 0 0px;
    width: 100%;
    background:#ddd url(/img/ph2.jpg) no-repeat center center;
    background-size: cover;
    text-align: center;
}
</style>

