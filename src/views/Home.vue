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
        </div>
      </section>
      <section class="fullHeight" v-for="(guest, index) in guests" v-bind:key="index">
        <div class="section2" :id="`section${index+1}`">
          <div class="guestName-animate">
            <h1
              v-if="guest.name"
              v-guest-name-animation:[index]
              :class="`guestName${[index+1]}`"
              class="guestName h1-stroke zindex1"
            >{{guest.name}}</h1>
            <h1
              v-if="guest.name"
              :class="`guestName${[index+1]}`"
              class="guestName zIndexmin1"
            >{{guest.name}}</h1>
          </div>
          <h1
            :id="`guest-no${index+1}`"
            class="guestNo h1-stroke colorChange"
          >{{guestCount(index +1)}}</h1>
          <div class="section2-media-div">
            <div
              :id="`guest-img${index+1}`"
              v-if="guest.image"
              class="media"
              :style="{ backgroundImage: `url('${require(`../assets/${guest.image}`)}')`}"
            ></div>
          </div>
          <div class="guest-profession">
            <div
              :id="`guest-profession${index+1}`"
              v-if="guest.profession"
              class="guest-profession-text textDefaultFormat"
            >{{guest.profession}}</div>
          </div>
        </div>
      </section>
      <section class="fullHeight"></section>
    </div>
  </div>
