<template>
  <div id="company-project-file">
    <p class="company-project-guide"><router-link to="/project/company" class="router-link">项目></router-link><router-link to="/project/user/checkout" class="router-link">我的项目></router-link>{{$route.query.proName}}</p>
    <div class="company-project-stage-button">
      <i class="task-stage-button"><router-link :to="{path:'/project/stage',query:{proName:$route.query.proName}}"><img src="../../../assets/images/阶段任务指标按钮.png"/></router-link></i>
      <i class="file-box-button"><img src="../../../assets/images/文件汇总按钮.png"/></i>
    </div>
    <div class="file-container">
      <div class="file-sidebar">
        <p class="file-sidebar-title">全部文件(30)</p>
        <!--li未加-->
        <ul class="file-sidebar-stage-list">
          <li class="file-sidebar-stage-list-item">阶段一(5)</li>
          <li class="file-sidebar-stage-list-item">阶段二(10)</li>
          <li class="file-sidebar-stage-list-item">阶段三(15)</li>
        </ul>
      </div>
      <i class="file-splitter"><img src="../../../assets/images/分割线-竖.png"/></i>
      <div class="file-content">
          <div class="file-content-button">
            <i class="file-content-button-download" @click="fileDownload"><img src="../../../assets/images/下载按钮.png"/></i>
            <i class="file-content-button-upload"><img src="../../../assets/images/上传按钮.png"/></i>
            <i class="file-content-button-delete" @click="fileDelete"><img src="../../../assets/images/删除按钮.png"/></i>
          </div>
          <input class="file-content-search" type="search" name="" v-model="keyword"/>
          <i class="file-content-search-img"><img src="../../../assets/images/搜索.png"/></i>
          <div class="file-content-tabel">
            <div class="file-content-tabel-thead">
              <div class="file-content-tabel-checkbox">
                <input type="checkbox" class="file-content-tabel-checkbox-input" :checked="isCheckAllFiles" @click="checkAllFiles"/>
                <span class="file-content-tabel-checkbox-name">全部文件</span>
              </div>
              <div class="file-content-tabel-title-1">文件名</div>
              <div class="file-content-tabel-title-2">大小</div>
              <div class="file-content-tabel-title-3">上传者</div>
              <div class="file-content-tabel-title-4">修改日期</div>
            </div>
            <!--循环显示各阶段，未做-->
            <ul class="file-content-tabel-stage-file-list">
              <li class="file-content-tabel-stage-file-list-item">
                <div class="file-content-tabel-stage-header">
                  <div class="file-content-tabel-checkbox">
                    <input type="checkbox" class="file-content-tabel-checkbox-input" :checked="isCheckStageFiles" @click="checkStageFiles"/>
                    <span class="file-content-tabel-checkbox-name">阶段一</span>
                  </div>
                </div>
                <!--循环显示文件，已做-->
                <ul class="file-content-tabel-list" ref="profiles">
                  <li v-for="(file,index) in filterFiles(files,keyword)" :key="index" class="file-content-tabel-list-item">
                    <div class="file-content-tabel-checkbox">
                      <input type="checkbox" class="file-content-tabel-checkbox-input" value="要提交的值" :checked="isCheckAllFiles||isCheckStageFiles"/>
                      <span class="file-content-tabel-checkbox-name">{{file.fileName}}</span>
                    </div>
                    <div class="file-content-tabel-title-2">{{file.fileSize}}</div>
                    <div class="file-content-tabel-title-3">{{file.fileUploader}}</div>
                    <div class="file-content-tabel-title-4">{{file.fileModifyTime}}</div>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isCheckAllFiles: false,
      isCheckStageFiles: false,
      keyword: '',
      files: [
        {
          "fileId": 0,
          "fileName": 'abc.rar',
          "fileSize": '987.6M',
          "fileUploader": '狗大佬',
          "fileModifyTime": '2015.9.10'
        },
        {
          "fileId": 1,
          "fileName": '123.psd',
          "fileSize": '543.2M',
          "fileUploader": '他改变了中国',
          "fileModifyTime": '2015.10.10'
        }
      ]
    }
  },
  methods: {
    checkAllFiles:function() {
      this.isCheckAllFiles = !this.isCheckAllFiles
    },
    checkStageFiles:function() {
      this.isCheckStageFiles = !this.isCheckStageFiles
    },
    filterFiles: function (files,keyword) {
      if(!keyword.trim()) {
        return this.files
      }else{
        return this.files.filter(function (file) {
          return file.fileName.includes(keyword)
        })
      }
    },
    fileDownload: function() {
      let els = this.$refs.profiles.querySelectorAll(".file-content-tabel-checkbox-input")
      for(let i=0;i<els.length;i++) {
        if(els[i].checked===true) {
          console.log(els[i].getAttribute('value'))
        }
      }
      this.isCheckAllFiles = false
      this.isCheckStageFiles = false
    },
    fileDelete: function() {
      let els = this.$refs.profiles.querySelectorAll(".file-content-tabel-checkbox-input")
      for(let i=els.length-1;i>=0;i--) {
        if(els[i].checked===true) {
          this.files.splice(i,1)
        }
      }
      this.isCheckAllFiles = false
      this.isCheckStageFiles = false
    }
  }
}
</script>

