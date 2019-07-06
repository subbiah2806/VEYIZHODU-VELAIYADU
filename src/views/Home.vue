<template>
  <div id="Home" ref="Home">
    <div class="Home-left">
      <section class="fullHeight" ref="section1">
        <div class="section1 text-center">
          <div class="section1-scrollSkew">
            <h1>
              தமிழோடு விளையாடு
              <div class="heading1-child Zindex1">வாங்க தமிழ் பழகலாம்</div>
            </h1>
            <h1 class="h1-stroke title-stroke-abs">தமிழோடு விளையாடு</h1>
            <div class="textDefaultFormat lineHeight Zindex1">
              created by
              <a v-img-tooltip:top="subbiahTooltip">Subbiah Chandramouli</a>. Event hosted by
              <a v-img-tooltip:down="markToolTip">Karl Mark's</a>
            </div>
          </div>
          <div class="textDefaultFormat scrollDown">
            SCROLL DOWN
            <i class="material-icons scrollDownArrow">keyboard_arrow_down</i>
          </div>
          <!-- <img src="../assets/website-logo.png" class="img" /> -->
        </div>
      </section>
      <section class="fullHeight"></section>
      <section class="fullHeight"></section>
      <section class="fullHeight"></section>
    </div>
    <h1 class="Home-right">hi</h1>
  </div>
</template>
<script>
import { TimelineMax, TimelineLite, TweenLite } from "gsap/all";
import { imageToolTipOnHover } from "../App.directive";
export default {
  name: "Home",
  props: {},
  directives: {
    "img-tooltip": imageToolTipOnHover
  },
  data() {
    return {
      scrollAnimation: undefined,
      html: undefined,
      body: undefined,
      scroller: undefined,
      requestId: undefined,
      subbiahTooltip: {
        file: "subbiah.gif",
        right: "-20vw",
        top: "0vh",
        x: undefined,
        y: undefined
      },
      markToolTip: {
        file: "subbiah.gif",
        left: "0",
        top: "0",
        x: undefined,
        y: undefined
      }
    };
  },
  mounted() {
    const screenWidth = window.innerWidth;
    if (screenWidth && screenWidth < 600) {
      this.subbiahTooltip.top = undefined;
      this.subbiahTooltip.y = 100;
      this.subbiahTooltip.right = "0vw";
      this.markToolTip.top = undefined;
      this.markToolTip.y = 60;
      this.subbiahTooltip.left = "0vw";
    }
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
    this.addAnimations();
  },
  destroyed() {
    document.removeEventListener("scroll", this.onScroll);
  },
  methods: {
    addAnimations() {
      this.$nextTick(() => {
        const lt = new TimelineMax({});
        lt.from("#Home", 2, { autoAlpha: 0 });
        this.section1 = new TimelineMax({ paused: true });
        this.section1.to(".section1-scrollSkew", 0.1, {
          skewType: "simple",
          skewY: "12deg",
          autoAlpha: 0
        });
        this.section1ScrollBar = new TimelineLite({ paused: true });
        this.section1ScrollBar.to(".scrollDown", 0.1, {
          y: -50,
          autoAlpha: 0
        });
        this.customScroll();
      });
    },
    customScroll() {
      this.html = document.documentElement;
      this.body = document.body;

      this.scroller = {
        target: document.querySelector("#Home"),
        ease: 0.07, // <= scroll speed
        endY: 0,
        y: 0,
        resizeRequest: 1,
        scrollRequest: 0
      };

      this.requestId = null;

      TweenLite.set(this.scroller.target, {
        rotation: 0.01,
        force3D: true
      });
      this.updateScroller();
      document.addEventListener("scroll", this.onScroll);
    },
    onScroll() {
      this.scroller.scrollRequest++;
      if (!this.requestId) {
        this.requestId = requestAnimationFrame(this.updateScroller);
      }
    },
    updateScroller() {
      var resized = this.scroller.resizeRequest > 0;

      if (resized) {
        var height = this.scroller.target.clientHeight;
        this.body.style.height = height + "px";
        this.scroller.resizeRequest = 0;
      }

      var scrollY =
        window.pageYOffset || this.html.scrollTop || this.body.scrollTop || 0;

      this.scroller.endY = scrollY;
      this.scroller.y += (scrollY - this.scroller.y) * this.scroller.ease;

      if (Math.abs(scrollY - this.scroller.y) < 0.05 || resized) {
        this.scroller.y = scrollY;
        this.scroller.scrollRequest = 0;
      }
      let section1 =
        this.scroller.y /
        ((this.$refs.section1 && this.$refs.section1.clientHeight) ||
          window.innerHeight);
      if (this.section1 && section1 <= 1) {
        const section1ScrollBar = section1 / 0.25;
        if (this.section1ScrollBar && section1ScrollBar <= 1) {
          this.section1ScrollBar.progress(section1ScrollBar);
        }
        if (section1 === 0) {
          section1 = 0.00000001;
        }
        this.section1.progress(section1);
      }
      TweenLite.set(this.scroller.target, {
        y: -this.scroller.y
      });

      this.requestId =
        this.scroller.scrollRequest > 0
          ? requestAnimationFrame(this.updateScroller)
          : null;
    }
  }
};
</script>
<style lang="scss">
@import "@/App.scss";
@keyframes bounce {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(5px);
  }
  100% {
    transform: translateY(0);
  }
}
@keyframes inner-bounce {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(3px);
  }
  100% {
    transform: translateY(0);
  }
}
#Home {
  position: fixed;
  @media (min-width: 576px) {
    display: flex;
  }
  overflow: hidden;
  .Home-left {
    @media (max-width: 575.98px) {
      width: 100vw;
    }
    @media (min-width: 576px) {
      width: 90vw;
    }
    .fullHeight {
      height: 100vh;
      .section1 {
        height: 100vh;
        @media (max-width: 575.98px) {
          padding: 10vh 10vw 70px 10vw;
        }
        @media (min-width: 576px) {
          padding: 10vh 10vw 20px 10vw;
        }
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        .Zindex1 {
          position: relative;
          z-index: 1;
        }
        .title-stroke-abs {
          position: absolute;
          width: 100%;
          z-index: 1;
          left: 0;
          top: 0;
        }
        .heading1-child {
          color: $primary;
          font-size: 0.3em;
          font-weight: 300;
          text-align: right;
        }
        .lineHeight {
          line-height: 1.7em;
        }
        .scrollDown {
          display: flex;
          flex-direction: column;
          justify-content: center;
          color: $secondary;
          animation: 1s cubic-bezier(0.64, 0.15, 0.32, 0.9) infinite bounce;
          .scrollDownArrow {
            animation: 1s cubic-bezier(0.64, 0.15, 0.32, 0.9) infinite
              inner-bounce;
          }
        }
      }
    }
  }
  .Home-right {
    //mobile
    @media (max-width: 575.98px) {
    }
    //desktop
    @media (min-width: 576px) {
      width: 10vw;
    }
  }
}
</style>