<template>
  <div class="skill__wrapper">
    <ul class="skill title-6">
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
}
</script>


<style lang="scss" scoped>
.skill__wrapper{
    width: 100%;
}
.skill {
    position: relative;
    text-transform: uppercase;
    font-family: var(--ff);
    font-weight: 500;
    color: var(--clr-cheese);

    &::before{
        content:'';
        position: absolute;
        top: 22px;
        left: 0;
        height: 3px;
        width: 20px;
        background: var(--clr-cheese);
    }
    
}
.skill__subskill{
    text-transform: capitalize;
    display: flex;
    margin-top: 8px;
    font-family: var(--secondary-ff);
    font-weight: 400;
    color: var(--clr-klein-blue);

    & > li:not(:first-child)::before{
        content:".";
        opacity: 0;
    }

    & > li:not(:last-child)::after{
        content:"  /"
    }
}
</style>