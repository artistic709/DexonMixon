<template>
  <div id="app">
    <div class="container-fluid h-100">
      <div class="row h-100">
        <div class="col-3 col-panel">
          <transition name="fade" mode="out-in" appear>
          <component :is="view"></component>
          </transition>
        </div>
        <div class="col col-wheel">
          <Wheel></Wheel>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Web3 from 'web3'
import utils from './utils'

import Wheel from './components/Wheel.vue'

export default {
  name: 'App',
  components: {
    Wheel
  },
  methods: {
    loaded() {
      console.log("Component Loaded!");
    }
  }
}

const web3 = utils.getWeb3Instance()

function hi() {

  utils.getCurrentAddress().then(x => {
    return web3.eth.getBalance(web3.eth.defaultAccount)
  }).then(bal => {
    alert(`account: ${web3.eth.defaultAccount}
           balance: ${Web3.utils.fromWei(bal)} DEX`)
  })
}

window.hi = hi
</script>
<style>
body {
  margin: 0px;
  overflow: hidden;
  background-color: #eff6ff;
}

#app {
  width: 100%;
  height: 100vh;
}

.col-panel {
  background-color: #fafafa;
  box-shadow: 0 0 12px #222;
}

.col-wheel {
  padding: 0;
}
</style>
