import './utility'
import middy from '@middy/core'
import jsonBodyParser from '@middy/http-json-body-parser'
import { ProductRepository } from './repository/ProductRepository'
import { APIGatewayEvent, APIGatewayProxyResult, Context } from 'aws-lambda'
import { ProductService } from './service/ProductService'

const service = new ProductService(new ProductRepository())

export const handler = middy(
  (
    event: APIGatewayEvent,
    context: Context,
  ): Promise<APIGatewayProxyResult> => {
    return service.handleQueueOperation(event)
  },
).use(jsonBodyParser())
