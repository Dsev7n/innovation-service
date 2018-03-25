<template>
  <div id="login">
    <div :class="headerType" class="header">
      <div :class="currentperson"><a @click="handlePerson">个人用户</a></div>
      <div :class="currentcompany"><a @click="handleCompany">企业用户</a></div>
    </div>
    <div :class="nameType">
     <div class="name">
        <label for="username">用户名/手机号</label>
        <input type="text" id="username" v-model="username">
     </div>
      <div class="password">
        <label for="password"> 密码</label>
        <input type="password" id="password" v-model="password">
        <router-link :to="{name:'forget_password'}" class="forget_password">忘记密码></router-link>
      </div>
    </div>
    <span v-for="err in errs" v-if="err.bool">
      {{err.msg}}
    </span>
    <button @click="loginIn" class="login">登录</button>
    <button class="reg">注册</button>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        headerType:'header_person',
        nameType:'person',
        username: '',
        password: '',
        currentperson:'current',
        currentcompany:'',
        errs:[
          {
            msg:'用户不存在',
            bool:false
          },
          {
            msg:'密码错误',
            bool:false
          }
        ]
      }
    },
//    mounted(){
//      /*页面挂载获取cookie，如果存在username的cookie，则跳转到主页，不需登录*/
//      if(getCookie('username')){
//        this.$router.push('/')
//      }
//    },
    methods:{
      handlePerson(){
        this.nameType = 'person';
        this.headerType = 'header_person';
        this.username='';
        this.password='';
        this.currentperson='current';
        this.currentcompany='';
      },
      handleCompany(){
        this.nameType = 'company';
        this.headerType = 'header_company';
        this.username='';
        this.password='';
        this.currentperson='';
        this.currentcompany='current';
      },
      loginIn(){
        if(this.username == "" || this.password == ""){
          alert("请输入用户名或密码");
          return ;
        }
        if(this.nameType === 'company'){
          this.$ajax({
            url: '/company/login/{companyName}/{password}/{isRemember}',
            method: 'get',
          })
            .then((res)=>{
              console.log(res.data)
            })
            .catch((err)=>{
              console.log(err.data)
            })
        }else{
          this.$ajax({
            url: '/user/login/{identity}/{password}/{isRemember}',
            method: 'get',
          })
            .then((res)=>{
              console.log(res.data)
            })
            .catch((err)=>{
              console.log(err.data)
            })
        }
      },
    }
  }
</script>
<style scoped>
 #login{
   margin:125px 0 0 308px;
   width: 711px;
   height:367px;
   border:1px solid #26262A;
 }
 .header{
   height:60px;
   display:flex;
 }
 .header div{
   flex:1;
   text-align: center;
   line-height:60px;
   color: #999999;
 }
 .header .current{
   color: #fff;
 }
 .header_person{
 background-color: #3333CC;
   margin-bottom: 40px;
 }
  .header_company{
   background-color:#282828;
  }
  .name,.password{
   margin:40px 0 0 100px;
   position: relative;
  }
  input{
    position: absolute;
    left:130px;
    width:200px;
  }
 .forget_password{
   position: absolute;
   right:150px;
 }
 button{
   display: inline-block;
   border:1px solid #000;
   background-color: #fff;
   border-radius:3px;
   width:80px;
   height:30px;
   cursor: pointer;
   outline:none;
   margin-top:40px;
 }
 button.login{
   margin-left:220px;
 }
 button:last-child{
   margin-left:34px;
 }
</style>
