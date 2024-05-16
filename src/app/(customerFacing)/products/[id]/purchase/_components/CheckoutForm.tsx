'use client';
import { formatCurrency } from '@/lib/formatters';
import {
  Elements,
  useStripe,
  useElements,
  PaymentElement,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Image from 'next/image';

type CheckoutFormProps = {
  product: {
    imagePath: string;
    name: string;
    priceInCents: number;
    description: string;
  };
  clientSecret: string;
};

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
);

export default function CheckoutForm({
  product,
  clientSecret,
}: CheckoutFormProps) {
  return (
    <div className='w-full max-w-5xl mx-auto space-y-8'>
      <div className='flex gap-4 items-center'>
        <div className='aspect-video flex-shrink-0 w-1/3 relative'>
          <Image src={product.imagePath} fill alt={product.name} />
        </div>
        <div>
          <div className='text-lg'>
            {formatCurrency(product.priceInCents / 100)}
          </div>
          <h1 className='text-2xl font-bold'>{product.name}</h1>
          <div className='line-clamp-3 text-muted-foreground'>{product.description}</div>
        </div>
      </div>
      <Elements options={{ clientSecret }} stripe={stripePromise}>
        <Form />
      </Elements>
    </div>
  );
}

function Form() {
  const stripe = useStripe();
  const elemenst = useElements();
  return <PaymentElement />;
}