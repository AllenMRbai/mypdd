<template>
  <div class="products-container">
    <ul class="products-box">
      <router-link tag="li" class="card" v-for="(product,index) in products" :key="index" :to='{name:"ProductDetail",params:{id:product.goodsId}}'>
        <div class="product-pic">
          <img v-lazy="product.thumbUrl" alt="产品图片">
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
      page:1
    }
  },
  methods:{
    immeidateTrig(){
      if(this.immediateCheck){
        this.$emit('update',this.page++);
      }
    }
  },
  watch:{
    $route(){
      this.immeidateTrig();
      this.page=1;
    }
  },
  mounted(){
    let self=this;
    this.immeidateTrig();
    window.addEventListener('scroll',scrollHandler);
    function scrollHandler(e){
      let windowHight=document.documentElement.clientHeight,
          scrollHight=document.body.scrollHeight,
          nowHight=window.scrollY;
      if(nowHight+windowHight+self.threshold>=scrollHight){
        self.$emit('update',self.page++);
      }
    }
  }
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
