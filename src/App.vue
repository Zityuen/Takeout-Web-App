<template>
  <div id="app">
    <!--header-->
    <MyHeader :poiInfoSon='poiInfo'></MyHeader>
    <!--nav-->
    <MyNav :commentNum="commentNum"></MyNav>
    <!--content-->
    <keep-alive>
    		<router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import MyHeader from 'components/header/Header'
  import MyNav from 'components/nav/Nav'

  export default {
    name: 'App',
    components: {
      MyHeader,
      MyNav,
    },
    data(){
      return{
        //hearer components
        poiInfo:{},
        commentNum: 0
      }
    },
    created(){ //async asking to get info
        var me = this;
        this.$axios.get('/goods')
            .then(function(response){ //get the data
                // console.log(response);
                var dataSource = response.data;
                if(dataSource.code == 0){
                    me.poiInfo = dataSource.data.poi_info;
//                    console.log(me.poiInfo);
                }

            })
            .catch(function(error){
                console.log(error);
            })
        this.$axios.get('/ratings')
            .then(function(response){ //get the data
                // console.log(response);
                var dataSource = response.data;
                if(dataSource.code == 0){
                    me.commentNum = dataSource.data.comment_num;
//                    console.log(me.poiInfo);
                }

            })
            .catch(function(error){
                console.log(error);
            })
    }
  }

</script>

<style>

</style>
