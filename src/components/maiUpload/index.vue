<template>
  <van-uploader
    v-model="fileList"
    :after-read="afterRead"
    :max-size="5 * 1024 * 1024"
    accept="image/*"
    @oversize="onOversize"
  />
</template>
<script>
import { defineComponent, ref, watch } from 'vue'
import { uploadImgApi } from '@/api/user'
import { Toast } from 'vant'

export default defineComponent({
  name: 'maiUpload',
  props: {
    modelValue: String
  },
  emits: {
    'update:modelValue': val => true
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
      file.status = 'uploading'
      file.message = '上传中...'
      const formData = new FormData()
      formData.append('file', file.file)
      console.log(file.file)
      const { data } = await uploadImgApi(formData).catch(() => {
        file.status = 'failed'
        file.message = '上传失败...'
        ctx.emit('update:modelValue', '')
      })
      ctx.emit('update:modelValue', data.join())
    }

    const onOversize = file => {
      Toast('文件大小不能超过5M')
    }
    return {
      fileList,
      afterRead,
      onOversize
    }
  }
})
</script>
