import { useEffect, useState } from "react";
import { ImCancelCircle } from "react-icons/im";
import { useDispatch } from "react-redux";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Swal from "sweetalert2";
import { Minus, Plus } from "lucide-react";
import Rating from "react-rating-stars-component"; // ✅ استيراد مكتبة التقييم
import { addToCartApi } from "../../reduxSystem/slices/backAddToCartSlice";
import { LocalStorageUtils } from "../../utils/localStorageUtils";

const ViewProduct = ({ setIsOpen, product }) => {
  const { title, price, description, images, thumbnail } = product;

  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);

  const [mainImage, setMainImage] = useState(thumbnail);

  const [comment, setComment] = useState("");

  const [comments, setComments] = useState([]);

  const [rating, setRating] = useState(0); // ✅ حفظ تقييم المستخدم // ✅ تخزين جميع التقييمات

  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const handleAddToCart = (prod) => {
    const token = LocalStorageUtils.getAccessToken();

    // console.log("selectedProduct id", selectedProduct._id);

    if (!token) {
      Swal.fire({
        title: "Oops!",
        text: "You need to log in first to add products to the cart 🛒",
        icon: "warning",
        confirmButtonText: "OK",
        timer: 2000,
      });
      return;
    }

    dispatch(addToCartApi([{ productId: prod._id, quantity: quantity }]));

    Swal.fire({
      title: "Added!",
      text: `${prod.title} has been added to the cart 🛒`,
      icon: "success",
      confirmButtonText: "OK",
      timer: 2000,
    });
  };

  const handleAddComment = () => {
    if (comment.trim() === "") return;
    setComments([...comments, comment]);
    setComment("");
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 overflow-y-auto pt-16 ">
      <div className="relative flex justify-center flex-wrap lg:mt-0 sm:mt-[13em] mt-[15em] flex-col md:flex-row gap-6 p-6 bg-white shadow-lg rounded-lg w-[90%] md:w-[70%]">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-gray-600 hover:text-red-600"
        >
          <ImCancelCircle size={24} />
        </button>
        {/* Left Side: Images */}

        <div className="flex flex-col items-center">
          {" "}
          <img
            src={mainImage}
            alt={title}
            className="w-80 h-80 object-cover rounded-lg "
          />
          <div className="flex gap-2 mt-4">
            {[thumbnail, ...images].map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Product thumbnail ${index}`}
                className={`w-16 h-16 object-cover border-2 rounded-lg cursor-pointer transition ${
                  mainImage === img ? "border-[#284980]" : "border-gray-300"
                }`}
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>
        </div>

        {/* Right Side: Product Details */}
        <div className="flex flex-col flex-1">
          <h2 className="text-2xl font-bold text-[#284980]">{title}</h2>
          <p className="text-gray-600 mt-2">{description}</p>

          {/* Price Ribbon */}
          <span
            className="absolute top-0  left-0 bg-[#284980] text-white px-6 py-2 text-lg font-bold 
                 transform -rotate-12 shadow-lg rounded-br-lg"
          >
            ${price}
          </span>

          {/* Quantity */}
          <div className="flex items-center gap-4 mt-6">
            <div className="flex items-center border border-gray-300 px-3 py-1 rounded-lg">
              <button
                onClick={handleDecrement}
                className="px-3 text-lg text-[#284980]"
              >
                <Minus size={20} />
              </button>
              <span className="px-4 text-[#284980]">{quantity}</span>
              <button
                onClick={handleIncrement}
                className="px-3 text-lg text-[#284980]"
              >
                <Plus size={20} />
              </button>
            </div>
          </div>

          {/* Rating Section */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-[#284980] mb-2">
              Rate this Product
            </h3>
            <Rating
              count={5}
              value={rating}
              size={30}
              activeColor="#F0B100"
              onChange={handleRatingChange}
            />
            <p className="text-gray-600 mt-2">Average Rating: {rating}</p>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={() => handleAddToCart(product)}
            className="bg-[#284980] text-white px-6 py-2 rounded-lg my-5 cursor-pointer duration-300 hover:bg-[#F0B100] flex items-center justify-center"
          >
            Add to Cart <ShoppingCartOutlinedIcon className="ml-2" />
          </button>

          {/* Extra Info */}
          <div className="flex gap-6 mt-6 text-gray-600 text-sm">
            <p>🚚 Free Delivery On Orders Above $100</p>
            <p>🔄 15-Day Return Policy</p>
            <p>💵 COD Available</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;
