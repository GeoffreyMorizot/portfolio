<template>
  <footer class="footer">
    <div class="footer__wapper">
      <span>©2021 {{ info.siteName }}</span>
      <div class="footer__contact">
        <div class="footer__email">
          <a :href="`mailto:${info.contactEmail}`">{{info.contactEmail}}</a>
        </div>
        <div class="footer__socials">
          <a :href="`${social.url}`" v-for="social in info.socialNetworks" :key="social.id">
            <span>{{ social.title }}</span>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
    props: {
        info: Object,
    },

}
</script>

<style lang="scss" scoped>
.footer {
  height: 90px;
  padding: 0px var(--site-margin);
  flex-grow: 0;
  
  text-transform: uppercase;
  color: var(--clr-klein-blue);
  
  border-top: 1px solid var(--clr-klein-blue);   
}

.footer__wapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1500px;
  height: 100%;
  margin: 0 auto;
}

.footer__contact {
  display: flex;
  height: 100%;
   border-left: 1px solid var(--clr-klein-blue);
    border-right: 1px solid var(--clr-klein-blue);
}

.footer__socials {
  display: flex;
  flex-direction: column;
  border-left: 1px solid var(--clr-klein-blue);
}

.footer__email {
    
   margin: auto 0;
    
   
}
</style>