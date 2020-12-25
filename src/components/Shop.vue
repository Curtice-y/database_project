<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>商店</el-breadcrumb-item>
        </el-breadcrumb>
        <el-tab-pane label="List">
            <ul  class=" cookList ">
                <li v-for="item in ItemList" :key="item">
                <span class="foodImg"><img :src="item.picture" width="50" height="50"></span>
                <span class="Left">{{item.name}}</span>
                <span class="Right"><el-button type="primary" @click="open(item.id)">购买</el-button></span>
                <span class="foodPrice">￥{{ item.price}}元</span>
                </li>
            </ul>
        </el-tab-pane>
    </div>
</template>
<script>
export default {
    data () {
        return{
            ItemList: []
        }
    },
    created () {
       this.getRecord()
    },
    methods: {
      getRecord(){
        this.$http.get('/onSaleCommodityList').then(response => {
          console.log(response)
            this.ItemList = response.data
        })
         .catch(error => {
            console.log(error)
         })
      },
      open(id){
            const token = window.sessionStorage.getItem('token')
            this.$confirm('确认购买此商品', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
            console.log('success')
            this.buy(id)
            this.$message({
                type: 'success',
                message: '确认购买!'
            })
            }).catch(() => {
            this.$message({
                type: 'info',
                message: '取消'
            })
            })
      },
      buy(id){
        const token = window.sessionStorage.getItem('token')
        this.$http.post(`/order?id=${id}&buyer=${token}`)
          .then(response => {
          console.log(response)
          this.getRecord()
        })
          .catch(error => {
          this.$message("购买请求失败")
          console.log(error)
        })
      }
    }
}
</script>

<style lang="less" scoped>
.cookList li{
    width: 20%;
    border:1px solid #E5E9F2;
    background-color:rgb(185, 184, 184);
    padding: 2px;
    float:left;
    margin: 2px;
   }
   .cookList li span{
       
        display: block;
        float:left;
   }
   .foodImg{
        width: 300px;
        height: 200px;
        border: 1px solid #000;
        margin-top: 5px;
        img{
            width:100%;
            height: 100%;
            object-fit:cover;
        }
   }
   .Left{
       width: 40%;
       font-size: 25px;
       padding-top: 10px;
       padding-left: 10px;
       color:black;
   }
   .foodPrice{
       color: red;
       width: 50%;
       font-size: 16px;
       padding-left: 10px;
       padding-top:10px;
   }
   .Right{
      width: 40%;
      padding-top: 5px;
      padding-left: 50px;
      float: left;
   }
</style>