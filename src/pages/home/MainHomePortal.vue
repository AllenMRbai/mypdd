<template>
  <div>
      <div class="top-banner-box">
        <div class="red-bg"></div>
        <swiper :banners='banners' :autoSlide='true'/>
      </div>
      <section class='portal-entries-container'>
          <img src="@/assets/img/activity.png" style="margin-bottom:8px;">
          <entries-container :entries='entries' :maxColumn='7'/>
      </section>
      <product-cards :products='products' :isReady='isReady' @update='getProducts'/>
  </div>
</template>

<script>
import Swiper from '@/components/Swiper'
import EntriesContainer from '@/components/EntriesContainer'
import ProductCards from '@/components/ProductCards'
import {getRandomProducts} from '@/api/productApi'
import { setTimeout } from 'timers';

export default {
  name: 'MainHomePortal',
  components:{
    Swiper,
    EntriesContainer,
    ProductCards
  },
  data () {
    return {
      banners:[
        {img:'static/img/banner1.jpeg',url:''},
        {img:'static/img/banner2.webp',url:''},
        {img:'static/img/banner3.webp',url:''},
        {img:'static/img/banner4.webp',url:''},
        {img:'static/img/banner5.webp',url:''},
        {img:'static/img/banner6.webp',url:''}
      ],
      entries:[
        {icon:'static/img/0.png',title:'限时秒杀',url:'',hot:false,tag:'static/img/new.gif'},
        {icon:'static/img/1.png',title:'品牌清仓',url:'',hot:true,tag:null},
        {icon:'static/img/2.png',title:'新年签',url:'',hot:false,tag:null},
        {icon:'static/img/3.png',title:'转盘领现金',url:'',hot:false,tag:null},
        {icon:'static/img/4.png',title:'助力享免单',url:'',hot:true,tag:null},
        {icon:'static/img/5.png',title:'手机充值',url:'',hot:false,tag:null},
        {icon:'static/img/6.png',title:'海淘',url:'',hot:false,tag:null},
        {icon:'static/img/7.png',title:'爱逛街',url:'',hot:false,tag:null},
        {icon:'static/img/8.png',title:'9块9特卖',url:'',hot:false,tag:null},
        {icon:'static/img/9.png',title:'现金签到',url:'',hot:false,tag:'static/img/signin.gif'},
        {icon:'static/img/10.png',title:'食品超市',url:'',hot:false,tag:null},
        {icon:'static/img/11.png',title:'砍价免费拿',url:'',hot:false,tag:null},
        {icon:'static/img/12.png',title:'时尚穿搭',url:'',hot:false,tag:null},
        {icon:'static/img/13.png',title:'1分拼',url:'',hot:false,tag:null}        
      ],
      products:[],
      isReady:false
    }
  },
  methods:{
    getProducts(page){
      this.isReady=false;
      getRandomProducts(page).then(res=>{
        if(res.status==200){
          for(let pro of res.data.data.rows){
            this.products.push(pro);
          }
          this.isReady=true;
        }
      }).catch(e=>{
        this.isReady=true;
      }) 
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.portal-entries-container{
  background:url('../../assets/img/entries-bg.png') center no-repeat;
  background-size: cover;
  padding: 8px 0;
}


</style>
