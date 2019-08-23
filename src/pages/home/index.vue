<template>
  <div
    :style="'background-color:'+((page.BackgroundColor==undefined||page.BackgroundColor=='')?'#fff':page.BackgroundColor)"
  >
    <div :style="'height:'+topheight+'px'"></div>
    <div v-for="(item,index) in page.Sections" :key="index">
      <imageAd v-if="item.Code=='ImageAd'" :data="item.ParameterDictionary"></imageAd>
      <search v-if="item.Code=='Search'" :data="item.ParameterDictionary" v-on:settopheight="settopheight($event)"></search>
      <product v-if="item.Code=='Product'" :data="item"></product>
    </div>
  </div>
</template>
<script>
import "../../assets/style/index.css";
import search from "../../components/home/search.vue";
import imageAd from "../../components/home/imageAd.vue";
import { GetPage } from "../../api/page.js";
// import {getPreviewUrl } from "@/assets/js/api"
export default {
  name: "page",
  components: {
    search,
    [imageAd.name]: imageAd,
  },
  data: function () {
    return {
      topheight: 0,
      page: {},
    }
  },
  created: function () {
    GetPage().then(response => {
      this.page = response;
    });
  },
  methods: {
    settopheight: function (value) {
      this.topheight = value;
    }
  }
}
</script>
