<template>
  <div id="home">
    <div class="jumbotron">
      <h1 class="display-2">DEXON Mixon!</h1>
      <p class="lead">DEXON Mixon, a decentralized app powered by the DEXON blockchain.</p>
      <hr>
      <p>This is a new experimental coin mixing service, featuring fantastic on-demand coin fixing (ODCF) capabilities, supporting multiple high-speed (HS) payments.</p>
    </div>

    <div style="padding: 0 20px;">
      <button type="button" class="btn-lg btn-block btn-dark btn-start">Start</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  props: {
  },
};
</script>

<style lang="scss">
#home {
}

#home .jumbotron {
  margin: 20px;
  padding: 20px 20px;
}

#home .btn-start {
}

#home h1 {
  font-size: 48px;
}
</style>
