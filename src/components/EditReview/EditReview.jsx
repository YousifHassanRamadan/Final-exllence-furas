import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Input } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useDispatch } from "react-redux";
import { updateReview } from "../../reduxSystem/slices/editReviewSlice";
import { fetchSingleProduct } from "../../reduxSystem/slices/getSingleProdSlice";
import Swal from "sweetalert2";

const EditReview = ({ review, setIsEditOpen, id }) => {
  const dispatch = useDispatch();
  // console.log("review", review);

  const formik = useFormik({
    initialValues: {
      rating: review?.rating || "",
      comment: review?.comment || "",
    },
    validationSchema: Yup.object({
      rating: Yup.number()
        .min(1, "Rating must be at least 1")
        .max(5, "Rating cannot exceed 5")
        .required("Rating is required"),
      comment: Yup.string().required("Comment is required"),
    }),
    onSubmit: (values) => {
      const editedRev = { reviewId: review._id, ...values };

      // console.log("editedRev", editedRev);

      dispatch(updateReview(editedRev)).then((response) => {
        if (response.meta.requestStatus === "fulfilled") {
          Swal.fire({
            icon: "success",
            title: "Review Updated!",
            text: "Your review has been successfully updated.",
            confirmButtonColor: "#3085d6",
          }).then(() => {
            dispatch(fetchSingleProduct(id)).then(() => {
              setIsEditOpen(false);
            });
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Update Failed",
            text: "Something went wrong while updating your review.",
            confirmButtonColor: "#d33",
          });
        }
      });
    },
  });

  return (
    <div className="relative w-[70%] p-4 border rounded-md shadow-md bg-white">
      <button
        className="absolute top-2 right-2 p-1 text-white bg-red-500 rounded-2xl transition-transform hover:rotate-180 cursor-pointer "
        onClick={() => setIsEditOpen(false)}
      >
        <XMarkIcon className="w-6 h-6" />
      </button>
      <form onSubmit={formik.handleSubmit} className="space-y-4 mt-5">
        <Input
          variant="static"
          label="Rating"
          placeholder="Enter rating"
          type="number"
          name="rating"
          value={formik.values.rating}
          onChange={formik.handleChange}
          error={formik.touched.rating && Boolean(formik.errors.rating)}
        />
        {formik.touched.rating && formik.errors.rating && (
          <p className="text-red-500 text-sm">{formik.errors.rating}</p>
        )}
        <Input
          variant="static"
          label="Comment"
          placeholder="Enter your review"
          type="text"
          name="comment"
          value={formik.values.comment}
          onChange={formik.handleChange}
          error={formik.touched.comment && Boolean(formik.errors.comment)}
        />
        {formik.touched.comment && formik.errors.comment && (
          <p className="text-red-500 text-sm">{formik.errors.comment}</p>
        )}
        <Button type="submit" color="blue">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default EditReview;
