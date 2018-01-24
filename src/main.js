// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import Axios from 'Axios'

//import components
import Goods from './components/goods/Goods.vue'
import Ratings from './components/ratings/Ratings.vue'
import Seller from './components/seller/Seller.vue'


Vue.config.productionTip = false

Vue.use(VueRouter);

//if use Axios in other component, we need to
Vue.prototype.$axios = Axios;

//define router
const routes = [
  {path: '/', redirect:'/goods'},
  {path:'/goods', component: Goods},
  {path:'/ratings', component: Ratings},
  {path:'/seller', component: Seller}
];

//create the instance of router
const router = new VueRouter({
  routes,
  linkActiveClass: 'active'
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router
})



// //import express
// const express = require('');
// //create instance of express
// const app = express();
// //read data from json
// var goods = require('../data/goods.json');
// var ratings = require('../data/ratings.json');
// var seller = require('../data/seller.json');
//
// var router = express.Router();
//
// router.get('/goods',function(req, res){
//   res.json(goods);
// })
// app.use(router);
