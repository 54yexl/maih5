<template>
  <van-uploader v-model="fileList" :after-read="afterRead" />
</template>
<script>
import { defineComponent, ref, watch } from 'vue'
import { uploadImgApi } from '@/api/user'

export default defineComponent({
  name: 'maiUpload',
  props: {
    modelValue: String
  },
  emits: {
    'update:modelValue': (val) => true
  },
  setup(props, ctx) {
    const fileList = ref([])
    watch(
      () => props.modelValue,
      val => {
        if (val) {
          fileList.value = val.split(',').map(v => ({ url: v, isImage: true }))
        }
      }
    )
    // 上传
    const afterRead = async file => {
      const formData = new FormData()
      formData.append('file', file.file)
      console.log(file.file)
      const { data } = await uploadImgApi(formData)
      ctx.emit('update:modelValue', data.join())
    }
    return {
      fileList,
      afterRead
    }
  }
})
</script>
