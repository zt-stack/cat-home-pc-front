<script setup>
// 在vue3中v-model的是由：modelValue + update：modelValue组成
// 接受父组件传入的值
defineProps({
  moduleValue: {
    type: [String]
  }
})

// 如果值发送变化，更新数值
const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <el-select
    id="provinces"
    name="provinces"
    :modelValue="moduleValue"
    @update:modelValue="emit('update:modelValue', $event)"
  >
    <el-option value="北京市">北京市</el-option>
    <el-option value="天津市">天津市</el-option>
    <el-option value="上海市">上海市</el-option>
    <el-option value="重庆市">重庆市</el-option>
    <el-option value="河北省">河北省</el-option>
    <el-option value="山西省">山西省</el-option>
    <el-option value="辽宁省">辽宁省</el-option>
    <el-option value="吉林省">吉林省</el-option>
    <el-option value="黑龙江省">黑龙江省</el-option>
    <el-option value="江苏省">江苏省</el-option>
    <el-option value="浙江省">浙江省</el-option>
    <el-option value="安徽省">安徽省</el-option>
    <el-option value="福建省">福建省</el-option>
    <el-option value="江西省">江西省</el-option>
    <el-option value="山东省">山东省</el-option>
    <el-option value="河南省">河南省</el-option>
    <el-option value="湖北省">湖北省</el-option>
    <el-option value="湖南省">湖南省</el-option>
    <el-option value="广东省">广东省</el-option>
    <el-option value="海南省">海南省</el-option>
    <el-option value="四川省">四川省</el-option>
    <el-option value="贵州省">贵州省</el-option>
    <el-option value="云南省">云南省</el-option>
    <el-option value="陕西省">陕西省</el-option>
    <el-option value="甘肃省">甘肃省</el-option>
    <el-option value="青海省">青海省</el-option>
    <el-option value="台湾省">台湾省</el-option>
    <el-option value="内蒙古自治区">内蒙古自治区</el-option>
    <el-option value="广西壮族自治区">广西壮族自治区</el-option>
    <el-option value="西藏自治区">西藏自治区</el-option>
    <el-option value="宁夏回族自治区">宁夏回族自治区</el-option>
    <el-option value="新疆维吾尔自治区">新疆维吾尔自治区</el-option>
    <el-option value="香港特别行政区">香港特别行政区</el-option>
    <el-option value="澳门特别行政区">澳门特别行政区</el-option>
  </el-select>
</template>
