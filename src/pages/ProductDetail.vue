<template>
  <div>
    <swiper :banners='topgallery' :autoSlide='false' indicatorType="number" boxWidth="100vw" boxheight="100vw"/>
    <section class="detail-box">
        <ul class="price-box">
            <li class="left">￥{{productDetail.maxgroupprice}}&nbsp;<span>￥{{productDetail.marketprice}}</span></li>
            <li class="right">已拼{{productDetail.sales}}件·2人拼单</li>
        </ul>
        <p>{{productDetail.goodsname}}</p>
        <ul class="promise-box">
            <li><i class="ok"></i>全场包邮</li>
            <li><i class="ok"></i>7天退换</li>
            <li><i class="ok"></i>假一赔十</li>
        </ul>
    </section>

    <ul class="list-box" v-if="pingdans.length>0">
        <li class="list">
            <h2>{{pingdans.length}}人在拼单，可直接参与</h2>
            <p class="more">查看更多</p>
        </li>
        <template v-for="(pd,index) of pingdans">
          <li class="list pd" :key="index" v-if="index<2">
            <div class="sculpture"><img :src="pd.avatar"></div>
            <p class="name">{{pd.nickname}}</p>
            <div class="pd-btn">去拼单</div>
            <div class="pd-detail">
                <p>还差<span>{{pd.requirenum}}人</span>拼成</p>
                <p class="rem-time">剩余23:32:36</p>
            </div>
          </li>
        </template> 
    </ul>

    <ul class="list-box">
        <li class="list">
            <h2>商品评价(3084)</h2>
            <p class="more">查看全部</p>
        </li>
        <li class="tags">
            <div class="tag" v-for="(tag,index) of tagList" :key="index">{{tag}}</div>
        </li>
        <li class="list" v-for="(comment,index) of comments" :key="index">
            <div class="ct-head">
                <div class="sculpture"><img :src="comment.avatar"></div>
                <p class="name">{{comment.name}}</p>
                <p class="time">{{comment.time}}</p>
            </div>
            <p>{{comment.comment}}</p>
            <p class="type">{{comment.orderString}}</p>
        </li>
    </ul>
    
    <ul class="list-box">
        <li class="list">
          <h2>商品详情</h2>
        </li>
        <li class="desc">{{productDetail.goodsdesc}}</li>
        <li>
            <img v-for="(dg,index) of detailgallery" :src="dg" :key="index">
        </li>
        <li class="pull-btn"><p>点击查看商品价格说明</p><span class="arrow-bottom iconfont icon-jiantouxiaxi"></span></li>
    </ul>

    <div class="recommend-title">
        <i class="iconfont icon-xihuan love"></i>为你推荐
    </div>
    <product-cards :products='recommendProducts' :isReady='isReady' @update='getProducts'/>
    
    <to-top/>
    
    <div class="blank"></div>
    <nav class="bottom-bar line-top">
        <ul>
            <li>
                <i><img src="/static/img/home.png"></i>
                <p class="nocopy">首页</p>
            </li>
            <li>
                <i><img src="/static/img/collection.png"></i>
                <p class="nocopy">收藏</p>
            </li>
            <li>
                <i><img src="/static/img/custom-service.png"></i>
                <p class="nocopy">客服</p>
            </li>
            <li class="purchase-btn">
                <p class="nocopy">￥{{productDetail.maxnormalprice}}</p>
                <p class="nocopy">单独购买</p>
            </li>
            <li class="pingdan-btn">
                <p class="nocopy">￥{{productDetail.maxgroupprice}}</p>
                <p class="nocopy">发起拼单</p>
            </li>
        </ul>
    </nav>
  </div>
</template>

<script>
import {
  getProductDetailById,
  getSkuById,
  getCommentsById,
  getPingDanById
} from "@/api/productApi";
import Swiper from "@/components/Swiper";
import ProductCards from "@/components/ProductCards";
import {getRandomProducts} from '@/api/productApi'
import ToTop from "@/components/ToTop";

