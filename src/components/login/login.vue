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
    <span v-model="err" >
      {{err}}
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
        err:''
      }
    },
//    mounted(){
//      /*页面挂载获取cookie，如果存在username的cookie，则跳转到主页，不需登录*/
//      if(getCookie('username')){
//        this.$router.push('/')
//      }
//    },
    methods:{
     setCookie(key, value, iDay) {
        var oDate = new Date();
        oDate.setDate(oDate.getDate() + iDay);
        document.cookie = key + '=' + value + ';expires=' + oDate;
     },
      removeCookie(key) {
         setCookie(key, '', -1);//这里只需要把Cookie保质期退回一天便可以删除
      },
      getCookie(key) {
         var cookieArr = document.cookie.split('; ');
         for(var i = 0; i < cookieArr.length; i++) {
           var arr = cookieArr[i].split('=');
           if(arr[0] === key) {
             return arr[1];
           }
         }
         return false;
      },
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
        //点击登录，先判断是企业端还是用户端，分别发出相应请求。
        if(this.username == "" || this.password == ""){
          alert("请输入用户名或密码");
          return ;
        };
        if(this.username=='123'&this.password =='456'){
          this.setCookie("userId",'userId',1);
          this.setCookie('userName','userName',1);
        }
        //发送请求
//        if(this.nameType === 'company'){
//          this.$ajax({
//            url: '/company/login',
//            data:{
//              "companyName":this.username,
//              "password":this.password ,
//            },
//            method: 'get',
//          })
//            .then((res)=>{
//              console.log(res.data);
//              this.setCookie("userId",res.data.userId,1);
//              this.setCookie('userName',res.data.userName,1);
//              if(res.data.isSuccessful){
//                this.$router.push('/')
//              }else if(res.data.errorMessage){
//                this.err=res.data.errorMessage;
//              }
//            })
//            .catch((err)=>{
//              console.log(err.data)
//            })
//        }else{
//          this.$ajax({
//            url: '/user/login',
//            data:{
//              identity:this.username,
//              password:this.password,
//            },
//            method: 'get',
//          })
//            .then((res)=>{
//              console.log(res.data);
//              this.setCookie("userId",res.data.userId,1);
//              this.setCookie('userName',res.data.userName,1);
//              if(res.data.isSuccessful){
//                this.$router.push('/')
//              }else if(res.data.errorMessage){
//                this.err=res.data.errorMessage;
//              }
//            })
//            .catch((err)=>{
//              console.log(err.data)
//            })
//        }
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
 a{
   cursor: pointer;
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
