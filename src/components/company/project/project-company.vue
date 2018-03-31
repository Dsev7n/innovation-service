<template>
  <div id="company-project">
    <i class="company-logo"><img src="../../../assets/images/logo.png" alt="logo"/></i>
    <p class="company-title">创新项目网络服务平台</p>
    <i class="company-button company-publish-button"><router-link to="/project/company/publish" ><img src="../../../assets/images/发布项目按钮.png" alt="publish-project-button"/></router-link></i>
    <i class="company-button company-my-button"><router-link to="/project/user/checkout" ><img src="../../../assets/images/我的项目按钮.png" alt="publish-project-button"/></router-link></i>
  </div>
</template>

<script>

</script>

<style scoped>
#company-project{
  display: grid;
  justify-items: center;
  grid-template-columns: 1fr 55px 1fr;
  grid-template-rows: 50vh 100px 1fr;
  background-color: #eee;
  min-height: 100vh;
}
.company-logo {
  width: 200px;
  height: 200px;
  grid-area: 1/1/2/4;
  align-self: end;
}
.company-title{
  font-size: 36px;
  grid-area: 2/1/3/4;
  align-self: center;
}
.company-button{
  cursor: pointer;
}
.company-publish-button {
  justify-self: end;
  grid-area: 3/1/4/2;
}
.company-my-button {
  justify-self: start;
  grid-area: 3/3/4/4;
}
</style>


