<template>
  <div>
    <div>
      <el-input
          size="small"
          class="addPosInput"
          placeholder="添加职位……"
          prefix-icon="el-icon-plus"
          @keydown.enter.native="addPosition"
          v-model="pos.name">
      </el-input>
      <el-button icon="el-icon-plus" size="small" type="primary" @click="addPosition">添加</el-button>
    </div>
    <div class="posManaMain">
      <el-table
          v-loading="loading"
          element-loading-text="正在加载数据……"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)"
          :data="positions"
          border
          size="small"
          @selection-change="handleSelectionChange"
          stripe
          style="width: 100%">
        <el-table-column
            type="selection"
            width="40">
        </el-table-column>
        <el-table-column
            prop="id"
            label="编号"
            width="60">
        </el-table-column>
        <el-table-column
            prop="name"
            label="职位名称"
            width="180">
        </el-table-column>
        <el-table-column
            prop="createDate"
            label="创建时间">
        </el-table-column>
        <el-table-column label="是否启用" width="120">
        <template slot-scope="scope">
          <el-tag type="sucess" v-if="scope.row.enabled">已启用</el-tag>
          <el-tag type="danger" v-else>未启用</el-tag>
        </template>
      </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
                size="small"
                @click="showEditView(scope.$index, scope.row)">编辑</el-button>
            <el-button
                size="small"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button type="danger" size="small" style="margin-top: 8px;" @click="deleteMany" :disabled="multipleSelection.length==0">批量删除</el-button>
    </div>
    <el-dialog
        title="修改职位名称"
        :visible.sync="dialogVisible"
        width="350px">
      <div>
        <div>
          <el-tag>职位名称</el-tag>
          <el-input class="updatePosInput" v-model="updatePos.name" size="small"></el-input>
        </div>
        <div style="margin-top: 15px;">
          <el-tag>职位名称</el-tag>
          <el-switch
              v-model="updatePos.enabled"
              active-text="启用"
              inactive-text="禁用"
              style="margin-left: 8px; margin-right: 5px;">
          </el-switch>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="doUpdate">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "PosMana",
  data(){
    return {

      loading: false,
      pos: {
        name: ''
      },
      dialogVisible: false,
      updatePos: {
        name: '',
        enabled: false
      },
      multipleSelection: [],
      positions:[]
    }
  },
  mounted() {
    this.initPositions();
  },
  methods:{

    deleteMany() {
      this.$confirm('此操作将永久删除【' + this.multipleSelection.length + '】条记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let ids = '?';
        this.multipleSelection.forEach(item=>{
          ids += 'ids=' + item.id + '&';
        })
        this.deleteRequest("/system/basic/pos/" + ids).then(resp=>{
          if (resp){
            this.initPositions();
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },

    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    addPosition(){
      if (this.pos.name) {
        this.postRequest("/system/basic/pos/", this.pos).then(resp=>{
          if (resp) {
            //添加成功后刷新表格
            this.initPositions();
            this.pos.name = '';
          }
        })
      } else {
        this.$message.error('职位名称不能为空!');
      }
    },

    showEditView(index, data) {
      //用拷贝
      Object.assign(this.updatePos, data);
      this.dialogVisible = true;
    },

    doUpdate(){
      this.putRequest("/system/basic/pos/", this.updatePos).then(resp=>{
        if (resp){
          this.initPositions();
          this.updatePos.name = '';
          this.dialogVisible = false;
        }
      })
    },

    handleDelete(index, data) {
      //消息确认框
      this.$confirm('此操作将永久删除【' + data.name + '】职位, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteRequest("/system/basic/pos/" + data.id).then(resp=>{
          if(resp){
            this.initPositions();
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },

    initPositions() {
      this.loading = true;
      this.getRequest("/system/basic/pos/").then(resp=>{
        this.loading = false;
        if (resp) {
          this.positions = resp;
        }
      })
    }
  }
}
</script>

<style>

.addPosInput {
  width: 300px;
  margin-right: 8px;
}
.posManaMain {
  width: 95%;
  margin-top: 10px;
}
.updatePosInput {
  width: 220px;
  margin-left: 8px;
}

</style>