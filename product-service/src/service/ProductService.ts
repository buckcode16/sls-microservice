import { APIGatewayEvent, APIGatewayProxyEvent } from 'aws-lambda'
import { ProductRepository } from '../repository/ProductRepository'
import { ErrorResponse, SuccessResponse } from '../utility/response'
import { plainToClass } from 'class-transformer'
import { AppValidationError } from '../utility/errors'
import { ProductInput } from '../dto/ProductInput'
import { ServiceInput } from '../dto/ServiceInput'
import { CategoryRepository } from '../repository/CategoryRepository'
import { AuthUser } from '../utility/auth'

export class ProductService {
  _repository: ProductRepository
  constructor(repository: ProductRepository) {
    this._repository = repository
  }

  async ResponseWithError(event: APIGatewayEvent) {
    return ErrorResponse(404, new Error('method not allowed!'))
  }

  async authorisedUser(user_id: number, productId: string) {
    const product = await this._repository.getProductById(productId)
    if (!product) return false
    return Number(user_id) === Number(product.seller_id)
  }

  async createProduct(event: APIGatewayEvent) {
    // Validate input
    const token = event.headers.Authorization
    const user = await AuthUser(token)
    if (!user) return ErrorResponse(403, 'Please login first')
    if (user.user_type.toUpperCase() !== 'SELLER')
      return ErrorResponse(403, 'Only seller can create product')

    const input = plainToClass(ProductInput, event.body)
    const error = await AppValidationError(input)
    if (error) return ErrorResponse(404, error)

    const data = await this._repository.createProduct({
      ...input,
      seller_id: user.user_id,
    })

    await new CategoryRepository().addItem({
      id: input.category_id,
      products: [data._id],
    })
    return SuccessResponse(data)
  }

  async getProducts(event: APIGatewayEvent) {
    const data = await this._repository.getAllProducts()
    return SuccessResponse(data)
  }

  async getSellerProducts(event: APIGatewayEvent) {
    const token = event.headers.Authorization
    const user = await AuthUser(token)
    if (!user) return ErrorResponse(403, 'Please login first')
    if (user.user_type.toUpperCase() !== 'SELLER')
      return ErrorResponse(403, 'You are not authorised to view this page')

    const data = await this._repository.getAllSellerProducts(user.user_id)
    return SuccessResponse(data)
  }

  async getProduct(event: APIGatewayEvent) {
    const productId = event.pathParameters?.id
    if (!productId) return ErrorResponse(403, 'please provide product id')

    const data = await this._repository.getProductById(productId)
    return SuccessResponse(data)
  }

  async editProduct(event: APIGatewayEvent) {
    // Validate input
    const token = event.headers.Authorization
    const user = await AuthUser(token)
    if (!user) return ErrorResponse(403, 'Please login first')
    if (user.user_type.toUpperCase() !== 'SELLER')
      return ErrorResponse(403, 'Only seller can edit product')

    const productId = event.pathParameters?.id
    if (!productId) return ErrorResponse(403, 'please provide product id')

    const input = plainToClass(ProductInput, event.body)
    const error = await AppValidationError(input)
    if (error) return ErrorResponse(404, error)

    const isAuthorised = await this.authorisedUser(user.user_id, productId)
    if (!isAuthorised)
      return ErrorResponse(403, 'You are not authorised to edit this product')

    input.id = productId
    const data = await this._repository.updateProduct(input)

    return SuccessResponse(data)
  }

  async deleteProduct(event: APIGatewayEvent) {
    // Validate input
    const token = event.headers.Authorization
    const user = await AuthUser(token)
    if (!user) return ErrorResponse(403, 'Please login first')
    if (user.user_type.toUpperCase() !== 'SELLER')
      return ErrorResponse(403, 'Only seller can delete product')

    const productId = event.pathParameters?.id
    if (!productId) return ErrorResponse(403, 'please provide product id')

    const isAuthorised = await this.authorisedUser(user.user_id, productId)
    if (!isAuthorised)
      return ErrorResponse(403, 'You are not authorised to delete this product')

    const { category_id, deleteResult } = await this._repository.deleteProduct(
      productId,
    )
    await new CategoryRepository().removeItem({
      id: category_id,
      products: [productId],
    })
    return SuccessResponse(deleteResult)
  }

  // http calls // later stage we will convert this thing to RPC & Queue
  async handleQueueOperation(event: APIGatewayProxyEvent) {
    const input = plainToClass(ServiceInput, event.body)
    const error = await AppValidationError(input)
    if (error) return ErrorResponse(404, error)
    console.log('INPUT', input)

    const {
      _id,
      name,
      price,
      image_url,
    } = await this._repository.getProductById(input.productId)
    console.log('PRODUCT DETAILS', { _id, name, price, image_url })

    return SuccessResponse({
      product_id: _id,
      name,
      price,
      image_url,
    })
  }
}
