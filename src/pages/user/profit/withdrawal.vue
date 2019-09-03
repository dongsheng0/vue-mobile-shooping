<template>
  <!-- 提现 -->
  <div>{{url}}</div>
</template>

<script>
export default {
  data () {
    return {
      url: '微信的'
    }
  },
  components: {

  },
  mounted () {
    this.url = window.location.href
  }
}
</script>

<style>
</style>
