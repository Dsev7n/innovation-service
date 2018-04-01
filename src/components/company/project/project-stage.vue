<template>
  <div id="company-project-stage">
    <p class="company-project-guide"><router-link to="/project/company" class="router-link">项目></router-link><router-link to="/project/user/checkout" class="router-link">我的项目></router-link>{{$route.query.proName}}</p>
    <div class="company-project-stage-button">
      <i class="task-stage-button"><img src="../../../assets/images/阶段任务指标按钮.png"/></i>
      <i class="file-box-button"><img src="../../../assets/images/文件汇总按钮.png"/></i>
    </div>
    <i class="last-page" v-on:click="pageReduce"><img src="../../../assets/images/向左.png"/></i>
    <i class="next-page" v-on:click="pagePlus"><img src="../../../assets/images/向右.png"/></i>
    <ul class="company-project-items">
      <li class="company-project-item" v-for="(item,index) in items" :key="index" v-if="(index<page*3)&&(index>=page*3-3)">
        <!--板块1：已完成-->
        <div v-if="item.stageId===0" class="company-project-item-container company-project-item-1">
          <p class="company-project-item-state-num">阶段一</p>
          <i class="company-project-item-state-img"><img src="../../../assets/images/已完成-2.png"/></i>
          <ul class="company-project-item-targets">
            <li class="company-project-item-target" v-for="(target,index) in targets" :key="index" v-on:click="toggleTatgetShow">
              <p class="item-target-detail">{{target.stargetDetail}}</p>
              <i class="item-target-complete-img"><img src="../../../assets/images/完成标签.png"/></i>
            </li>
          </ul>
          <div class="company-project-item-complete">
            <p class="company-project-item-complete-time">任务完成时间</p>
            <p class="company-project-item-complete-time-detail">{{item.targetDeadline}}</p>
            <p class="company-project-item-complete-stage">阶段任务结算</p>
            <p class="company-project-item-complete-stage-detail">{{item.stargetDetail}}</p>
          </div>
           <i class="company-project-item-state-progress-img"><img src="../../../assets/images/已结算.png"/></i>
        </div>
         <!--板块2：进行中-->
        <div v-else-if="item.stageId===1" class="company-project-item-container company-project-item-2">
          <p class="company-project-item-state-num">阶段二</p>
          <i class="company-project-item-state-img"><img src="../../../assets/images/进行中-2.png"/></i>
          <ul class="company-project-item-targets">
            <li class="company-project-item-target" v-for="(target,index) in targets" :key="index">
              <p class="item-target-detail">{{target.stargetDetail}}</p>
              <i class="item-target-complete-img"><img src="../../../assets/images/完成标签.png"/></i>
            </li>
          </ul>
          <div class="company-project-item-complete">
            <p class="company-project-item-complete-time">任务完成时间</p>
            <p class="company-project-item-complete-time-detail">{{item.targetDeadline}}</p>
            <p class="company-project-item-complete-stage">阶段任务结算</p>
            <p class="company-project-item-complete-stage-detail">{{item.stargetDetail}}</p>
          </div>
           <i class="company-project-item-state-progress-img progress-speed">
            <img src="../../../assets/images/进度.png"/>
            <div class="company-project-item-state-progress-speed">
              <p class="company-project-item-state-progress-speed-number">70%</p>
            </div>
          </i>
        </div>
        <!--板块3；待开始-->
        <div v-else-if="item.stageId===2" class="company-project-item-container company-project-item-3">
          <p class="company-project-item-state-num">阶段三</p>
          <i class="company-project-item-edit-img" v-on:click="toggleEditShow"><img src="../../../assets/images/编辑.png"/></i>
          <i class="company-project-item-state-img"><img src="../../../assets/images/待开始.png"/></i>
          <ul class="company-project-item-targets">
            <li class="company-project-item-target" v-for="(target,index) in targets" :key="index">
              <i v-show="isEditShow" class="company-project-item-delete-img" v-on:click="deleteTarget(index)"><img src="../../../assets/images/删除.png"/></i>
              <i v-show="isEditShow" class="company-project-item-modify-img" v-on:click="toggleEdit"><img src="../../../assets/images/修改.png"/></i>
              <p v-if="!isEdit" class="item-target-detail">{{target.stargetDetail}}</p>
              <input v-else class="item-target-detail-input" v-model="target.stargetDetail"/>
            </li>
          </ul>
          <i class="company-project-item-state-add-img" v-on:click="addTarget" v-show="isEditShow"><img src="../../../assets/images/添加指标.png"/></i>
          <div class="company-project-item-complete">
            <p class="company-project-item-complete-time">任务完成时间</p>
            <p v-if="!isEditShow" class="company-project-item-complete-time-detail">{{item.targetDeadline}}</p>
            <input v-else class="item-target-time-detail-input" v-model="item.targetDeadline"/>
            <p class="company-project-item-complete-stage">阶段任务结算</p>
            <p v-if="!isEditShow" class="company-project-item-complete-stage-detail">{{item.stargetDetail}}</p>
            <input v-else class="item-target-stage-detail-input" v-model="item.stargetDetail"/>
          </div>
           <i class="company-project-item-state-progress-img"><img src="../../../assets/images/待结算.png"/></i>
        </div>
      </li>
      <li class="company-project-item">
        <i class="company-project-item-add-img"><img src="../../../assets/images/添加新阶段.png"/></i>
      </li>
    </ul>
    <p class="count-page">{{page}}/{{pageCount}}</p>
    <!--弹出窗口-->
    <div class="popup-window-background" v-show="isPopupWindowShow">
      <div class="popup-window-container">
          <!--以下数据需动态插入，未做-->
          <p class="target-first-class-title title-1">好好学习指标</p>
          <p class="target-second-class-title title-2">截止时间 2015.9.10</p>
          <i class="splitter-img-1"><img src="../../../assets/images/分割线副本.png"/></i>
          <p class="target-second-class-title title-3">指标详情</p>
          <ol class="target-list">
            <li class="target-list-item">AAAAAAAAAAAAAAAAA</li>
            <li class="target-list-item">BBBBBBBBBBBBBBBBB</li>
            <li class="target-list-item">CCCCCCCCCCCCCCCCC</li>
          </ol>
          <i class="splitter-img-2"><img src="../../../assets/images/分割线副本.png"/></i>
          <p class="target-second-class-title title-4">文件上传</p>
          <ul class="file-list">
            <!--li未加入数据-->
            <li class="file-list-item">
              <p class="file-list-item-content"><span>abc.rar</span><span>987.6M</span><span>狗大佬</span><span>2015.09.10</span></p>
              <i class="download-img"><img src="../../../assets/images/下载按钮.png"/></i>
            </li>
            <li class="file-list-item">
              <p class="file-list-item-content"><span>abc.rar</span><span>987.6M</span><span>狗大佬</span><span>2015.09.10</span></p>
              <i class="download-img"><img src="../../../assets/images/下载按钮.png"/></i>
            </li>
          </ul>
          <i class="confirm-img" v-on:click="toggleTatgetShow"><img src="../../../assets/images/确认完成.png"/></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      page: 1,
      isPopupWindowShow: false,
      isEditShow: false,
      isEdit: false,
      items: [
        {
          "stageId":0,
          "stageStartTime":'',
          "stageEndTime":'',
          "stageSettlement":0,
          "stageSpeed":0,
          "targetDeadline":'2015.9.1',
          "stargetDetail":'张三：好好学习，李四：天天向上，王五：ABCDEFG'
        },
        {
          "stageId":1,
          "stageStartTime":'',
          "stageEndTime":'',
          "stageSettlement":0,
          "stageSpeed":0,
          "targetDeadline":'2015.9.1',
          "stargetDetail":'张三：好好学习，李四：天天向上，王五：ABCDEFG'
        },
        {
          "stageId":2,
          "stageStartTime":'',
          "stageEndTime":'',
          "stageSettlement":0,
          "stageSpeed":0,
          "targetDeadline":'2015.9.1',
          "stargetDetail":'张三：好好学习，李四：天天向上，王五：ABCDEFG'
        },
        {
          "stageId":1,
          "stageStartTime":'',
          "stageEndTime":'',
          "stageSettlement":0,
          "stageSpeed":0,
          "targetDeadline":'2015.9.1',
          "stargetDetail":'张三：好好学习，李四：天天向上，王五：ABCDEFG'
        },
        {
          "stageId":2,
          "stageStartTime":'',
          "stageEndTime":'',
          "stageSettlement":0,
          "stageSpeed":0,
          "targetDeadline":'2015.9.1',
          "stargetDetail":'张三：好好学习，李四：天天向上，王五：ABCDEFG'
        }
      ],
      targets: [
        {
          "targetId":0,
          "targetDeadline":'',
          "stargetDetail":'好好学习指标',
          "stageRemarks":''
        },
        {
          "targetId":1,
          "targetDeadline":'',
          "stargetDetail":'天天向上指标',
          "stageRemarks":''
        },
        {
          "targetId":2,
          "targetDeadline":'',
          "stargetDetail":'ABCDEFG指标',
          "stageRemarks":''
        },
        {
          "targetId":2,
          "targetDeadline":'',
          "stargetDetail":'aaa',
          "stageRemarks":''
        },
        {
          "targetId":2,
          "targetDeadline":'',
          "stargetDetail":'aaa',
          "stageRemarks":''
        },
        {
          "targetId":2,
          "targetDeadline":'',
          "stargetDetail":'aaa',
          "stageRemarks":''
        }
        
      ]
    }
  },
  computed:{
    pageCount: function() {
      return Math.ceil(this.items.length/3)
    }
  },
  methods: {
    pagePlus: function() {
      if(this.page!==this.pageCount) {
        this.page++
      }
    },
    pageReduce: function() {
      if(this.page!==1) {
        this.page--
      }
    },
    toggleTatgetShow: function() {
      this.isPopupWindowShow = !this.isPopupWindowShow
    },
    toggleEditShow: function() {
      this.isEditShow = !this.isEditShow
      this.isEdit = false;
    },
    toggleEdit: function() {
      this.isEdit = !this.isEdit
    },
    deleteTarget: function(index) {
      this.targets.splice(index,1)
    },
    addTarget: function() {
      let newTarget = {
          "targetId":0,
          "targetDeadline":'',
          "stargetDetail":'请填写指标',
          "stageRemarks":''
        }
      this.targets.push(newTarget)
    }
  }
}
</script>

