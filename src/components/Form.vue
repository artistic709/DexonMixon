<template>
  <div id="formView">
    <div class="container">
      <div class="alert alert-success" role="alert">
        Address: <span class="badge badge-pill badge-info dex-addr">{{ dex_addr }}</span> <br>
        Balance: <span class="badge badge-light dex-bal"><span id="dex-bal">{{ dex_bal }}</span> DEX</span>
      </div>
      <div class="row">
        <div id="total">
          <h3>Total Value: <span id="total-val">0.0</span></h3>
        </div>
      </div>
      <div class="row-table">
        <div class="row entry">
          <div class="col-6">
            <h4>&nbsp;Recipient</h4>
          </div>
          <div class="col-6">
            <h4>&nbsp;Value</h4>
          </div>
        </div>
        <div class="row entry">
          <div class="col-6">
            <input type="text" class="form-control" id="to-addr-1" placeholder="DEXON Address (0x.....)">
          </div>
          <div class="col-5">
            <input type="text" class="form-control" id="to-val-1" placeholder="Value"> <span>DEX</span>
          </div>
          <div class="col-1">
            <div class="addbutton"></div>
          </div>
        </div>
      </div>
      <div style="display:none" id="entry-template">
      </div>
      <div class="row row-submit">
        <div class="center">
          <button type="button" class="btn btn-success btn-lg btn-block">Submit</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Web3 from 'web3'
import * as jQuery from 'jquery'
import utils from '../utils'

export default {
  name: 'Form',
  props: {
  },
  created() {
    window.web3 = utils.getWeb3Instance();
  },
  computed: {
    dex_addr() {
      //return web3.eth.defaultAccount;

      //change to promise => change DOM
      return '0xaf8333618669d33C6C1CA6C00187adc536a40C0d';
    },
    dex_bal() {
      return Web3.utils.fromWei('9487948794879487');
    }
  },
  methods: {
    isNumberKey(evt) {
      var charCode = (evt.which) ? evt.which : event.keyCode
      if (charCode > 31 && (charCode < 48 || charCode > 57))
          return false;
      return true;
    }
  }
};

jQuery(document).ready(function() {
    //this calculates values automatically
    jQuery("#to-val-1").on("keydown keyup", function() {
      let num1 = document.getElementById('to-val-1').value;
      let result = parseFloat(num1, Number).toString();
      if (result === 'NaN') result = '0.0';
      document.getElementById('total-val').textContent = result;
    });
});
</script>

<style lang="scss">
#formView {
  display: flex;
  height: 100%;
  position: relative;
}

#formview .container {
  height: 100%;
  overflow: hidden;
}

.badge.dex-addr {
  font-size: 16px;
}

.badge.dex-bal {
  margin-top: 6px;
  padding-right: 10px;
  line-height: 20px;
  font-size: 18px;
}

#total {
  display: flex;
  margin: 0.3em 0;
  justify-content: center;
  width: 100%;
}

#total span {
  height: calc(1em);
  padding: 0.2em 0.4em;
  font-size: 0.8em;
  color: #495057;
  background-color: #f8f8f8;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
}

.row-table {
  width: 100%;
  height: 700px;
  margin: 10px 0;
  overflow-y: hidden;
  overflow-x: hidden;
  padding-right: 13px;
  box-sizing: content-box;
  margin-left: -5px;
}

.row-table .entry {
  margin: 4px 10px;
  height: 48px;
  width: 100%;
}

.row-table .entry *:nth-child(1) {
}

.row-table .entry *:nth-child(2) {
}

.row-table .entry *:nth-child(2) input {
  width: 140px;
  display: inline-block;
}


.row-table .entry *:nth-child(3) {
  position: relative;
}


.addbutton {
  position: absolute;
  top: 1px; left: -1px;
  width: 36px; height: 36px;
  border-radius: 50%;
  border: solid 2px #aaa;
  font-size: 24px;
  text-align: center;
  cursor: pointer;
}

.addbutton:before {
  content: '+';
  position: absolute;
  top: -6px;
  left: 10px;
  font-size: 28px;
  text-align: center;
}

.row-submit {
  position: absolute;
  bottom: 126px;
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  border-top: 2px solid #aaa
}

.row-submit button {
  width: 200px;
  height: 60px;
  font-size: 1.7em;
  line-height: 1em;
  margin-bottom: 40px;
}
</style>
