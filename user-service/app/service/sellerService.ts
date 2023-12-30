import { APIGatewayProxyEventV2 } from 'aws-lambda'
import { SellerRepository } from '../repository/sellerRepository'
import { VerifyToken, GetToken } from '../utility/password'
import { ErrorResponse, SuccessResponse } from '../utility/response'
import { plainToClass } from 'class-transformer'
import {
  PaymentMethodInput,
  SellerProgramInput,
} from '../models/dto/JoinSellerProgramInput'
import { AppValidationError } from '../utility/errors'

export class SellerService {
  repository: SellerRepository

  constructor(repository: SellerRepository) {
    this.repository = repository
  }

  async JoinSellerProgram(event: APIGatewayProxyEventV2) {
    const authToken = event.headers.authorization
    const payload = await VerifyToken(authToken)
    if (!payload) {
      return ErrorResponse(403, 'Authorization failed!')
    }

    const input = plainToClass(SellerProgramInput, event.body)
    const error = await AppValidationError(input)

    if (error) {
      return ErrorResponse(404, error)
    }
    const { firstName, lastName, phoneNumber, address } = input

    const enrolled = await this.repository.checkEnrolledProgram(payload.user_id)

    if (enrolled) {
      return ErrorResponse(
        400,
        'Already enrolled in seller program, you can sell your products now!',
      )
    }

    // update user account
    const updatedUser = await this.repository.updateProfile({
      firstName,
      lastName,
      phoneNumber,
      user_id: payload.user_id,
    })

    if (!updatedUser) {
      return ErrorResponse(
        500,
        'Something went wrong on joining seller program!',
      )
    }

    // Update user address
    await this.repository.updateAddress({
      ...address,
      user_id: payload.user_id,
    })

    // Create payment method
    const result = await this.repository.createPaymentMethod({
      ...input,
      user_id: payload.user_id,
    })

    // Signed token
    if (result) {
      const token = await GetToken(updatedUser)

      return SuccessResponse({
        message: 'Successfully joined seller program!',
        seller: {
          token,
          email: updatedUser.email,
          firstName: updatedUser.first_name,
          lastName: updatedUser.last_name,
          phone: updatedUser.phone,
          userType: updatedUser.user_type,
          _id: updatedUser.user_id,
        },
      })
    } else {
      return ErrorResponse(
        500,
        'Something went wrong on joining seller program!',
      )
    }
  }

  async GetPaymentMethods(event: APIGatewayProxyEventV2) {
    const authToken = event.headers.authorization
    const payload = await VerifyToken(authToken)
    if (!payload) {
      return ErrorResponse(403, 'Authorization failed!')
    }

    const paymentMethods = await this.repository.getPaymentMethods(
      payload.user_id,
    )
    return SuccessResponse(paymentMethods)
  }

  async EditPaymentMethods(event: APIGatewayProxyEventV2) {
    const authToken = event.headers.authorization
    const payload = await VerifyToken(authToken)
    if (!payload) {
      return ErrorResponse(403, 'Authorization failed!')
    }

    const input = plainToClass(PaymentMethodInput, event.body)
    const error = await AppValidationError(input)

    if (error) {
      return ErrorResponse(404, error)
    }

    const payment_id = Number(event.pathParameters.id)
    const result = await this.repository.updatePaymentMethod({
      ...input,
      payment_id,
      user_id: payload.user_id,
    })

    if (result) {
      return SuccessResponse({
        message: 'Successfully updated payment method!',
      })
    } else {
      return ErrorResponse(
        500,
        'Something went wrong on updating payment method!',
      )
    }
  }
}
