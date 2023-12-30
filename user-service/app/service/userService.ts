import { APIGatewayProxyEventV2 } from 'aws-lambda'
import { SuccessResponse, ErrorResponse } from '../utility/response'
import { UserRepository } from '../repository/userRepository'
import { autoInjectable } from 'tsyringe'
import { plainToClass } from 'class-transformer'
import { SignupInput } from '../models/dto/SignupInput'
import { AppValidationError } from '../utility/errors'
import {
  GetSalt,
  GetHashedPassword,
  ValidatePassword,
  GetToken,
  VerifyToken,
} from '../utility/password'
import { LoginInput } from '../models/dto/LoginInput'
import { VerificationInput } from '../models/dto/UpdateInput'
import {
  GenerateAccessCode,
  SendVerificationCode,
} from '../utility/notification'
import { TimeDifference } from '../utility/dateHelper'
import { ProfileInput } from '../models/dto/AddressInput'

@autoInjectable()
export class UserService {
  repository: UserRepository
  constructor(repository: UserRepository) {
    this.repository = repository
  }

  async ResponseWithError(event: APIGatewayProxyEventV2) {
    return ErrorResponse(404, 'requested method is not supported!')
  }
  // User creation, validation & login
  async CreateUser(event: APIGatewayProxyEventV2) {
    try {
      const input = plainToClass(SignupInput, event.body)

      const error = await AppValidationError(input)
      if (error) return ErrorResponse(404, error)

      const salt = await GetSalt()
      const hashedPassword = await GetHashedPassword(input.password, salt)
      const data = await this.repository.createAccount({
        email: input.email,
        password: hashedPassword,
        phone: input.phone,
        user_type: 'BUYER',
        salt: salt,
      })

      const token = GetToken(data)
      return SuccessResponse({
        token,
        email: data.email,
        firstName: data.first_name,
        lastName: data.last_name,
        phone: data.phone,
        userType: data.user_type,
        _id: data.user_id,
      })
    } catch (error) {
      console.log(error)
      return ErrorResponse(500, error)
    }
  }

  async UserLogin(event: APIGatewayProxyEventV2) {
    try {
      const input = plainToClass(LoginInput, event.body)
      const error = await AppValidationError(input)
      if (error) return ErrorResponse(404, error)
      const data = await this.repository.findAccount(input.email)
      const verified = await ValidatePassword(
        input.password,
        data.password,
        data.salt,
      )
      if (!verified) {
        throw new Error('password does not match!')
      }
      const token = GetToken(data)

      return SuccessResponse({
        token,
        email: data.email,
        firstName: data.first_name,
        lastName: data.last_name,
        phone: data.phone,
        userType: data.user_type,
        _id: data.user_id,
      })
    } catch (error) {
      console.log(error)
      return ErrorResponse(500, error)
    }
  }

  async GetVerificationToken(event: APIGatewayProxyEventV2) {
    const token = event.headers.authorization
    const payload = await VerifyToken(token)

    if (!payload) return ErrorResponse(403, 'Authorization failed!')

    const { code, expiry } = GenerateAccessCode()
    await this.repository.updateVerificationCode(payload.user_id, code, expiry)

    // await SendVerificationCode(code, payload.phone);

    return SuccessResponse({
      message: 'verification code is sent to your registered mobile number!',
    })
  }
  async VerifyUser(event: APIGatewayProxyEventV2) {
    const token = event.headers.authorization
    const payload = await VerifyToken(token)
    if (!payload) return ErrorResponse(403, 'Authorization failed!')

    const input = plainToClass(VerificationInput, event.body)
    const error = await AppValidationError(input)
    if (error) return ErrorResponse(404, error)

    const { verification_code, expiry } = await this.repository.findAccount(
      payload.email,
    )
    // Find user account
    if (verification_code === parseInt(input.code)) {
      // Check expiry
      const currentTime = new Date()
      const diff = TimeDifference(expiry, currentTime.toISOString(), 'm')

      if (diff > 0) {
        console.log('verified successfully!')
        await this.repository.updateVerifyUser(payload.user_id)
      } else {
        return ErrorResponse(403, 'verification code is expired!')
      }
    }
    return SuccessResponse({ message: 'user verified!' })
  }

  // User profile
  async CreateProfile(event: APIGatewayProxyEventV2) {
    try {
      const token = event.headers.authorization
      const payload = await VerifyToken(token)
      if (!payload) return ErrorResponse(403, 'Authorization failed!')

      const input = plainToClass(ProfileInput, event.body)
      const error = await AppValidationError(input)
      if (error) return ErrorResponse(404, error)

      const result = await this.repository.createProfile(payload.user_id, input)

      return SuccessResponse(result)
    } catch (error) {
      ErrorResponse(500, error)
    }
  }
  async GetProfile(event: APIGatewayProxyEventV2) {
    try {
      const token = event.headers.authorization
      const payload = await VerifyToken(token)
      if (!payload) return ErrorResponse(403, 'Authorization failed!')

      const result = await this.repository.getUserProfile(payload.user_id)
      console.log(result)

      return SuccessResponse(result)
    } catch (error) {
      ErrorResponse(500, error)
    }
  }
  async EditProfile(event: APIGatewayProxyEventV2) {
    try {
      const token = event.headers.authorization
      const payload = await VerifyToken(token)
      if (!payload) return ErrorResponse(403, 'Authorization failed!')

      const input = plainToClass(ProfileInput, event.body)
      const error = await AppValidationError(input)
      if (error) return ErrorResponse(404, error)
      await this.repository.editProfile(payload.user_id, input)

      return SuccessResponse({ message: 'Profile updated' })
    } catch (error) {
      ErrorResponse(500, error)
    }
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
