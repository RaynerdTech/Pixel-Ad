'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { CheckCircle, Loader2, XCircle } from 'lucide-react';

const GRID_WIDTH = 100;

type Pixel = {
  position: number;
  linkUrl: string;
  amount: number;
  description: string;
  reference: string;
  imageUrl: string;
};

// A wrapper component for a consistent card layout across all states
const StatusCard = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
    <div className="w-full max-w-lg bg-white shadow-2xl rounded-2xl p-6 sm:p-10 text-center transform transition-all duration-300">
      {children}
    </div>
  </div>
);

// A reusable button for navigation
const HomeButton = () => (
    <button
      onClick={() => (window.location.href = '/')}
      className="mt-8 bg-gradient-to-r from-sky-500 to-sky-600 text-white font-bold px-8 py-3 rounded-full shadow-lg hover:shadow-xl hover:from-sky-600 hover:to-sky-700 transition-all duration-300 ease-in-out transform active:scale-95 hover:scale-105 tracking-wide"
    >
      Explore the Grid
    </button>
);


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
    // This effect is side-effect free in terms of rendering, so we disable the exhaustive-deps rule.
    const verifyPayment = async () => {
      if (!reference) {
          setError('No payment reference found.');
          setLoading(false);
          return;
      }
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/payment/verify/${reference}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Failed to verify payment');

        if (data.success) {
          setPixel(data.pixel);
        } else {
          setError(data.message || 'Payment verification failed.');
        }
      } catch (err: any) {
        setError(err.message || 'Something went wrong while verifying payment.');
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reference]);

  if (loading) {
    return (
      <StatusCard>
        <div className="flex flex-col items-center justify-center gap-y-5">
          <Loader2 className="h-12 w-12 text-sky-500 animate-spin" />
          <p className="text-lg text-slate-700 font-medium">Verifying your payment...</p>
          <p className="text-sm text-slate-500">Please wait a moment.</p>
        </div>
      </StatusCard>
    );
  }

  if (error) {
    return (
      <StatusCard>
        <div className="flex flex-col items-center justify-center gap-y-4">
            <XCircle className="h-16 w-16 text-red-500 mx-auto" />
            <h1 className="text-2xl font-bold text-slate-800">Payment Error</h1>
            <p className="text-base text-slate-600 max-w-md">
                {error}
            </p>
            <p className="text-sm text-slate-500 mt-2">
                Please contact support if this issue persists.
            </p>
            <HomeButton />
        </div>
      </StatusCard>
    );
  }

  if (!pixel) {
    // This case handles a successful API call that returns no pixel and no error.
    return (
        <StatusCard>
            <div className="flex flex-col items-center justify-center gap-y-4">
                <XCircle className="h-16 w-16 text-slate-500 mx-auto" />
                <h1 className="text-2xl font-bold text-slate-800">Pixel Not Found</h1>
                <p className="text-base text-slate-600">
                    We couldn't retrieve your pixel details, even though the payment was processed.
                </p>
                 <p className="text-sm text-slate-500 mt-2">
                    Please contact our support with your transaction reference.
                </p>
                <HomeButton />
            </div>
        </StatusCard>
    );
  }

  const { row, col } = getRowCol(pixel.position);

  // Detail Row Component for the receipt
  const DetailRow = ({ label, value, isLink = false, isBreakable = false }: { label: string, value: string | number, isLink?: boolean, isBreakable?: boolean }) => (
    <div className="py-3 px-4 bg-slate-50/75 rounded-lg flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4">
      <dt className="text-sm font-semibold text-slate-600">{label}</dt>
      <dd className={`text-sm text-slate-800 sm:text-right font-medium ${isBreakable ? 'break-all' : 'truncate'}`}>
        {isLink ? (
          <a href={value as string} target="_blank" rel="noopener noreferrer" className="text-sky-600 hover:text-sky-800 hover:underline transition-colors duration-200">
            {value}
          </a>
        ) : (
          value
        )}
      </dd>
    </div>
  );

  return (
    <StatusCard>
        <div className="flex flex-col items-center justify-center gap-y-3">
            <CheckCircle className="h-16 w-16 text-teal-500 drop-shadow-md" />
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">Payment Confirmed!</h1>
            <p className="text-base text-slate-600 mb-6">Your unique pixel now shines brightly on our grid.</p>
        </div>

        {pixel.imageUrl && (
            <div className="mb-8 flex justify-center">
            <Image
                src={pixel.imageUrl}
                alt="Your Purchased Pixel"
                width={128}
                height={128}
                className="rounded-2xl border-4 border-white shadow-lg transition-transform duration-300 hover:scale-105"
                priority
            />
            </div>
        )}

        <dl className="w-full space-y-3 text-left">
            <DetailRow label="Pixel Location" value={`Row ${row}, Column ${col}`} />
            <DetailRow label="Amount Paid" value={`₦${new Intl.NumberFormat('en-NG').format(pixel.amount)}`} />
            <DetailRow label="Your Link" value={pixel.linkUrl} isLink isBreakable />
            <DetailRow label="Description" value={pixel.description} isBreakable />
            <DetailRow label="Transaction ID" value={pixel.reference} isBreakable />
        </dl>

       <HomeButton />
    </StatusCard>
  );
}