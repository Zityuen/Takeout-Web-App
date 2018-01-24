
<template>
    <div class="nav">

      <router-link class="nav-item" to="/goods">
        ORDER
        <i class="line"></i>
      </router-link>
      <router-link class="nav-item" to="/ratings">
        RATING({{commentNum}})
        <i class="line"></i>
      </router-link>
      <router-link class="nav-item" to="/seller">
        SELLER
        <i class="line"></i>
      </router-link>
    </div>

</template>

<script>
  export default {
  	props:{
  		commentNum:{
  			type:Number,
  			default: 0
  		}
  	}
  }
</script>

<style>
  .nav{
    /*position: relative;*/
    /*z-index: 0;*/

    display: flex;
    width: 100%;
    height: 39px;
    line-height: 40px;
    border-bottom: 1px solid #e4e4e4;

  }
  .nav .nav-item{
    flex: 1;
    text-align: center;
    font-size: 13px;
    text-decoration: none;
    color: #666666;
    position: relative;
  }
  .nav .active {
    color: #FFBB22;
  }

  .nav .active .line{
    width: 21px;
    height: 2px;
    display: inline-block;
    background: #FFBB22;
    position: absolute;
    left: 50%;
    bottom: 0;
    margin-left: -10px;
  }
</style>
