<template>
  <van-popup
    v-model:show="state.show"
    position="bottom"
    @confirm="emit('update:modelValue', false)"
    @close="emit('update:modelValue', false)"
  >
    <van-cascader
      :options="state.options"
      v-model="state.cascaderValue"
      @close="emit('update:modelValue', false)"
      @finish="onFinish"
      @change="onChange"
      :field-names="{
        text: 'name',
        value: 'code'
      }"
    />
  </van-popup>
</template>
<script setup>
import { defineProps, watch, defineEmits, reactive, onMounted } from 'vue'
import { areaJson } from '@/utils/staticJson.js'
const props = defineProps({ modelValue: Boolean })
const emit = defineEmits(['update:modelValue', 'changeAdressVal'])
const state = reactive({
  show: props.modelValue || false,
  cascaderValue: '',
  options: [],
  provinceSub: null, // 省下标
  citySub: null // 市下标
})

watch(
  () => props.modelValue,
  val => {
    state.show = val
  }
)

onMounted(() => {
  loadProvince()
})

const loadProvince = () => {
  state.options = formatJson(areaJson().province_list)
}

const loadData = async (code, tabIndex) => {
  const data =
    tabIndex === 1
      ? formatJson(areaJson().city_list, code, tabIndex)
      : tabIndex === 2
      ? formatJson(areaJson().county_list, code, tabIndex)
      : ''
  formatList(code, data, tabIndex)
}

// 组装地址json(获取省市区接口)
const formatJson = (lists, code, tabIndex) => {
  const obj = []
  const index = tabIndex === 1 ? 2 : 4
  for (const key in lists) {
    if (code && key.substr(0, index) === code.substr(0, index)) {
      obj.push({
        code: key,
        name: lists[key]
      })
    }
    if (!code) {
      obj.push({
        code: key,
        name: lists[key]
      })
    }
  }
  return obj
}

// 组装地址列表适配组件把获取到的值化成children添加到对应点击事件后
const formatList = (code, data, tabIndex) => {
  const list =
    tabIndex === 1
      ? state.options
      : tabIndex === 2
      ? state.options[state.provinceSub].children
      : tabIndex === 3
      ? state.options[state.provinceSub].children[state.citySub].children
      : ''
  const sub = list.findIndex(v => v.code === code)
  tabIndex === 1
    ? (state.provinceSub = sub)
    : tabIndex === 2
    ? (state.citySub = sub)
    : ''
  list[sub].children = data
}

const onChange = ({ value, tabIndex }) => {
  if (tabIndex < 2) {
    loadData(value, tabIndex + 1)
  }
}
const onFinish = val => {
  if (val.tabIndex === 2) {
    emit('update:modelValue', false)
    emit('changeAdressVal', val)
  }
}
</script>
