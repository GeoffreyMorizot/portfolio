<template>
  <div class="skill__wrapper">
    <ul ref="skill" class="skill title-6 hyphen">
      <li>
        {{ skill.title }}
        <ul class="skill__subskill">
          <li v-for="subSkill in skill.subSkills" :key="subSkill.id">
            {{ subSkill.name }}
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    skill: {
      type: Object,
      default: null,
    },
  },
  mounted() {
    const rule = this.$CSSRulePlugin.getRule('.hyphen::before')
    this.$gsap.set(rule, {
      cssRule: { x: '-100%', background: 'rgb(253,188,124)' },
    })
    this.$gsap.fromTo(
      rule,
      {
        cssRule: { x: '-100%' },
      },
      {
        duration: 0.3,
        delay: 0.2,
        cssRule: { x: '0%' },
      }
    )
  },
}
</script>

<style lang="scss" scoped>
.skill__wrapper {
  width: 100%;
  overflow: hidden;
}

.skill {
  position: relative;
  text-transform: uppercase;
  font-family: var(--ff);
  font-weight: 500;
  color: var(--clr-cheese);
}
.skill__subskill {
  text-transform: capitalize;
  display: flex;
  margin-top: space(1);
  font-family: var(--secondary-ff);
  font-weight: 400;
  color: var(--clr-klein-blue);
  width: 100%;

  & > li:not(:first-child)::before {
    content: '.';
    opacity: 0;
  }

  & > li:not(:last-child)::after {
    content: '  /';
  }
}
</style>
