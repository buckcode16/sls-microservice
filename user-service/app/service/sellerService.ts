import { APIGatewayProxyEventV2 } from 'aws-lambda'
import { SellerRepository } from '../repository/sellerRepository'

export class SellerService {
  repository: SellerRepository

  constructor(repository: SellerRepository) {
    this.repository = repository
  }

  async JoinSellerProgram(event: APIGatewayProxyEventV2) {}

  async GetPaymentMethods(event: APIGatewayProxyEventV2) {}

  async EditPaymentMethods(event: APIGatewayProxyEventV2) {}
}
