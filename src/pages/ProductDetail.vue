<template>
  <div>
    <swiper :banners='topgallery' :autoSlide='false' indicatorType="number" boxWidth="100vw" boxheight="100vw"/>
    <section class="detail-box">
        <ul class="price-box">
            <li class="left">￥1233 <span>￥2099</span></li>
            <li class="right">已拼234154件·2人拼单</li>
        </ul>
        <p>大街上看见按实际后方可和经适房的见客户数据库符合会计师符号就卡视角好地方</p>
        <ul class="promise-box">
            <li><i class="ok"></i>全场包邮</li>
            <li><i class="ok"></i>7天退换</li>
            <li><i class="ok"></i>假一赔十</li>
        </ul>
    </section>

    <ul class="list-box">
        <li>
            <p>3人在拼单，可直接参与</p>
            <p>查看更多<i></i></p>
        </li>
        <li>
            <div class="sculpture"><img src=""></div>
            <p class="name">一叶知秋</p>
            <div class="pd-detail">
                <p>还差<span>1人</span>拼成</p>
                <p class="rem-time">剩余23:32:36</p>
            </div>
            <div class="pd-btn">去拼单</div>
        </li>
    </ul>

    <ul class="list-box">
        <li>
            <p>商品评价(3084)</p>
            <p>查看全部<i></i></p>
        </li>
        <li class="tags">
            <div>很舒服(70)</div>
            <div>质量不错(61)</div>
            <div>质量很好(40)</div>
        </li>
        <li>
            <div>
                <div class="sculpture"><img src=""></div>
                <p>使肌肤和</p>
                <p class="time">2018.02.03</p>
            </div>
            <p>数据库符号就按实际喝咖啡见客户说房间看是否健康教案康师傅的</p>
            <p>颜色： 黑色 尺码： 42</p>
        </li>
    </ul>
    
    <ul class="list-box">
        <li>商品详情</li>
        <li>
            数据库符号就客户
        </li>
        <li>
            <img src="">
            <img src="">
            <img src="">
            <img src="">
            <img src="">
            <img src="">
        </li>
        <li>价格说明</li>
    </ul>
    <div class="recommend-title">
        <i></i>为你推荐
    </div>
    <product-cards :products='recommendProducts' :isReady='isReady' @update='getProducts'/>
    <to-top/>
    <div class="blank"></div>
    <nav>
        <ul>
            <li>
                <i></i>
                <p>首页</p>
            </li>
            <li>
                <i></i>
                <p>收藏</p>
            </li>
            <li>
                <i></i>
                <p>客服</p>
            </li>
            <li class="purchase-btn">
                <p>￥1233</p>
                <p>单独购买</p>
            </li>
            <li class="pingdan-btn">
                <p>￥1233</p>
                <p>发起拼单</p>
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
      productDetail: null,
      recommendProducts: [],
      isReady: false
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
          console.log("productDetail", res);
          let data = res.data.data;
          this.getTopGallery(data.topgallery);
          this.getDetailGallery(data.detailgallery);
          this.productDetail = data;
        }
      });
    },
    getTopGallery(topgallery) {
      let galleryArray = JSON.parse(topgallery);
      for (let pic of galleryArray) {
        let obj = {};
        obj.img = pic;
        this.topgallery.push(obj);
      }
    },
    getDetailGallery(detailgallery) {
      let galleryArray = JSON.parse(detailgallery);
      for (let pic of galleryArray) {
        this.detailgallery.push(pic);
      }
    },
    getSku(id) {
      getSkuById(id).then(res => {
        if (res.data.status === 200) {
          console.log("Skus", res);
        }
      });
    },
    getComments(id) {
      getCommentsById(id).then(res => {
        if (res.data.status === 200) {
          console.log("Comments", res);
        }
      });
    },
    getPingDan(id) {
      getPingDanById(id).then(res => {
        if (res.data.status === 200) {
          console.log("PingDan", res);
        }
      });
    },
    getData(id) {
      this.getProductDetail(id);
      this.getSku(id);
      this.getComments(id);
      this.getPingDan(id);
    }
  },
  created() {
    let id = this.getId();
    this.getData(id);
  }
};
</script>


<style lang="scss" scoped>
.detail-box{
  background-color:#fff; 
  p{
    color: $fc-dark;
    padding: 0 8px;
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
</style>
