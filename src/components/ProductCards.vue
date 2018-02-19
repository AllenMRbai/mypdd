<template>
  <div class="products-container">
    <ul class="products-box">
      <router-link tag="li" class="card" v-for="(product,index) in products" :key="index" :to='{name:"ProductDetail",params:{id:product.goodsId}}'>
        <div class="product-pic">
          <img v-lazy="product.thumbUrl">
        </div>
        <div>
          <p class="product-name">
            {{product.shortName}}
          </p>
          <div class="product-detail">
            <p class="product-price">￥<span class="strong">{{product.groupPrice/100}}</span></p>
            <p class="product-sales" v-if="product.cnt>10000">已拼{{parseInt(product.cnt/10000)}}万件</p>
            <p class="product-sales" v-else>已拼{{product.cnt}}件</p>
          </div>
        </div>
      </router-link>
    </ul>
    <div class="loading-box" id="loading-box" v-show="!isReady">
      <div class="loading-pic"><img src="/static/img/Rolling-0.6s-100px.gif"></div>
    </div>
  </div>
</template>

<script>
import { setTimeout } from 'timers';

export default {
  name: 'ProductCards',
  props:{
    products:Array,
    infinite:{
      type:Boolean,
      default:true
    },
    threshold:{
      type:Number,
      default:100
    },
    isReady:{
      type:Boolean,
      default:false
    },
    immediateCheck:{
      type:Boolean,
      default:true
    }
  },
  data () {
    return {
      page:1,
      componentSign:''//组件标记，标记该组件是属于那个页面的
    }
  },
  methods:{
    immeidateTrig(){
      if(this.immediateCheck){
        this.$emit('update',this.page++);
      }
    },
    scrollHandler(e){
      let windowHight=document.documentElement.clientHeight,
          scrollHight=document.body.scrollHeight,
          nowHight=window.scrollY;

      if(nowHight+windowHight+this.threshold>=scrollHight){
        this.$emit('update',this.page++);
        //console.log('产品卡 '+this.componentSign+'发射事件')
      }
    },
    bindListener(){
      window.addEventListener('scroll',this.scrollHandler);
    },
    unbindListener(){
      window.removeEventListener('scroll',this.scrollHandler);
    }
  },
  watch:{
    $route(to,from){
      if(to.name===from.name && to.name===this.componentSign){
        //console.log('产品卡route'+this.componentSign,to.params.id)
        this.unbindListener();
        this.immeidateTrig();
        this.bindListener();
        this.page=1;
      }
    }
  },
  created(){
    //console.log('产品卡created '+this.componentSign)
    if(!this.componentSign){
      this.componentSign=this.$route.name
    }
    this.immeidateTrig();
    this.unbindListener();
    this.bindListener();
  },
  activated(){
    //console.log('产品卡activated '+this.componentSign)
    this.unbindListener();
    this.bindListener();
  },
  deactivated(){
    //console.log('产品卡deactivated '+this.componentSign)
    this.unbindListener();
  },
  destroyed(){
    //console.log('产品卡destroyed '+this.componentSign)
    this.unbindListener();
  }
  // beforeRouteEnter (to, from, next) {
  //   console.log('产品卡beforeRouteEnter '+this.componentSign)
  // },
  // beforeRouteUpdate (to, from, next) {
  //   let self=this;
  //   console.log('产品卡beforeRouteUpdate '+this.componentSign,self)
  // },
  // beforeRouteLeave  (to, from, next) {
  //   let self=this;
  //   console.log('产品卡beforeRouteLeave '+this.componentSign,self)
  // }
}
</script>

<style lang="scss" scoped>
.products-container{
  width: 100%;
}
.products-box{
  @include f-start;
  @include forbidden-copy;
  padding:0 .5vw; 
  flex-wrap: wrap;
  $card-width:48.5vw;
  .card{
    width: $card-width;
    background-color: #fff;
    margin:0 .5vw 1vw .5vw;
    padding-bottom: 4px;
    .product-pic{
      width: $card-width;
      height: $card-width;
      overflow: hidden;
    }
    .product-name{
      font-size: $fs-small;
      padding: 2px 4px;
      line-height: 18px;
      height: 36px;
      overflow: hidden;
    }
    .product-detail{
      @include f-between;
      padding: 0 4px;
      margin-top: 4px;
    }
    .product-price{
      color: $fc-red;
      font-size: $fs-small;
      .strong{
        color: $fc-red;
        font-weight: bold;
      }
    }
    .product-sales{
      font-size: $fs-small;
      color: $fc-grey;
    }
  }
}
.loading-box{
  $pic-size:1.7rem;
  padding: 3px 0;
  width: 100%;
  box-sizing: content-box;
  height: $pic-size;
  .loading-pic{
    width: $pic-size;
    height: $pic-size;
    margin:0 auto;
  }
}
</style>
