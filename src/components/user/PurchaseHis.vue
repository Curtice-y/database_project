<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>个人信息</el-breadcrumb-item>
            <el-breadcrumb-item>购买记录</el-breadcrumb-item>
        </el-breadcrumb>
        <el-table ref="commodityRef" :data="recordList" stripe style="width: 100%">
            <el-table-column label="名称" prop="name" width="120px"></el-table-column>
            <el-table-column label="价格" prop="price" width="85px"></el-table-column>
            <el-table-column label="卖家" prop="seller" width="100px"></el-table-column>
            <el-table-column label="描述" prop="description" width="300px"></el-table-column>
            <el-table-column label="图片" prop="picture" width="125px">
              <template slot-scope="scope">
                <img :src="scope.row.picture" width="70" height="70" class="tableImg"/>
              </template>
            </el-table-column>
            <el-table-column label="状态" Prop="status">
              <template slot-scope="scope">
                <p v-if="scope.row.status=='运输中'">
                  <el-button type="text" @click="confirm(scope.row.id)">
                    <span>{{scope.row.status}}</span>
                  </el-button>
                </p>
                <p v-else-if="scope.row.status=='已完成'">
                  <el-button type="text" @click="comment(scope.row.id)">
                    <span>{{scope.row.status}}</span>
                  </el-button>
                </p>
                <p v-else>
                  <el-button type="text" disabled>
                    <span>{{scope.row.status}}</span>
                  </el-button>
                </p>
              </template>
            </el-table-column>
            <el-table-column label="评价" prop="comment" width="300px"></el-table-column>
        </el-table>
        <!-- 确认框 -->
        <el-dialog title="确认订单已完成？" :visible.sync="confirmVisible" width="50%" @close='confirmClose' :append-to-body="true">
          <span slot="footer" class="dialog-footer">
            <el-button @click="confirmSure">确定</el-button>
            <el-button @click="confirmVisible = false">取消</el-button>
          </span>
        </el-dialog>
        <!-- 评价确认框 -->
        <el-dialog title="评价" :visible.sync="commentVisible" width="50%" @close='commentClose' :append-to-body="true">
          <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="curCommodity.comment"> </el-input>
          <span slot="footer" class="dialog-footer">
            <el-button @click="commentSure">确定</el-button>
            <el-button @click="commentVisible = false">取消</el-button>
          </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
  data () {
    return {
      recordList: [],
      curCommodity: {
        id: '',
        comment: ''
      },
      confirmVisible: false,
      commentVisible: false,
    }
  },
  created () {
    this.getRecordList()
  },
  methods: {
    getRecordList () {
      const token = sessionStorage.getItem('token')
      this.$http.get(`/buyOfUser?serialNumber=${token}`)
        .then(response => {
          this.recordList = response.data
          console.log('获取列表成功')
        })
        .catch(error => {
          this.$message.error('获取列表失败')
          console.log(error)
        })
    },
    confirm (commodityId) {
      this.$http.get(`/commodity?id=${commodityId}`)
        .then(response => {
          this.curCommodity.id = response.data.id
          console.log(response)
        })
        .catch(error => {
          this.$message.error('失败')
          console.log(error)
        })
      this.confirmVisible = true
    },
    confirmSure () {
      this.$http.post(`/finished?id=${this.curCommodity.id}`)
        .then(response => {
          this.confirmClose()
          console.log(response)
        })
        .catch(error => {
          this.$message.error('失败')
          console.log(error)
        })
    },
    confirmClose () {
      this.confirmVisible = false
      this.getRecordList()
    },
    comment (commodityId) {
      this.$http.get(`/commodity?id=${commodityId}`)
        .then(response => {
          this.curCommodity.id = response.data.id
          console.log(response)
        })
        .catch(error => {
          this.$message.error('失败')
          console.log(error)
        })
      this.commentVisible = true
    },
    commentSure () {
      this.$http.post(`/comment`, this.curCommodity)
        .then(response => {
          this.commentClose()
          console.log(response)
        })
        .catch(error => {
          this.$message.error('失败')
          console.log(error)
        })
    },
    commentClose () {
      this.commentVisible = false
      this.getRecordList()
    }
  }
}
</script>

<style lang="less" scoped>
.el-table {
  margin-top: 30px;
}
</style>
