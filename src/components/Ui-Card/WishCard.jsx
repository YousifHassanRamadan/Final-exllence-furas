/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ViewProduct from "./ViewProduct";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Close, CompareArrows } from "@mui/icons-material";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Rating,
  Box,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Favorite, Visibility } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { addToCart } from "../../reduxSystem/slices/addToCartSlice";

import Swal from "sweetalert2";
import { toggleFavorite } from "../../reduxSystem/slices/favouriteSlice";
import { LocalStorageUtils } from "../../utils/localStorageUtils";

const ProductCard = ({ product, forceRender }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [isFavourite, setIsFavourite] = useState(false);

  const { favourites } = useSelector((state) => state.getFavouritestate);

  const dispatch = useDispatch();

  const handleFavoriteClick = (product) => {
    const token = LocalStorageUtils.getAccessToken();

    if (!token) {
      Swal.fire({
        title: "Oops!",
        text: "You need to log in first to add products to favorites ❤️",
        icon: "warning",
        confirmButtonText: "OK",
        timer: 2000, // ⏳ يجعل التنبيه يختفي تلقائيًا بعد ثانيتين
      });
      return;
    }

    dispatch(toggleFavorite(product));
    setIsFavourite((prev) => !prev);
  };

  useEffect(() => {
    if (favourites.some((favItem) => favItem._id === product._id)) {
      setIsFavourite(true);
    } else {
      setIsFavourite(false);
    }
  }, [favourites, product._id]);

  const handleAddToCart = (selectedProduct) => {
    // console.log("product will add", selectedProduct);

    dispatch(addToCart(selectedProduct));

    Swal.fire({
      title: "Added!",
      text: `${selectedProduct.title} has been added to the cart 🛒`,
      icon: "success",
      confirmButtonText: "OK",
      timer: 2000,
    });
  };

  const handleAddToCompare = () => {};

  const handleRemoveFromWishlist = () => {
    dispatch(toggleFavorite(product));
    forceRender(); // يجبر WishlistPage على إعادة التصيير
  };

  const IconButtons = [
    {
      icon: (
        <Favorite
          sx={{
            color: isFavourite ? "red" : "inherit",
          }}
        />
      ),
      btnFunc: handleFavoriteClick,
    },
    {
      icon: (
        <CompareArrows
          sx={{
            color: true ? "#000000" : "inherit",
          }}
        />
      ),
      btnFunc: handleAddToCompare,
    },
  ];

  const [isHovered, setIsHovered] = useState(false);

  const theme = useTheme();

  const isXs = useMediaQuery(theme.breakpoints.only("xs"));

  const isSm = useMediaQuery(theme.breakpoints.only("sm"));

  const getImageSize = () => {
    if (isXs) return "180px";
    if (isSm) return "200px";
    return "220px";
  };

  return (
    <Link style={{ textDecoration: "none" }} className="mt-[5%] mb-[25%]">
      <Card
        sx={{
          cursor: "pointer",
          maxWidth: "100%",
          boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.3)",
          position: "relative",
          borderRadius: 6,
          px: { xs: 2, sm: 4, md: 5, lg: 2 },
          py: 1,
          transition: "transform 0.3s ease-in-out",
          "&:hover": {
            transform: "scale(1.05)",
            zIndex: 10,
          },
          "&:hover div.NAME": {
            color: "#0088ff",
            transition: "color 0.3s ease-in-out",
          },
          "& .NAME": {
            color: "black",
            transition: "color 0.3s ease-in-out",
          },
          "&:hover .hover-buttons-container": { opacity: 1 },
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <IconButton
          sx={{
            bgcolor: "red",
            color: "white",
            ":hover": {
              bgcolor: "darkred",
              transition: "0.3s",
            },
            position: "absolute",
            top: 5,
            right: 5,
          }}
          onClick={handleRemoveFromWishlist}
        >
          <Close />
        </IconButton>
        {false && (
          <IconButton
            sx={{
              bgcolor: "red",
              color: "white",
              ":hover": {
                bgcolor: "red",
                color: "white",
                rotate: "180deg",
                transition: "0.3s",
              },
              position: "absolute",
              top: 0,
              right: 2,
            }}
            onClick={handleRemoveFromWishlist}
          >
            <Close />
          </IconButton>
        )}
        {product?.offer?.isActive && (
          <Box
            className="text-[#284980]"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              top: { xs: 10, sm: 15, md: 20 },
              left: { xs: 10, sm: 15, md: 20 },
              width: { xs: "40px", sm: "45px", md: "50px" },
              height: { xs: "40px", sm: "45px", md: "50px" },
              fontWeight: "bold",
              backgroundColor: "#ffffff",
              borderRadius: "50%",
              zIndex: 1,
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
              fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
            }}
          >
            {product.offer.discountPercentage}%
          </Box>
        )}
        <Box
          sx={{
            position: "relative",
            bgcolor: "#f2f2f2",
            width: getImageSize(),
            height: getImageSize(),
            borderRadius: "50%",
            overflow: "hidden",
            m: "5%",
            mx: "auto",
          }}
        >
          <img
            src={product.thumbnail}
            alt={product.title}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
          {isHovered && (
            <Box
              className="hover-buttons-container"
              sx={{
                position: "absolute",
                bottom: "25%",
                left: "50%",
                transform: "translateX(-50%)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: { xs: 0.5, sm: 1 },
                backgroundColor: "white",
                padding: { xs: "6px 8px", sm: "8px 12px" },
                borderRadius: "12px",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                opacity: 0,
                transition: "opacity 0.3s ease-in-out",
                width: "auto",
              }}
            >
              {IconButtons.map((btn, index) => (
                <IconButton
                  key={index}
                  onClick={() => btn.btnFunc(product)}
                  sx={{
                    width: { xs: 30, sm: 35, md: 40 },
                    height: { xs: 30, sm: 35, md: 40 },
                    minWidth: "unset",
                    backgroundColor: "white",
                    borderRadius: "50%",
                    "&:hover": {
                      backgroundColor: "#284980",
                      color: "white",
                    },
                  }}
                >
                  {btn.icon}
                </IconButton>
              ))}
            </Box>
          )}
        </Box>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: { xs: "12px", sm: "16px" },
          }}
        >
          <Typography
            className=" text-[#324b75]  "
            gutterBottom
            variant="h6"
            component="div"
            sx={{
              fontWeight: "bold",
              textAlign: "center",
              fontSize: {
                xs: "1rem",
                sm: "1.1rem",
                md: "1.25rem",
              },
            }}
          >
            {product.title.slice(0, 9)}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", mt: 1, mb: 2 }}>
            {product?.offer?.isActive && (
              <Typography
                variant="body2"
                className="text-[#284980]"
                sx={{
                  textDecoration: "line-through",
                  mr: 1,
                  fontSize: { xs: "0.8rem", sm: "0.875rem" },
                }}
              >
                SAR {product.price.toFixed(2)}
              </Typography>
            )}
            <Typography
              variant="h6"
              className="text-[#284980]"
              sx={{
                fontWeight: "bold",
                fontSize: { xs: "1.1rem", sm: "1.25rem", md: "1.5rem" },
              }}
            >
              {product?.offer?.isActive
                ? product?.offer?.offerPrice?.toFixed(2)
                : product.price.toFixed(2)}
            </Typography>
          </Box>
          <Link
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            to={`/productdetails/${product._id}`}
          >
            <Button
              variant="contained"
              startIcon={<ShoppingCartOutlinedIcon />}
              sx={{
                textTransform: "none",
                borderRadius: 10,
                bgcolor: "#284980",
                px: { xs: 2, sm: 3, md: 4 },
                mx: 2,
                py: { xs: 0.5, sm: 0.75, md: 1 },
                fontWeight: "bold",
                fontSize: { xs: "12px", sm: "13px", md: "14px" },
                "&:hover": {
                  bgcolor: "black",
                },
              }}
            >
              View Details
            </Button>
          </Link>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;
