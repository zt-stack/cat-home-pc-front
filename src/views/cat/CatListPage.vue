<script setup>
import { ref, onMounted } from 'vue'
import { useCatStore, useUserStore } from '@/stores'
import {
  getCatInfoService,
  getCatByIdService,
  updateCatService,
  deleteCatService,
  insertCatService
} from '@/api/cat.js'
import { Delete, Edit, Plus } from '@element-plus/icons-vue'
import { ElMessageBox, ElNotification } from 'element-plus'
// 单元格样式
const rowStyle = ref({
  height: '80px'
})
const userStore = useUserStore()
const catForm = ref({
  id: '',
  catName: '',
  age: '',
  image: '',
  health: '',
  address: '',
  state: '',
  entrydate: ''
}) //表单提交
// 查询
const params = ref({
  page: 1,
  pageSize: 5,
  catName: '',
  state: ''
})
const loading = ref(true) //加载动画
// 获取猫咪信息
const catStore = useCatStore()

onMounted(async () => {
  const res = await getCatInfoService(params.value)
  if (res) {
    loading.value = false
  }
  catStore.setCatList(res.data.data.rows)
  catStore.setCatTotal(res.data.data.total)
})

const onSearch = async () => {
  const res = await getCatInfoService(params.value)
  catStore.setCatList(res.data.data.rows)
  catStore.setCatTotal(res.data.data.total)
}
const onReset = async () => {
  // 重置按钮
  params.value.catName = ''
  params.value.state = ''
  params.value.page = 1
  params.value.pageSize = 5
  const res = await getCatInfoService(params.value)
  catStore.setCatList(res.data.data.rows)
  catStore.setCatTotal(res.data.data.total)
}

// 编辑与删除
const dialog = ref(false) //控制弹出层显示
const drawer = ref(false) //提交按钮加载

// 按钮操作
const EditHandler = async (row) => {
  dialog.value = true
  // 添加猫咪,为了区分添加与编辑
  if (Number.isInteger(row)) {
    return
  }
  // 编辑猫咪
  const res = await getCatByIdService(row.row.id)
  // 进行赋值catForm
  catForm.value = res.data.data[0]
  // 添加猫咪信息
}
const DeleteHandler = async (row) => {
  ElMessageBox.confirm('删除信息之后将无法恢复，是否继续', '警告', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    try {
      await deleteCatService(row.row.id)
      await getCatListPage()
      ElNotification({
        title: '成功',
        message: '成功删除',
        type: 'success'
      })
    } catch (error) {
      ElNotification({
        title: '失败',
        message: '删除失败',
        type: 'warning'
      })
    }
  })
}
const handleClose = async () => {
  await updateCatService(catForm.value)
  catForm.value = {}
  dialog.value = false
}
// 弹出层按钮操作更新按钮
const updateForm = ref()
const submitForm = async () => {
  if (catForm.value.id != '') {
    console.log('这里是编辑的提交')
    await updateForm.value.validate()
    await updateCatService(catForm.value)
    catForm.value = {}
    getCatListPage()
    dialog.value = false
    return
  }
  await updateForm.value.validate()
  await insertCatService(catForm.value)
  getCatListPage()
  ElNotification({
    title: '成功',
    message: '编辑成功',
    type: 'info'
  })
  dialog.value = false
}
const cancelForm = () => {
  dialog.value = false
  catForm.value = {}
}
// 表单校验规则
const rules = {
  catName: [{ required: true, message: '请输入正确的名字', trigger: 'blur' }],
  age: [
    { required: true, message: '请输入正确的年龄', trigger: 'blur' },
    { pattern: /^[1-9]\d*$/, message: '请输入正确的年龄', trigger: 'blur' }
  ],
  image: [{ required: true, message: '请添加照片', trigger: 'blur' }],
  health: [{ required: true, message: '请填写健康状态', trigger: 'blur' }],
  state: [{ required: true, message: '请输入领养状态', trigger: 'blur' }],
  address: [{ required: true, message: '请输入窝点', trigger: 'blur' }],
  entrydate: [{ required: true, message: '请输入出生日期', trigger: 'blur' }]
}
// 文件上传
//文件上传相关
const upload = ref()
const imgUrl = ref()
const token = ref({ Authorization: userStore.token })
const handleAvatarSuccess = (res) => {
  console.log(res)
  imgUrl.value = res.data
  catForm.value.image = res.data
}

// 更改页码的操作
// 每页的条数,当每页显示的条数发生变化的时候，整个页面需要重新渲染
const getCatListPage = async () => {
  const res = await getCatInfoService(params.value)
  catStore.setCatList(res.data.data.rows)
  catStore.setCatTotal(res.data.data.total)
}
const handleSizeChange = (size) => {
  params.value.pageSize = size
  params.value.page = 1
  loading.value = true
  setTimeout(() => {
    loading.value = false
    getCatListPage()
  }, 1000)
}
// 页码的变化
const handleCurrentChange = (page) => {
  params.value.page = page
  loading.value = true
  setTimeout(() => {
    loading.value = false
    getCatListPage()
  }, 1000)
}
</script>

