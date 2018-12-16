<template>
  <div style="padding: 0 20px;">
    <button type="button" class="btn-lg btn-block btn-dark btn-start" @click="$parent.changeView()">Start</button>
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
  cursor: pointer;
}

#home h1 {
  font-size: 48px;
}
</style>
