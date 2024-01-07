import { APIGatewayEvent, Context } from 'aws-lambda'
import middy from '@middy/core'
import { DBOperation } from './db-operation'

const dbOperation = new DBOperation()

export const getOrdersHandler = async (
  event: APIGatewayEvent,
  context: Context,
) => {
  try {
    const queryString = 'SELECT * FROM orders LIMIT 500'
    const result = await dbOperation.executeQuery(queryString, [])
    if (typeof result.rowCount === 'number' && result.rowCount > 0) {
      console.log('Orders found:', result.rows)
      return {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
        statusCode: 200,
        body: JSON.stringify({ orders: result.rows }),
      }
    } else {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: 'Orders not found' }),
      }
    }
  } catch (error) {
    console.error('Error getting orders:', error)
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' }),
    }
  }
}

export const getOrderHandler = async (
  event: APIGatewayEvent,
  context: Context,
) => {
  try {
    // Check if pathParameters is not null and has the 'id' property
    if (event.pathParameters && 'id' in event.pathParameters) {
      const id = event.pathParameters.id

      const queryString =
        'SELECT * FROM orders o JOIN order_items oi ON o.id = oi.order_id WHERE o.id = $1'
      const result = await dbOperation.executeQuery(queryString, [id])

      if (typeof result.rowCount === 'number' && result.rowCount > 0) {
        return {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
          },
          statusCode: 200,
          body: JSON.stringify({ order: result.rows }),
        }
      } else {
        return {
          statusCode: 404,
          body: JSON.stringify({ message: 'Order not found' }),
        }
      }
    } else {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: 'Missing or invalid path parameter: id',
        }),
      }
    }
  } catch (error) {
    console.error('Error getting order:', error)
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' }),
    }
  }
}
