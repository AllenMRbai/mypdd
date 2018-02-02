<template>
  <div>
    <router-view/>
    <!-- 导航 -->
    <nav>
      <ul class="nav-container line-top">
        <router-link v-for="(nav,index) in navLists" :key="index" :class="{active:(pageNow===nav.EnglishName)}" tag="li" :to='nav.link'>
          <div class="nav-icon" :class="nav.EnglishName"></div>
          <p>{{ nav.ChineseName }}</p>
        </router-link>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'MainPage',
  data () {
    return {
      pageNow: 'home',
      navLists: [
        {
          EnglishName: 'home',
          ChineseName: '首页',
          link: '/'
        },
        {
          EnglishName: 'search',
          ChineseName: '搜索',
          link: '/assortment'
        },
        {
          EnglishName: 'me',
          ChineseName: '个人中心',
          link: '/me'
        }
      ]
    }
  },
  methods:{
    setPageNow () {
      let path=this.$route.path;
      switch (path) {
        case '/':
          this.pageNow = 'home';
          break;
        case '/assortment':
          this.pageNow = 'search';
          break;
        case '/me':
          this.pageNow = 'me';
          break;
        default:
          this.pageNow = 'home';
          break;
      }
    }
  },
  beforeUpdate () {
    this.setPageNow ();
  },
  created () {
    this.setPageNow ();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
nav{
  background-color: #fff;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100vw;
  height: 2.5rem;
}

.nav-container{
  @include f-around;
  padding-top: .2rem;
}
.nav-container li{
  width: 25vw;
  height: 2.2rem;
}
.nav-container li p{
  color:$c-theme-inactive;
  width: 100%;
  text-align: center;
  font-size: $fs-small
}
.nav-container li.active p{
  color:$c-theme-active;
}

.nav-container li .nav-icon{
  width: 1rem;
  height: 1rem;
  margin:.1rem auto;
  background-image:url(../assets/img/nav_log.png);
  background-repeat: no-repeat;
  background-size:auto 100%;
}
.nav-container li .home{
  background-position: 0% 0%;
}
.nav-container li.active .home{
  background-position: 20% 0%;
}
.nav-container li .search{
  background-position: 40% 0%;
}
.nav-container li.active .search{
  background-position: 60% 0%;
}
.nav-container li .me{
  background-position: 80% 0%;
}
.nav-container li.active .me{
  background-position: 100% 0%;
}
</style>
