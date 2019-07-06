import { TimelineLite, TweenLite, Power2 } from "gsap/all";
import Vue from 'vue'

export const imageToolTipOnHover = {
	bind(el, binding) {
		Vue.nextTick(() => {
			const elPosition = el.getBoundingClientRect();
			const img = document.createElement('img');
			img.classList.add('img-tootltip');
			img.src = require(`./assets/${binding.value.file}`);
			let style = '';
			if (binding.value.bottom) {
				style = `${style}bottom: ${binding.value.bottom};`;
			} else {
				style = `${style}top: ${binding.value.top || (`${elPosition.y + (binding.value.y || 0)}px`)};`;
			}
			if (binding.value.right) {
				style = `${style}right: ${binding.value.right};`;
			} else {
				style = `${style}left: ${binding.value.left || (`${elPosition.x + (binding.value.x || 0)}px`)};`;
			}
			img.setAttribute("style", style);
			el.parentNode.parentNode.insertBefore(img, el.parentNode);
			const direction = binding.arg || 'top';
			let tweetStyle, tweetStyleTo
			if (direction === 'top') {
				tweetStyle = {
					y: 50,
					skewType: "simple",
					skewY: "-8deg",
					skewX: "4deg",
				}
				tweetStyleTo = {
					y: 0,
					skewType: "simple",
					skewY: "-3deg",
					skewX: "3deg",
					opacity: 1,
					ease: Power2.easeOuts,
				}
			} else {
				tweetStyle = {
					y: -50,
					skewType: "simple",
					skewY: "-5deg",
					rotation: 4
				}
				tweetStyleTo = {
					y: 0,
					skewType: "simple",
					skewY: "0deg",
					opacity: 1,
					ease: Power2.easeOuts,
				}
			}
			TweenLite.set(img, tweetStyle);
			const tooltipTo = new TimelineLite({ paused: true });
			tooltipTo.to(img, .15, tweetStyleTo);
			el.addEventListener('mouseover', () => {
				tooltipTo.play();
			});
			el.addEventListener('click', () => {
				tooltipTo.play();
			});
			el.addEventListener('mouseleave', () => {
				tooltipTo.reverse()
			});
		})
	},
	unbind(el) {
		el.removeEventListener('mouseover', () => { });
		el.removeEventListener('click', () => { });
		el.removeEventListener('mouseleave', () => { });
	}
};