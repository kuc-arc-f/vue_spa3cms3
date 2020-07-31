<template>
<div>
    <div class="div_news_rows" style="width:100%;">
        <span  style="font-size: 28px; float :left; margin-right: 10px;">
            <i class="fas fa-arrow-circle-right"></i>
        </span>
        <h3 class="ml-10">
            <router-link :to="'/show/' + item.show_id">{{ item.title }}
            </router-link>       
        </h3> 
    </div>
    <div style="width:100%;">
        <ul class="ul_time_box">
        <li>
            <p class="mb-0">
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
</template>

<!-- -->
<script>
import {Mixin} from '../../mixin'

export default {
    mixins:[Mixin],
    props: ['item'],
    created (){},
}
</script>

