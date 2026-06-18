import { useDispatch, useSelector } from "react-redux";
import { fetchSingleProduct } from "../reduxSystem/slices/getSingleProdSlice";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardBody } from "@material-tailwind/react";
import { addReview } from "../reduxSystem/slices/addReviewSLice";
import { deleteReview } from "../reduxSystem/slices/deleteReviewSlice";
import Swal from "sweetalert2";
import EditReview from "../components/EditReview/EditReview";
import { addToCartApi } from "../reduxSystem/slices/backAddToCartSlice";
import { fetchRelatedProducts } from "../reduxSystem/slices/getRelatedProductSlice";
import { toggleFavorite } from "../reduxSystem/slices/favouriteSlice";
import { toast } from "react-toastify";
import { LocalStorageUtils } from "../utils/localStorageUtils";
import { useTranslation } from "react-i18next";

// Import Components
import ProductImageGallery from "../components/ProductDetails/ProductImageGallery";
import ProductInfo from "../components/ProductDetails/ProductInfo";
import ProductVariants from "../components/ProductDetails/ProductVariants";
import ProductPricing from "../components/ProductDetails/ProductPricing";
import ProductActions from "../components/ProductDetails/ProductActions";
import ProductShare from "../components/ProductDetails/ProductShare";
import ProductReviews from "../components/ProductDetails/ProductReviews";
import RelatedProducts from "../components/ProductDetails/RelatedProducts";
import ThumbnailImages from "../components/ProductDetails/ThumbnailImages";

const ProductDetailsPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { isRTL } = useSelector((state) => state.RTLState);
  const { id } = useParams();
  const [quantity, setQuantity] = useState(0);

  const { product, isLoading } = useSelector(
    (state) => state.singleProductState,
  );

  const { userData, isLogged } = useSelector((state) => state.authState);
  const { relatedProducts } = useSelector(
    (state) => state.relatedProductsState,
  );

  console.log("product from prod details", product);

  // Product State
  const [selectedColor, setSelectedColor] = useState(
    product?.variants?.[0]?.color || null,
  );
  const [selectedSize, setSelectedSize] = useState(
    product?.variants?.[0]?.size || null,
  );
  const [variantPrice, setVariantPrice] = useState(
    product?.variants?.[0]?.price || product?.price || 0,
  );
  const [variantStock, setVariantStock] = useState(
    product?.variants?.[0]?.stock ?? product?.stock ?? 0,
  );
  const [mainImage, setMainImage] = useState("");
  const [variantImg, setVariantImg] = useState(product?.variants?.images || []);

  // Reviews State
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);
  const [isEditOpen, setIsEditOpen] = useState(false);

  // Calculated Values
  const offerPercentage = product?.offer?.discountPercentage || 0;
  const productUrl = window.location.href;
  const productTitle = product?.title;

  // ─── Effects ──────────────────────────────────────────────────────────────

  useEffect(() => {
    if (id) {
      dispatch(fetchSingleProduct(id));
      dispatch(fetchRelatedProducts(id));
    }
  }, [dispatch, id]);

  // Initialise state when product loads
  useEffect(() => {
    if (product?.thumbnail) {
      setMainImage(product.thumbnail);
    }

    if (product?.variants?.length > 0) {
      setSelectedColor(product.variants[0]?.color || null);
      setSelectedSize(product.variants[0]?.size || null);
      setVariantPrice(product.variants[0]?.price || product?.price || 0);
      setVariantStock(product.variants[0]?.stock ?? product?.stock ?? 0);
    } else {
      // CASE: Simple product — no variants at all
      setSelectedColor(null);
      setSelectedSize(null);
      setVariantPrice(product?.price || 0);
      setVariantStock(product?.stock ?? 0);
    }
  }, [product]);

  // Sync variant images when color changes
  useEffect(() => {
    if (selectedColor) {
      const selectedVariant = product?.variants?.find(
        (variant) => variant.color === selectedColor,
      );
      if (selectedVariant?.images?.length) {
        setVariantImg(selectedVariant.images);
      } else {
        setVariantImg([]);
      }
    }
  }, [selectedColor, product]);

  // Sync variant PRICE when color or size changes
  useEffect(() => {
    if (!product) return;

    if (selectedColor) {
      let selectedVariant;

      if (selectedSize) {
        // CASE: Color + Size variant
        selectedVariant = product?.variants?.find(
          (variant) =>
            variant.color === selectedColor && variant.size === selectedSize,
        );
      } else {
        // CASE: Color only variant (size is empty string or null)
        selectedVariant = product?.variants?.find(
          (variant) => variant.color === selectedColor,
        );
      }

      setVariantPrice(selectedVariant?.price || product?.price || 0);
    } else {
      // CASE: Simple product — no color selected at all
      setVariantPrice(product?.price || 0);
    }
  }, [selectedColor, selectedSize, product]);

  // Sync variant STOCK when color or size changes
  useEffect(() => {
    if (!product) return;

    if (selectedColor) {
      let selectedVariant;

      if (selectedSize) {
        // CASE: Color + Size variant
        selectedVariant = product?.variants?.find(
          (variant) =>
            variant.color === selectedColor && variant.size === selectedSize,
        );
      } else {
        // CASE: Color only variant
        selectedVariant = product?.variants?.find(
          (variant) => variant.color === selectedColor,
        );
      }

      setVariantStock(selectedVariant?.stock ?? product?.stock ?? 0);
    } else {
      // CASE: Simple product — no color at all → use product-level stock
      setVariantStock(product?.stock ?? 0);
    }
  }, [selectedColor, selectedSize, product]);

  // ─── Handlers ─────────────────────────────────────────────────────────────

  const handleAddToCart = (prod) => {
    const token = LocalStorageUtils.getAccessToken();

    if (!token) {
      toast.warning("You need to log in first to add products to the cart 🛒");
      return;
    }

    const availableStock = variantStock ?? prod?.stock ?? 0;

    if (quantity <= 0) {
      toast.error("Please select a quantity!");
      return;
    }

    if (quantity > availableStock) {
      toast.error(`Only ${availableStock} items are available in stock!`);
      return;
    }

    const addTocartObj = {};

    if (prod?.variants?.length > 0) {
      let selectedVariant;

      if (selectedSize) {
        // CASE: Color + Size variant
        selectedVariant = prod.variants.find(
          (variant) =>
            variant.color === selectedColor &&
            variant.size === selectedSize &&
            variant.price === variantPrice,
        );
      } else {
        // CASE: Color only variant
        selectedVariant = prod.variants.find(
          (variant) => variant.color === selectedColor,
        );
      }

      if (selectedVariant) {
        addTocartObj.variantId = selectedVariant._id;
        addTocartObj.quantity = quantity;
      } else {
        // Variant not matched — fall back to product level
        addTocartObj.productId = prod._id;
        addTocartObj.quantity = quantity;
      }
    } else {
      // CASE: Simple product — no variants at all
      addTocartObj.productId = prod._id;
      addTocartObj.quantity = quantity;
    }

    dispatch(addToCartApi([addTocartObj]));
    toast.success("Product added successfully! 🛒");
  };

  const handleAddReview = () => {
    if (reviewText.trim()) {
      const newReview = {
        productId: id,
        comment: reviewText,
        rating: rating,
      };

      dispatch(addReview(newReview)).then(() => {
        dispatch(fetchSingleProduct(id));
      });

      setReviewText("");
      setRating(5);
    }
  };

  const handleDelete = (revID) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to recover this review!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteReview(revID)).then(() => {
          dispatch(fetchSingleProduct(id));
          Swal.fire({
            title: "Deleted!",
            text: "The review has been deleted successfully.",
            icon: "success",
          });
        });
      }
    });
  };

  const handleFavoriteClick = () => {
    const token = LocalStorageUtils.getAccessToken();

    if (!token) {
      toast.error("You need to log in first to add products to favorites ❤️");
      return;
    }

    dispatch(toggleFavorite(product));
    toast.success("the product added to favourites");
  };

  const handleQuantityChange = (type) => {
    const availableStock = variantStock ?? product?.stock ?? 0;

    if (type === "increase") {
      if (quantity < availableStock) {
        setQuantity(quantity + 1);
      } else {
        toast.error(`Only ${availableStock} items are available in stock!`, {
          position: "top-right",
          autoClose: 2000,
        });
      }
    } else {
      if (quantity > 1) {
        setQuantity(quantity - 1);
      }
    }
  };

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="container mx-auto my-[10%] px-5">
      <Card className="flex flex-col md:flex-row flex-wrap shadow-lg rounded-lg overflow-hidden">
        {/* Product Image Gallery */}
        <ProductImageGallery
          mainImage={mainImage}
          setMainImage={setMainImage}
          product={product}
          variantImg={variantImg}
          isLoading={isLoading}
        />

        {/* Product Details */}
        <CardBody className="w-full lg:w-1/2 p-4 md:p-6 flex flex-col justify-between">
          {/* Product Info */}
          <ProductInfo product={product} isLoading={isLoading} isRTL={isRTL} />

          {/* Product Variants — only shown when variants exist */}
          {product?.variants?.length > 0 && (
            <ProductVariants
              product={product}
              selectedColor={selectedColor}
              setSelectedColor={setSelectedColor}
              selectedSize={selectedSize}
              setSelectedSize={setSelectedSize}
            />
          )}

          {/* Product Pricing */}
          <ProductPricing
            product={product}
            variantPrice={variantPrice}
            variantStock={variantStock}
            offerPercentage={offerPercentage}
            selectedColor={selectedColor}
            selectedSize={selectedSize}
            isLoading={isLoading}
            isRTL={isRTL}
          />

          {/* Product Actions */}
          <ProductActions
            product={product}
            quantity={quantity}
            handleQuantityChange={handleQuantityChange}
            handleAddToCart={handleAddToCart}
            handleFavoriteClick={handleFavoriteClick}
            variantStock={variantStock}
            isLoading={isLoading}
            isRTL={isRTL}
          />

          {/* Product Share */}
          <ProductShare productUrl={productUrl} productTitle={productTitle} />

          <ThumbnailImages
            mainImage={mainImage}
            setMainImage={setMainImage}
            product={product}
            variantImg={variantImg}
            isLoading={isLoading}
          />
        </CardBody>
      </Card>

      {/* Related Products */}
      <RelatedProducts relatedProducts={relatedProducts} />

      {/* Product Reviews */}
      <ProductReviews
        product={product}
        reviewText={reviewText}
        setReviewText={setReviewText}
        rating={rating}
        setRating={setRating}
        handleAddReview={handleAddReview}
        handleDelete={handleDelete}
        isLogged={isLogged}
        userData={userData}
        setIsEditOpen={setIsEditOpen}
        isEditOpen={isEditOpen}
        EditReview={EditReview}
        id={id}
      />
    </div>
  );
};

export default ProductDetailsPage;
