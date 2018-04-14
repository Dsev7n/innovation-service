<template>
  <div id="apply-patent">
    <div class="title"><h1>专利发布</h1></div>
    <div class="divide"></div>
    <label for="input-file" class="pic">
      <div class="img-box">
        <img class="image" :src="avatar" v-show="avatar!==''">
        <input type="file"
               @change="changeImage"
               style="display:none"
               id="input-file"
               ref="avatarInput">
        <span v-show="avatar==''" class="upload_pic">上传专利图片</span>
      </div>
    </label>
    <div class="title"><h2>编辑专利信息</h2></div>
    <div class="patent_msg">
      <label v-for="(item,index) in applyList" :for="item.id">
        <span>{{item.name}}</span>
        <input
          :type="item.type"
          :id="item.id"
          :placeholder="item.msg"
          v-model="item.value"
          @focus="judgefocus(index)"
          @blur="judgefocus(index)">
        <span class="uncomplete" v-if="item.uncomplete">未填写完整</span>
      </label>
    </div>
    <button @click="handlePub" class="Pub">发布专利</button>
    <button @click="handleSave">保存</button>
  </div>
</template>
<script>
  export default{
    data(){
      return{
        userId:'',
        userName:'',
        // 转base64码后的url
        avatar:'',
        imgData: {
          accept: 'image/gif, image/jpeg, image/png, image/jpg',
        },
        applyList:[
          {
            name:'专利名称',
            type:'text',
            id:'apply_name',
            msg:' 输入专利名称',
            value:'',
            uncomplete:false
          },
          {
            name:'专利权人',
            type:'text',
            id:'apply_owner',
            msg:' 输入专利权人',
            value:'',
            uncomplete:false
          },
          {
            name:'专利号',
            type:'text',
            id:'appluy_num',
            msg:' 输入专利号',
            value:'',
            uncomplete:false
          },
          {
            name:'申请日期',
            type:'date',
            id:'apply_date',
            msg:' 输入专利申请日期',
            value:'',
            uncomplete:false
          },
          {
            name:'授权公布日',
            type:'date',
            id:'release_date',
            msg:' 输入专利的授权公布日',
            value:'',
            uncomplete:false
          },
          {
            name:'证书号',
            type:'text',
            id:'certi_num',
            msg:' 输入专利证书的证号',
            value:'',
            uncomplete:false
          },
          {
            name:'联系方式',
            type:'Number',
            id:'link_addr',
            msg:' 常用联系电话',
            value:'',
            uncomplete:false
          }
        ]
      }
    },
    mounted() {
      //读取用户userId和Username，便于发送请求
      this.userId=this.getCookie("userId");
      this.userName=this.getCookie("userName");
      //读取存储 把input的value填上
//      this.$ajax({
//        url: '/user/patent/alter/'+this.userId,
//        method: 'get'
//      }).then((res) => {
//       this.image=res.data.imgUrl;
//       this.applyList[0].value=res.data.patentName;
//       this.applyList[1].value=res.data.patentOwner;
//       this.applyList[2].value=res.data.patentNum;
//       this.applyList[3].value=res.data.patentApplyNum;
//       this.applyList[4].value=res.data.patentAuthTime;
//       this.applyList[5].value=res.data.patentCertiNum;
//       this.applyList[6].value=res.data.patentState;
//
//      }).catch((data) => {
//        alert(data)
//      })
    },
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
      changeImage(e) {
        var files = e.target.files || e.dataTransfer.files;
        if (!files.length)  return;
        let type=files[0].type;//文件的类型，判断是否是图片
        if(this.imgData.accept.indexOf(type) == -1){
          alert('请选择我们支持的图片格式！');
          return false;
        };
        var file = files[0];
        var reader = new FileReader();
        var that = this;
        reader.onload = (e) => {
          that.avatar = e.target.result;
//           console.log(that.avatar)  //base64编码
        };
        reader.readAsDataURL(file);   //图片显示
        if (this.$refs.avatarInput.files.length !== 0) {
          var image = new FormData()
          image.append('avatar', this.$refs.avatarInput.files[0]);
          console.log(image);
//          console.log(this.$refs.avatarInput.files[0].name); //图片名字
          this.$ajax.post('/patent/certification/upload/'+this.userName, image, {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          })
        }
      },
      //判断是否输入
      judgefocus(index){
        if(event.target.value===''){
          this.applyList[index].uncomplete = true;
        }else{
          this.applyList[index].uncomplete = false;
        }
      },
      // 专利信息保存
      handleSave(){

        this.$ajax({
          url:'/user/patent/alter/'+this.userName,
          method:'post',
          data:{
            "patentName":this.applyList[0].value,
            "patentOwner":this.applyList[1].value,
            "patentNum":this.applyList[2].value,
            "patentApplyNum":this.applyList[3].value,
            "patentAuthTime":this.applyList[4].value,
            "patentCertiNum":this.applyList[5].value,
            "patentState":this.applyList[6].value
          }
        })
          .then((res)=>{
            if(res.status>=200&&res.status<300){
              console.log('success');
            }
          })
          .catch((err) =>{

          })
      },
      // 专利信息提交
      handlePub(){

        let len = this.applyList.length;
        var _this=this;
        var completeNum=len;
        for(let i=0;i<len;i++){
          if(this.applyList[i].value===''){
            this.applyList[i].uncomplete = true;
            completeNum--;
          }
        };
        if(completeNum===len){
          this.$ajax({
            url:'/user/patent/alter/'+this.userName,
            method:'post',
            data:{
              "patentName":this.applyList[0].value,
              "patentOwner":this.applyList[1].value,
              "patentNum":this.applyList[2].value,
              "patentApplyNum":this.applyList[3].value,
              "patentAuthTime":this.applyList[4].value,
              "patentCertiNum":this.applyList[5].value,
              "patentState":this.applyList[6].value,
            }
          })
            .then((res)=>{

            })
            .catch((err) =>{

            })
        }
        else{
          alert('请填完整！')
        }
      }
    }
  }
</script>
<style scoped>
  *{
    padding:0;
    margin:0;
    /*font-size:30px;*/
    font-family:MicrosoftYaHeiLight;
  }
  h1{
    font-size:26px;
    color: #3333CC;
  }
  .title{
    margin:20px 0 0 92px;
  }
  h2{
    font-size:22px;
    font-family:MicrosoftYaHeiLight;
  }
  label{
    display: block;
  }
  .divide{
    background-color: #33c;
    width:1200px;
    height:2px;
    margin-left:69px;
  }
  .img-box{
    width:460px;
    height:260px;
    border:1px solid #777;
    position: relative;
    margin:23px 0 0 230px;
  }
  .image{
    width:460px;
    height:260px;
    display: block;
    background-size: 100% auto;
  }
  .upload_pic{
    position: absolute;
    bottom:0;
    width:100%;
    height:36px;
    color: #fff;
    background-color: #ccc;
    text-align: center;
    line-height:36px;
  }
  input{
    width:300px;
  }
  .patent_msg{
    margin:0 230px;
    position: relative;
  }
  .patent_msg label{
    margin-top:20px;
  }
  .patent_msg input{
    position: absolute;
    left:173px;
  }
  .patent_msg .uncomplete{
    position: absolute;
    left:480px;
    color: red;
    font-size:12px;
  }
  button{
    display: inline-block;
    background-color: #33c;
    border:1px solid #33c;
    width:80px;
    height:30px;
    color: #fff;
    cursor: pointer;
    outline:none;
    margin-top:50px;
  }
  button.Pub{
    margin-left:400px;
  }
  button:last-child{
    margin-left:34px;
  }
</style>
