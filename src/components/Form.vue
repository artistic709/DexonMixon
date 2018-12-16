<template>
  <div id="formView">
    <div class="container">
      <div class="row">
        <div class="col-6">
          <div class="alert alert-success" role="alert">
            Address: {{}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Web3 from 'web3'
import utils from '../utils'

export default {
  name: 'Form',
  props: {
  },
  computed: {
    address() {
      utils.getCurrentAddress().then(x => {
              return this.web3.eth.getBalance(this.web3.eth.defaultAccount)
            })
    }
  },
  methods: {
  }
};
</script>

<style lang="scss">
#formView {
  display: flex;
  height: 100%;
}

#formview .container {
  height: 100%;
}
</style>
