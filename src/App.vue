<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}

import Web3 from 'web3'
import utils from './utils'

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
</style>
