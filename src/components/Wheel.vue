<template>
  <div id="wheel">
    <div id="wheel-anchor">
      <div v-for="n in 7"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Wheel',
  props: {
  },
};
</script>

<style lang="scss">
#wheel {
  display: flex;
  height: 100%;
  justify-content: center;
  z-index: -100;
}

#wheel-anchor {
  display: flex;
  align-self: center;
  width: 0px;
  height: 1px;
  overflow: visible;
  position: relative;

  opacity: 0.2;
  transform: skew(8deg, 8deg);
}

$scale: 2;
$bwidth: 20;

@for $i from 1 through 7 {
  #wheel-anchor > div:nth-child(#{$i}) {
    $deg: random(180);
    animation: spin 7000ms + random(2000) linear infinite;
    width: 0; height: 0;

    &:after {
      content: "";
      position: absolute;
      top: $scale * (-200px + (15px * $i));
      left: $scale * (-200px + (15px * $i));
      width: $scale * (400px - (30px * $i));
      height: $scale * (400px - (30px * $i));
      border-radius: 50%;
      box-sizing: border-box;
      border: solid $bwidth + px transparent;
      border-top: solid $bwidth + px #1B9EE5;
      border-bottom: solid $bwidth + px #1B9EE5;
      transform: rotate($deg + deg);
      @if (random(2) == 1 or $i == 1) and $i != 7 {
        border-left: solid $bwidth + px #1B9EE5;
      } @else {
      }
    }

  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

</style>
