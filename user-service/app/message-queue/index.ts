import axios from 'axios'

const PRODUCT_SERVICE_URL =
  // From process.env

  // Cloud: Product Service Stack
  'https://55mpfb9t77.execute-api.ap-southeast-1.amazonaws.com/prod/products-queue'

// Local:
// 'http://127.0.0.1:3000/products-queue'

export const PullData = async (requestData: Record<string, unknown>) => {
  return axios.post(PRODUCT_SERVICE_URL, requestData)
}
