<template>
<div>
	<img src="/static/img/default_noorders.png" class="prompt-pic">
	<p class="prompt-p">这里没有任何订单</p>
</div>
    
</template>

<script>

export default {
  name: 'AllOrders',
  data () {
    return {

    }
  },
  created(){
	  console.log(this.$route)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.prompt-pic{
	width: 60vw;
	height: 60vw;
	margin:10px auto;
	margin-top: 10vh;
}
.prompt-p{
	text-align: center;
	color: $fc-grey;
}

</style>
