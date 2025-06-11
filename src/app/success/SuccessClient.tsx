'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, Loader2 } from 'lucide-react';

const GRID_WIDTH = 100;

// ✅ Define the type for pixel object
type Pixel = {
  position: number;
  linkUrl: string;
  amount: number;
  description: string;
  reference: string;
  imageUrl: string;
};

export default function SuccessClient() {
  const searchParams = useSearchParams();
  const reference = searchParams.get('reference');

  const [pixel, setPixel] = useState<Pixel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  function getRowCol(position: number | string | null) {
    const posNum = Number(position);
    if (!posNum || posNum < 1) return { row: '?', col: '?' };
    const row = Math.floor((posNum - 1) / GRID_WIDTH) + 1;
    const col = ((posNum - 1) % GRID_WIDTH) + 1;
    return { row, col };
  }

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/payment/verify/${reference}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Failed to verify payment');

        if (data.success) {
          setPixel(data.pixel);
        } else {
          setError(data.message || 'Payment verification failed.');
        }
      } catch {
        setError('Something went wrong while verifying payment.');
      } finally {
        setLoading(false);
      }
    };

    if (reference) {
      verifyPayment();
    } else {
      setError('No payment reference found.');
      setLoading(false);
    }
  }, [reference]);

  // Handle loading and error states first
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex items-center justify-center px-4 py-12 animate-fadeIn">
        <div className="bg-white shadow-3xl rounded-3xl p-10 max-w-xl w-full text-center border border-blue-100 transform transition-all duration-500 hover:scale-[1.01]">
          <div className="flex flex-col items-center justify-center">
            <Loader2 className="h-12 w-12 text-blue-500 animate-spin-slow" />
            <p className="mt-5 text-lg text-blue-700 font-medium">Verifying your payment...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex items-center justify-center px-4 py-12 animate-fadeIn">
        <div className="bg-white shadow-3xl rounded-3xl p-10 max-w-xl w-full text-center border border-blue-100 transform transition-all duration-500 hover:scale-[1.01]">
          <div className="text-red-600">
            <p className="text-xl font-bold mb-3">⛔ Oh no! {error}</p>
            <p className="text-base text-gray-500">Please contact support if the issue persists. We're here to help!</p>
          </div>
        </div>
      </div>
    );
  }

  // If we reach here, it means loading is false and there's no error,
  // so pixel should have data. TypeScript will now be confident.
  // We can also add a final check just in case, though it should ideally be unreachable.
  if (!pixel) {
    return null; // Or render a generic message if neither loading nor error, but no pixel.
  }

  const { row, col } = getRowCol(pixel.position);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex items-center justify-center px-4 py-12 animate-fadeIn">
      <div className="bg-white shadow-3xl rounded-3xl p-10 max-w-xl w-full text-center border border-blue-100 transform transition-all duration-500 hover:scale-[1.01]">
        <>
          <CheckCircle className="h-16 w-16 text-blue-500 mx-auto mb-6 drop-shadow-lg" />
          <h1 className="text-4xl font-extrabold text-blue-800 mb-3 tracking-tight">Payment Confirmed!</h1>
          <p className="text-lg text-blue-600 mb-8 font-light">Your unique pixel now shines brightly on our grid.</p>

          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 text-left text-base text-blue-700 shadow-lg mb-8 transition-all duration-300 hover:shadow-xl">
            <p className="mb-2">
              <strong className="text-blue-900">Pixel Location:</strong> Row {row}, Column {col}
            </p>
            <p className="mb-2">
              <strong className="text-blue-900">Your Link:</strong>{' '}
              <a href={pixel.linkUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline ml-2 transition-colors duration-200">
                {pixel.linkUrl}
              </a>
            </p>
            <p className="mb-2">
              <strong className="text-blue-900">Amount Secured:</strong> ₦{pixel.amount}
            </p>
            <p className="mb-2">
              <strong className="text-blue-900">Description:</strong> {pixel.description}
            </p>
            <p>
              <strong className="text-blue-900">Transaction ID:</strong> {pixel.reference}
            </p>
          </div>

          {pixel.imageUrl && (
            <div className="mt-8">
              <img
                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${pixel.imageUrl}`}
                alt="Your Unique Pixel"
                className="w-32 h-32 object-cover rounded-xl border-4 border-blue-300 shadow-lg mx-auto mb-8 transition-transform duration-300 hover:scale-105"
              />
            </div>
          )}

          <button
            onClick={() => window.location.href = '/'}
            className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-bold px-8 py-4 rounded-full shadow-2xl transition-all duration-300 ease-in-out transform active:scale-98 hover:scale-105 tracking-wide text-lg"
          >
            Explore the Grid
          </button>
        </>
      </div>
    </div>
  );
}