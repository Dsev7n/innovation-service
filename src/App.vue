<template>
  <div id="app">
      <Navigation :isProjectActive="isProjectActive" :isPatentActive="isPatentActive" :isResumeActive="isResumeActive"></Navigation>
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
  </div>
</template>

<script type="text-ecmascript-6">
import Navigation from './components/company/navigation'
export default {
  data () {
    return {
      isProjectActive: true,
      isPatentActive: false,
      isResumeActive: false
    }
  },
  components: {
    Navigation
  },
  watch: {
    "$route"(to,from){
      switch(to.path) {
        case "/project": this.isProjectActive= true;this.isPatentActive= false;this.isResumeActive=false;break;
        case "/patent": this.isProjectActive= false;this.isPatentActive= true;this.isResumeActive=false;break;
        case "/resume": this.isProjectActive= false;this.isPatentActive= false;this.isResumeActive=true;break;
        default:break;
      }
    }
  }
}
</script>

<style>
html {
  min-height: 100vh;
}
body {
  height: 100%;
  font-family: "Microsoft YaHei";
}
#app {
  height:100%;
}
body,ul,li,p,div,span,input{
  margin: 0;
  padding: 0;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .2s;
}
.fade-enter, .fade-leave-to {
  opacity: 0 ;
}
</style>
