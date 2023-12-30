import React, { useState } from 'react'
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js'
import { AppCSS, Spacer } from '../../components'
import { ColDiv } from '../../components/Misc/misc.styled'

interface CheckoutFormProps {
  onHandleReturn: Function
}

export const CheckoutForm: React.FC<CheckoutFormProps> = ({
  onHandleReturn,
}) => {
  const stripe = useStripe()
  const elements = useElements()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event: any) => {
    event.preventDefault()
    if (!stripe || !elements || isSubmitting) {
      return
    }
    setIsSubmitting(true)
    const response = await stripe.confirmPayment({
      elements,
      redirect: 'if_required',
    })
    onHandleReturn(response)
    setIsSubmitting(false)
  }

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <Spacer size={2} direction="col" />
      <ColDiv
        style={{
          alignItems: 'center',
        }}
      >
        <button
          type="submit"
          disabled={!stripe || isSubmitting}
          style={{
            flexDirection: 'row',
            background: !stripe ? AppCSS.GRAY : AppCSS.ORANGE,
            color: AppCSS.WHITE,
            width: '180px',
            height: '42px',
            justifyContent: 'center',
            border: `none`,
            borderRadius: '4px',
            margin: 0,
          }}
        >
          {isSubmitting ? 'Processing...' : 'Pay with Stripe'}
        </button>
      </ColDiv>
    </form>
  )
}
