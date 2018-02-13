<template>
  <div class="lider-box" id='lider-box'>
    <ul class="lider-wrap" :style="{width:wrapWith+'%'}" id='lider-wrap'>
      <li class="lider" v-for="(banner,index) in showBanners" :key="index">
        <img :src="banner.img" alt="banner">
      </li>
    </ul>
    <ul class="lider-dot-wrap">
      <li class="lider-dot" v-for="(banner,index) in showBanners" :key="index" :class="{active:focus===index}">

      </li>
    </ul>
  </div>
</template>

<script>
import {raf,caf} from '@/assets/js/requestAnimationFrame'
import Tween from '@/assets/js/tween'
import { setTimeout, clearInterval } from 'timers';

export default {
  name: 'Swiper',
  props:{
    banners:{
      type:Array,
      default: function () {
        return [
          {img:'static/img/banner1.jpeg',url:''},
          {img:'static/img/banner1.jpeg',url:''},
          {img:'static/img/banner1.jpeg',url:''}
        ]
      }
    },
    autoSlide:{
      type:Boolean,
      default:true
    },
    interval:{
      type:Number,
      default:3000
    }
  },
  data () {
    return {
      focus:0,
      showBanners:[]
    }
  },
  computed:{
    wrapWith(){
      return this.showBanners.length*100
    }
  },
  beforeMount(){
    (function(){
      let banners=this.banners,
          len=banners.length,
          i=0;
      for(;i<len;i++){
        if(i===len-1){
          this.showBanners.unshift(banners[i]);
          continue;
        }
        this.showBanners.push(banners[i]);
      }
    }.call(this));
  },
  mounted(){
    let liderBox=document.getElementById('lider-box'),
        wrapWith=liderBox.clientWidth,
        self=this,
        touch,
        springbacking=false,
        intervalId;//自动滚动时的定时器id

    //监听liderBox的touch事件
    liderBox.addEventListener('touchstart',handleStart);
    liderBox.addEventListener('touchend',handleEnd);
    liderBox.addEventListener('touchmove',handleMove);

    //touch事件的钩子
    function handleStart(evt){
      evt.preventDefault();
      touch=evt.touches[0];
      turnOffAutoSlide();
    }
    function handleMove(evt){
      evt.preventDefault();
      let ths=evt.changedTouches;
      for(let th of ths){
        if(th.identifier===touch.identifier){
          if(springbacking)return;//如果正在回弹的过程中，不能操控banner
          doSlide(touch,th);
        }
      }
    }
    function handleEnd(evt){
      evt.preventDefault();
      if(evt.touches[0]){
        touch=evt.touches[0];
      }else{
        if(springbacking)return;//如果正在回弹的过程中，不能操控banner
        doSpringback();
      }
    }

    /**
     * 让banner跟着手指做滑动
     * @argument {Touch} touch 移动前的Touch对象
     * @argument {Touch} th 移动后的Touch对象
     */
    function doSlide(touch,th){
      let delta=moveDelta(touch,th);
      let liderWrap=document.getElementById('lider-wrap');
      liderWrap.style.transform=`translateX(${delta}px)`;
    }

    /**
     * 计算手指移动的delta
     * @argument {Touch} touch 移动前的Touch对象
     * @argument {Touch} th 移动后的Touch对象
     * @returns {Number} 移动前后x轴的距离
     */
    function moveDelta(touch,th){
      if(!touch){
        touch=th;
        return;
      }
      return th.pageX-touch.pageX;
    }

    //松手后根据移动的距离，对banner进行回弹或跳到下一个banner的动画
    function doSpringback(){
      let delta=getPositionDelta();
      let liderWrap=document.getElementById('lider-wrap');
      let during=10;
      //如果滑动超过slid-box的10分之1，就切到另一个banner
      if(Math.abs(delta)>wrapWith/10){
        if(delta>0){
          springbackStep(0, delta, wrapWith-delta, during,function(){
            self.showBanners.unshift(self.showBanners.pop());
            liderWrap.style.transform='';
            if(self.focus<=0){
              self.focus=self.showBanners.length-1;
            }else{
              self.focus--;
            }
          });
        }else{
          springbackStep(0, delta, -wrapWith-delta, during,function(){
            self.showBanners.push(self.showBanners.shift());
            liderWrap.style.transform='';
            if(self.focus>=self.showBanners.length-1){
              self.focus=0;
            }else{
              self.focus++;
            }
          });
        }
      }else{
        springbackStep(0, delta, 0-delta, during);
      }
      intervalId=turnOnAutoSlide();
    }

    /**
     * @argument {Number} current 当前帧
     * @argument {Number} begin 初始值
     * @argument {Number} change 变化量
     * @argument {Number} during 总帧数
     * @argument {Function} callback 回弹动画结束后的回调
     */
    function springbackStep(current, begin, change, during,callback){
      let liderWrap=document.getElementById('lider-wrap');
      let nowPosition=getPositionDelta();
      springbacking=true;
      function step(){
        current++;
        var to = Tween.Quad.easeOut(current, begin, change, during);
        liderWrap.style.transform=`translateX(${to}px)`;
        if (current <= during){
          raf(step);
        } else{
          callback instanceof Function?callback():null;
          springbacking=false;
        }

      }
      raf(step);
    }

    //获取banner translateX的值
    function getPositionDelta(){
      let liderWrap=document.getElementById('lider-wrap');
      let mt=liderWrap.style.transform.match(/\-?\d+\.?\d*/g);
      if(mt){
        return Number(mt[0]);
      }else{
        return 0;
      }
    }

    /**
     * 自动滚动
     */
    function turnOnAutoSlide(){
      let intervalId
      if(self.autoSlide){
        intervalId=setInterval(function(){
            goNextOne();
        },self.interval)
      }
      return intervalId;
    }
    function turnOffAutoSlide(){
      if(intervalId){
        window.clearInterval(intervalId);
        intervalId=null;
      } 
    }
    intervalId=turnOnAutoSlide();


    //跳到下一页
    function goNextOne(){
      let liderWrap=document.getElementById('lider-wrap');
      let delta=getPositionDelta();
      springbackStep(0, delta, -wrapWith-delta, 20,function(){
        self.showBanners.push(self.showBanners.shift());
        liderWrap.style.transform='';
        if(self.focus>=self.showBanners.length-1){
          self.focus=0;
        }else{
          self.focus++;
        }
      });
    }

  }

}
</script>

<style lang="scss" scoped>
.lider-box{
  width: 100%;
  overflow: hidden;
  position: relative;
  .lider-wrap{
    position: relative;
    left: -100%;
    top: 0;
    @include f-start;
    flex-wrap: nowrap;
    .lider{
      width: 100%;
      img{
        width: 100%;
      }
    }
  }
  .lider-dot-wrap{
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
    height: 1rem;
    box-sizing: border-box;
    padding: .3rem;
    @include f-end;
    .lider-dot{
      width: .4rem;
      height: .4rem;
      margin: 0 5px;
      border-radius: 50%;
      opacity: .8;
      background-color: #fff;
    }
    .lider-dot.active{
      background-color: $c-theme-secondary;
    }
  }
}
</style>
