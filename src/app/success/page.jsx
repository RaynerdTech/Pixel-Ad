'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, Loader2 } from 'lucide-react';

// const BACKEND_URL = 'http://localhost:5000'; // backend base url
const GRID_WIDTH = 100; // adjust this to your actual grid width

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const reference = searchParams.get('reference');

  const [pixel, setPixel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  function getRowCol(position) {
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
        if (!res.ok) {
          throw new Error(data.message || 'Failed to verify payment');
        }

        if (data.success) {
          setPixel(data.pixel);
        } else {
          setError(data.message || 'Payment verification failed.');
        }
      } catch (err) {
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

  if (!pixel) return null;

  const { row, col } = getRowCol(pixel.position);

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-100 to-white flex items-center justify-center px-4 py-12 animate-fadeIn">
      <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-xl w-full text-center border border-gray-200">
        {loading ? (
          <div className="flex flex-col items-center justify-center">
            <Loader2 className="h-10 w-10 text-emerald-500 animate-spin" />
            <p className="mt-4 text-gray-600">Verifying your payment...</p>
          </div>
        ) : error ? (
          <div className="text-red-600">
            <p className="text-lg font-semibold mb-2">⛔ {error}</p>
            <p className="text-sm text-gray-500">Please contact support if the issue persists.</p>
          </div>
        ) : (
          <>
            <CheckCircle className="h-12 w-12 text-emerald-500 mx-auto mb-4" />
            <h1 className="text-3xl font-semibold text-gray-800 mb-2">Payment Successful!</h1>
            <p className="text-gray-600 mb-6">Your pixel has been added to the grid.</p>

            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-left text-sm text-gray-700 shadow-inner mb-4">
              <p className="mb-1">
                <span className="font-medium text-gray-800">Pixel Position:</span>{' '}
                Row {row}, Column {col}
              </p>
              <p className="mb-1">
                <span className="font-medium text-gray-800">Link:</span>{' '}
                <a
                  href={pixel.linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  {pixel.linkUrl}
                </a>
              </p>
              <p className="mb-1">
                <span className="font-medium text-gray-800">Amount Paid:</span> ₦{pixel.amount}
              </p>
              <p className="mb-1">
                <span className="font-medium text-gray-800">Description:</span>{' '}
                {pixel.description}
              </p>
              <p>
                <span className="font-medium text-gray-800">Reference:</span> {pixel.reference}
              </p>
            </div>

            <p className="mb-4 text-sm italic text-gray-600">
              <strong>Note:</strong> Look at your pixel position above. Click the button below to go back and find your pixel easily on the grid by row and column.
            </p>

            <div className="mt-6">
              <img
                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${pixel.imageUrl}`}
                alt="Uploaded Pixel"
                className="w-24 h-24 object-cover rounded-lg border mx-auto mb-6"
              />
            </div>

            <button
              onClick={() => window.location.href = '/'}
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition-transform active:scale-95"
            >
              Go Back to Home
            </button>
          </>
        )}
      </div>
    </div>
  );
}
