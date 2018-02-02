<template>
  <div class="appwin">
      <nav>
        <ul>
          <li class="active">首页</li>
          <li>男装</li>
          <li>年货</li>
          <li>手机</li>
          <li>鞋包</li>
          <li>电器</li>
          <li>服饰</li>
          <li>百货</li>
          <li>家纺</li>
          <li>母婴</li>
          <li>水果</li>
          <li>运动</li>
          <li>美妆</li>
          <li class="blank-li"></li>
        </ul>
        <div class="gradient-block"></div>
      </nav>
      <div class="blank-row"></div>
      <router-view/>
  </div>
</template>

<script>
export default {
  name: 'MainHome',
  data () {
    return {}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
$nav-height:1.8rem;
nav{
  position: fixed;
  top: 0;
  left: 0;
  background-color: #fff;
  width: 100vw;
  height: $nav-height;
  overflow: hidden;
  overflow-x: scroll;
  background-color: #fe0000;
  z-index: 100
}
.blank-row{
  height: $nav-height;
}

nav .gradient-block{
  background-image: -webkit-linear-gradient( 180deg, rgb(254,0,0) 0%, rgba(254,0,0,0.2) 100%);
  position: fixed;
  right: 0;
  top: 0;
  height: 1.8rem;
  width: 1rem;
  z-index: 101;
}


nav ul{
  @include f-start;
  flex-wrap: nowrap;
  padding-right: .4rem;
}
nav ul li{
  white-space: nowrap;
  height: 1.7rem;
  line-height: 1.7rem;
  padding: 0 .1rem;
  margin: 0 .5rem;
  color: #fff;
  @include forbidden-copy
}
nav ul li.active{
  color: $fc-yellow;
  font-weight: bold;
  border-bottom:2px solid $fc-yellow;
}
nav ul .blank-li{
  width:.3rem;
}
</style>
