<template>
    <div>
      <HeaderSection />
      <main>
        <NuxtPage />
      </main>
      <FooterSection />
    </div>
</template>
  
<script>
export default {
  head() {
    return {
      meta: [
        { name: 'robots', content: 'noindex, nofollow' }
      ]
    }
  }
}
</script>
  
<style scoped>
  /* Add your styles here */
</style>
  