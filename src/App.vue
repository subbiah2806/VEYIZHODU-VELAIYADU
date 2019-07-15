<template>
  <div id="app">
    <loading />
    <div v-if="isloading === false">
      <div class="scrollBar">
        <div class="scrollbar-track"></div>
      </div>
      <div v-if="isnotmobile()" class="mousepointer" id="mousePointer"></div>
      <transition :name="transitionName">
        <router-view></router-view>
      </transition>
      <div class="Home-right" @mouseover="menuAnimate(true)" @mouseleave="menuAnimate(false)"></div>
      <div class="follower">
        <div class="dash dash-top"></div>
        <div class="dash dash-bottom"></div>
      </div>
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
import {
  TweenLite,
  TweenMax,
  Back,
  Sine,
  TimelineMax,
  Power2,
  TextPlugin,
  CSSPlugin
} from "gsap/all";
Vue.use(VueMaterial);
export default {
  name: "app",
  components: {
    loading
  },
  data() {
    return {
      transitionName: undefined,
      isloading: true,
      moveTrg: undefined
    };
  },
  computed: {
    ...mapGetters(["getLoading"]),
    ...mapActions(["loading"])
  },
  mounted() {
    // eslint-disable-next-line
    const plugins = [TextPlugin, CSSPlugin];
    setTimeout(() => {
      store.dispatch({
        type: "loading",
        payload: "stop"
      });
    }, 5000);
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
      if (this.moveMenu) {
        TweenMax.to(".follower", 0.5, {
          x: e.clientX,
          y: e.clientY,
          ease: Sine.easeOut
        });
        if (!this.increasedmousePointer) {
          this.increasedmousePointer = true;
          TweenMax.to("#mousePointer", 0.5, {
            scale: 1.5,
            background: "white"
          });
        }
      } else {
        this.increasedmousePointer = false;
        const menu = new TimelineMax({ paused: true });
        menu
          .to(".follower", 1, {
            x: this.center.x,
            y: this.center.y,
            ease: Back.easeOut
          })
          .to(
            "#mousePointer",
            0.5,
            {
              scale: 1
            },
            0
          );
        menu.play();
      }
    },
    isnotmobile() {
      return window.innerWidth > 575.98;
    },
    menuAnimate(animate) {
      if (this.isnotmobile()) {
        if (animate) {
          this.menu.play();
          this.moveMenu = true;
        } else {
          this.menu.reverse();
          this.moveMenu = false;
        }
      }
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
    },
    isloading(value) {
      if (value === false) {
        this.$nextTick(() => {
          const menuContainer = document.querySelector(".Home-right");
          const menuContainerRect = menuContainer.getBoundingClientRect();
          this.center = {
            x: menuContainerRect.right - menuContainerRect.width / 2,
            y: menuContainerRect.top + menuContainerRect.height / 2
          };
          TweenMax.to(".follower", 0.1, {
            x: this.center.x,
            y: this.center.y,
            ease: Back.easeOut
          });
          this.menu = new TimelineMax({ paused: true });
          this.menu.to(".dash-top", 0.1, {
            rotation: 90,
            y: 5
          });
          this.menu
            .to(
              ".dash-bottom",
              0.1,
              {
                y: -5
              },
              0
            )
            .to(".dash", 0.1, {
              rotation: "+=360"
            });
          if (this.isnotmobile()) {
            window.addEventListener("mousemove", this.moveCircle, true);
          }
        });
      }
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
  .Home-right {
    position: fixed;
    z-index: 1001;
    border-radius: 80%;
    mix-blend-mode: exclusion;
    @media (max-width: 575.98px) {
      width: 55px;
      height: 55px;
      margin: -27.5px 0 0 -27.5px;
      top: 50vh;
      right: 0;
    }
    @media (min-width: 576px) {
      width: 100px;
      height: 100px;
      margin: -50px 0 0 -50px;
      top: 60px;
      right: 30px;
    }
  }
  .follower {
    position: fixed;
    mix-blend-mode: exclusion;
    top: 0;
    left: 0;
    border-radius: 80%;
    background: hsl(0, 0%, 98%);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    @media (max-width: 575.98px) {
      width: 40px;
      height: 40px;
      margin: -20px 0 0 -20px;
    }
    @media (min-width: 576px) {
      width: 55px;
      height: 55px;
      margin: -27.5px 0 0 -27.5px;
    }
    .dash {
      height: 2px;
      margin-top: 5px;
      margin-bottom: 5px;
      background-color: #111;
      @media (max-width: 575.98px) {
        width: 15px;
      }
      @media (min-width: 576px) {
        width: 20px;
      }
    }
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
    background: white;
  }
  .scrollBar {
    position: fixed;
    z-index: 998;
    height: 19.9vh;
    width: 1px;
    top: auto;
    left: auto;
    mix-blend-mode: exclusion;
    background-color: $primary;
    @media (max-width: 575.98px) {
      right: 10px;
      bottom: 50px;
    }
    @media (min-width: 576px) {
      right: 50px;
      bottom: 50px;
    }
    .scrollbar-track {
      width: 1px;
      height: 3vh;
      background-color: $backgroundColor;
    }
  }
}
</style>
