import React from "react";

const ThumbnailImages = ({
  mainImage,
  setMainImage,
  product,
  variantImg,
  isLoading,
}) => {
  return (
    <div>
      {" "}
      {!isLoading && (
        <div className="mt-6 flex gap-2 overflow-x-auto">
          {[product?.thumbnail, ...(product?.images || []), ...variantImg]
            .filter((img) => img)
            .map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Product variant ${index}`}
                className={`w-16 h-16 object-cover border-2 rounded-lg cursor-pointer transition ${
                  mainImage === img ? "border-[#284980]" : "border-gray-300"
                } ${product?.comingSoon ? "opacity-70" : ""}`}
                onClick={() => {
                  setMainImage(img),
                    window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default ThumbnailImages;