<template>
  <PageContainer title="小猫管理">
    <!-- 插槽按钮 -->
    <template #button>
      <el-button type="primary" @click="EditHandler(2)">添加小猫</el-button>
    </template>
    <!-- 表单搜索 -->
    <el-form class="form-manage" style="max-width: 100%" inline :model="params">
      <el-form-item
        label="猫咪姓名:"
        class="manage-margin"
        style="width: 300px"
      >
        <!--在组建里面渲染数据 -->
        <el-input v-model="params.catName"></el-input>
      </el-form-item>
      <el-form-item label="领养状态:" style="width: 300px">
        <el-select v-model="params.state">
          <el-option label="已领养" value="已发布"></el-option>
          <el-option label="未领养" value="未领养"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item style="margin-left: 50px">
        <el-button type="primary" @click="onSearch">搜索</el-button>
        <el-button type="default" @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 主体内容 -->
    <el-table
      :data="catStore.catList"
      style="width: 100%"
      height="530"
      :row-style="rowStyle"
      v-loading="loading"
      v-if="catStore.getCatList"
    >
      <el-table-column prop="catName" label="名字" />
      <el-table-column prop="image" label="照片" class="common">
        <template #default="scope">
          <el-image
            :src="scope.row.image"
            style="width: 80px; height: 80px"
            class="common"
          />
        </template>
      </el-table-column>
      <el-table-column prop="age" label="年龄" />
      <el-table-column prop="health" label="健康状态">
        <template #default="scope">
          <el-image
            src="https://aiwebstudy.oss-cn-beijing.aliyuncs.com/e658cc2f-50ba-4092-813f-bac39683f957.png"
            style="width: 40px; height: 40px"
            class="common"
            v-if="scope.row.health == '健康'"
          />
          <el-image
            v-else
            style="width: 40px; height: 40px"
            class="common"
            src="https://aiwebstudy.oss-cn-beijing.aliyuncs.com/3653b1b8-c60b-4a6d-ace2-48822183b76b.png"
          />
        </template>
      </el-table-column>
      <el-table-column prop="address" label="窝点" />
      <el-table-column prop="state" label="状态" />
      <el-table-column prop="entrydate" label="出生日期" />
      <el-table-column label="操作" width="170">
        <template #default="scope">
          <el-button
            type="primary"
            :icon="Edit"
            circle
            @click="EditHandler(scope)"
            size="large"
          />
          <el-button
            type="danger"
            :icon="Delete"
            circle
            size="large"
            @click="DeleteHandler(scope)"
          />
        </template>
      </el-table-column>
    </el-table>
    <el-empty description="description" v-else />
    <!-- 分页 -->
    <el-pagination
      class="page-site"
      v-model:current-page="params.page"
      v-model:page-size="params.pageSize"
      :disabled="false"
      :background="true"
      layout="jumper, total, sizes, prev,pager, next"
      :total="catStore.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[1, 3, 4, 5, 10]"
    />

    <!-- 弹窗抽屉 -->
    <el-drawer
      v-model="dialog"
      title="小猫管理"
      :before-close="handleClose"
      direction="rtl"
      class="demo-drawer"
      size="35%"
    >
      <div class="demo-drawer__content">
        <!-- 自定义内容 -->
        <el-form
          :model="catForm"
          size="large"
          :rules="rules"
          ref="updateForm"
          autocomplete="off"
        >
          <el-form-item label="猫咪名字" class="distance" prop="catName">
            <el-input v-model="catForm.catName"></el-input>
          </el-form-item>
          <el-form-item label="小猫年龄" class="distance" prop="age">
            <el-input v-model="catForm.age"></el-input>
          </el-form-item>
          <el-form-item label="猫咪照片" class="distance" prop="image">
            <el-upload
              ref="upload"
              class="avatar-uploader"
              action="http://localhost:8080/upload"
              name="image"
              :headers="token"
              :on-success="handleAvatarSuccess"
              :show-file-list="false"
              style="border: 2px solid #f5f5ff; width: 100px; height: 100px"
            >
              <img
                v-if="catForm.image"
                :src="catForm.image || imgUrl"
                class="avatar"
                style="width: 100px; height: 100px"
              />
              <el-icon
                v-else
                class="avatar-uploader-icon"
                style="width: 100px; height: 100px"
                ><Plus
              /></el-icon>
            </el-upload>
          </el-form-item>
          <el-form-item label="健康状态" class="distance" prop="health">
            <el-select v-model="catForm.health">
              <el-option label="健康" value="健康"></el-option>
              <el-option label="生病" value="生病"> </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="小猫窝点" class="distance" prop="address">
            <el-input v-model="catForm.address"></el-input>
          </el-form-item>
          <el-form-item label="小猫状态" class="distance" prop="state">
            <el-select v-model="catForm.state">
              <el-option label="已领养" value="已领养"></el-option>
              <el-option label="未领养" value="未领养"> </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="出生日期" class="distance" prop="entrydate">
            <el-date-picker
              v-model="catForm.entrydate"
              type="datetime"
              placeholder="选择日期"
              format="YYYY/MM/DD"
              value-format="YYYY-MM-DD"
            />
          </el-form-item>
        </el-form>
        <div class="demo-drawer__footer">
          <el-button @click="cancelForm" class="size">取消</el-button>
          <el-button
            type="primary"
            :loading="drawer"
            @click="submitForm"
            class="size"
          >
            {{ drawer ? '提交 ...' : '提交' }}
          </el-button>
        </div>
      </div>
    </el-drawer>
  </PageContainer>
</template>

<style lang="scss" scoped>
.common {
  display: flex;
  align-content: center;
  justify-content: center;
}
.demo-drawer__content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .distance {
    margin-bottom: 30px;
  }
  .demo-drawer__footer {
    display: flex;
    width: 400px;
    height: 200px;
    // justify-content: space-evenly;
    margin-top: 30px;
    .size {
      width: 100px;
      height: 50px;
    }
  }
}
.page-site {
  margin-top: 20px;
  justify-content: flex-end;
}
</style>
