# 菜单项数据加载成功之后，在前端有几个可以存放的地方；

1.sessionStorage
2.localStorage
3.vuex （状态管理）

# vuex 安装
npm install vuex --save

# vuex 配置

# 2020-11-12 图标库使用 font-awesome
# 安装
npm install font-awesome
# main.js 引入
import 'font-awesome/css/font-awesome.min.css'

# 2020-11-13 
# 选项卡
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
      <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
      <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
      <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
    </el-tabs>
# 这里的 v-model="activeName" activeName 表示 activeName 指定的值就是 选中的tab;


