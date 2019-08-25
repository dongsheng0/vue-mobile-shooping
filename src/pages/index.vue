<template>
    <div>
        <page/>
    </div>
</template>

<script>

import page from './page/page.vue'
// import Axios from 'axios';

export default {
    components:{
        page,
    },
    mounted() {
      // Axios.post('/api/live/course/course/list/v3',{"date":"20190814","access_token":"uh1wLjpEo71HIW8tErGgOamfG69BmK6Zh9wJrG0z","app_version":"v0.0.1","sourcePort":"win","dataFrom":"win_teachpc","product_line":"teacher","device":"win_teachpc"}).then()
    }
}
</script>
<style>

</style>


