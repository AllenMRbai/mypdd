<template>
  <div id="app">
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

// 样式reset
body,h1,h2,h3,h4,h5,h6,hr,p,ul,ol,li,button,input,textarea,th,td{margin:0;padding:0}
html{font-size: 20px;background-color: $bgc;}
li,a,div,span,p{@include font-normal}
div,li,ul,ol{box-sizing: border-box;}
ul,ol{list-style:none}
input{box-sizing: border-box;border:none;outline: none;}
a{text-decoration:none}
a:hover{text-decoration:underline}
img{width: 100%;border:0;display: block;height: auto}
.hide{display:none}
.clearfix {*zoom: 1;} 
.clearfix:before,.clearfix:after {display: table; line-height: 0; content: "";} 
.clearfix:after {clear: both;} 

/* 公共样式 */
.flex_betwen{display: flex;justify-content: space-between;align-items: center;}
.flex_around{display: flex;justify-content: space-around;align-items: center;}
.flex_start{display: flex;justify-content: flex-start;align-items: center;}
.flex_end{display: flex;justify-content: flex-end;align-items: center;}
.flex_center{display: flex;justify-content: center;align-items: center;}

// 通用描边
.line-bottom,.line_bottom{position: relative;}
.line-top,.line_top{position: relative;}
.line-bottom:after,.line_bottom:after{
  height: 1px;
  background-color:$bc;
  display: block;
  content: '';
  position: absolute;
  top: auto;
  right: auto;
  bottom:0;
  left: 0;
  width: 100%;
  z-index: 0;
  -webkit-transform-origin: 50% 100%;
  transform-origin: 50% 100%;
  pointer-events: none;
}
.line-top:before,.line_top:before{
  height: 1px;
  background-color:$bc;
  display: block;
  content: '';
  position: absolute;
  top: 0;
  right: auto;
  bottom:auto;
  left: 0;
  width: 100%;
  z-index: 0;
  -webkit-transform-origin: center top;
  transform-origin:center top;
  pointer-events: none;
}
@media only screen and (-webkit-min-device-pixel-ratio: 1.5){
  .line-bottom:after,.line-top:before,.line_bottom:after,.line_top:before{-webkit-transform: scaleY(1);transform: scaleY(1);}

}
@media only screen and (-webkit-min-device-pixel-ratio: 2){
  .line-bottom:after,.line-top:before,.line_bottom:after,.line_top:before{-webkit-transform: scaleY(0.5);transform: scaleY(0.5);}
}

/*隐藏横向和纵向滚动条*/
::-webkit-scrollbar {
width: 0em;
}
::-webkit-scrollbar:horizontal {
height: 0em;
}
</style>
