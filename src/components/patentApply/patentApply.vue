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
        <input :type="item.type" :id="item.id" :placeholder="item.msg" v-model="item.value">
        <span v-if="item.uncomplete">未填写完整</span>
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
      //读取存储 把input的value填上
//      this.$ajax({
//        url: '/user/patent/alter/{userId}',
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
          this.$ajax.post('/patent/certification/upload/{userName}', image, {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          })
        }
      },
      handleSave(){
        // 专利信息保存
        this.$ajax({
          url:'/user/patent/alter/{userName}/{stateCode}',
          method:'post',
          data:{
            "userName":'123',   // 未获取
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

          })
          .catch((err) =>{

          })
      },
      handlePub(){
        // 专利信息提交
        let len = this.applyList.length;
        var _this=this;
        for(let i=0;i<len;i++){
          if(this.applyList[i].value===''){
            this.applyList[i].uncomplete = true;
//            console.log(this.applyList[i].value);
          }
        }
        this.$ajax({
          url:'/user/patent/alter/{userName}/{stateCode}',
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
