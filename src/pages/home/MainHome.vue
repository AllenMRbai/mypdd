<template>
  <div class="appwin">
      <nav id="top-nav">
        <ul class="head-nav">
          <router-link tag="li" to='/'>首页</router-link>
          <router-link v-for="(cat,index) in categoryOnes" tag="li" :to="{ name: 'MainHomeCat', params: { optId1: cat.optId1 }}" :key="index" >{{cat.optName}}</router-link>
          <li class="blank-li"></li>
        </ul>
        <div class="gradient-block"></div>
      </nav>
      <div class="blank-row"></div>

        <router-view/>
      
      <to-top/>
      <div style="height:2.5rem;"></div>
  </div>
</template>

<script>
import { getCategoryOnes } from "@/api/categoryApi";
import ToTop from "@/components/ToTop";
import { setTimeout } from "timers";

export default {
  name: "MainHome",
  data() {
    return {
      categoryOnes: []
    };
  },
  components: {
    ToTop
  },
  watch: {
    $route() {
      let route = this.$route;
      if (route.name === "MainHomeCat") {
        this.topNavFocus();
      }
    }
  },
  methods: {
    topNavFocus() {
      setTimeout(() => {
        let activeLi = document.getElementsByClassName(
            "router-link-exact-active"
          )[0],
          widowWith = document.documentElement.clientWidth,
          topNav = document.getElementById("top-nav"),
          shouldGo = -1 / 2 * widowWith + activeLi.offsetLeft;
        topNav.scrollTo(shouldGo, 0);
      }, 200);
    }
  },
  mounted() {
    getCategoryOnes().then(res => {
      if (res.data.status == 200) {
        for (let cat of res.data.data) {
          this.categoryOnes.push(cat);
        }
      }
    });
  }
};
</script>

<style lang="scss" scoped>
$nav-height: 1.8rem;
nav {
  position: fixed;
  top: 0;
  left: 0;
  background-color: #fff;
  width: 100vw;
  height: $nav-height;
  overflow: hidden;
  overflow-x: scroll;
  background-color: #fe0000;
  z-index: 100;
}
.blank-row {
  height: $nav-height;
}

nav .gradient-block {
  background-image: -webkit-linear-gradient(
    180deg,
    rgb(254, 0, 0) 0%,
    rgba(254, 0, 0, 0.2) 100%
  );
  position: fixed;
  right: 0;
  top: 0;
  height: 1.8rem;
  width: 1rem;
  z-index: 101;
}

nav ul {
  @include f-start;
  flex-wrap: nowrap;
  padding-right: 0.4rem;
}
nav ul li {
  white-space: nowrap;
  height: 1.7rem;
  line-height: 1.7rem;
  padding: 0 0.1rem;
  margin: 0 0.5rem;
  color: #fff;
  @include forbidden-copy;
}
nav ul li.router-link-exact-active {
  color: $fc-yellow;
  border-bottom: 2px solid $fc-yellow;
}
nav ul .blank-li {
  width: 0.3rem;
}
</style>
