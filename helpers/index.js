const axios = require('axios')
const fs = require('fs')
const https = require('https')

const MACAROON_PATH =
  '/Users/jovan/.polar/networks/1/volumes/lnd/alice/data/chain/bitcoin/regtest/admin.macaroon'
const REST_HOST = 'https://127.0.0.1:8081/v1'

const nodeGetRequest = async (url) => {
  try {
    const axiosConfig = {
      url: `${REST_HOST}${url}`,
      method: 'get',
      httpsAgent: new https.Agent({ rejectUnauthorized: false }),
      headers: {
        'Grpc-Metadata-macaroon': fs
          .readFileSync(MACAROON_PATH)
          .toString('hex'),
      },
    }

    const response = await axios(axiosConfig)

    if (!response.data) return { success: false, error: 'Process failed' }

    return { success: true, response: response.data }
  } catch (error) {
    return { success: false, error }
  }
}

const nodePostRequest = async (data, url) => {
  try {
    const axiosConfig = {
      url: `${REST_HOST}${url}`,
      method: 'post',
      httpsAgent: new https.Agent({ rejectUnauthorized: false }),
      headers: {
        'Grpc-Metadata-macaroon': fs
          .readFileSync(MACAROON_PATH)
          .toString('hex'),
      },
      data,
    }

    const response = await axios(axiosConfig)

    if (!response.data)
      return { success: false, error: 'Invoice creation failed' }

    return { success: true, response: response.data }
  } catch (error) {
    return { success: false, error }
  }
}

module.exports = {
  nodeGetRequest,
  nodePostRequest,
}
