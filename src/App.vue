<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import './assets/style/common.css';
import './assets/style/global.less';
export default {
  name: 'app',
  mounted () {
    console.log('页面出事化加获取url');
    console.log(window.location.hash);
    window.localStorage.setItem('webtoken', window.location.hash)
  }
}
</script>



