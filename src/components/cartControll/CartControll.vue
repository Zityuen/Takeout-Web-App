<template>
    <div class="cartcontroll">
      <transition name="move">
      <div class="cart-minus" @click="cartMinus" v-show="food.count">
        <span class="inner icon-remove_circle_outline"></span>
      </div>
      </transition>
      <div class="cart-count" v-show="food.count">{{food.count}}</div>
      <div class="cart-add icon-add_circle" @click="cartAdd">
        <i class="bg"></i>
      </div>
    </div>
</template>

<script>
  import Vue from 'vue';

  export default {
    props:{
      food:{
        type:Object
      }
    },
    methods:{
      cartMinus(){
        this.food.count--;
      },
      cartAdd(){
        if(!this.food.count){
          Vue.set(this.food,'count',1);
        }
        else {
          this.food.count++;
        }
      }
    }

  }
</script>

<style>
  /*@import "CartControll.css";*/
 .cartcontroll{
  font-size: 0;
}

.cartcontroll .cart-minus{
  display: inline-block;
  width: 26px;
  height: 26px;
  font-size: 26px;
  color: #b4b4b4;
}

.cartcontroll .cart-count{
  display: inline-block;
  width: 25px;
  text-align: center;
  font-size: 12px;
  line-height: 26px;
  vertical-align: top;
}

.cartcontroll .cart-add{
  display: inline-block;
  width: 26px;
  height: 26px;
  font-size: 26px;
  color: #ffd161;
  position: relative;
}

.cartcontroll .cart-add .bg{
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: black;
  position: absolute;
  left: 3px;
  top: 3px;
  z-index: -1;
}

.move-enter-active, .move-leave-active{
  transition: all 0.5s linear;
}

.move-enter, .move-leave-to{
  transform: translateX(30px) rotate(180deg);
}

</style>
