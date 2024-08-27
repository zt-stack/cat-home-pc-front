<script setup>
import { ref, onMounted } from 'vue'
import { useAdStore, useUserStore } from '@/stores'
import {
  getAdListService,
  getAdByIdService,
  deleteAdByIdService,
  updateAdService,
  insertAdService,
  arrayAdService
} from '@/api/ad.js'
import { Delete, Edit, Plus } from '@element-plus/icons-vue'
import { ElNotification, ElMessageBox } from 'element-plus'
const loading = ref(false)
// 搜索表单
const params = ref({
  page: 1,
  pageSize: 5,
  adName: '',
  brandName: ''
})
const adForm = ref({
  id: '',
  adName: '',
  brandName: '',
  price: '',
  address: '',
  image: ''
})
const adStore = useAdStore()
// 调取列表接口
const getAdListPage = async () => {
  loading.value = true
  setTimeout(async () => {
    loading.value = false
    const res = await getAdListService(params.value)
    adStore.setAdList(res.data.data.rows)
    adStore.setTotalService(res.data.data.total)
  }, 1000)
}
onMounted(async () => {
  getAdListPage()
})
const onSearch = async () => {
  getAdListPage()
}
const onReset = () => {
  params.value.page = 1
  params.value.pageSize = 5
  params.value.adName = ''
  params.value.brandName = ''
  getAdListPage()
}

// 编辑删除按钮
const drawer = ref(false) //弹窗打卡
const EditHandler = async (scope) => {
  drawer.value = true
  if (Number.isInteger(scope)) {
    return
  }
  const res = await getAdByIdService(scope.row.id)
  adForm.value = res.data.data[0]
}
const DeleteHandler = async (scope) => {
  ElMessageBox.confirm('删除信息之后将无法恢复，是否继续', '警告', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    try {
      await deleteAdByIdService(scope.row.id)
      await getAdListPage()
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

// 分页查询按钮
const handleSizeChange = (size) => {
  params.value.pageSize = size
  params.value.page = 1
  loading.value = true
  setTimeout(() => {
    loading.value = false
    getAdListPage()
  }, 1000)
}
const handleCurrentChange = (page) => {
  params.value.page = page
  loading.value = true
  setTimeout(() => {
    loading.value = false
    getAdListPage()
  }, 1000)
}

// 照片上传
const userStore = useUserStore()
const imgUrl = ref()
const token = ref({ Authorization: userStore.token })
const handleAvatarSuccess = (res) => {
  imgUrl.value = res.data
  adForm.value.image = res.data
}
// 下一步完成表单校验规则
const rules = {
  adName: [{ required: true, message: '请输入正确的名字', trigger: 'blur' }],
  brandName: [{ required: true, message: '请输入正确的名字', trigger: 'blur' }],
  image: [{ required: true, message: '请上传图像', trigger: 'blur' }],
  price: [
    { required: true, message: '请输入正确的价格', trigger: 'blur' },
    { pattern: /^\d+$/, message: '请输入正确的价格', trigger: 'blur' }
  ],
  address: [{ required: true, message: '请选择产地', trigger: 'blur' }]
}
// 提交表单
const form = ref()
const onSubmit = async () => {
  await form.value.validate()
  if (adForm.value.id != '') {
    try {
      // 发起请求
      await updateAdService(adForm.value)
      getAdListPage()
      drawer.value = false
      ElNotification({
        title: '成功',
        message: '修改成功',
        type: 'success'
      })
    } catch (error) {
      ElNotification({
        title: '失败',
        message: '修改失败',
        type: 'warning'
      })
    }
  }
  // 新增数据
  try {
    await insertAdService(adForm.value)
    getAdListPage()
    drawer.value = false
    ElNotification({
      title: '成功',
      message: '新增成功',
      type: 'success'
    })
  } catch (error) {
    ElNotification({
      title: '失败',
      message: '新增失败',
      type: 'warning'
    })
  }
}

// 多选按钮
const array = ref([])
const obj = ref([])
const handleSelectionChange = (e) => {
  // array.value.append(e.id)
  // console.log(e)
  obj.value = e
  console.log(array)
}
// 批量删除
const arrayDelete = async () => {
  obj.value.forEach((obj) => {
    array.value.push(obj.id)
    console.log(obj.id)
  })
  await arrayAdService(array.value)
  getAdListPage()
}
</script>
<template>
  <div class="ad-box">
    <page-container title="广告管理">
      <template #button>
        <el-button type="primary" @click="EditHandler(1)">添加广告</el-button>
      </template>
      <!-- 表单搜索 -->
      <el-form
        class="form-manage"
        style="max-width: 100%"
        inline
        :model="params"
      >
        <el-form-item
          label="猫粮名称:"
          class="manage-margin"
          style="width: 300px"
        >
          <!--在组建里面渲染数据 -->
          <el-input v-model="params.adName"></el-input>
        </el-form-item>
        <el-form-item label="品牌名称:" style="width: 300px">
          <el-input v-model="params.brandName"></el-input>
        </el-form-item>
        <el-form-item style="margin-left: 50px">
          <el-button type="primary" @click="onSearch">搜索</el-button>
          <el-button type="default" @click="onReset">重置</el-button>
          <el-button type="primary" @click="arrayDelete">批量删除</el-button>
        </el-form-item>
      </el-form>
      <!-- 主体内容 -->
      <el-table
        :data="adStore.adList"
        style="width: 100%"
        height="250"
        v-loading="loading"
        @selection-change="handleSelectionChange"
        v-if="adStore.adList"
      >
        <el-table-column type="selection" width="" />
        <el-table-column fixed prop="adName" label="猫粮" />
        <el-table-column prop="brandName" label="品牌" />
        <el-table-column prop="image" label="图像" class="center">
          <template #default="scope">
            <el-image
              :src="scope.row.image"
              style="width: 80px; height: 100px"
              class="common"
              fit="contain"
            />
          </template>
        </el-table-column>
        <el-table-column prop="price" label="价格" width="" />
        <el-table-column prop="address" label="产地" />
        <el-table-column label="操作">
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
        :total="adStore.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[1, 3, 4, 5, 10]"
      />
    </page-container>
    <!-- 弹窗 -->
    <el-drawer v-model="drawer" title="广告管理" direction="rtl" size="35%">
      <el-form :model="adForm" :rules="rules" ref="form">
        <el-form-item label="猫粮名称" class="distance" prop="adName">
          <el-input v-model="adForm.adName"></el-input>
        </el-form-item>
        <el-form-item label="品牌名称" class="distance" prop="brandName">
          <el-input v-model="adForm.brandName"></el-input>
        </el-form-item>
        <el-form-item label="猫粮照片" class="distance" prop="image">
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
              v-if="adForm.image"
              :src="adForm.image || imgUrl"
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
        <el-form-item label="猫粮价格" class="distance" prop="price">
          <el-input v-model="adForm.price"></el-input>
        </el-form-item>
        <el-form-item label="猫粮产地" class="distance" prop="address">
          <SelectAddress v-model="adForm.address"></SelectAddress>
        </el-form-item>
        <el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="onSubmit"
              size="large"
              class="size"
              >提交</el-button
            >
            <el-button size="large" class="size" @click="drawer = false"
              >取消</el-button
            >
          </el-form-item></el-form-item
        >
      </el-form>
    </el-drawer>
  </div>
</template>

<style scoped lang="scss">
.page-site {
  margin-top: 20px;
  justify-content: flex-end;
}
.distance {
  margin-bottom: 50px;
}
.size {
  width: 100px;
  height: 50px;
}
.center {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
