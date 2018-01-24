<template>
  <div class="header">
    <!--top-->
    <div class="top-wrapper">
      <div class="back-wrapper">
        <span class="icon-arrow_lift"></span>
      </div>


      <form class="search-wrapper">
        <span class="search-icon"></span>
        <input class="search-bar" type="text" placeholder="Please input goods">
      </form>


      <div class="more-wrapper">
        <a class="group-bt" href="#">Group</a>
        <div class="more-bt">
          <i class="s-radius"></i>
          <i class="s-radius"></i>
          <i class="s-radius"></i>

        </div>
      </div>
    </div>

    <!--content-->
    <div class="content-wrapper">
      <div class="icon" :style="head_bg">
        <!--<img :src="poiInfoSon.pic_url">-->
      </div>
      <div class="name">
        <h3>{{poiInfoSon.name}}</h3>
      </div>
      <div class="collect">
        <img src="../../../resource/img/star.png">
        <span>Mark</span>
      </div>

    </div>

    <!--bulletin-->
    <div class="bulletin-wrapper">
      <img class="icon" v-if="poiInfoSon.discounts2" :src="poiInfoSon.discounts2[0].icon_url">


      <span class="text" v-if="poiInfoSon.discounts2" >{{poiInfoSon.discounts2[0].info}}</span>

      <div class="detail" v-if="poiInfoSon.discounts2" @click="showBulletin">
        {{poiInfoSon.discounts2.length}} Sales
        <span class="icon-keyboard_arrow_right"></span>
      </div>
    </div>

    <!--BG-->
    <div class="bg-wrapper" :style="content_bg">
    </div>

    <!--bulletin detail-->
    <transition name="bulletin-detail">
      <div class="bulletin-detail" v-show="isShow">
        <div class="detail-wrapper">
          <div class="main-wrapper" :style="detail_bg">
            <div class="icon" :style="head_bg"></div>
            <h3 class="name">{{poiInfoSon.name}}</h3>
            <!--ratings-->
            <div class="score">
              <Star :score="poiInfoSon.wm_poi_score"></Star>
              <span>{{poiInfoSon.wm_poi_score}}</span>
            </div>
            <p class="tip">
              {{poiInfoSon.min_price_tip}} <i>|</i>
              {{poiInfoSon.shipping_fee_tip}} <i>|</i>
              {{poiInfoSon.delivery_time_tip}}
            </p>
            <p class="time">
              Shipping time: {{poiInfoSon.shipping_time}}
            </p>
            <div class="discounts" v-if="poiInfoSon.discounts2">
              <p>
                <img :src="poiInfoSon.discounts2[0].icon_url">
                <span>{{poiInfoSon.discounts2[0].info}}</span>
              </p>
            </div>
          </div>
          <div class="close-wrapper" @click="closeBulletin">
            <span class="icon-close"></span>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import Star from "components/star/Star"


  export default {
//      props:{
//        poiInfoSon:{
//          type: Object,
//          default:{}
//        }
//      }
    data(){
      return {
        isShow: false
      }
    },
    components:{
      Star
    },
    props: ['poiInfoSon'],
    computed:{
      content_bg(){
        return "background-image: url(" + this.poiInfoSon.head_pic_url + ")";
      },
      head_bg(){
        return "background-image: url(" + this.poiInfoSon.pic_url + ")";
      },
      detail_bg(){
        return "background-image: url(" + this.poiInfoSon.poi_back_pic_url + ")";
      }
    },
    methods:{
      showBulletin(){
        this.isShow = true;
      },
      closeBulletin(){
        this.isShow = false;
      }
    }
  }
</script>

<style>
  /*@import "Header.css";*/
 .header {
  height: 150px;
  padding-top: 20px;
  /*position: relative;*/
  /*z-index: 10;*/
  box-sizing: border-box;
}

.header .top-wrapper{
  position: relative;
}
.header .top-wrapper .back-wrapper{
  width: 50px;
  height: 31px;
  /*background: red;*/
  position: absolute;
  left: 0;
  top: 0;
  text-align: center;
  line-height:31px;
}

.header .top-wrapper .back-wrapper span{
  display: inline-block;
  color: white;
}

.header .top-wrapper .search-wrapper{
  width: 100%;
  height: 31px;
  /*background: purple;*/
  box-sizing: border-box;

  padding: 0 104px 0 50px;
}
.header .top-wrapper .search-wrapper .search-icon {
  width: 28px;
  height: 31px;
  background: url("../../../resource/img/titans_h5_search@2x.png") no-repeat 11px center;
  background-size: 13px 13px;
  position: absolute;


}
.header .top-wrapper .search-wrapper .search-bar {
  width: 100%;
  height: 31px;
  border: 0;
  box-sizing: border-box;
  border-radius: 26px;
  background: #cdcdcc;
  padding-left: 28px;
  outline: none;
}
.header .top-wrapper .more-wrapper{
  /*width: 104px;*/
  width: 65px;
  /*height: 31px;*/
  height: 24px;
  /*background: blue;*/
  position: absolute;
  right: 0;
  top: 0;
  padding: 7px 15px 0 24px;
}
.header .top-wrapper .more-wrapper .group-bt {
  width: 30px;
  height: 17px;
  color: white;
  line-height: 17px;
  text-align: center;
  border: 1px solid white;
  float: left;
  text-decoration: none;
  font-size: 10px;
}
.header .top-wrapper .more-wrapper .more-bt {
  float: left;
  width: 20px;
  height: 24px;
  margin-left: 13px;
  position: absolute;
  top: 15px;
  right: 15px;
}
.header .top-wrapper .more-wrapper .more-bt .s-radius{
  width: 3px;
  height: 3px;
  border-radius: 50%;
  border: 1px solid white;
  display: inline-block;
  float: left;
  margin-right: 1px;
}

