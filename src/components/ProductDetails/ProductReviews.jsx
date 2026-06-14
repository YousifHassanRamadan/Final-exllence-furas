import React from "react";
import { Typography, Button, Textarea } from "@material-tailwind/react";
import { Star, Pencil, Trash } from "lucide-react";
import { useTranslation } from "react-i18next";

const ProductReviews = ({
  product,
  reviewText,
  setReviewText,
  rating,
  setRating,
  handleAddReview,
  handleDelete,
  isLogged,
  userData,
  setIsEditOpen,
  isEditOpen,
  EditReview,
  id,
}) => {
  const { t } = useTranslation();

  return (
    <div className="mt-12 bg-white p-6 rounded-lg shadow-md">
      <Typography variant="h5" className="font-bold text-[#284980] mb-6">
        {t("customer_reviews")}
      </Typography>

      {/* Review Form - مخفية للمنتجات القادمة قريباً */}
      {!product?.comingSoon && (
        <div className="mb-8 bg-gray-50 p-6 rounded-lg shadow">
          <Typography className="font-semibold text-2xl text-[#284980] mb-6">
            {t("leave_review")}
          </Typography>

          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2 text-lg">
              {t("your_review")}
            </label>
            <Textarea
              variant="static"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              className="border border-gray-300 rounded-md p-3 w-full"
            />
          </div>

          {/* التقييم */}
          <div className="mb-8">
            <label className="block text-gray-700 font-medium mb-2 text-lg">
              {t("rating")}
            </label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={28}
                  className={`cursor-pointer transition-colors duration-200 ${
                    rating >= star ? "text-yellow-500" : "text-gray-400"
                  }`}
                  onClick={() => setRating(star)}
                />
              ))}
            </div>
          </div>

          {/* زر الإرسال */}
          <Button
            onClick={handleAddReview}
            className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-2 rounded-md"
            disabled={!isLogged}
          >
            {t("submit_review")}
          </Button>
        </div>
      )}

      {/* Coming Soon Message for Reviews */}
      {product?.comingSoon && (
        <div className="mb-8 bg-blue-50 p-6 rounded-lg border border-blue-200">
          <Typography className="text-blue-700">
            {t("reviews_after_launch")}
          </Typography>
        </div>
      )}

      {/* Display Reviews */}
      {product?.reviews?.length > 0 ? (
        product.reviews.map((review, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-4 border border-gray-200 mb-4 flex items-start gap-4 relative"
          >
            {/* أفاتار يحتوي على أول حرف من الاسم */}
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 text-white text-lg font-bold">
              {review?.userId?.fname?.charAt(0).toUpperCase()}
            </div>

            {/* تفاصيل المراجعة */}
            <div className="flex-1">
              <Typography className="text-lg font-semibold text-gray-800">
                {review?.userId?.fname} {review?.userId?.lname}
              </Typography>
              <p className="text-gray-700">{review.comment}</p>
              <div className="text-yellow-500 font-bold">
                {"★".repeat(review.rating)}
              </div>
              <Typography className="text-gray-500 text-sm">
                {new Date(review.createdAt).toLocaleString()}
              </Typography>
            </div>

            {/* أزرار التعديل والحذف بأيقونات */}
            {userData?._id === review.userId?._id && (
              <div className="flex gap-2 absolute right-4 top-4">
                <button
                  onClick={() => setIsEditOpen(true)}
                  className="p-2 rounded-full bg-yellow-500 text-white hover:bg-yellow-600 transition"
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => {
                    handleDelete(review._id);
                  }}
                  className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition"
                >
                  <Trash size={16} />
                </button>
                {isEditOpen && (
                  <div className="fixed inset-0 flex items-center justify-center bg-transparent backdrop-blur-md z-50 w-full">
                    <EditReview
                      review={review}
                      setIsEditOpen={setIsEditOpen}
                      id={id}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        ))
      ) : (
        <Typography className="text-gray-500">
          {product?.comingSoon
            ? t("reviews_after_launch")
            : t("no_reviews_yet")}
        </Typography>
      )}
    </div>
  );
};

export default ProductReviews;