</template>
<script>
import { TimelineLite, TimelineMax, TweenLite, Expo } from "gsap/all";
import { imageToolTipOnHover, guestNameAnimation } from "../App.directive";
import _ from "lodash";
export default {
  name: "Home",
  props: {},
  directives: {
    "img-tooltip": imageToolTipOnHover,
    "guest-name-animation": guestNameAnimation
  },
  data() {
    return {
      y: undefined,
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
        file: "mark.gif",
        left: "0",
        top: "0",
        x: undefined,
        y: undefined
      },
      guests: [
        {
          name: "Ramar",
          image: "ramar.jpeg",
          color: "red",
          profession: "comedian"
        },
        {
          name: "Andrews",
          image: "guest2.jpg",
          color: "blue",
          profession: "anchor"
        }
      ]
    };
  },
  watch: {
    y: async function(to) {
      if (to >= 0) {
        let scrollPercentage = (to / document.body.clientHeight) * 4;
        this.scrollBarAnimation.progress(scrollPercentage / 3);
        if (scrollPercentage <= 1) {
          const section1ScrollBar = scrollPercentage / 0.25;
          if (this.section1ScrollBar && section1ScrollBar <= 1) {
            this.section1ScrollBar.progress(section1ScrollBar);
          }
          this.section1.progress(scrollPercentage);
        }
        if (scrollPercentage > 0 && scrollPercentage <= 2) {
          const section2 = scrollPercentage / 2;
          this.section2.progress(section2);
        }
        if (scrollPercentage > 1 && scrollPercentage <= 3) {
          const section3 = (scrollPercentage - 1) / 2;
          this.section3.progress(section3);
        }
      }
    }
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
        const section1FaceIn = new TimelineLite({});
        section1FaceIn.from("#Home", 2, { autoAlpha: 0, rotation: 0.01 });
        TweenLite.to(".section1-scrollSkew", 0.1, {
          skewY: "0deg",
          rotation: 0.01
        });
        this.section1 = new TimelineLite({ paused: true });
        this.section1.to(".section1-scrollSkew", 0.1, {
          skewY: "12deg",
          autoAlpha: 0,
          rotation: 0.01
        });
        TweenLite.to(".section2", 0.001, {
          skewType: "simple",
          skewY: "0.0001deg",
          rotation: 0.01
        }).reverse();
        this.section1ScrollBar = new TimelineLite({ paused: true });
        this.section1ScrollBar.to(".scrollDown", 0.1, {
          y: -50,
          autoAlpha: 0,
          rotation: 0.01
        });
        const screenWidth = window.innerWidth;
        if (screenWidth && screenWidth < 575.98) {
          this.guests.forEach((guest, guestIndex) => {
            const guestNo = guestIndex + 1;
            this[`section${guestNo + 1}`] = new TimelineLite({ paused: true });
            this[`section${guestNo + 1}`]
              .to(`#guest-profession${guestNo}`, 0.1, {
                y: -200
              })
              .to(
                `#guest-no${guestNo}`,
                0.1,
                {
                  x: -100
                },
                0
              );
          });
        } else {
          this.guests.forEach((guest, guestIndex) => {
            const guestNo = guestIndex + 1;
            this[`section${guestNo + 1}`] = new TimelineLite({ paused: true });
            this[`section${guestNo + 1}`]
              .to(`#guest-profession${guestNo}`, 0.1, {
                y: 200,
                rotation: 90.01
              })
              .to(
                `#guest-img${guestNo}`,
                0.1,
                {
                  scale: 1.2,
                  rotation: 0.01
                },
                0
              )
              .to(
                `#guest-no${guestNo}`,
                0.1,
                {
                  y: -100,
                  rotation: 90.01
                },
                0
              )
              .to(
                `.guestName${guestNo}`,
                0.1,
                {
                  x: -200,
                  rotation: 0.01
                },
                0
              );
          });
        }
        this.scrollBarAnimation = new TimelineLite({ paused: true });
        this.scrollBarAnimation.to(".scrollbar-track", 0.1, { y: "17vh" });
        this.customScroll();
        function sample(list) {
          return function() {
            return list[Math.floor(Math.random() * list.length)];
          };
        }
        function random(min, max) {
          if (max == null) {
            max = min;
            min = 0;
          }
          return function() {
            return Math.random() * (max - min) + min;
          };
        }
        var colors = ["#1af890", "#DF0A0A", "#5219AA", "#7E0DC9", "#CF368D"];
        var tl = new TimelineMax({ repeat: -1 });
        for (let i = 0; i < 25; i++) {
          tl.to(".colorChange", 1, {
            webkitTextStrokeColor: sample(colors),
            repeatDelay: 1,
            alpha: random(0.6, 1),
            ease: Expo.easeOut
          });
        }
      });
    },
    customScroll() {
      this.html = document.documentElement;
      this.body = document.body;

      this.scroller = {
        target: document.querySelector("#Home"),
        ease: 0.1, // <= scroll speed
        endY: 0,
        resizeRequest: 1,
        scrollRequest: 0
      };
      this.y = 0;
      this.requestId = null;

      TweenLite.set(this.scroller.target, {
        rotation: 0.01,
        force3D: true
      });
      this.updateScroller();
      const throttleScroll = _.throttle(this.onScroll, 100, {
        trailing: false
      });
      document.addEventListener("scroll", throttleScroll, true);
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
      this.y += (scrollY - this.y) * this.scroller.ease;

      if (Math.abs(scrollY - this.y) < 0.05 || resized) {
        this.y = scrollY;
        this.scroller.scrollRequest = 0;
      }
      const screenWidth = window.innerWidth;
      if (screenWidth && screenWidth < 575.98) {
        TweenLite.set(this.scroller.target, {
          y: -this.y
        });
      }
      this.requestId =
        this.scroller.scrollRequest > 0
          ? requestAnimationFrame(this.updateScroller)
          : null;
    },
    guestCount(index) {
      return index < 10 ? `0${index}` : index;
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
  @media (max-width: 575.98px) {
    position: fixed;
  }
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
      .section2 {
        height: 100vh;
        padding: 10vh 10vw 70px 0;
        display: flex;
        .guestName {
          position: absolute;
          @media (max-width: 575.98px) {
            transform-origin: 49px 18px;
            transform: rotate(90deg);
          }
          @media (min-width: 576px) {
            top: 30px;
            left: 36vw;
          }
        }
        .zIndexmin1 {
          z-index: -1;
        }
        .guestNo {
          position: absolute;
          font-family: Ilisarniq, sans-serif;
          -webkit-text-stroke: 1px #fff;
          color: transparent;
          @media (max-width: 575.98px) {
            font-size: 29vw;
            z-index: -1;
            top: 0;
            right: 0;
          }
          @media (min-width: 576px) {
            font-size: 21vw;
            top: 30vh;
            right: -14vw;
            transform: rotate(90deg);
          }
        }
        .guest-profession {
          display: flex;
          @media (max-width: 575.98px) {
            align-items: flex-end;
          }
          @media (min-width: 576px) {
            align-items: center;
          }
          .guest-profession-text {
            transform: rotate(90deg);
            text-transform: uppercase;
            margin-bottom: 10em;
          }
        }
        .section2-media-div {
          height: 95%;
          overflow: hidden;
          @media (max-width: 575.98px) {
            width: 77vw;
          }
          @media (min-width: 576px) {
            width: 68vw;
          }
          .media {
            width: 100%;
            height: 100%;
            background-position: 50% 0%;
            background-size: cover;
            background-repeat: no-repeat;
            background-attachment: scroll;
          }
        }
      }
    }
  }
}
</style>