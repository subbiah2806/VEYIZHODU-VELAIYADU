<template>
  <div id="Home" ref="Home">
    <div class="Home-left">
      <section class="fullHeight">
        <div class="section1 text-center">
          <div>
            <h1>
              தமிழோடு விளையாடு
              <div class="heading1-child">வாங்க தமிழ் பழகலாம்</div>
            </h1>
            <div class="textDefaultFormat lineHeight">
              created by
              <a>Subbiah Chandramouli</a>. Event hosted by
              <a>Karl Mark's</a>
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
import { TimelineMax, TweenLite } from "gsap/all";
export default {
  name: "Home",
  props: {},
  data() {
    return {
      scrollAnimation: undefined,
      totalScrollHeight: 0
    };
  },
  mounted() {
    this.totalScrollHeight = window.innerHeight * 3;
    this.addAnimations();
    this.customScroll();
    window.addEventListener("scroll", () => {
      this.scrollFunction();
    });
  },
  methods: {
    addAnimations() {
      this.$nextTick(() => {
        const lt = new TimelineMax({});
        lt.from("#Home", 2, { opacity: 0 });
      });
    },
    scrollFunction() {
      TweenLite.set("#Home", {
        y: -window.pageYOffset
      });
    },
    customScroll() {
      var html = document.documentElement;
      var body = document.body;

      var scroller = {
        target: document.querySelector("#Home"),
        ease: 0.05, // <= scroll speed
        endY: 0,
        y: 0,
        resizeRequest: 1,
        scrollRequest: 0
      };

      var requestId = null;

      TweenLite.set(scroller.target, {
        rotation: 0.01,
        force3D: true
      });
      updateScroller();
      window.addEventListener("resize", onResize);
      document.addEventListener("scroll", onScroll);

      function updateScroller() {
        var resized = scroller.resizeRequest > 0;

        if (resized) {
          var height = scroller.target.clientHeight;
          body.style.height = height + "px";
          scroller.resizeRequest = 0;
        }

        var scrollY =
          window.pageYOffset || html.scrollTop || body.scrollTop || 0;

        scroller.endY = scrollY;
        scroller.y += (scrollY - scroller.y) * scroller.ease;

        if (Math.abs(scrollY - scroller.y) < 0.05 || resized) {
          scroller.y = scrollY;
          scroller.scrollRequest = 0;
        }

        TweenLite.set(scroller.target, {
          y: -scroller.y
        });

        requestId =
          scroller.scrollRequest > 0
            ? requestAnimationFrame(updateScroller)
            : null;
      }

      function onScroll() {
        scroller.scrollRequest++;
        if (!requestId) {
          requestId = requestAnimationFrame(updateScroller);
        }
      }

      function onResize() {
        scroller.resizeRequest++;
        if (!requestId) {
          requestId = requestAnimationFrame(updateScroller);
        }
      }
    }
  }
};
</script>
<style lang="scss">
@import "@/main.scss";
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
        .heading1-child {
          color: $primary;
          font-size: 0.3em;
          font-weight: 300;
          text-align: right;
          mix-blend-mode: exclusion;
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