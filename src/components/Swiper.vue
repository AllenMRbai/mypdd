<template>
  <div class="lider-box" id='lider-box' :style="{width:getBoxWidth,height:getBoxheight}">
    <ul class="lider-wrap" :style="{width:wrapWith+'%'}" id='lider-wrap'>
      <li class="lider" v-for="(banner,index) in showBanners" :key="index">
        <img :src="banner.img" alt="banner">
      </li>
    </ul>
    <ul class="lider-dot-wrap" v-if="indicatorType==='dot'">
      <li class="lider-dot" v-for="(banner,index) in showBanners" :key="index" :class="{active:focus===index}">
      </li>
    </ul>
    <div class="lider-number-wrap" v-else-if="indicatorType==='number'">
      <p>{{showBanners.length}}/{{focus+1}}</p>
    </div>
  </div>
</template>

<script>
import { raf, caf } from "@/assets/js/requestAnimationFrame";
import Tween from "@/assets/js/tween";
import { setTimeout, clearInterval } from "timers";

export default {
  name: "Swiper",
  props: {
    banners: {
      type: Array,
      default: function() {
        return [
          { img: "static/img/banner1.jpeg", url: "" },
          { img: "static/img/banner1.jpeg", url: "" },
          { img: "static/img/banner1.jpeg", url: "" }
        ];
      }
    },
    autoSlide: {
      type: Boolean,
      default: true //是否开启自动滚动
    },
    interval: {
      type: Number,
      default: 3000 //自动滚动时间间隔 单位ms
    },
    indicatorType:{
      type:String,
      default:'dot'//指向器类型 'dot' 或 'number' 或 'none' 
    },
    boxWidth:{
      type:String,
      default:''
    },
    boxheight:{
      type:String,
      default:''
    }
  },
  data() {
    return {
      focus: 0,
      showBanners: [],
      intervalId: null,
      touch:null,
      springbacking:false
    };
  },
  computed: {
    wrapWith() {
      return this.showBanners.length * 100;
    },
    getBoxWidth(){
      return this.boxWidth?this.boxWidth:'100%';
    },
    getBoxheight(){
      return this.boxheight?this.boxheight:'auto';
    }
  },
  watch:{
    banners(newValue){
      if(newValue.length>0){
        this.init();
      }
    }
  },
  mounted(){
    this.init();
  },
  activated(){
    this.init();
  },
  deactivated (){
    this.turnOffAutoSlide();
  },
  beforeDestroy() {
    this.turnOffAutoSlide();
  },
  methods: {
    init(){
      this.focus=0;
      this.springbacking=false;
      this.turnOffAutoSlide();
      this.adjustInitBannerPosition();
      this.unbindListener();
      this.bindListener();
      this.turnOnAutoSlide();
    },
    //为了实现无限滚动，最后一张banner要放到第一张banner的前面。因此，初始化Swipe前需要先调整下位置
    adjustInitBannerPosition() {
      let banners = this.banners,
        len = banners.length,
        i = 0;
        if(len===1){
          return;
        }
        this.showBanners=[];
      for (; i < len; i++) {
        if (i === len - 1) {
          this.showBanners.unshift(banners[i]);
          continue;
        }
        this.showBanners.push(banners[i]);
      }
    },
    bindListener(){
      if(this.banners.length===1){
        return;
      }
      let liderBox = document.getElementById("lider-box")
      //监听liderBox的touch事件
      liderBox.addEventListener("touchstart", this.handleStart);
      liderBox.addEventListener("touchend", this.handleEnd);
      liderBox.addEventListener("touchmove", this.handleMove);

    },
    unbindListener(){
      let liderBox = document.getElementById("lider-box")
      liderBox.removeEventListener("touchstart", this.handleStart);
      liderBox.removeEventListener("touchend", this.handleEnd);
      liderBox.removeEventListener("touchmove", this.handleMove);
    },
    //touch事件的钩子
    handleStart(evt) {
      this.touch = evt.touches[0];
      this.turnOffAutoSlide();
    },
    handleMove(evt) {
      let ths = evt.changedTouches;
      for (let th of ths) {
        if (th.identifier === this.touch.identifier) {
          if (this.springbacking) return; //正在回弹动画的过程中，不能操控banner
          this.doSlide(this.touch, th);
        }
      }
    },
    handleEnd(evt) {
      if (evt.touches[0]) {
        this.touch = evt.touches[0];
      } else {
        if (this.springbacking) return; //正在回弹动画的过程中，不能操控banner
        this.doSpringback();
      }
    },
    /**
     * 让banner跟着手指做滑动
     * @argument {Touch} touch 移动前的Touch对象
     * @argument {Touch} th 移动后的Touch对象
     */
    doSlide(touch, th) {
      let delta = this.moveDelta(touch, th);
      let liderWrap = document.getElementById("lider-wrap");
      liderWrap.style.transform = `translateX(${delta}px)`;
    },
    /**
     * 计算两个Touch对象间的delta
     * @argument {Touch} touch 移动前的Touch对象
     * @argument {Touch} th 移动后的Touch对象
     */
    moveDelta(touch, th) {
      if (!touch) {
        touch = th;
        return 0;
      }
      return th.pageX - touch.pageX;
    },
    //松手后根据当前已移动的距离，对banner进行回弹或直接跳到下一个banner
    doSpringback() {
      let nowPosition = this.getPositionDelta(),
          liderWrap = document.getElementById("lider-wrap"),
          liderBox = document.getElementById("lider-box"),
          boxWith = liderBox.clientWidth,
          during = 10;
      //如果滑动超过slid-box的10分之1，就跳到下一个banner
      if (Math.abs(nowPosition) > boxWith / 10) {
        if (nowPosition > 0) {
          this.springbackStep(0, nowPosition, boxWith - nowPosition, during, ()=> {
            this.showBanners.unshift(this.showBanners.pop());
            liderWrap.style.transform = "";
            if (this.focus <= 0) {
              this.focus = this.showBanners.length - 1;
            } else {
              this.focus--;
            }
          });
        } else {
          this.springbackStep(0, nowPosition, -boxWith - nowPosition, during, ()=> {
            this.showBanners.push(this.showBanners.shift());
            liderWrap.style.transform = "";
            if (this.focus >= this.showBanners.length - 1) {
              this.focus = 0;
            } else {
              this.focus++;
            }
          });
        }
      } else {
        this.springbackStep(0, nowPosition, 0 - nowPosition, during);
      }
      this.turnOnAutoSlide();
    },
    /**
     * @argument {Number} current 当前帧
     * @argument {Number} begin 初始值
     * @argument {Number} change 变化量
     * @argument {Number} during 总帧数
     * @argument {Function} callback 回弹动画结束后的回调
     */
    springbackStep(current, begin, change, during, callback) {
      let liderWrap = document.getElementById("lider-wrap");
      let nowPosition = this.getPositionDelta();
      this.springbacking = true;
      let step=()=> {
        current++;
        var to = Tween.Quad.easeOut(current, begin, change, during);
        liderWrap.style.transform = `translateX(${to}px)`;
        if (current <= during) {
          raf(step);
        } else {
          callback instanceof Function ? callback() : null;
          this.springbacking = false;
        }
      }
      raf(step);
    },
    //获取wrap translateX的值
    getPositionDelta() {
      let liderWrap = document.getElementById("lider-wrap");
      let mt = liderWrap.style.transform.match(/\-?\d+\.?\d*/g);
      if (mt) {
        return Number(mt[0]);
      } else {
        return 0;
      }
    },
    // 开启自动滚动
    turnOnAutoSlide() {
      if(this.banners.length===1)return;
      if (this.autoSlide) {
        this.intervalId = setInterval(() =>{
          this.goNextOne();
        }, this.interval);
      }
    },
    //关闭自动滚动
    turnOffAutoSlide() {
      if (this.intervalId) {
        window.clearInterval(this.intervalId);
        this.intervalId = null;
      }
    },
    //跳到下一页
    goNextOne() {
      let liderWrap = document.getElementById("lider-wrap"),
          liderBox = document.getElementById("lider-box"),
          boxWith = liderBox.clientWidth,
          delta = this.getPositionDelta();
      this.springbackStep(0, delta, -boxWith - delta, 20, ()=> {
        this.showBanners.push(this.showBanners.shift());
        liderWrap.style.transform = "";
        if (this.focus >= this.showBanners.length - 1) {
          this.focus = 0;
        } else {
          this.focus++;
        }
      });
    }
  }
  
};
</script>

<style lang="scss" scoped>
.lider-box {
  overflow: hidden;
  width: 100%;
  position: relative;
  .lider-wrap {
    position: relative;
    left: -100%;
    top: 0;
    @include f-start;
    flex-wrap: nowrap;
    .lider {
      width: 100%;
      img {
        width: 100%;
      }
    }
  }
  .lider-dot-wrap {
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
    height: 1rem;
    box-sizing: border-box;
    padding: 0.3rem;
    @include f-end;
    .lider-dot {
      width: 0.4rem;
      height: 0.4rem;
      margin: 0 5px;
      border-radius: 50%;
      opacity: 0.8;
      background-color: #fff;
    }
    .lider-dot.active {
      background-color: $c-theme-secondary;
    }
  }
}
.lider-number-wrap{
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 6px;
  height: 1rem;
  p{
    line-height: 1rem;
    padding-right:.6rem;
    text-align: center;
    display: block;
    float: right;
    height: 1rem;
    padding: 0 8px;
    border-radius: .5rem;
    margin-right: 6px;
    background-color: rgba(255, 255, 255, .8);
  }
}
</style>
