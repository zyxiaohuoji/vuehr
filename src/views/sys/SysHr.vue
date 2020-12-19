<template>
  <div>
    <div style="margin-right: 10px; display: flex; justify-content: center;">
      <el-input v-model="keywords"
                style="width: 400px; margin-right: 8px;"
                prefix-icon="el-icon-search"
                @keydown.enter.native="doSearch"
                placeholder="通过用户名搜索用户……">
      </el-input>
      <el-button icon="el-icon-search" type="primary" @click="doSearch">搜索</el-button>
    </div>
    <div class="hr-container">
      <el-card class="hr-card" v-for="(hr, index) in hrs" :key="index">
          <div slot="header" class="clearfix">
            <span>{{hr.name}}</span>
            <el-button style="float: right; padding: 3px 0; color: #fc0303"
                       type="text"
                       @click="deleteHr(hr)"
                       icon="el-icon-delete"></el-button>
          </div>
          <div>
          <div class="img-container">
            <img :src="hr.userface"
                 :alt="hr.name"
                 :title="hr.name"
                 class="user-face-img">
          </div>
          <div class="userinfo-container">
            <div>用户名: {{hr.name}}</div>
            <div>手机号码: {{hr.phone}}</div>
            <div>电话号码: {{hr.telephone}}</div>
            <div>地址: {{hr.address}}</div>
            <div>用户状态:
              <el-switch
                v-model="hr.enabled"
                style="font-size: 10px;"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-text="启用"
                @change="enabledChange(hr)"
                inactive-text="禁用">
              </el-switch>
            </div>
            <div>用户角色:
              <el-tag type="success"
                      v-for="(role, index) in hr.roles"
                      style="margin-right: 2px;"
                      :key="index">{{role.nameZh}}
              </el-tag>
              <el-popover
                  placement="right"
                  title="角色列表"
                  @show="showPop(hr)"
                  @hide="hidePop(hr)"
                  width="200"
                  trigger="click">
                <el-select v-model="selectedRoles" multiple placeholder="请选择">
                  <el-option
                      v-for="(r, indexk) in allRoles"
                      :key="indexk"
                      :label="r.nameZh"
                      :value="r.id">
                  </el-option>
                </el-select>
                <el-button slot="reference" icon="el-icon-more" type="text"></el-button>
              </el-popover>
            </div>
            <div>备注: {{hr.remake}}</div>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "SysHr",
  data(){
    return {
      keywords: '',
      allRoles: [],
      selectedRoles: [],
      hrs: []
    }
  },
  //生命周期
  mounted() {
    this.initHrs();
  },

  methods:{

    deleteHr(hr) {

      this.$confirm('此操作将永久【' + hr.name + '】, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'

      }).then(() => {

        this.deleteRequest("/system/hr/" + hr.id).then(resp=>{
          if (resp){
            this.initHrs();
          }
        })

      }).catch(() => {

        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },

    doSearch() {
      this.initHrs();
    },

    hidePop(hr){
      let roles = [];
      Object.assign(roles, hr.roles);
      let flag = false;

      if (roles.length != this.selectedRoles.length){
        flag = true;
      } else {
        for (let i=0; i<roles.length; i++){
          let role = roles[i];
          for (let j=0; j<this.selectedRoles.length; j++){
            let sr = this.selectedRoles[j];
            if (role.id == sr){
              roles.splice(i, 1);
              i--;
              break;
            }
          }
        }
        if (roles.length != 0){
          flag = true;
        } else {
          flag = false;
        }
      }

      if (flag) {
        let url = '/system/hr/role?hrid=' + hr.id;
        this.selectedRoles.forEach(sr=>{
          url += '&rids=' + sr ;
        })
        this.putRequest(url).then(resp=>{
          if (resp){
            this.initHrs();
          }
        })
      }
    },

    showPop(hr) {
      this.initAllRoles();
      let roles = hr.roles;
      this.selectedRoles = [];
      roles.forEach(r=>{
        this.selectedRoles.push(r.id);
      })
    },

    initAllRoles(){
      this.getRequest("/system/hr/roles").then(resp=>{
        if (resp){
          this.allRoles = resp;
        }
      })
    },

    enabledChange(hr){
      delete hr.roles;
      this.putRequest("/system/hr/", hr).then(resp=>{
        if (resp){
          this.initHrs();
        }
      })
    },

    initHrs() {
      this.getRequest("/system/hr/?keywords=" + this.keywords).then(resp=>{
        if (resp){
          this.hrs = resp;
        }
      })
    }

  }
}
</script>

<style>
.userinfo-container div{
  font-size: 12px;
}
.userinfo-container{
  margin-top: 20px;
  color: #4896ea;
}
.img-container{
  width: 100%;
  display: flex;
  justify-content: center;
}
.user-face-img{
  width: 72px;
  height: 72px;
  border-radius: 72px;
}
.hr-container {
  margin-top: 25px;
  display: flex;
  flex-wrap: wrap;;
  justify-content: space-around;
}
.hr-card {
  width: 350px;
  margin-bottom: 15px;
}
</style>