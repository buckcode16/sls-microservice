import { CreatePaymentSessionInput } from '../models/dto/CreatePaymentSessionInput'
import Stripe from 'stripe'

export const STRIPE_SECRET_KEY =
  'sk_test_51Lk6vcEZ0tWljSHVvwZnDPVxrkrU8ajJoUzPs3FxBZb3EcoF8YN8XbOBRfY3gp9bPOxL10xlMZ4yAVGg3T0WIcl300Qrq4ie4D'
export const STRIPE_PUBLISHABLE_KEY =
  'pk_test_51Lk6vcEZ0tWljSHVInJCCsfd54GpSVwbNjnOEoapDTjoHKGyEHi4YP6dY8qCtIMWuXGmGPq2dSCZAf0TwZKWLSpl0008fHNYcj'

export const APPLICATION_FEE = (totalAmount: number) => {
  const appFee = 1.5 // application fee in %
  return (totalAmount / 100) * appFee
}

export const STRIPE_FEE = (totalAmount: number) => {
  const perTransaction = 2.9 // 2.9 % per transaction
  const fixCost = 0.29 // 29 cents
  const stripeCost = (totalAmount / 100) * perTransaction
  return stripeCost + fixCost
}

const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
})

export const CreatePaymentSession = async ({
  email,
  phone,
  amount,
  customerId,
}: CreatePaymentSessionInput) => {
  let currentCustomerId: string

  if (customerId) {
    const customer = await stripe.customers.retrieve(customerId)
    currentCustomerId = customer.id
  } else {
    const customer = await stripe.customers.create({
      email,
    })
    currentCustomerId = customer.id
  }

  const { client_secret, id } = await stripe.paymentIntents.create({
    customer: currentCustomerId,
    payment_method_types: ['card'],
    amount: parseInt(`${amount * 100}`), // assign as cents
    currency: 'usd',
  })

  return {
    secret: client_secret,
    publishableKey: STRIPE_PUBLISHABLE_KEY,
    paymentId: id,
    customerId: currentCustomerId,
  }
}

export const RetrivePayment = async (paymentId: string) => {
  return stripe.paymentIntents.retrieve(paymentId)
}
