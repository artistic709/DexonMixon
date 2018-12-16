const wallet = require('ethereumjs-wallet')
const ethUtil = require('ethereumjs-util')
const Web3 = require('web3')

let ableEmbark = true
let TO
let AMOUNT
let NEURON
let ROUND
let CURRENTROUND = 0
let EST
// index: round
let PRIVATEKEYS = []
const TPS = 10
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
	CURRENTROUND = 0
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

	EST = TPS * ROUND

	let tos = []
	let ins = []
	for (let j = 0; j < neuron; j++) {
		let toPubAddress = ethUtil.privateToAddress(PRIVATEKEYS[CURRENTROUND+1][j])
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

function keep() {
	if (CURRENTROUND > ROUND) {
		console.log('NOE KEEP!!!')
		return;
	}

	let froms = []
	let outs = []
	let tos = []
	let ins = []
	for (let i = 0; i < NEURON; i++) {
		let fromPubAddress = ethUtil.privateToAddress(PRIVATEKEYS[CURRENTROUND][i])
		fromPubAddress = ethUtil.toChecksumAddress(fromPubAddress.toString('hex'))
		froms.push(fromPubAddress)
		let balance = contract.methods.balanceOf(fromPubAddress).call()
		outs.push(balance)

		let toPubAddress = ethUtil.privateToAddress(PRIVATEKEYS[CURRENTROUND+1][i])
		toPubAddress = ethUtil.toChecksumAddress(toPubAddress.toString('hex'))
		tos.push(toPubAddress)
		ins.push(balance)
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
	CURRENTROUND++
	return [vs, rs, ss]
}
