<template>
  <div>
    <div style="display: flex;justify-content: space-between">
      <div>
        <el-input
            style="width: 300px; margin-right: 10px;"
            placeholder="请输入员工名进行搜索,可以直接回车搜索……"
            v-model="keyword"
            clearable
            @clear="initEmps"
            @keydown.enter.native="initEmps"
            prefix-icon="el-icon-search">

        </el-input>
        <el-button icon="el-icon-search" type="primary" @click="initEmps">搜索</el-button>
        <el-button type="primary">
          <i class="fa fa-angle-double-down" aria-hidden="true"></i>
          高级搜索
        </el-button>
      </div>
      <div>
        <el-button type="success">
          <i class="fa fa-level-up" aria-hidden="true"></i>
          导入数据
        </el-button>
        <el-button type="success">
          <i class="fa fa-level-down" aria-hidden="true"></i>
          导出数据
        </el-button>
        <el-button icon="el-icon-plus" type="primary" @click="showAddEmpView">
          添加用户
        </el-button>
      </div>
    </div>
    <div>
      <el-table
          :data="emps"
          stripe
          border
          v-loading="loading"
          element-loading-text="正在加载……"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)"
          style="width: 98%; margin-top: 15px;">
        <el-table-column
            type="selection"
            width="50">
        </el-table-column>
        <el-table-column
            prop="name"
            fixed
            align="center"
            label="姓名"
            width="95">
        </el-table-column>
        <el-table-column
            prop="workId"
            label="工号"
            align="center"
            width="100">
        </el-table-column>
        <el-table-column
            prop="birthday"
            label="出生日期"
            align="center"
            width="90">
        </el-table-column>

        <el-table-column
            prop="idCard"
            label="身份证号码"
            align="center"
            width="150">
        </el-table-column>
        <el-table-column
            prop="wedlock"
            label="婚姻"
            align="center"
            width="70">
        </el-table-column>
        <el-table-column
            prop="nation.name"
            label="民族"
            align="center"
            width="50">
        </el-table-column>
        <el-table-column
            prop=nativePlace"
            label="籍贯"
            align="center"
            width="80">
        </el-table-column>
        <el-table-column
            prop="politicsStatus.name"
            label="政治面貌"
            align="center">
        </el-table-column>
        <el-table-column
            prop="email"
            label="电子邮件"
            align="center"
            width="160">
        </el-table-column>
        <el-table-column
            prop="phone"
            label="电话号码"
            align="center"
            width="100">
        </el-table-column>
        <el-table-column
            prop="address"
            label="联系地址"
            align="center"
            width="180">
        </el-table-column>
        <el-table-column
            prop="department.name"
            label="所属部门"
            align="center"
            width="100">
        </el-table-column>
        <el-table-column
            prop="position.name"
            label="职位"
            align="center"
            width="100">
        </el-table-column>
        <el-table-column
            prop="jobLevel.name"
            label="职称"
            align="center"
            width="100">
        </el-table-column>
        <el-table-column
            prop="engageForm"
            label="聘用形式"
            align="center"
            width="100">
        </el-table-column>
        <el-table-column
            prop="beginDate"
            label="入职日期"
            align="center"
            width="90">
        </el-table-column>
        <el-table-column
            prop="conversionTime"
            label="转正日期"
            align="center"
            width="90">
        </el-table-column>
        <el-table-column
            prop="beginContract"
            label="合同起始日期"
            align="center"
            width="95">
        </el-table-column>
        <el-table-column
            prop="endContract"
            label="合同终止日期"
            align="center"
            width="95">
        </el-table-column>
        <el-table-column
            label="合同期限(年)"
            align="center"
            width="100">
          <template slot-scope="scope">
            {{scope.row.contractTerm}}
          </template>
        </el-table-column>
        <el-table-column
            prop="tiptopDegree"
            label="最高学历"
            align="center">
        </el-table-column>
        <el-table-column
            fixed="right"
            label="操作"
            align="center"
            width="180">
          <template>
            <el-button style="padding: 5px;" size="mini">编辑</el-button>
            <el-button style="padding: 5px;" size="mini" type="primary">高级资料</el-button>
            <el-button style="padding: 5px;" size="mini" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="display: flex; justify-content: flex-end; margin-top:10px; margin-right: 10px;">
        <el-pagination
            background
            @size-change="sizeChange"
            @current-change="currentChange"
            layout="sizes, prev, pager, next, jumper, ->, total, slot"
            :total="total">
        </el-pagination>
      </div>
    </div>
    <el-dialog
        title="添加员工"
        :visible.sync="dialogVisible"
        width="70%">
      <div>
        <el-form>
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item size="mini" label="姓名:" prop="name">
                <el-input
                    prefix-icon="el-icon-edit"
                    v-model="emp.name"
                    style="width: 150px;"
                    placeholder="请输入员工姓名……">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item size="mini" label="性别:" prop="gender">
                <el-radio-group v-model="emp.gender">
                  <el-radio label="男">男</el-radio>
                  <el-radio label="女" style="margin-left: -15px;">女</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item size="mini" label="出生日期:" prop="birthday">
                <el-date-picker
                    v-model="emp.birthday"
                    align="right"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期"
                    style="width: 150px;"
                    >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item size="mini" label="政治面貌:" prop="politicId">
                <el-select v-model="emp.politicId" placeholder="政治面貌" style="width: 180px;">
                  <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item size="mini" label="民族:" prop="nationId">
                <el-select v-model="emp.nationId" placeholder="民族" style="width: 150px;">
                  <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item size="mini" label="籍贯:" prop="nativePlace">
                <el-input
                    prefix-icon="el-icon-edit"
                    v-model="emp.nativePlace"
                    style="width: 148px;"
                    placeholder="请输入员工籍贯……">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item size="mini" label="电子邮箱:" prop="email">
                <el-input
                    prefix-icon="el-icon-message"
                    v-model="emp.email"
                    style="width: 150px;"
                    placeholder="请输入电子邮箱……">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item size="mini" label="联系地址:" prop="address">
                <el-input
                    prefix-icon="el-icon-edit"
                    v-model="emp.address"
                    style="width: 180px;"
                    placeholder="请输入联系地址……">
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item size="mini" label="职位:" prop="posId">
                <el-select v-model="emp.posId" placeholder="职位" style="width: 150px;">
                  <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item size="mini" label="职称:" prop="jobLevel">
                <el-select v-model="emp.jobLevel" placeholder="职称" style="width: 148px;">
                  <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item size="mini" label="所属部门:" prop="departmentId">
                <el-input
                    prefix-icon="el-icon-edit"
                    v-model="emp.departmentId"
                    style="width: 150px;"
                    placeholder="所属部门">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item size="mini" label="电话号码:" prop="phone">
                <el-input
                    prefix-icon="el-icon-edit"
                    v-model="emp.phone"
                    style="width: 180px;"
                    placeholder="电话号码">
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item size="mini" label="工号:" prop="workId">
                <el-input
                    v-model="emp.workId"
                    style="width: 150px;">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item size="mini" label="学历:" prop="tiptopDegree">
                <el-select v-model="emp.tiptopDegree" placeholder="学历" style="width: 148px;">
                  <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item size="mini" label="毕业院校:" prop="school">
                <el-input
                    prefix-icon="el-icon-edit"
                    v-model="emp.school"
                    style="width: 150px;"
                    placeholder="请输入毕业院校……">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item size="mini" label="专业名称:" prop="specialty">
                <el-input
                    prefix-icon="el-icon-edit"
                    v-model="emp.specialty"
                    style="width: 180px;"
                    placeholder="请输入专业名称……">
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item size="mini" label="入职日期:" prop="beginDate">
                <el-date-picker
                    v-model="emp.beginDate"
                    align="right"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="入职日期"
                    style="width: 122px;">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item size="mini" label="转正日期:" prop="conversionTime">
                <el-date-picker
                    v-model="emp.conversionTime"
                    align="right"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="转正日期"
                    style="width: 120px;">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item size="mini" label="合同起始日期:" prop="beginContract">
                <el-date-picker
                    v-model="emp.beginContract"
                    align="right"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="合同起始日期"
                    style="width: 122px;">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item size="mini" label="合同终止日期:" prop="endContract">
                <el-date-picker
                    v-model="emp.endContract"
                    align="right"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="合同终止日期"
                    style="width: 150px;">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item size="mini" label="身份证号码:" prop="idCard">
                <el-input
                    prefix-icon="el-icon-edit"
                    v-model="emp.idCard"
                    style="width: 180px;"
                    placeholder="身份证号码……">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item size="mini" label="聘用形式:" prop="engageForm">
                <el-radio-group v-model="emp.engageForm">
                  <el-radio label="劳动合同">劳动合同</el-radio>
                  <el-radio label="劳务合同" style="margin-left: -15px;">劳务合同</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item size="mini" label="婚姻状况:" prop="wedlock">
                <el-radio-group v-model="emp.wedlock">
                  <el-radio label="未婚">未婚</el-radio>
                  <el-radio label="已婚" style="margin-left: -15px;">已婚</el-radio>
                  <el-radio label="离异" style="margin-left: -15px;">离异</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
    <el-button size="mini" type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "EmpBasic",

  data() {
    return {
      options: [
          {
            value: '选项1',
            label: '黄金糕'
          }, {
            value: '选项2',
            label: '双皮奶'
          }, {
            value: '选项3',
            label: '蚵仔煎'
          }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],

      emp: {
        name: "zy",
        gender: "男",
        birthday: "1989-01-31",
        idCard: "421288198902011234",
        wedlock: "已婚",
        nationId: 1,
        nativePlace: "海南",
        politicId: 1,
        email: "chenjing@qq.com",
        phone: "18795556693",
        address: "海南省海口市美兰区",
        departmentId: 91,
        jobLevelId: 12,
        posId: 29,
        engageForm: "劳动合同",
        tiptopDegree: "高中",
        specialty: "市场营销",
        school: "武汉大学",
        beginDate: "2015-06-08",
        workState: "在职",
        workId: "00000002",
        contractTerm: 3.0,
        conversionTime: "2015-09-09",
        notWorkDate: "2015-09-09",
        beginContract: "2015-06-08",
        endContract: "2018-06-07",
        workAge: null,
        nation: null,
        politicsStatus: null,
        department: null,
        jobLevel: null,
        position: null
      },
      dialogVisible: false,
      emps: [],
      loading: false,
      keyword: '',
      total: 0,
      page: 1,
      size: 10
    }
  },
  mounted() {
    this.initEmps();
  },
  methods:{

    showAddEmpView() {
      this.dialogVisible = true;
    },

    sizeChange(currentSize) {
      this.size = currentSize;
      this.initEmps();
    },

    currentChange(currentPage) {
      this.page = currentPage;
      this.initEmps();
    },

    initEmps(){
      this.loading = true;
      this.getRequest("/emp/basic/?page=" + this.page +
          "&size=" + this.size + "&keyword="+ this.keyword).then(resp=>{
        this.loading = false;
        if (resp){
          this.emps = resp.data;
          this.total = resp.total;
        }
      })
    }
  }
}
</script>

<style>

</style>