import Web3 from 'web3'

let web3 = null

function getDexonProvider() {
  const dexonProvider = window.dexon
  if (!dexonProvider)
    return null

  if (web3)
    web3.setProvider(dexonProvider)

  return dexonProvider
}

function getWeb3Instance() {
  if (!web3) {
    web3 = new Web3()
    getDexonProvider()
  }
  return web3
}

function getCurrentAddress() {
  getWeb3Instance()
  const prov = getDexonProvider()

  return Promise.resolve()
  .then(() => {
    if (web3.currentProvider.enable) {
      return web3.currentProvider.enable()
    } else {
      return web3.eth.getAccounts()
    }
  })
  .then(accList => {
    if (accList.length) {
      web3.eth.defaultAccount = accList[0]
    }
    return Promise.resolve(accList)
  })
}

// sometimes we may expected the callback be called for multiple times,
// thus does not return a promise by design
function watchAccountChange(web3, callback) {
  return setInterval(() => {
    web3.eth.getAccounts().then(acc => {
      if (!acc || acc[0] != web3.eth.defaultAccount) {
        callback(acc)
      }
    });
  }, 500);
}

export default {
  getDexonProvider,
  getWeb3Instance,
  getCurrentAddress,
  watchAccountChange,
}
