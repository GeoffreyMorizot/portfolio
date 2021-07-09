import gsap from 'gsap'
import CSSRulePlugin from 'gsap/CSSRulePlugin'

gsap.registerPlugin(CSSRulePlugin)

/* window.gsap = gsap
window.cssRulePlugin = CSSRulePlugin */

export default (context, inject) => {
  inject('gsap', gsap)
  inject('CSSRulePlugin', CSSRulePlugin)
}
