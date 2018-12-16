const wallet = require('ethereumjs-wallet')
const ethUtil = require('ethereumjs-util')
const Web3 = require('web3')

let TO
let AMOUNT
let NEURON
let ROUND
let CURRENTROUND = 0
let TPS = 10
let EST
// index: round
let PRIVATEKEYS = []
const addrContract = ''
// let contract = new web3.eth.Contract(ABI, addrContract);

embark('0x123', 100, 2, 2)
console.log(PRIVATEKEYS, CURRENTROUND)
console.log(sign(Web3.utils.soliditySha3('a')))

function embark(to, amount, neuron, round) {
	TO = to
	AMOUNT = amount
	NEURON = neuron
	ROUND = round
	let keypair = wallet.generate()
	let privateKey = keypair.getPrivateKey()
	PRIVATEKEYS.push(privateKey)

	for (let i = 0; i < round; i++) {
		let tmp_round = []
		for (let j = 0; j < neuron; j++) {
			keypair = wallet.generate()
			privateKey = keypair.getPrivateKey()
			tmp_round.push(privateKey)
		}
		PRIVATEKEYS.push(tmp_round)
	}

	let pubAddress = ethUtil.privateToAddress(PRIVATEKEYS[0])
	pubAddress = ethUtil.toChecksumAddress(pubAddress.toString('hex'))
	//TODO: jump out dekuson to let users transfer dex to round[0] account
	console.log(pubAddress)
	// contract.methods.deposit().call().then(bal => {
	// 	// done deposit
	// });

	let froms = [pubAddress]
	// let balance = web3.methods.balanceOf(pubAddress)
	let balance = 3
	let outs = [balance]

	CURRENTROUND++
	EST = TPS * ROUND

	let tos = []
	let ins = []
	for (let j = 0; j < neuron; j++) {
		let toPubAddress = ethUtil.privateToAddress(PRIVATEKEYS[CURRENTROUND][j])
		toPubAddress = ethUtil.toChecksumAddress(toPubAddress.toString('hex'))
		tos.push(toPubAddress)
		ins.push(balance / neuron)
	}

	send{
		froms,
		tos,
		outs,
		ins
	}
}

function sign(txHash) {
	txHash = ethUtil.toBuffer(txHash)
	let vs = [], rs = [], ss = []
	for (let i = 0; i < NEURON; i++) {
		let vrs = ethUtil.ecsign(txHash, PRIVATEKEYS[CURRENTROUND][i])
		vs.push(vrs.v)
		rs.push(vrs.r)
		ss.push(vrs.s)
	}
	return [vs, rs, ss]
}
