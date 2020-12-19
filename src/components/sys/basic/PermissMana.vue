<template>
  <div>
    <div class="permissManaTool">
      <el-input size="small" placeholder="请输入角色英文名" v-model="role.name">
        <template slot="prepend">ROLE_</template>
      </el-input>
      <el-input size="small" placeholder="请输入角色中文名" v-model="role.nameZh" @keydown.enter.native="addRole"></el-input>
      <el-button type="primary" icon="el-icon-plus" size="small" @click="addRole">添加角色</el-button>
    </div>
    <div class="permissManaMian">
      <el-collapse
          v-loading="loading"
          element-loading-text="正在加载数据……"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)"
          accordion
          v-model="activeName"
          border
          @change="change">
        <el-collapse-item :title="r.nameZh" :name="r.id" v-for="(r, index) in roles" :key="index">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>可访问的资源</span>
              <el-button style="float: right; padding: 3px 0; color: #ff0000"
                         icon="el-icon-delete" type="text" @click="deleteRole(r)"></el-button>
            </div>
            <div>
              <el-tree :data="allMenus"
                       :props="defaultProps"
                       node-key="id"
                       ref="tree"
                       :key="index"
                       :default-checked-keys="selectedMenus"
                       show-checkbox>

              </el-tree>
              <div style="display: flex; justify-content: flex-end;">
                <el-button @click="cancelUpdate">取消修改</el-button>
                <el-button type="primary" @click="doUpdate(r.id, index)">确认修改</el-button>
              </div>
            </div>
          </el-card>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
export default {
  name: "PermissMana",
  data() {

    return{

      loading: false,
      activeName: -1,
      selectedMenus: [],
      allMenus: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      role:{
        name: '',
        nameZh: ''
      },
      roles: []
    }
  },
  mounted() {
    this.initRoles();
  },
  methods:{

    deleteRole(role) {
      this.$confirm('此操作将永久删除【' + role.nameZh + '】角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteRequest("/system/basic/permiss/role/" + role.id).then(resp => {
          if (resp) {
            this.initRoles();
          }
        })
      }).catch(() => {
        this.$message({type: 'info', message: '已取消删除'});
      });
    },

    addRole(){
      if (this.role.name && this.role.nameZh) {
        this.postRequest("/system/basic/permiss/role", this.role).then(resp=>{
          if (resp){
            this.role.name = '';
            this.role.nameZh = '';
            this.initRoles();
          }
        })
      } else {
        this.$message.error("数据不能为空!");
      }

    },

    cancelUpdate() {
      this.activeName = -1;
    },

    doUpdate(rid, index) {
      let tree = this.$refs.tree[index];
      //getCheckedKeys(a) a 若为 true 则仅设置叶子节点的选中状态
      let selectedKeys = tree.getCheckedKeys(true);
      let url = "/system/basic/permiss/?rid=" + rid;
      selectedKeys.forEach(key=>{
        url+= '&mids=' + key;
      })
      this.putRequest(url).then(resp=>{
        if (resp){
          this.activeName = -1;
        }
      })
    },

    change(rid){
      if (rid){
        this.selectedMenus = null;
        this.initAllMenus();
        this.initSelectedMenus(rid);
      }
    },

    initSelectedMenus(rid) {
      this.getRequest("/system/basic/permiss/mids/" + rid).then(resp=>{
        if (resp){
          this.selectedMenus = resp
        }
      })
    },

    initAllMenus(){
      this.getRequest("/system/basic/permiss/menus/").then(resp=>{
        if (resp) {
          this.allMenus = resp;
        }
      })
    },

    initRoles(){
      this.loading = true;
      this.getRequest("/system/basic/permiss/").then(resp=>{
        this.loading = false;
        if (resp) {
          this.roles = resp;
        }
      })
    }
  }
}
</script>

<style>
.permissManaMian {
  margin-top: 15px;
  width: 700px;
}
.permissManaTool{
  display: flex;
  justify-content: flex-start;

}
.permissManaTool .el-input{
  width: 300px;
  margin-right: 8px;
}
</style>