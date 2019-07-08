<template>
  <div id="app">
    <loading />
    <div v-if="isloading === false">
      <div class="scrollBar">
        <div class="scrollbar-track"></div>
      </div>
      <div v-if="isnotmobile()" class="mousepointer" id="mousePointer"></div>
      <div v-if="isnotmobile()" class="mousepointer" id="mousePointer-center"></div>
      <transition :name="transitionName">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import loading from "./components/loading.vue";
import store from "./store";
import { mapGetters, mapActions } from "vuex";
import Vue from "vue";
import VueMaterial from "vue-material";
import "vue-material/dist/vue-material.min.css";
import { TweenLite, Power2 } from "gsap/all";

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
    window.addEventListener("mousemove", this.moveCircle, true);
  },
  destroyed() {
    window.removeEventListener("mousemove", e => this.moveCircle(e));
  },
  methods: {
    moveCircle(e) {
      TweenLite.to("#mousePointer", 0.5, {
        css: {
          x: e.clientX,
          y: e.clientY
        },
        ease: Power2.easeOuts
      });
      TweenLite.to("#mousePointer-center", 0.001, {
        css: {
          x: e.clientX,
          y: e.clientY
        }
      });
    },
    isnotmobile() {
      return window.innerWidth > 575.98;
    }
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
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  @media (min-width: 576px) {
    cursor: none;
  }
  .mousepointer {
    position: fixed;
    pointer-events: none;
    z-index: 998;
    border-radius: 80%;
  }
  #mousePointer {
    top: 0;
    left: 0;
    width: 80px;
    height: 80px;
    margin: -40px 0 0 -40px;
    border: 1px solid $primary;
    mix-blend-mode: exclusion;
    backface-visibility: hidden;
  }
  #mousePointer-center {
    top: -2px;
    left: -2px;
    width: 4px;
    height: 4px;
    background: $primary;
  }
  .scrollBar {
    position: fixed;
    z-index: 998;
    height: 19.9vh;
    width: 1px;
    top: auto;
    left: auto;
    right: 50px;
    bottom: 50px;
    mix-blend-mode: exclusion;
    background-color: $primary;
    .scrollbar-track {
      width: 1px;
      height: 3vh;
      background-color: $backgroundColor;
    }
  }
}
</style>