.header .bg-wrapper{
  width: 100%;
  height: 150px;
  z-index: -1;
  position: absolute;
  top: 0;
  left: 0;

  background-size: 100% 135%;
  background-position: center -12px;
}


/*content*/
.header .content-wrapper{
  padding: 17px 10px 11px;
  height: 50px;
}
.header .content-wrapper .icon{
  width: 50px;
  height: 50px;
  background-size: 135% 100%;
  background-position: center;
  border-radius: 5px;
  float: left;
}

.header .content-wrapper .name{
  float: left;
  padding: 18px 0 0 12px;

}
.header .content-wrapper .name h3{
  font-size: 16px;
  font-weight: bold;
  color: white;
}

.header .content-wrapper .collect{
  width: 25px;
  height: 37px;
  float: right;
  text-align: center;
  padding-top: 6px;
}

.header .content-wrapper .collect img{
  height: 20px;
  width: 20px;
}

.header .content-wrapper .collect span{
  color: white;
  margin-top: 7px;
  font-size: 11px;
}

/*bulletin*/
.bulletin-wrapper{
  height: 16px;
  padding:0 10px;

}

.bulletin-wrapper .icon{
  width: 16px;
  height: 16px;
  float: left;
  margin-right: 6px;
}
.bulletin-wrapper .text{
  font-size: 11px;
  color: white;
  float: left;
  line-height: 16px;
}

.bulletin-wrapper .detail{
  color: white;
  float: right;
  font-size: 11px;
  line-height: 16px;
}

.bulletin-wrapper .detail span{
  font-size: 16px;
  line-height: 16px;
  float: right;
}

.header .bulletin-detail{
  width: 100%;
  height:100%;
  background: rgba(98,98,98,0.5);
  position: absolute;
  left: 0;
  top: 0;
  z-index: 999;
}

.header .bulletin-detail .detail-wrapper{
  width: 100%;
  height: 100%;
  padding: 43px 20px 125px;
  box-sizing: border-box;
}

.header .bulletin-detail .detail-wrapper .main-wrapper{
  opacity: 0.9;
  width:100%;
  height: 100%;
  background-size: 100% 100%;
  border-radius: 10px;
  text-align: center;
}

.header .bulletin-detail .detail-wrapper .main-wrapper .icon{
  width: 60px;
  height: 60px;
  background-size: 135% 100%;
  background-position: center;
  border-radius: 5px;
  display: inline-block;
  margin-top: 40px;
}
.header .bulletin-detail .detail-wrapper .main-wrapper .name{
  font-size: 15px;
  color: white;
  margin-top: 13px;
}

.header .bulletin-detail .detail-wrapper .main-wrapper .score{
  height: 10px;
  margin-top: 6px;
  text-align: center;
}

.header .bulletin-detail .detail-wrapper .main-wrapper .score .star{
  display: inline-block;
  margin-right: 7px;
}

.header .bulletin-detail .detail-wrapper .main-wrapper .score span{
  display: inline-block;
  font-size: 10px;
  color: white;
}


.header .bulletin-detail .detail-wrapper .main-wrapper .tip{
  font-size: 11px;
  color: #bababc;
  margin-top: 8px;
}

.header .bulletin-detail .detail-wrapper .main-wrapper i{
  margin: 0 7px;
}

.header .bulletin-detail .detail-wrapper .main-wrapper .time{
  font-size: 11px;
  color: #bababc;
  margin-top: 13px;
}

.header .bulletin-detail .detail-wrapper .main-wrapper .discounts{
  margin-top: 20px;
  padding:0 20px;
}

.header .bulletin-detail .detail-wrapper .main-wrapper .discounts p{
  padding-top: 20px;
  border-top: 1px solid #bababc;
}

.header .bulletin-detail .detail-wrapper .main-wrapper .discounts img{
  width: 16px;
  height: 16px;
  margin-right: 10px;
  vertical-align: middle;
}

.header .bulletin-detail .detail-wrapper .main-wrapper .discounts span{
  font-size: 11px;
  line-height: 16px;
  color: white;
}

.header .bulletin-detail .detail-wrapper .close-wrapper{
  padding-top: 20px;
  height: 40px;
  text-align: center;
}
.header .bulletin-detail .detail-wrapper .close-wrapper span{
  width: 40px;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  border: 1px solid rgba(140,140,140,0.9);
  display: inline-block;
  border-radius: 50%;
  color: white;
  background: rgba(118, 118, 118, 0.7);
}

/*transition detail*/

/*enter*/
/*.xxx-enter the status of starting of the animination*/
/*.xxx-enter-to the status of ending of the animination*/
/*.xxx-enter-active the time, layoff, action of the animination*/

.bulletin-detail-enter-active, .bulletin-detail-leave-active{
  transition: 0.5s all;
}

.bulletin-detail-enter, .bulletin-detail-leave-to {
  opacity: 0;
}

.bulletin-detail-enter-to, .bulletin-detail-leave {
  opacity: 1;
}


  @import "../../common/styles/icon.css";
 
</style>
