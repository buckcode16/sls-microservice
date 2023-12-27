import { APIGatewayProxyEventV2 } from 'aws-lambda'
import { SuccessResponse, ErrorResponse } from '../utility/response'
import { UserRepository } from '../repository/userRepository'
import { autoInjectable } from 'tsyringe'

@autoInjectable()
export class UserService {
  repository: UserRepository
  constructor(repository: UserRepository) {
    this.repository = repository
  }

  // User creation, validation & login
  async CreateUser(event: APIGatewayProxyEventV2) {
    const body = event.body
    console.log(body)

    await this.repository.CreateUserOperation()

    return SuccessResponse({ message: 'response from Create User' })
  }

  async UserLogin(event: APIGatewayProxyEventV2) {
    return SuccessResponse({ message: 'response from User Login' })
  }

  async VerifyUser(event: APIGatewayProxyEventV2) {
    return SuccessResponse({ message: 'response from Verify User' })
  }

  // User profile
  async CreateProfile(event: APIGatewayProxyEventV2) {
    return SuccessResponse({ message: 'response from Create Profile' })
  }
  async GetProfile(event: APIGatewayProxyEventV2) {
    return SuccessResponse({ message: 'response from Get Profile' })
  }
  async EditProfile(event: APIGatewayProxyEventV2) {
    return SuccessResponse({ message: 'response from Edit Profile' })
  }

  // Cart section
  async CreateCart(event: APIGatewayProxyEventV2) {
    return SuccessResponse({ message: 'response from Create Cart' })
  }
  async GetCart(event: APIGatewayProxyEventV2) {
    return SuccessResponse({ message: 'response from Get Cart' })
  }
  async UpdateCart(event: APIGatewayProxyEventV2) {
    return SuccessResponse({ message: 'response from Update Cart' })
  }

  // Payment section
  async CreatePaymentMethod(event: APIGatewayProxyEventV2) {
    return SuccessResponse({ message: 'response from Create Payment Method' })
  }
  async GetPaymentMethod(event: APIGatewayProxyEventV2) {
    return SuccessResponse({ message: 'response from Get Payment Method' })
  }
  async UpdatePaymentMethod(event: APIGatewayProxyEventV2) {
    return SuccessResponse({ message: 'response from Update Payment Method' })
  }
}
