<template>
<div class="container">
    <div class="list-slide-box" id='list-slide-box'>
        <ul class="list-wrap" id='list-wrap' :style="{width:wrapWidth+'%'}">
            <li v-for="(entry,index) in entries" :key="index" :style="{width:liWidth+'%'}">
                <div class="icon-box">
                    <i class="icon">
                        <img :src="entry.icon">
                        <i class="hot" v-if="entry.hot"></i>
                        <i class="tag" v-if="entry.tag">
                            <img :src="entry.tag">
                        </i>
                    </i>
                    <p>{{entry.title}}</p>
                </div>
            </li>
        </ul>
    </div>
    <div class="bar-box">
        <div class="bar"></div>
    </div>
</div>
    
</template>

<script>
import {raf,caf} from '@/assets/js/requestAnimationFrame'
import Tween from '@/assets/js/tween'

export default {
  name: 'EntriesContainer',
  props:{
    entries:{
      type:Array,
      default:function(){
          return [
            {icon:'static/img/0.png',title:'限时秒杀',url:'',hot:false,tag:'static/img/new.gif'},
            {icon:'static/img/1.png',title:'品牌清仓',url:'',hot:true,tag:null},
            {icon:'static/img/2.png',title:'新年签',url:'',hot:false,tag:null},
            {icon:'static/img/3.png',title:'转盘领现金',url:'',hot:false,tag:null},
            {icon:'static/img/4.png',title:'助力享免单',url:'',hot:true,tag:null},
            {icon:'static/img/5.png',title:'手机充值',url:'',hot:false,tag:null},
            {icon:'static/img/6.png',title:'海淘',url:'',hot:false,tag:null},
            {icon:'static/img/7.png',title:'爱逛街',url:'',hot:false,tag:null},
            {icon:'static/img/8.png',title:'9块9特卖',url:'',hot:false,tag:null},
            {icon:'static/img/9.png',title:'现金签到',url:'',hot:false,tag:'static/img/signin.gif'},
            {icon:'static/img/10.png',title:'食品超市',url:'',hot:false,tag:null},
            {icon:'static/img/11.png',title:'砍价免费拿',url:'',hot:false,tag:null},
            {icon:'static/img/12.png',title:'时尚穿搭',url:'',hot:false,tag:null},
            {icon:'static/img/13.png',title:'1分拼',url:'',hot:false,tag:null} 
          ]
      }
    },
    maxColumn:{
        type:Number,
        default:5
    }
  },
  data () {
    return {
        
    }
  },
  computed:{
    wrapWidth(){
        return this.maxColumn*20;
    },
    liWidth(){
        return 1/this.maxColumn*100;
    }
  },
  mounted(){
    let Box=document.getElementById('list-slide-box'),
        wrap=document.getElementById('list-wrap'),
        self=this,
        minTransform=Box.clientWidth-wrap.scrollWidth,
        touch,
        isTouching=false,//是否正在触摸
        lastTwoFrame=[],//松手前的两帧对应的类Touch对象，用于计算初速度[0]是最后一帧，[1]是倒数第二帧
        position=getPositionDelta();

    //监听Box的touch事件
    Box.addEventListener('touchstart',handleStart);
    Box.addEventListener('touchend',handleEnd);
    Box.addEventListener('touchmove',handleMove);

    //touch事件的钩子
    function handleStart(evt){
        position=getPositionDelta();
        isTouching=true;
        touch=evt.touches[0];
    }
    function handleMove(evt){
        let ths=evt.changedTouches;
        for(let th of ths){
            if(th.identifier===touch.identifier){
                th.timeStamp=Date.now();
                unshiftIntoLastTwoFrame(th);
                doSlide(touch,th);
            }
        }
    }
    function handleEnd(evt){
        if(evt.touches[0]){
            touch=evt.touches[0];
        }else{
            isTouching=false;
            touch=null;
            let V0=getV0();//松手后的初速度
            clearLastTwoFrame();
            doSpringback(V0);
        }
    }
    
    /**
     * 每次移动，将当前的th压入lastTwoFrame
     * @argument {Touch} the 
     */
    function unshiftIntoLastTwoFrame(th){
        let frame={};
        frame.pageX=th.pageX;
        frame.timeStamp=th.timeStamp

        lastTwoFrame.unshift(frame)
        if(lastTwoFrame.length>2){
            lastTwoFrame.pop();
        }
    }
    //清空lastTwoFrame
    function clearLastTwoFrame(){
        lastTwoFrame=[];
    }
    //获得初速度
    function getV0(){
        let ltf=lastTwoFrame;
        return ltf.length>=2
               ?(ltf[0].pageX-ltf[1].pageX)/(ltf[0].timeStamp-ltf[1].timeStamp)
               :0;
    }

    /**
     * 让内容跟着手指做滑动
     * @argument {Touch} touch 移动前的Touch对象
     * @argument {Touch} th 移动后的Touch对象
     */
    function doSlide(touch,th){
        let delta=moveDelta(touch,th);
        let nowPosition=position+delta,
            resistancePosition=addResistance([minTransform,0],nowPosition)
        wrap.style.transform=`translateX(${resistancePosition}px)`;
    }

    /**
     * 当滑动超过边界，添加阻力
     * @argument {Array} border [0]位下界minTransform [1]为上界0
     * @argument {Number} nowPosition
     */
    function addResistance(border,nowPosition){
        if(nowPosition>border[1]){
            return (Math.log(nowPosition-border[1])+1)*8+border[1];
        }else if(nowPosition<border[0]){
            return (-Math.log(border[0]-nowPosition)-1)*8+border[0]
        }else{
            return nowPosition;
        }
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

    //获取内容 translateX的值
    function getPositionDelta(){
        let mt=wrap.style.transform.match(/\-?\d+\.?\d*/g);
        if(mt){
            return Number(mt[0]);
        }else{
            return 0;
        }
    }

    //
    function doSpringback(V0){
      let nowPosition=getPositionDelta();
      let during=16,
          abs_a=3,
          a=V0>0
            ?-abs_a
            :abs_a;
      if(nowPosition>0){
          springbackStep(0, nowPosition, 0-nowPosition, during);
      }else if(nowPosition<minTransform){
          springbackStep(0, nowPosition, minTransform-nowPosition, during);
      }
      else{
          //during=-V0/a*200;//持续时间
          during=14;
          var distance=-V0*V0*V0*V0/2*a*300//路程
          var destiny=nowPosition+distance;
          if(destiny>0)distance=0-nowPosition;
          if(destiny<minTransform)distance=minTransform-nowPosition;
          springbackStep(0, nowPosition,distance, during);
      }
    }

    /**
     * @argument {Number} current 当前帧
     * @argument {Number} begin 初始值
     * @argument {Number} change 变化量
     * @argument {Number} during 总帧数
     * @argument {Function} callback 回弹动画结束后的回调
     */
    function springbackStep(current, begin, change, during,callback){
      function step(){
        let nowPosition=getPositionDelta();
        current++;
        var to = Tween.Sine.easeOut(current, begin, change, during);
        wrap.style.transform=`translateX(${to}px)`;
        if (current <= during && !isTouching){
          raf(step);
        } else{
          callback instanceof Function?callback():null;
        }

      }
      raf(step);
    }

  }
}
</script>

<style lang="scss" scoped>
.container{
    width: 100%;
}
.list-slide-box{
    width: 100%;
    overflow: hidden;
    padding: .3rem 0;
    .list-wrap{
        @include f-start;
        flex-wrap: wrap;
        li{
            box-sizing: border-box;
            padding: .2rem;
            margin-bottom: 6px;
            .icon-box{
                .icon{
                    display: block;
                    width: 60%;
                    margin: 0 auto;
                    position: relative;
                    .hot{
                        background-color: #ff0000;
                        border: 2px solid #fff;
                        width: 6px;
                        height: 6px;
                        position: absolute;
                        top: -4px;
                        right: -4px;
                        display: block;
                        border-radius: 50%;
                    }
                    .tag{
                        width: 1.1rem;
                        height: 1.1rem;
                        display: block;
                        position: absolute;
                        top: -.5rem;
                        right: -.5rem;
                    }
                }
                p{
                    font-size: $fs-small;
                    color: $fc-yellow;
                    text-align: center;
                    margin-top: 4px;
                }
            }
        }
    }
}

.bar-box{
    width: 30%;
    height: 4px;
    background-color: #8e0404;
    margin:0 auto;
    margin-bottom: 3px;
    border-radius: 2px;
    overflow: hidden;
    .bar{
        width: 70%;
        height: 4px;
        border-radius: 2px;
        background-color: $c-theme-secondary;
    }
}
</style>
