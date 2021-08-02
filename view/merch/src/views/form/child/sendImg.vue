<template>
  <div class="clearfix">
    <a-upload
      name="file"
      list-type="picture-card"
      :file-list="fileList"
      :disabled="isDisabled"
      :customRequest="uploadFile"
    >
      <a-button :disabled="isDisabled">
        <a-icon type="camera" theme="twoTone" />
      </a-button>
    </a-upload>
    <a-upload
      name="file"
      list-type="picture-card"
      :file-list="fileList"
      :disabled="isDisabled"
      :customRequest="uploadFile"
    >
      <a-button :disabled="isDisabled">
        <a-icon type="folder-open" theme="twoTone" />
      </a-button>
    </a-upload>
  </div>
</template>
<script>

import { sendFile, fileJurisdiction } from '../../../network/Interface/dialogue'

export default {
  props: {
    isDisabled: {
      type: Boolean,
      default: () => false
    },
    mchid: {
      type: Number,
      default: () => 0
    },
    clientid: {
      type: Number,
      default: () => 0
    }
  },
  data () {
    return {
      fileList: [],
      // uploading: false,
      type: '',
      file: ''
    }
  },
  methods: {
    handleChange ({ fileList }) {
      this.fileList = fileList
      console.log(this.fileList)
    },
    // 上传文件方法
    uploadFile (info) {
      console.log(info)
      fileJurisdiction(this.mchid).then((res) => {
        console.log(res)
        const { result } = res
        const fileName = info.file.name.split('.')
        console.log(fileName)
        if (fileName.length > 1) {
          const arr = result.map((item) => {
            if (item.allow_suffix.indexOf(fileName[1]) !== -1) {
              this.type = item.filetype
            }
            console.log(item.allow_suffix.indexOf('png'))
            // item.allow_suffix.find(i => i === 'png')
          })
          console.log(arr)
          console.log(this.type)
          const FileData = new FormData()
          FileData.append('file', info.file)
          FileData.append('clientid', this.clientid)
          FileData.append('mchid', this.mchid)
          FileData.append('file_type', this.type)
          console.log(FileData.getAll('file'))
          sendFile(FileData).then((res) => {
            if (res.error) {
              this.$message.error('暂不支持该上传的类型')
            } else {
              const { result } = res
              const url = this.$store.state.userUrl
              const fileUrl = `${url}${res.result.content}`
              console.log(fileUrl)
              console.log(this.type)
              // that.$parent.onSubmit(this.type, fileUrl)
              this.$emit('onSubmit', this.type, result)
            }
          })
        } else {
          this.$message.error('暂不支持该上传的类型')
        }
      })
    }
  }
}
</script>
<style>
/* you can make up upload button and sample style by using stylesheets */
.sendIamge .ant-upload-select-picture-card {
    width: auto!important;
    height: auto!important;
    border: none!important;
    padding: 0!important;
    margin: 0!important;
}
.sendIamge .ant-upload-picture-card-wrapper{
  float: left;
  width: 36px;
}
.sendIamge .ant-upload.ant-upload-select-picture-card > .ant-upload{
    padding: 0;
    border: n;
}
.sendIamge .ant-upload .ant-btn{
  border: none;
}
</style>
