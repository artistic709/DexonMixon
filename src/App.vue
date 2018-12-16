<template>
  <div id="app">
    <div class="container-fluid h-100">
      <div class="row h-100">
        <div class="col-3 col-panel">
          <div id="home">
            <div class="jumbotron">
              <h1 class="display-2">DEXON Mixon!</h1>
              <p class="lead faded">DEXON Mixon, a decentralized app powered by the DEXON blockchain.</p>
              <hr class="faded">
              <p class="faded">This is a new experimental coin mixing service, featuring fantastic on-demand coin fixing (ODCF) capabilities, supporting multiple high-speed (HS) payments.</p>
            </div>
            <components :is="view"></components>
          </div>
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
import * as jQuery from 'jquery'
import utils from './utils'

import Wheel from './components/Wheel.vue'
import Home from './components/Home.vue'
import Form from './components/Form.vue'

export default {
  name: 'App',
  components: {
    Wheel, Home, Form
  },
  data() {
    return {
      view: 'Home'
    }
  },
  computed: {
  },
  mounted() {
    window.hi = this.hi;
  },
  methods: {
    changeView() {
      this.view = 'Form';
      window.web3 = utils.getWeb3Instance();
      document.querySelectorAll('.faded').forEach((element) => {
        jQuery('.faded').fadeOut(300);
        jQuery('.jumbotron').addClass('blank');
      });
    },
    hi() {
      window.web3 = utils.getWeb3Instance();
      utils.getCurrentAddress().then(x => {
        return web3.eth.getBalance(web3.eth.defaultAccount)
      }).then(bal => {
        alert(`account: ${web3.eth.defaultAccount}
               balance: ${Web3.utils.fromWei(bal)} DEX`)
      })
    }
  }
}
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

#home {
  height: 100%;
}

.col-panel {
  padding: 0;
  background-color: #fafafa;
  box-shadow: 0 0 12px #222;
}

.col-wheel {
  padding: 0;
}

.v-leave { opacity: 1; }
.v-leave-active { transition: opacity 0.3s ease-in-out; }
.v-leave-to { opacity: 0; }
.v-enter { opacity: 0; }
.v-enter-active  { transition: opacity 0.3s ease-in-out; }
.v-enter-to { opacity: 1; }

.blank {
  background: none;
  transition: background 0.3s ease-in-out;
}

</style>
