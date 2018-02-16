<template>
  <div>
      <div class="ct2-box">
          <ul class="ct2-wrap">
              <template v-for="(ct,index) in categoryTwos">
                  <li :key="index" v-if="index<9">
                    <div class="pic">
                        <img :src="ct.imageUrl">
                    </div>
                    <p>{{ct.optName}}</p>
                </li>
              </template>
              <li v-if="categoryTwos.length>=9">
                  <div class="pic more-btn">
                        <img src="/static/img/more.png">
                    </div>
                    <p>查看全部</p>
              </li>
          </ul>
      </div>
      <product-cards :products='products' :isReady='isReady' @update='getProducts'/>
  </div>
</template>

<script>
import ProductCards from "@/components/ProductCards";
import { getProductsBySort } from "@/api/productApi";
import { getCategoryTwos } from "@/api/categoryApi";

export default {
  name: "MainHomeCat",
  data() {
    return {
      products: [],
      isReady: false,
      categoryTwos: []
    };
  },
  components: {
    ProductCards
  },
  methods: {},
  watch: {
    $route() {
      this.products.splice(0, this.products.length);
      this.isReady = false;
      this.categoryTwos.splice(0, this.categoryTwos.length);

      this.getCategoryTwos();
    }
  },
  methods: {
    getProducts(page) {
      let optId1 = this.getOptId1();
      this.isReady = false;

      getProductsBySort({ opt1: optId1, page }).then(res => {
        if (res.data.status) {
          for (let row of res.data.data.rows) {
            this.products.push(row);
          }
        }
        this.isReady = true;
      });
    },
    getOptId1() {
      return this.$route.params.optId1;
    },
    getCategoryTwos() {
      let optId1 = this.getOptId1();
      getCategoryTwos(optId1).then(res => {
        //console.log(res);
        if (res.data.status === 200) {
          for (let ct of res.data.data) {
            this.categoryTwos.push(ct);
          }
        }
      });
    }
  },
  mounted() {
    this.getCategoryTwos();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.ct2-box {
  background-color: #fff;
  width: 100%;
  padding: 4px 0;
  margin-bottom: 0.6rem;
  .ct2-wrap {
    @include f-start;
    flex-wrap: wrap;
    li {
      width: 20vw;
      margin: 3px 0;
      .pic {
        width: 14vw;
        height: 14vw;
        margin: 0 auto;
      }
      .pic.more-btn{
          padding:.6rem;
      }
      p {
        font-size: $fs-small;
        text-align: center;
      }
    }
  }
}
</style>
