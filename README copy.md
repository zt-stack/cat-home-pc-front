# Vue3-big-event

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
pnpm install
```

### Compile and Hot-Reload for Development

```sh
pnpm dev
```

### Compile and Minify for Production

```sh
pnpm build
```

### Lint with [ESLint](https://eslint.org/)

```sh
pnpm lint
```

登陆 ---一级路由
架子 ---一级路由 
    -----架子里面的内容都属于二级路由

1.登陆访问拦截
    1.加上路由守卫，在路由配置中(具体的查看vue官方文档)

2.组件里面向外暴露方法
    a.如果在一个组件里面想向外面暴露组件里面的方法。可以使用defineExpose宏函数
    如：defineExpose（{
        open
    }）
    这样子就可以向外暴露改方法， 但是在外面则需要先用ref绑定组件，然后组件名.open这样子调用
    b.如果要确定组件中需要绑定什么方法可以使用defineEmit宏函数,如下就可以知道这个组件绑定了update和submit两个函数
    import { defineEmits } from 'vue'

    const emits = defineEmits(['update', 'submit'])

    function handleUpdate() {
    emits('update')
    }

    function handleSubmit() {
    emits('submit')
    }


3.正则表达式： \S非空字符串

4.el-form在这上面加上inline就可以保证所有的数据在一行显示

5.在vue3中可以使用url.createObjectURL(file.raw)来创建上传图片的链接

6.写完函数直接调用就可以在进入页面的时候直接渲染

7.在vue3中 v-model等价于 ：modelValue 和@update：modelValue

8.flex布局中要让元素在最右边可以使用justify-content：flex-end

9.本地图片预览可以吃使用 URL.createObjectURL(file)