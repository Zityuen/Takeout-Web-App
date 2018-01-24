<template>
  <div class="goods">
    <!--menu-->
    <div class="menu-wrapper" ref="menuScroll">
      <ul>
        <li class="menu-item" :class="{'current':currentIndex === 0}" @click="selectMenu(0)">
          <p class="text">
            <img :src="container.tag_icon" v-if="container.tag_icon" class="icon">
            {{container.tag_name}}
          </p>
        </li>
        <li class="menu-item" v-for="(item, index) in goods" :class="{'current':currentIndex === index + 1}" @click="selectMenu(index+1)">
          <p class="text">
            <img :src="item.icon" v-if="item.icon" class="icon">
            {{item.name}}
          </p>
          <i class="num" v-show="calCount(item.spus)">{{calCount(item.spus)}}</i>
        </li>
      </ul>
    </div>

    <!--goods-->
    <div class="foods-wrapper" ref="foodScroll">
      <ul>
        <!--special-->
        <li class="container-list food-list-hook">
          <div v-for="item in container.operation_source_list">
            <img :src="item.pic_url">
          </div>
        </li>


        <!--all goods-->
        <li v-for="item in goods" class="food-list food-list-hook">
          <h3 class="title">{{item.name}}</h3>
          <ul>
            <li v-for="food in item.spus" class="food-item" >
              <div class="icon" :style="head_bg(food.picture)" @click="showDetail(food)"></div>
              <div class="content">
                <h3 class="name" @click="showDetail(food)">{{food.name}}</h3>
                <p class="desc" v-if="food.description">{{food.description}}</p>
                <div class="extra">
                  <span class="saled">{{food.month_saled_content}}</span>
                  <span class="praise">{{food.praise_content}}</span>
                </div>
                <img class="product" :src="food.product_label_picture">
                <p class="price">
                  <span class="text">${{food.min_price}}</span>
                  <span class="unit">/{{food.unit}}</span>
                </p>
              </div>
              <div class="cartcontroll-wrapper">
                <CartControll :food="food"></CartControll>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>

    <!--shopcart-->
    <Shopcart :poiInfo="poiInfo" :selectFoods="selectFoods"></Shopcart>
    
    <Food :food="selectedFood" ref='foodView'></Food>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import Food from 'components/food/Food'
  import Shopcart from 'components/shopcart/Shopcart'
  import CartControll from 'components/cartControll/CartControll'
  export default {
    data() {
      return {
        container: {},
        goods: [],
        poiInfo:{},
        listHeight: [],
        scrollY: 0,
        menuScroll: {},
        foodScroll: {},
        selectedFood: {}
      }
    },
    created() { //async asking to get info
      var me = this;
      this.$axios.get('/goods')
        .then(function (response) { //get the data
          var dataSource = response.data;
          if (dataSource.code == 0) {
            me.container = dataSource.data.container_operation_source;
            me.goods = dataSource.data.food_spu_tags;
            me.poiInfo = dataSource.data.poi_info;
            me.$nextTick(() => {
              me.initScroll();

              //cal the height
              me.calculateHeight();
            });
          }

        })
        .catch(function (error) {
          console.log(error);
        })
    },
    methods: {
      head_bg(imgName) {
        return "background-image: url(" + imgName + ")";
      },
      initScroll() {
        // ref used to a certain element or components, it is in this.$refs
        this.menuScroll = new BScroll(this.$refs.menuScroll,{
          click: true
        });
        this.foodScroll = new BScroll(this.$refs.foodScroll, {
          probeType: 3,
          click:true
        });

        //listening event
        this.foodScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y));
        })

      },
      calculateHeight() {
        let foodList = this.$refs.foodScroll.getElementsByClassName('food-list-hook');
        let height = 0;
        this.listHeight.push(height);
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i];
          height += item.clientHeight;
          this.listHeight.push(height);
        }
      },
      selectMenu(index){
//        console.log(index);
        let foodList = this.$refs.foodScroll.getElementsByClassName('food-list-hook');

        let el = foodList[index];

        this.foodScroll.scrollToElement(el, 250);
      },
      calCount(spus){
        var count = 0;
        spus.forEach((good)=>{
          if(good.count > 0){
            count += good.count;
          }
        });
        return count;
      },
      showDetail(food){
      	this.selectedFood = food;
      	
      	this.$refs.foodView.showView();
      	
      }


    },
    computed:{
      currentIndex(){
        for(let i = 0; i < this.listHeight.length; i++){
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i+1];


          if(this.scrollY >= height1 && this.scrollY <height2){
            return i;
          }
        }
      },
      selectFoods(){
        var foods = [];
        this.goods.forEach((good)=>{
          good.spus.forEach((food)=>{
            if(food.count>0){
              foods.push(food);
            }
          });
        });
        return foods;
      },
    },
    components:{
      BScroll,
      Shopcart,
      CartControll,
      Food
    }

  }
