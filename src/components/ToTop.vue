<template>
    <div class="to-top-btn" id="to-top-btn" @click="goToTop">
        <img src="/static/img/arrow-toTop.png" alt="回到顶部按钮">
        <p class="nocopy">顶部</p>
    </div>
</template>

<script>
export default {
  name: "ToTop",
  props: {
    showBottom: {
      type: Number, //按钮show状态的位置，距离底部多少rem
      default: 2.7
    },
    hideBottom: {
      type: Number, //按钮hide状态的位置，距离底部多少rem
      default: 0
    },
    showHight: {
      type: Number, //当滚动条滚动到多少高度时显示按钮,单位px
      default: 300
    }
  },
  data() {
    return {};
  },
  methods: {
    setHideBottom() {
      let toTopBtn = document.getElementById("to-top-btn");
      toTopBtn.style.bottom = this.hideBottom+'rem';
    },
    setShowBottom(){
        let toTopBtn = document.getElementById("to-top-btn");
        toTopBtn.style.bottom = this.showBottom+'rem';
    },
    scrollHandler(evt){
        if(window.scrollY>300){
            this.setShowBottom();
        }else{
            this.setHideBottom();
        }
    },
    goToTop(){
        window.scrollTo(0,0);
    },
    bindListener(){
      window.addEventListener('scroll',this.scrollHandler);
    },
    unbindListener(){
      window.removeEventListener('scroll',this.scrollHandler);
    }
  },
  created() {
    this.bindListener();
  },
  activated(){
    this.bindListener();
  },
  deactivated(){
    this.unbindListener();
  },
  destroyed(){
    this.unbindListener();
  }
};
</script>

<style lang="scss" scoped>
.to-top-btn {
  position: fixed;
  right: 10px;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.8);
  box-sizing: border-box;
  border: 1px solid rgba(210, 210, 210, 0.8);
  border-radius: 50%;
  width: 2.4rem;
  height: 2.4rem;
  transition: bottom .4s;
  img {
    width: 1.4rem;
    height: 1.4rem;
    margin: 0 auto;
  }
  p {
    text-align: center;
    width: 100%;
    position: absolute;
    bottom: 0.25rem;
    font-size: $fs-small;
    color: $fc-grey;
    @include forbidden-copy;
  }
}
</style>
