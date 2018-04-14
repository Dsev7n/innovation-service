<template>
  <div id="app">
      <Navigation :isProjectActive="isProjectActive" :isPatentActive="isPatentActive" :isResumeActive="isResumeActive"></Navigation>
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>

      <router-view></router-view>
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
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0 ;
}
</style>
