<style lang="scss" scoped>
.content-box{
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  .search-box{
    position: fixed;
    top: 0;
    left: 0;
    height: 2rem;
    width: 100vw;
    background-color: #e5e5e5;
    .search{
      width: 94%;
      height: 1.4rem;
      background-color: #fff;
      border-radius: 4px;
      margin: auto;
      text-align: center;
      line-height: 1.4rem;
      color: $fc-grey;
      margin-top: .3rem;
    }
  }
  .middle-box{
    @include f-start;
    height: 100vh;
    flex: 1;
  }
}
.left-box{
  width: 26vw;
  height: 100vh;
  overflow: scroll;
  .list{
    width: 100%;
    height: 2.6rem;
    @include f-center;
    .assort-pic{
      width: 1.1rem;
      height: 1.1rem;
      margin-left: 6px;
    }
  }
}
.right-box{
  width: 74vw;
  background-color: #fff;
  height: 100vh;
  overflow: scroll;
  .assort-cell{
    margin-bottom: 1rem;
    .title{
      @include f-between;
      height: 2rem;
      padding: 0 8px;
      h2{
        font-weight: normal;
        font-size: $fs-normal;
        font-weight: bold;
        color: $fc-dark;
      }
      p{
        height: 2rem;
        line-height: 2rem;
        color: $fc-grey;
      }
    }
  }
  ul{
    @include f-around;
    flex-wrap: wrap;
    flex: 1;
    li{
      width: 22vw;
      margin-bottom: .4rem;
      .pic{
        width: 18vw;
        height: 18vw;
        margin: 0 auto;
      }
      p{
        text-align: center;
        font-size: $fs-small;
        color: $fc-grey;
      }
    }
  }
}
.blank-top{
  height: 2rem;
}
.blank-bottom{
  height: 2.5rem;
}
</style>
<template>
  <div class="content-box">
      <div class="search-box">
          <div class="search">搜索商品</div>
      </div>
      <div class="middle-box">

        <ul class="left-box">
          <li class="blank-top"></li>
          <li v-for="(cat,index) of category" :key="index" class="list">
            <p class="nocopy">{{cat.one.optName}}</p>
            <i class="assort-pic"><img :src="cat.one.unselectedUrl"></i>
          </li>
          <li class="blank-bottom"></li>
        </ul>

        <section class="right-box">
          <div class="blank-top"></div>
          <div class="assort-cell" v-for="(cat,index) of category" :key="index">
            <div class="title">
              <h2>{{cat.one.optName}}</h2>
              <p class="more nocopy">查看更多</p>
            </div>
            <ul>
              <li v-for="(ct,index) of cat.twos" :key="index">
                <div class="pic">
                  <img :src="ct.imageUrl">
                </div>
                <p class="nocopy">{{ct.optName}}</p>
              </li>
            </ul>
          </div>
          <div class="blank-bottom"></div>
        </section>

      </div>
  </div>
</template>

<script>
import {getAllCategory} from '@/api/categoryApi'
export default {
  name: 'MainAssortment',
  data () {
    return {
      category:[]
    }
  },
  methods:{
    getAllCategory(){
      getAllCategory().then(res=>{
        if(res.data.status===200){
          this.category=res.data.data;
        }
      });
    }
  },
  created(){
    this.getAllCategory();
  }
}
</script>