export default {
  name: "ProductDetail",
  components: {
    Swiper,
    ProductCards,
    ToTop
  },
  data() {
    return {
      topgallery: [],
      detailgallery: [],
      isReady: false,
      productDetail: {},
      recommendProducts: [],
      pingdans:[],
      comments:[],
      tagList:[]
    };
  },
  methods: {
    getProducts(page) {
      this.isReady = false;
      getRandomProducts(page)
        .then(res => {
          if (res.status == 200) {
            for (let pro of res.data.data.rows) {
              this.recommendProducts.push(pro);
            }
            this.isReady = true;
          }
        })
        .catch(e => {
          this.isReady = true;
        });
    },
    getId() {
      return this.$route.params.id;
    },
    getProductDetail(id) {
      getProductDetailById(id).then(res => {
        if (res.data.status === 200) {
          //console.log("productDetail", res);
          let data = res.data.data;
          this.getTopGallery(data.topgallery);
          this.getDetailGallery(data.detailgallery);
          this.getTagList(data.taglist);
          this.productDetail = data;
        }
      });
    },
    getTopGallery(topgallery) {
      let Arr = JSON.parse(topgallery);
      for (let pic of Arr) {
        let obj = {};
        obj.img = pic;
        this.topgallery.push(obj);
      }
    },
    getDetailGallery(detailgallery) {
      let Arr = JSON.parse(detailgallery);
      this.detailgallery=Arr;
    },
    getTagList(tagList){
      let Arr = JSON.parse(tagList);
      this.tagList=Arr;
    },
    getSku(id) {
      getSkuById(id).then(res => {
        if (res.data.status === 200) {
          //console.log("Skus", res);
        }
      });
    },
    getComments(id) {
      getCommentsById(id).then(res => {
        if (res.data.status === 200) {
          let comments=res.data.data;
          for(let c of comments){
            c.orderString=this.formatOrder(c.orderspecs);
          }
          this.comments=comments;
        }
      });
    },
    formatOrder(orderspecs){
      let arr=JSON.parse(orderspecs);
      let text='';
      for(let a of arr){
        text+=a.key+"： "+a.value+' '
      }
      return text;
    },
    getPingDan(id) {
      getPingDanById(id).then(res => {
        if (res.data.status === 200) {
          //console.log("pingdan",res)
          this.pingdans=res.data.data
        }
      });
    },
    getData(id) {
      this.getProductDetail(id);
      this.getSku(id);
      this.getComments(id);
      this.getPingDan(id);
    },
    initPage(){
      let id = this.getId();
      this.topgallery=[];
      this.recommendProducts=[];
      //document.documentElement.scrollTo(0,0);
      this.getData(id);
    }
  },
  watch:{
    $route(to,from){
      if(to.name==='ProductDetail' && from.name==='ProductDetail'){
        //console.log('商品详情$route')
        this.initPage();
      } 
    }
  },
  activated(){
    //console.log('商品详情activated')
    this.initPage();
  }
  // beforeRouteEnter (to, from, next) {
  //   console.log('商品详情beforeRouteEnter')
  //   next()
  // },
  // beforeRouteUpdate (to, from, next) {
  //   console.log('商品详情beforeRouteUpdate',this)
  //   next()
  // },
  // beforeRouteLeave  (to, from, next) {
  //   console.log('商品详情beforeRouteLeave',this)
  //   next()
  // }
};
</script>


