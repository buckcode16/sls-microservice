import { APIGatewayEvent, APIGatewayProxyResult, Context } from 'aws-lambda'
import { ErrorResponse } from '../utility/response'
import { ProductService } from '../service/ProductService'
import { ProductRepository } from '../repository/ProductRepository'
import '../utility'
import middy from '@middy/core'
import bodyParser from '@middy/http-json-body-parser'

const service = new ProductService(new ProductRepository())

export const createProduct = middy(
  (
    event: APIGatewayEvent,
    context: Context,
  ): Promise<APIGatewayProxyResult> => {
    return service.createProduct(event)
  },
).use(bodyParser())

export const getProduct = middy(
  (
    event: APIGatewayEvent,
    context: Context,
  ): Promise<APIGatewayProxyResult> => {
    return service.getProduct(event)
  },
)

export const getProducts = middy(
  (
    event: APIGatewayEvent,
    context: Context,
  ): Promise<APIGatewayProxyResult> => {
    return service.getProducts(event)
  },
)

export const getSellerProducts = middy(
  (
    event: APIGatewayEvent,
    context: Context,
  ): Promise<APIGatewayProxyResult> => {
    return service.getSellerProducts(event)
  },
).use(bodyParser())

export const editProduct = middy(
  (
    event: APIGatewayEvent,
    context: Context,
  ): Promise<APIGatewayProxyResult> => {
    return service.editProduct(event)
  },
).use(bodyParser())

export const deleteProduct = middy(
  (
    event: APIGatewayEvent,
    context: Context,
  ): Promise<APIGatewayProxyResult> => {
    return service.deleteProduct(event)
  },
).use(bodyParser())
