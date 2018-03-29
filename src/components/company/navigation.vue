<template>
  <div id="company-nav">
    <i class="company-nav-logo"><img src="../../assets/images/logo.png" alt="logo"/></i>
    <p class="company-nav-title">创新项目网络服务平台</p>
    <ul class="company-nav-items">
      <li class="company-nav-item"><router-link to="/project" class="company-nav-item-name" v-bind:class="{'itemActive':isProjectActive}">项目</router-link></li>
      <li class="company-nav-item"><router-link to="/patent" class="company-nav-item-name" v-bind:class="{'itemActive':isPatentActive}">人才</router-link></li>
      <li class="company-nav-item"><router-link to="/resume" class="company-nav-item-name" v-bind:class="{'itemActive':isResumeActive}">专利</router-link></li>
    </ul>
    <p class="company-nav-companyname">{{companyName}}</p>
    <div class="company-nav-line"></div>
    <div class="company-nav-message"><span class="company-nav-message-number">{{messageNumber}}</span></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      companyName:'华工附属A公司',
      messageNumber: 88
    }
  },
  props: ['isProjectActive','isPatentActive','isResumeActive']
}
</script>

<style scoped>
body {
  font-family: "Microsoft YaHei";
}
ul,li,p,div,span{
  margin: 0;
  padding: 0;
}
i{
  font-style:normal;
}
#company-nav{
  width: 100%;
  background-color: #282828;
  display: grid;
  grid-template-rows: 100px;
  grid-template-columns: 110px 314px 1fr 220px 2.2px 80px;
  align-items: center;
  justify-items: center;
}
.company-nav-logo img{
  height: 60px;
  width: 60px;
}
.company-nav-title {
  color: #777;
  font-size: 24px;
  align-self: stretch;
  justify-self: stretch;
  margin-top: 40px;
}
.company-nav-items {
  list-style: none;
  display: grid;
  grid-template-columns: 184px 184px 184px;
  justify-self: stretch;
  align-self: stretch;
}
.company-nav-item {
  display: grid;
}
.company-nav-item-name {
  color: #ccc;
  font-size: 24px;
  text-decoration: none;
  display: grid;
  justify-self: stretch;
  align-self: stretch;
  justify-items: center;
  align-items: center;
}
.company-nav-item-name:hover,.company-nav-item-name.itemActive {
  color: #fff;
  background-image: url(../../assets/images/选中标题栏.png)
}
.company-nav-companyname {
  font-size: 24px;
  color: #ccc;
}
.company-nav-line {
  margin-top: 2px;
  background-color: #ccc;
  width: 2.2px;
  height: 32px;
}
.company-nav-message{
  display: grid;
  overflow: hidden;
  height: 34px;
  width: 32px;
  background-image: url(../../assets/images/消息.png)
}
.company-nav-message-number{
  font-family: 'ArialMT';
  font-size: 18px;
  color: #fffefe;
  text-align: center;
  line-height: 34px;
}
</style>


