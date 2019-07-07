<template>
  <div id="app">
    <loading />
    <div
      class="scrollBar"
      v-bind:style="[isloading === false ? { mixBlendMode: 'exclusion' } : {}]"
    >
      <div class="scrollbar-track"></div>
    </div>
    <transition :name="transitionName">
      <router-view v-if="isloading === false"></router-view>
    </transition>
  </div>
</template>

<script>
import loading from "./components/loading.vue";
import store from "./store";
import { mapGetters, mapActions } from "vuex";
import Vue from "vue";
import VueMaterial from "vue-material";
import "vue-material/dist/vue-material.min.css";

Vue.use(VueMaterial);
export default {
  name: "app",
  components: {
    loading
  },
  data() {
    return {
      transitionName: undefined,
      isloading: true
    };
  },
  computed: {
    ...mapGetters(["getLoading"]),
    ...mapActions(["loading"])
  },
  mounted() {
    setTimeout(() => {
      store.dispatch({
        type: "loading",
        payload: "stop"
      });
    }, 5000);
  },
  watch: {
    $route(to, from) {
      const toDepth = to.path.split("/").length;
      const fromDepth = from.path.split("/").length;
      this.transitionName = toDepth < fromDepth ? "slide-right" : "slide-left";
    },
    getLoading(currentValue) {
      this.isloading = currentValue;
    }
  }
};
</script>

<style lang="scss">
@import "@/App.scss";

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100vw;
  height: 400vh;
  .scrollBar {
    position: fixed;
    z-index: 998;
    height: 19.9vh;
    width: 1px;
    top: auto;
    left: auto;
    right: 50px;
    bottom: 50px;
    background-color: $primary;
    .scrollbar-track {
      width: 1px;
      height: 3vh;
      background-color: $backgroundColor;
    }
  }
}
</style>