<style scoped>
#company-project-stage {
  display: grid;
  position: relative;
  grid-template-rows: 40px 49px 90px 1fr 30px 50px;
  grid-template-columns: 23px 56px 1fr 56px 23px;
  background: #eee;
  min-height: 100vh;
}
.company-project-guide {
  font-size: 18px;
  color: #777;
  grid-area: 2/2/3/6;
  margin-left:50px;
}
.company-project-guide .router-link{
  text-decoration: none;
  color: #777;
}
.last-page {
  grid-area: 4/2/5/3;
  align-self: center;
  justify-self: start;
  cursor: pointer;
}
.next-page {
  grid-area: 4/4/5/5;
  align-self: center;
  justify-self: end;
  cursor: pointer;
}
.count-page {
  grid-area: 6/3/7/4;
  justify-self: center;
  color: #777;
}
.company-project-stage-button {
  display: grid;
  grid-area: 3/3/4/4;
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
/*中间的项目阶段*/
.company-project-items {
  display: grid;
  grid-area: 4/3/5/4;
  list-style: none;
  grid-template-columns: 3fr 35px 3fr 35px 3fr 35px 2fr;
  align-self: stretch;
}
.company-project-item {
  background: #fff;
  display: grid;
  align-self: stretch;
  justify-self: stretch;
  grid-template-rows: 32px 1fr 32px;
  grid-template-columns: 30px 1fr 30px;
}
.company-project-item:nth-child(4n+1) {
  grid-column: 1/2;
}
.company-project-item:nth-child(4n+2) {
  grid-column: 3/4;
}
.company-project-item:nth-child(4n+3) {
  grid-column: 5/6;
}
.company-project-item:nth-child(4n) {
  grid-column: 7/8;
}
.company-project-item-container {
  display:grid;
  position: relative;
  grid-area: 2/2/3/3;
  grid-template-rows: 58px 1fr 30px 120px 30px 60px;
  justify-items: center;
}
/*各阶段的细节*/
.company-project-item-state-num {
  position: absolute;
  font-size: 30px;
  color: #444;
  left: 0;
  top: 0;
}
.company-project-item-state-img {
  align-self: start;
  margin-top: 6px;
  grid-row: 1/2;
}
/*指标列表*/
.company-project-item-targets {
  list-style: none;
  justify-self: stretch;
  grid-row: 2/3;
}
.company-project-item-target {
  position: relative;
  background: #eee;
  color: #777;
  display: grid;
  align-items: center;
  justify-items: center;
  height: 60px;
  margin-bottom: 30px;
}
.item-target-complete-img {
  position: absolute;
  right: 0;
  top: 0;
}
/*“任务完成时间”，“阶段任务结算”*/
.company-project-item-complete {
  display: grid;
  grid-row: 4/5;
  grid-template-rows: 2fr 2fr 2fr 2fr 1fr;
  grid-template-columns: 10px 1fr 10px;
  font-size: 14px;
  color:#777;
  align-items: end;
  justify-self: stretch;
  background: #eee;
}
.company-project-item-complete-time {
  grid-area: 1/2/2/3;
  font-weight: bold;
}
.company-project-item-complete-time-detail {
  grid-area: 2/2/3/3;
}
.company-project-item-complete-stage {
  grid-area: 3/2/4/3;
  font-weight: bold;
}
.company-project-item-complete-stage-detail {
  grid-area: 4/2/5/3;
}
.company-project-item-state-progress-img {
  width: 390px;
  grid-row: 6/7;
}
.company-project-item-state-progress-img.progress-speed {
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 64px 1fr;
}
.company-project-item-state-progress-speed {
  position: relative;
  background: #3f88fc;
  width: 70%;
}
.company-project-item-state-progress-speed-number {
  position: absolute;
  right:4px;
  color:#fff;
  line-height: 60px;
  font-style: normal;
}

/*已完成板块细微调整(第一种板块)*/
.company-project-item-1 .company-project-item-target {
  cursor: pointer;
}

/*待完成板块细微调整(第3种板块)*/
.company-project-item-container.company-project-item-3 {
  grid-template-rows: 58px 1fr 63px 30px 120px 30px 60px;
}
.company-project-item-3 .company-project-item-state-add-img {
  grid-row: 3/4;
  cursor: pointer;
}
.company-project-item-3 .company-project-item-edit-img {
  position: absolute;
  cursor: pointer;
  right: 0;
  top: 6px;

}
.company-project-item-3 .company-project-item-complete {
  grid-row: 5/6;
}
.company-project-item-3 .company-project-item-state-progress-img {
  grid-row: 7/8;
}
.company-project-item-3 .company-project-item-delete-img {
  position: absolute;
  left: 8px;
  cursor: pointer;
}
.company-project-item-3 .company-project-item-modify-img {
  position: absolute;
  right: 8px;
  cursor: pointer;
}
.company-project-item-3 .item-target-detail-input {
  border: none;
  font-size: 14px;
  color: #777;
}
.company-project-item-3 .item-target-time-detail-input {
  border: none;
  font-size: 14px;
  color: #777;
  grid-area: 2/2/3/3;
}
.company-project-item-3 .item-target-stage-detail-input {
  border: none;
  font-size: 14px;
  color: #777;
  grid-area: 4/2/5/3;
}

/*添加新阶段板块(第4个板块)*/
.company-project-item-add-img {
  grid-area: 2/2/3/3;
  align-self: center;
  justify-self: center;
  cursor: pointer;
}




/*弹出窗口*/
.popup-window-background {
  display: grid;
  background-color: rgba(0,0,0,0.4);
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  grid-template-rows: 60px 1fr 1fr;
  grid-template-columns: 1fr 450px 1fr;
}
.popup-window-container {
  grid-area: 2/2/3/3;
  background: #fff;
  display: grid;
  grid-template-rows: 30px 60px 45px 45px 40px 1fr 30px 50px 1fr 30px 130px;
  grid-template-columns: 30px 1fr 30px;
  align-items: start;
}
.target-first-class-title {
  font-size: 30px;
  color: #444;
}
.target-second-class-title {
  font-size: 14px;
  color: #777;
  font-weight: bold;
}
.title-1 {
  grid-area: 2/2/3/3;
}
.title-2 {
  grid-area: 3/2/4/3;
}
.splitter-img-1 {
  grid-area: 4/2/5/3;
}
.title-3 {
  grid-area: 5/2/6/3;
}
.target-list {
  grid-area: 6/2/7/3;
  overflow: hidden;
  text-overflow: ellipse;
  padding-left: 40px;
}
.target-list .target-list-item {
  color:#999;
  font-size: 14px;
  margin-bottom: 24px;
}
.splitter-img-2 {
  grid-area: 7/2/8/3;
}
.title-4 {
  grid-area: 8/2/9/3;
}
.file-list {
  grid-area: 9/2/10/3;
  color: #999;
  background: #eee;
  font-size: 14px;
  list-style: none;
  min-height: 180px;
}
.file-list .file-list-item {
  display: grid;
  grid-template-columns:1fr 60px;
  padding: 5px 10px;
}
.file-list .file-list-item-content {
  display: grid;
  overflow: hidden;
  line-height: 35px;
  grid-template-columns: 1fr 10px 1fr 10px 1fr 10px 1fr 30px;
  color: #999;
  font-size: 14px;
}
.file-list .file-list-item-content span:nth-child(1) {
  grid-column:1/2;
}
.file-list .file-list-item-content span:nth-child(2) {
  grid-column:3/4;
}
.file-list .file-list-item-content span:nth-child(3) {
  grid-column:5/6;
}
.file-list .file-list-item-content span:nth-child(4) {
  grid-column:7/8;
}
.file-list .download-img {
  cursor: pointer;
}
.confirm-img {
  grid-area: 11/2/12/3;
  cursor: pointer;
}
</style>


