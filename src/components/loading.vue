<template>
  <div v-if="!stopLoading">
    <div id="loading" ref="loading" class="loading">
      <div
        v-for="(item, index) in this.array"
        v-bind:key="index"
        class="box"
        v-bind:style="loadingStyle"
      ></div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { TweenMax, TimelineMax, Bounce, TweenLite } from "gsap/all";
import Vue from "vue";
import store from "../store";
import { mapGetters } from "vuex";
import { setTimeout } from "timers";

export default {
  name: "loading",
  props: {},
  data() {
    return {
      array: 0,
      loadingStyle: {
        width: "0px",
        height: " 0px"
      },
      grid: [0, 0],
      squareDia: 0,
      stopLoading: false
    };
  },
  computed: {
    ...mapGetters(["getLoading"])
  },
  watch: {
    getLoading(currentValue) {
      if (currentValue === "stop") {
        TweenLite.to(".loading", 1, { opacity: 0, display: "none" });
        setTimeout(() => {
          this.stopLoading = true;
          store.dispatch({
            type: "loading",
            payload: false
          });
        }, 1000);
      } else if (currentValue === true) {
        this.stopLoading = false;
        Vue.nextTick(() => {
          TweenLite.to(".loading", 1.5, { opacity: 1, display: "flex" });
          this.performLoading();
        });
      }
    }
  },
  mounted() {
    TweenLite.to(".loading", 0.1, { opacity: 1, display: "flex" });
    this.performLoading();
  },
  created() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    handleResize() {
      const clientWidth = window.innerWidth;
      const squareDia = clientWidth / 20;
      const clientHeight = window.innerHeight;
      const vertical = Math.ceil(clientHeight / squareDia);
      const horizontal = Math.ceil(clientWidth / squareDia);
      this.grid = [horizontal, vertical];
      this.squareDia = squareDia;
    },
    performLoading() {
      this.array = Array.from({ length: this.grid[0] * this.grid[1] }).map(
        (value, index) => index
      );
      this.loadingStyle.width = `${this.squareDia}px`;
      this.loadingStyle.height = `${this.squareDia}px`;
      Vue.nextTick(() => {
        const lt = new TimelineMax({});
        lt.staggerTo(".box", 1, {
          scale: 0,
          y: 10,
          yoyo: true,
          ease: Bounce,
          repeat: -1,
          repeatDelay: 0.5,
          stagger: {
            grid: this.grid,
            from: "center",
            amount: 1
          },
          onComplete: () => {
            console.log("complete");
          }
        });
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#loading {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
  overflow: hidden;
  display: none;
  flex-wrap: wrap;
  width: 100vw;
  height: 100vh;
  opacity: 0;
}
.box {
  background: white;
}
</style>
