<template>
  <div id="forget_password">
    <div class="forget" v-if="forget">
      <span>忘记密码</span>
      <label for="phoneNum">手机号</label>
      <input type="text" id="phoneNum" v-model="phoneNum">
      <label for="_code">验证码</label>
      <input type="text" id="_code" v-model="code">
      <button @click="acquirecode" :disabled="disabled">{{ showMsg }}</button>
      <button @click="handlesubmit">确认</button>
    </div>
    <div class="revise" v-if="!forget">
      <span>修改密码</span>
      <label for="inputpsd">输入新密码</label>
      <input type="text" id="inputpsd" v-model="inputpsd">
      <label for="inputpsdAgin">确认新密码</label>
      <input type="text" id="inputpsdAgin" v-model="inputpsdAgain">
      <button @click="finalsubmit">确认</button>
    </div>

  </div>
</template>
<script>
  export default{
    data(){
      return {
        phoneNum:'',
        code:'',
        disabled:false,
        showMsg:'获取验证码',
        receivecode:'456',
        forget:true,
        inputpsd:'',
        inputpsdAgain:''
      }
    },
    methods:{
      acquirecode(){
        this.$ajax.get('/identity')
          .then((res)=>{
            this.disabled=true;
            this.showMsg = '验证码已发送..'
            this.receivecode = res.data.idCode;
          })
          .catch((err)=>{

          })
      },
      handlesubmit(){
        if(this.code===this.receivecode){
          this.forget=false;
        }
      },
      finalsubmit(){
        this.$ajax.post('/user/forget/{phoneNum}',{
          "password":this.inputpsd,
          "rePassword":this.inputpsdAgain,
          "idCode":this.receivecode
        })
          .then((res)=>{

          })
          .catch((err)=>{

          })
      }
    }
  }
</script>
<style scoped>

</style>
