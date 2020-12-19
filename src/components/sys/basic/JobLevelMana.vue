<template>
  <div>
    <div>
      <el-input size="small" v-model="jl.name"
                style="width: 300px;"
                prefix-icon="el-icon-plus"
                placeholder="添加职称……">

      </el-input>
      <el-select v-model="jl.titleLevel" placeholder="职称等级" style="margin-left: 5px; margin-right: 5px;" size="small">
        <el-option
            v-for="item in titleLevels"
            :key="item"
            :label="item"
            :value="item">
        </el-option>
      </el-select>
      <el-button icon="el-icon-plus" type="primary" size="small" @click="addJobLevel">添加</el-button>
    </div>
    <div style="margin-top: 10px;">
      <el-table
          v-loading="loading"
          element-loading-text="正在加载数据……"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)"
          @selection-change="handleSelectionChange"
          :data="jls"
          border
          size="small"
          style="width: 95%">
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
            label="职称名称"
            width="100">
        </el-table-column>
        <el-table-column
            prop="titleLevel"
            label="职称级别"
            width="100">
        </el-table-column>
        <el-table-column
            prop="createDate"
            label="创建时间"
            width="160">
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
                  @click="showEditViewJl(scope.row)">编辑</el-button>
              <el-button
                  size="small"
                  type="danger"
                  @click="handleDeleteJl(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button type="danger" size="small" style="margin-top: 8px;" @click="deleteMany" :disabled="multipleSelection.length==0">批量删除</el-button>

    </div>
    <el-dialog
        title="修改职称"
        :visible.sync="dialogVisible"
        width="380px">
      <div>
        <table>
          <tr>
            <td>
              <el-tag>职称名称</el-tag>
            </td>
            <td>
              <el-input v-model="updateJl.name" size="small" style="margin-left: 5px; margin-right: 5px;"></el-input>
            </td>
          </tr>
          <tr>
            <td>
              <el-tag>职称级别</el-tag>
            </td>
            <td>
              <el-select v-model="updateJl.titleLevel" size="small" placeholder="职称等级" style="margin-left: 5px; margin-right: 5px;">
                <el-option
                    v-for="item in titleLevels"
                    :key="item"
                    :label="item"
                    :value="item">
                </el-option>
              </el-select>
            </td>
          </tr>
          <tr>
            <td>
              <el-tag>是否启用</el-tag>
            </td>
            <td>
              <el-switch
                  v-model="updateJl.enabled"
                  active-text="启用"
                  inactive-text="禁用"
                  style="margin-left: 5px; margin-right: 5px;">
              </el-switch>
            </td>
          </tr>
        </table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="doUpdateJl">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "JobLevelMana",
  data(){
    return {

      loading: false,
      jl: {
        name: '',
        titleLevel: ''
      },
      jls: [],
      dialogVisible: false,
      multipleSelection: [],
      updateJl: {
        name: '',
        titleLevel: '',
        enabled: false
      },
      titleLevels:[
          '正高级',
          '副高级',
          '中级',
          '初级',
          '员级'
      ]
    }
  },
  mounted() {
    this.initJls();
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
        this.deleteRequest("/system/basic/joblevel/" + ids).then(resp=>{
          if (resp){
            this.initJls();
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },

    handleSelectionChange(val){
      this.multipleSelection = val;
    },

    doUpdateJl(){
      this.putRequest("/system/basic/joblevel/", this.updateJl).then(resp=>{
        if (resp) {
          this.initJls();
          this.dialogVisible = false;
        }
      })
    },

    addJobLevel(){
      if (this.jl.name && this.jl.titleLevel) {
        this.postRequest("/system/basic/joblevel/", this.jl).then(resp=>{
          if (resp) {
            this.initJls();
          }
        })
      } else {
        this.$message.error("添加字段不能为空!");
      }

    },
    showEditViewJl(data){
      Object.assign(this.updateJl, data);
      this.dialogVisible = true;
    },

    handleDeleteJl(data){
      //消息确认框
      this.$confirm('此操作将永久删除【' + data.name + '】职称, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteRequest("/system/basic/joblevel/" + data.id).then(resp=>{
          if(resp){
            this.initJls();
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },

    initJls(){
      this.loading = true;
      this.getRequest("/system/basic/joblevel/").then(resp=>{
        this.loading = false;
        if (resp){
          this.jls = resp;
          this.jl = {
            name: '',
            titleLevel: ''
          };
        }
      })
    }
  }
}
</script>

<style>

</style>