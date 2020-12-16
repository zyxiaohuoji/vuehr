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
      <el-button icon="el-icon-plus" type="primary" size="small">添加</el-button>
    </div>
    <div style="margin-top: 10px;">
      <el-table
          :data="jls"
          border
          size="small"
          style="width: 95%">
        <el-table-column
            prop="id"
            label="编号"
            width="60">
        </el-table-column>
        <el-table-column
            prop="name"
            label="职称名称"
            width="180">
        </el-table-column>
        <el-table-column
            prop="titleLevel"
            label="职称级别"
            width="180">
        </el-table-column>
        <el-table-column
            prop="createDate"
            label="创建时间">
        </el-table-column>
        <el-table-column label="操作">
          <template slot="scope">
            <el-button size="small">编辑</el-button>
            <el-button size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "JobLevelMana",
  data(){
    return {
      jl: {
        name: '',
        titleLevel: ''
      },
      jls: [],
      titleLevels:[
          '正高级',
          '副高级',
          '中级',
          '初级',
          '员级'
      ]
    }
  }
}
</script>

<style>

</style>