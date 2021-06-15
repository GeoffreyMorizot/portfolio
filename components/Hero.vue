<template>
  <div class="hero">
    <div class="hero__wrapper">
      <h1 ref="title" class="hero__title title-1">{{ home.title }}</h1>
      <span class="hero__job-wrapper">
        <h2 ref="titles" class="hero__job title-4">{{ home.job }}</h2>
      </span>
      <p  class="hero__bio paragraph-big">{{ home.bio }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    home: {
      type: Object,
      default: '',
    },
  },
  data() {
    return {
     
    }
  },
  methods: {
     spanify(el){
       const words = el.innerHTML.split(" ")
       el.innerHTML = ''
       words.map((word,index)=> {
         const spanEL = document.createElement('span', 'word')
         spanEL.setAttribute("class", `title ${index % 2 == 0 ? 'odd' : 'even'}`)
         spanEL.innerHTML = word
         el.appendChild(spanEL)
       })
     },
     startAnimation(){
       const gsap = this.$gsap
       const cssRules = this.$CSSRulePlugin
       cssRules.getRule(".hero__job::after")
     }
  },
  mounted(){
    this.startAnimation()
  }
}
</script>

<style lang="scss">
.hero {
  width: 100%;
  min-height: 150vh;

  .hero__wrapper {
    @include grid;
    width: 100%;
  }

  .hero__title {
    display: flex;
    flex-direction: column;
    grid-column: 2 / span 3;
    margin: 88px 0 64px 0;


    .even {
    align-self: flex-end;
    }

    @include mobile {
      grid-column: 2 / span 2;
    }
  }
  .hero__job-wrapper{
    grid-column: 3 / span 3;
    @include mobile {
      grid-column: 2 / span 2;
    }
  }
  .hero__job{

    position: relative;
    width: fit-content;
    color: transparent;
    overflow: hidden;
    margin: 0 0 24px 0;
    text-transform: uppercase;
    animation: reveal 1s linear 0.6s forwards;
  }
  @keyframes reveal {
    0% {
        color: transparent;
    }
    50% {
        color: transparent;
    }
    51% {
        color: var(--clr-klein-blue);
    }
    100% {
        color: var(--clr-klein-blue);
    }
    
  }
  .hero__job::after{
      content: '';
      position: absolute;
      width: 75px;
      height: 2px;
      bottom: -8px;
      left: 0;
      background: var(--clr-klein-blue);
    }

  .hero__job::before{
    content: '';
    position: absolute;
    will-change: transform;
    transform: translate3d(-100%, 0, 0);
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: var(--clr-klein-blue);
    animation: revealSlider 1s ease-in 0.6s;
  }

  @keyframes revealSlider {
    0%{
      transform: translate3d(-100%, 0, 0);
    }
    50% {
      transform: translate3d(0, 0, 0);
    }
    100%{
      transform: translate3d(100%, 0, 0);
    }
    
  }





  .hero__bio {
    grid-column: 3 / span 3;
    margin: 16px 0 80px 0;

    text-align: justify;
    @include mobile {
      grid-column: 2 / span 2;
      text-align: left;
    }
  }
}
</style>