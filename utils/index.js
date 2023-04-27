const ethers = require('ethers')
const keccak256 = require('keccak256')
const minterBytes32 = '0x' + keccak256('MINTER_ROLE').toString('hex')

export const formatEther = bigNumber => ethers.utils.formatEther(bigNumber)

export const parseEther = string => ethers.utils.parseEther(string)

export const setMinter = async (contract, address) => {
    const set = await contract.grantRole(minterBytes32, address)
    await set.wait()
    return set
}

export const isMinter = async (contract, address) => {
    const isMinter = await contract.hasRole(minterBytes32, address)
    return isMinter
}

export const deployUrl = (network, address) => {
    if (network === 'localhost') {
        console.log(address)
        return
    }

    const url = `https://${
        network === 'bsc_testnet' ? 'testnet.' : ''
    }bscscan.com/address/${address}`
    console.log('Contract deployed to', url)
}

export const txUrl = (network, tx) => {
    if (network === 'localhost') {
        console.log(tx.hash)
        return
    }

    const url = `https://${
        network === 'bsc_testnet' ? 'testnet.' : ''
    }bscscan.com/tx/${tx.hash}`
    console.log('Tx:', url)
}

/* createSignature({
    types: ['string', 'uint256'],
    values: ['test', 1],
    signer: <ethers.Signer object>
}) */
export const createSignature = async ({ types, values, signer }) => {
    const message = ethers.utils.defaultAbiCoder.encode(types, values)
    const digest = ethers.utils.keccak256(message)
    const digestBytes = ethers.utils.arrayify(digest)
    const signature = await signer.signMessage(digestBytes)
    return signature
}

// export const getContract = async (hardhatEthers, contractName) => {
//     return {
//         contract: await hardhatEthers.getContractFactory(contractName),
//         abi: require(`../artifacts/contracts/${contractName}.sol/${contractName}.json`).abi
//     }
// }

export const UNLIMITED_ALLOWANCE = '115792089237316195423570985008687907853269984665640564039457584007913129639935'
