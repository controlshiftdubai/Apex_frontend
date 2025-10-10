"use client"

import { useState } from 'react'
import Image from 'next/image'
import { useProfileReviews } from '@/utils/api/hooks/profile'
import { useCreateReview } from '@/utils/api/hooks/review'
import Loading from '@/components/loading'
import { toast } from 'sonner'

export default function ToReviewSection() {
  const { data, isLoading } = useProfileReviews({ params: { status: 'pending' }, payload: {} });
  const createReviewMutation = useCreateReview();

  const [reviewForms, setReviewForms] = useState<Record<string, { rating: number; comment: string }>>({});

  if (isLoading) {
    return <Loading />;
  }

  const reviews = data?.payload?.reviews || [];

  const handleRatingChange = (reviewId: string, rating: number) => {
    setReviewForms(prev => ({
      ...prev,
      [reviewId]: {
        ...prev[reviewId],
        rating
      }
    }));
  };

  const handleCommentChange = (reviewId: string, comment: string) => {
    setReviewForms(prev => ({
      ...prev,
      [reviewId]: {
        ...prev[reviewId],
        comment
      }
    }));
  };

  const handleSubmit = async (review: any) => {
    const form = reviewForms[review.id];

    if (!form?.rating) {
      toast.error('Please select a rating');
      return;
    }

    if (!form?.comment || form.comment.trim().length < 10) {
      toast.error('Please write at least 10 characters');
      return;
    }

    try {
      const result = await createReviewMutation.mutateAsync({
        productId: review.productId,
        orderId: review.orderId,
        rating: form.rating,
        comment: form.comment.trim(),
      });

      if (!result.error) {
        toast.success('Review submitted successfully');
        // Clear form
        setReviewForms(prev => {
          const newForms = { ...prev };
          delete newForms[review.id];
          return newForms;
        });
      } else {
        toast.error(result.message || 'Failed to submit review');
      }
    } catch (error: any) {
      toast.error(error?.message || 'Failed to submit review');
    }
  };

  return (
    <div className="bg-white border border-gray-200 p-6">
      <h2 className="relative inline-block mb-6">
        <span className="relative z-10 text-2xl ">Products to Review</span>
        <span
          className="absolute bottom-0 h-[10px] bg-[var(--underline-color)]"
          style={{ left: "-8px", right: "-8px" }}
          aria-hidden="true"
        />
      </h2>

      {reviews.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">No products to review</p>
          <p className="text-sm text-gray-400">Products you've purchased will appear here for review</p>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review: any) => {
            const form = reviewForms[review.id] || { rating: 0, comment: '' };

            return (
              <div key={review.id} className="border border-gray-200 p-4">
                <div className="flex gap-4 mb-4">
                  <div className="w-20 h-20 bg-gray-100 border border-gray-200 flex-shrink-0">
                    <Image
                      src={review.product.thumbnail}
                      alt={review.product.name}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2">{review.product.name}</h3>
                    <div className="flex items-center gap-1 mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => handleRatingChange(review.id, star)}
                          className={`text-2xl cursor-pointer transition-colors ${star <= form.rating ? 'text-orange-400' : 'text-gray-300 hover:text-orange-200'
                            }`}
                        >
                          ★
                        </button>
                      ))}
                      {form.rating > 0 && (
                        <span className="ml-2 text-sm text-gray-600">({form.rating} stars)</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">
                      Purchased on {new Date(review.order.createdAt).toLocaleDateString('en-US', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                </div>

                <textarea
                  value={form.comment}
                  onChange={(e) => handleCommentChange(review.id, e.target.value)}
                  placeholder="Write your review here... (minimum 10 characters)"
                  className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-4"
                  rows={4}
                />

                <div className="flex justify-between items-center">
                  <p className="text-xs text-gray-500">
                    {form.comment.length} characters
                  </p>
                  <button
                    onClick={() => handleSubmit(review)}
                    disabled={createReviewMutation.isPending}
                    className="px-6 py-2 bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {createReviewMutation.isPending ? 'Submitting...' : 'Submit Review'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  )
}