</script>

<style>
  /*@import "Goods.css";*/
 .goods{
  display: flex;

  /*fix the height*/
  position: absolute;
  top: 190px;
  bottom: 51px;

  overflow: hidden;
  width: 100%;
}

/*
flex: flex-grow | flex-shrink | flex-basis
*/

.goods .menu-wrapper{
  flex:0 0 85px;
  background: #f4f4f4;
}

.goods .menu-wrapper .menu-item{
  padding: 16px 23px 15px 10px;
  border-bottom: 1px solid #E4E4E4;
  position: relative;
}

.goods .menu-wrapper .current{
  background: white;
  font-weight: bold;
  margin-top: -1px;
}


.goods .menu-wrapper .menu-item .text {
  font-size: 13px;
  color: #333333;
  line-height: 17px;

  /*webkit*/
  -webkit-line-clamp:2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;

}
.goods .menu-wrapper .menu-item .text .icon{
  width: 15px;
  height: 15px;
  vertical-align: middle;
}
.goods .menu-wrapper .menu-item .num{
  position: absolute;
  right: 5px;
  top: 5px;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  color: white;
  background: red;
  text-align: center;
  font-size: 7px;
  line-height: 13px;

}


.goods .foods-wrapper{
  flex: 1;
  /*background: blue;*/
}

/*special*/
.goods .foods-wrapper .container-list{
  padding: 11px 11px 0 11px;
  border-bottom: 1px solid #E4E4E4;
}

.goods .foods-wrapper .container-list img{
  width: 100%;
  margin-bottom: 11px;
  border-radius: 5px;
}

.goods .foods-wrapper .food-list{
  padding: 11px 11px 0px 11px;
}

.goods .foods-wrapper .food-list .title{
  font-size: 13px;
  height: 13px;
  background: url(btn_yellow_highlighted@2x.png) no-repeat left center;
  background-size: 2px 10px;
  padding-left: 7px;
  margin-bottom: 12px;
}

.goods .foods-wrapper .food-list .food-item{
  display: flex;
  margin-bottom: 25px;
  position: relative;
}

.goods .foods-wrapper .food-list .food-item .icon{
  flex: 0 0 63px;
  background-position: center;
  background-size: 120% 100%;
  background-repeat: no-repeat;
  margin-right: 11px;
  height: 75px;
}

.goods .foods-wrapper .food-list .food-item .content{
  flex:1;
}

.goods .foods-wrapper .food-list .food-item .content .name{
  color:#333333;
  font-size: 16px;
  line-height: 21px;
  margin-bottom: 10px;
  padding-right: 27px;

}

.goods .foods-wrapper .food-list .food-item .content .desc{
  font-size: 10px;
  line-height: 19px;
  color:#bfbfbf;
  margin-bottom: 8px;
  /*overflow*/
  -webkit-line-clamp:1;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.goods .foods-wrapper .food-list .food-item .content .extra{
  font-size: 10px;
  color: #bfbfbf;
  margin-bottom: 7px;
}

.goods .foods-wrapper .food-list .food-item .content .extra .saled{
  margin-right: 14px;
}

.goods .foods-wrapper .food-list .food-item .product{
  height: 15px;
  margin-bottom: 6px;
}

.goods .foods-wrapper .food-list .food-item .price{
  font-size: 0;
}

.goods .foods-wrapper .food-list .food-item .price .text{
  font-size: 14px;
  color: #fb4e44;
}

.goods .foods-wrapper .food-list .food-item .price .unit{
  font-size: 12px;
  color: #bfbfbf;
}

.goods .foods-wrapper .food-list .food-item .cartcontroll-wrapper{
  position: absolute;
  right: 0;
  bottom: 0;

}

</style>