<style scoped>
ul {
  list-style: none;
}
#company-project-file {
  display: grid;
  position: relative;
  grid-template-rows: 40px 49px 90px 740px 1fr;
  grid-template-columns: 79px 1fr 79px;
  background: #eee;
  min-height: 100vh;
}
/*左上角导航栏*/
.company-project-guide {
  font-size: 18px;
  color: #777;
  grid-area: 2/2/3/3;
  margin-left:-6px;
}
.company-project-guide .router-link{
  text-decoration: none;
  color: #777;
}
/*第二行两个按钮*/
.company-project-stage-button {
  display: grid;
  grid-area: 3/2/4/3;
  grid-auto-flow: column;
  grid-template-columns: 167px 1fr;
  justify-items: start;
  align-items: start;
}
.task-stage-button {
  cursor: pointer;
}
.file-box-button {
  cursor: pointer;
}
/*主体内容*/
/*阶段列表（左边）*/
.file-container {
  background: #fff;
  grid-area: 4/2/5/3;
  display: grid;
  grid-template-columns: 167px 3px 1fr 30px;
  grid-template-rows: 30px 1fr 30px;
}
.file-container .file-sidebar {
  grid-area: 2/1/3/2;
  overflow: auto;
}
.file-container .file-sidebar-title {
  margin: 0 0 16px 30px;
  font-size: 18px;
  color: #444;
}
.file-container .file-sidebar-stage-list {
  list-style: none;
  margin-left: 48px;
}
.file-container .file-sidebar-stage-list-item {
  font-size: 14px;
  color: #444;
  margin-bottom: 20px;
}
/*分割线*/
.file-splitter {
  grid-area: 1/2/4/3;
}
/*文件列表（右边）*/
.file-content {
  grid-area: 2/3/3/4;
  display: grid;
  justify-items: start;
  align-items: start;
  grid-template-rows: 55px 1fr;
  position: relative;
}
/*文件列表（右边）-顶部*/
.file-content .file-content-button {
  margin-left: -1px;
  display: grid;
  grid-row: 1/2;
  grid-auto-flow: column;
  grid-column-gap: 15px;
}
.file-content .file-content-button .file-content-button-download {
  cursor: pointer;
}
.file-content .file-content-button .file-content-button-upload {
  cursor: pointer;
}
.file-content .file-content-button .file-content-button-delete {
  cursor: pointer;
}
.file-content .file-content-search {
  position: absolute;
  border: none;
  background: #eee;
  width: 600px;
  height: 35px;
  top: 0;
  right: 0;
  padding: 0 28px 0 20px;
}
.file-content .file-content-search-img {
  position: absolute;
  top: 6px;
  right: 4px;
}
/*文件列表（右边）-list列表*/
.file-content-tabel {
  display: grid;
  grid-template-rows: 36px 1fr;
  justify-self: stretch;
  align-self: stretch;
  font-size: 14px;
  color: #777;
}
/*tabel-header*/
.file-content-tabel .file-content-tabel-thead {
  grid-row: 1/2;
  display: grid;
  grid-auto-flow: column;
  justify-self: stretch;
  align-items: center;
  justify-items: center;
  grid-template-columns: 90px 1fr 125px 390px 335px;
  border-top: 1px #aaa solid;
  border-bottom: 1px #aaa solid;
}
.file-content-tabel-thead .file-content-tabel-title-2{
  border-left: 1px #aaa solid;
  border-right: 1px #aaa solid;
  display: grid;
  justify-self: stretch;
  align-self: stretch;
  justify-items: center;
  align-items: center;
}
.file-content-tabel-thead .file-content-tabel-title-4 {
  border-left: 1px #aaa solid;
  display: grid;
  justify-self: stretch;
  align-self: stretch;
  justify-items: center;
  align-items: center;
}
.file-content-tabel .file-content-tabel-stage-file-list {
  grid-row: 2/3;
  display: grid;
  grid-auto-flow: column;
}
/*tabel列表*/
.file-content-tabel-stage-file-list-item {
  display: grid;
  grid-template-rows: 36px 1fr;
}
.file-content-tabel-stage-header {
  align-self: center;
  height: 36px;
  border-bottom: 1px #aaa solid;
  display: grid;
}
.file-content-tabel-stage-header .file-content-tabel-checkbox {
  align-self: center;
  margin-left: 8px;
}
.file-content-tabel-list-item {
  display: grid;
  height: 36px;
  grid-auto-flow: column;
  grid-template-columns: 1fr 125px 390px 335px;
  justify-items: center;
  align-items: center;
  border-bottom: 1px #aaa solid;
}
.file-content-tabel-list-item .file-content-tabel-checkbox {
  justify-self: start;
  margin-left:8px;
}
</style>


