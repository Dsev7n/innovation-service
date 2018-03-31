<template>
  <div id="company-project-publish">
    <p class="company-project-guide"><router-link to="/project/company" class="router-link">项目></router-link>发布项目</p>
    <p class="company-project-publish-title">发布您的项目</p>
    <form action="/" method="post" id="proForm">
      <label for="proType">项目分类</label><select name="proType" id="proType" class="project-select"><option v-for="(item,index) in proTypes" :key="index" :value="item.value">{{item.value}}</option></select>
      <label for="proName">项目名称</label><input type="text" name="proName" id="proName" class="project-input"/>
      <label for="proDescription">项目描述</label><textarea name="proDescription" id="proDescription" class="project-textarea"></textarea>
      <label for="proCycle">项目周期</label><select name="proCycle" id="proCycle" class="project-select"><option v-for="(item,index) in proCycles" :key="index" :value="item.value">{{item.value}}</option></select>
      <label for="proMoney" class="peoMoney-label"><p>项目金额</p><select name="proMoney" id="proMoney" class="project-select"><option v-for="(item,index) in proMoneys" :key="index" :value="item.value">{{item.value}}</option></select></label>
      <label for="proRequset">项目要求</label><textarea name="proRequest" id="proRequset" class="project-textarea"></textarea>
      <label for="proFile">需求文件</label><span class="file-input-button"><img src="../../../assets/images/发布项目-上传按钮.png"><input type="file" name="proFile" id="proFile"/></span>
      <input type="submit" id="uploadButton"/>
    </form>
    <div class="company-project-publish-button">
      <i class="publish-button" v-on:click="toggleFinish"><img src="../../../assets/images/确定发布按钮副本.png" alt="publish-project-confirm-button"/></i>
      <i class="save-button"><img src="../../../assets/images/暂时保存按钮副本2.png" alt="publish-project-save-button"/></i>
    </div>
    <div class="confirm-background" v-show="isShow">
      <div class="confirm-container">
          <p class="confirm-title">您确定要发布项目吗?</p>
          <i class="cancel-button" v-on:click="toggleFinish"><img src="../../../assets/images/取消按钮副本3.png" alt="cancel-button"/></i>
          <label form="proForm" for="uploadButton" class="confirm-button"><img src="../../../assets/images/确定按钮副本2.png" alt="confirm-button"/></label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      proTypes:[  // demo数据，待修改
        {value: ''},
        {value: 'a'},
        {value: 'b'},
        {value: 'c'}
      ],
      proCycles: [
        {value: ''},
        {value: 1},
        {value: 2},
        {value: 3}
      ],
      proMoneys: [
        {value: ''},
        {value: 1},
        {value: 2},
        {value: 3}
      ],
      isShow: false
    }
  },
  methods: {
    toggleFinish: function() {
      this.isShow = !this.isShow
    }
  }
}
</script>

<style scoped>
#company-project-publish {
  display: grid;
  position: relative;
  grid-template-rows: 40px 50px 69px 580px 80px 60px;
  background-color: #eee;
  height: 100%;
  min-height: 100vh;
}
.company-project-guide {
  font-size: 18px;
  color: #777;
  grid-row: 2/3;
  margin-left:50px;
}
.company-project-guide .router-link{
  text-decoration: none;
  color: #777;
}
.company-project-publish-title {
  font-size: 36px;
  color: #444;
  grid-row: 3/4;
  justify-self: center;
}
#proForm {
  grid-row: 4/5;
  display: grid;
  grid-template-columns: 50px 128px 1fr 1fr 178px;
  grid-template-rows: 80px 80px 140px 80px 140px 60px;
  justify-items: stretch;
  align-items: stretch;
  color: #444;
  font-size: 24px;
}
#proForm label {
  grid-column: 2/3;
}
.project-select {
  height: 60px;
  width: 219px;
  border: none;
  font-size: 24px;
}
.project-input {
  grid-column: 3/5;
  height: 60px;
  border: none;
  font-size: 24px;
}
.project-textarea {
  grid-column: 3/5;
  height: 120px;
  border: none;
  font-size: 24px;
}
#proForm .peoMoney-label {
  display: grid;
  grid-auto-flow: column;
  grid-column: 4/5;
  grid-template-columns: 128px 1fr;
}
#proForm .file-input-button {
  position: relative;
  display: inline-block;
  overflow: hidden;
  width: 120px;
  height: 60px;
}
#proForm #proFile {
  position: absolute;
  top:0;
  right: 0;
  font-size: 60px;
  opacity: 0;
  cursor: pointer;
}
#uploadButton { /*submit按钮隐藏，通过label触发*/
  display: none;
}
.company-project-publish-button {
  grid-row: 6/7;
  display: grid;
  grid-template-columns: 1fr 60px 1fr;
  align-items: start;
}
.save-button {
  grid-column: 3/4;
    justify-self: start;
}
.publish-button{
  cursor: pointer;
  grid-column: 1/2;
  justify-self: end;
}
/* 点击确定发布后的确认框 */
.confirm-background {
  display: grid;
  background-color: rgba(0,0,0,0.4);
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  grid-template-rows: 520px 240px 1fr;
  grid-template-columns: 1fr 600px 1fr;
}
.confirm-container {
  grid-area: 2/2/3/3;
  background-color:#fff;
  display: grid;
  grid-template-rows: 58px 72px 1fr;
  grid-template-columns: 1fr 55px 1fr;
}
.confirm-title{
  grid-area: 2/1/3/4;
  font-size: 24px;
  color: #282828;
  justify-self: center;
}
.cancel-button {
  grid-area: 3/1/4/2;
  justify-self: end;
  cursor: pointer;
}
.confirm-button {
  grid-area: 3/3/4/4;
  justify-self: start;
  cursor: pointer;
}
</style>


