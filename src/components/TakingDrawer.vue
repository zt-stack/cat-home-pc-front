<script setup>
import { ref } from 'vue'

const centerDialogVisible = ref(true)
</script>

<template>
  <div class="drawer-main">
    <el-dialog
      v-model="centerDialogVisible"
      width="800"
      align-center
      style="border-radius: 20px"
    >
      <div class="my-header">
        <el-popover
          placement="top-start"
          :width="200"
          trigger="hover"
          content="快来和我聊天吧😊"
        >
          <template #reference>
            <!-- <el-button class="m-2">Hover to activate</el-button> -->
            <span>智慧聊天窗</span>
          </template>
        </el-popover>
        <el-image
          src="https://aiwebstudy.oss-cn-beijing.aliyuncs.com/3b1957b4-7a9f-4ccd-9b1d-25592e6efac8.gif"
          alt=""
          class="img"
        />
      </div>
      <div class="content-main">
        <div class="chat-container">
          <div class="chat-display">
            <!-- 对话展示框将在这里 -->
          </div>
          <div class="chat-input">
            <input type="text" id="message-input" placeholder="请输入内容" />
            <button id="submit-btn">发送</button>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
@import url(../assets/style.css);
.drawer-main {
  border-radius: 50px;
  .my-header {
    display: flex;
    align-content: center;
    justify-content: center;
    width: 100%;
    height: 50px;
    span {
      font-size: 20px;
      color: black;
    }
    img {
      width: 80px;
      height: 80px;
    }
  }
}
</style>