<style lang="scss" scoped>
.detail-box{
  background-color:#fff; 
  p{
    color: $fc-dark;
    padding: 4px 8px;
  }
  .price-box{
    overflow: hidden;
    padding: 6px 8px;
    .left{
      float: left;
      font-size: $fs-big;
      color: $fc-red;
      span{
        font-size: $fs-small;
        text-decoration: line-through;
      }
    }
    .right{
      float: right;
    }
  }
  .promise-box{
    background-color: #fafafa;
    margin-top: 10px;
    padding: 6px 0;
    @include f-around;
    li{
      font-size: $fs-small;
      .ok{
        display: inline-block;
        width: .6rem;
        height: .6rem;
        background-image: url('/static/img/promise.png');
        background-size: 100%;
        background-repeat: no-repeat;
        background-position: center;
        vertical-align: middle;
        margin-bottom: 1px;
        margin-right: 3px;
      }
    }
  }
}
.list-box{
  background-color: #fff;
  padding: 0 8px;
  margin-top: .5rem;
  .list.pd{
    height: 2rem;
    box-sizing: content-box;
  }
  .list{
    border-bottom:1px solid $bc;
    overflow: hidden;
    padding:8px 0;
    h2{
      font-size: $fs-normal;
      float: left;
      font-weight: normal;
    }
    p.more{
      color: $fc-grey;
      float: right;
    }
    .sculpture{
      width: 2rem;
      height: 2rem;
      overflow: hidden;
      border-radius: 50%;
      border:1px solid #f0f0f0;
      float: left;
    }
    .name{
      float: left;
      max-width: 6rem;
      margin-left: .2rem;
      height: 2rem;
      line-height: 2rem;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .pd-detail{
      float: right;
      margin-right: 10px;
      p{
        text-align: center;
        span{
          color: $fc-red;
        }
      }
      .rem-time{
        font-size: $fs-small;
      }
    }
    .pd-btn{
      float: right;
      color: #fff;
      height: 1.5rem;
      line-height: 1.5rem;
      padding:0 10px;
      border-radius: 4px;
      display: block;
      margin-top: .25rem;
      background-color: $c-theme-active;
    }
  }
  .desc{
    background-color: #fafafa;
    border-radius: 8px;
    padding: 10px;
    margin: 8px 0;
    line-height: 1.5;
  }
  .tags{
    padding-bottom: 6px;
    overflow: hidden;
    .tag{
      font-size: $fs-small;
      float: left;
      margin-right: 6px;
      border-radius: 4px;
      margin-top: 6px;
      padding: 6px 10px;
      background-color: #fceae9;
    }
  }
  .ct-head{
    $ch:1.4rem;
    margin-bottom: 4px;
    overflow: hidden;
    .sculpture{
      width: $ch;
      height: $ch;
    }
    .name{
      float: left;
      max-width: 6rem;
      height: $ch;
      line-height: $ch;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .time{
      height: $ch;
      line-height: $ch;
      float: right;
      color: $fc-grey;
    }
  }
  .type{
    font-size: $fs-small;
    color: $fc-grey;
    margin-top:4px;
  }
  .list:last-child{
    border-bottom:none;
  }
  .pull-btn{
    @include f-center;
    height: 1.6rem;
    p{
      font-size: $fs-small;
      color: $fc-grey;
    }
    .arrow-bottom{
      color: $fc-grey;
      margin-left: 2px;
    }
  }
}
.recommend-title{
  height: 2.2rem;
  line-height: 2.2rem;
  margin-top: .8rem;
  text-align: center;
  color: $fc-dark;
  .love{
    color: $fc-red;
    font-size: 1rem;
    vertical-align: middle;
    margin-right: 4px;
  }
}
.bottom-bar{
  background-color: #fff;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100vw;
  height: 2.5rem;
  z-index: 100;
  ul{
    @include f-around;
    height: 100%;
    li{
      width: 15vw;
      height: 100%;
      border-right: 1px solid $bc;
      padding-top: .2rem;
      p{
        text-align: center;
        font-size: $fs-small;
        line-height: 1rem;
      }
      i{
        width: 1.2rem;
        height: 1.2rem;
        margin:0 auto;
        display: block;
      }
    }
    li.purchase-btn{
      width: 25vw;
      background-color: #f3aba7;
      padding-top: .2rem;
      p{
        color: #fff;
        font-size: $fs-normal;
        line-height: 1rem;
      }
    }
    li.pingdan-btn{
      width: 30vw;
      background-color: #e02e24;
      padding-top: .2rem;
      p{
        color: #fff;
        font-size: $fs-normal;
        line-height: 1rem;
      }
    }
  }
}

</style>
