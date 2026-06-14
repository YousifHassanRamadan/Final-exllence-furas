import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Box,
  Rating,
  IconButton,
} from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { Close } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import {
  addToCompare,
  removeFromCompare,
  loadCompareFromStorage,
} from "../reduxSystem/slices/compareProductSlice";

const ComparePage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { compareProducts } = useSelector((state) => state.compareProductState);
  const [checkEmpty, setCheckEmpty] = useState(compareProducts.length > 0);

  // تحميل المنتجات من Local Storage عند تحميل الصفحة
  useEffect(() => {
    dispatch(loadCompareFromStorage());
  }, [dispatch]);

  // تحديث حالة checkEmpty عند تغيير compareProducts
  useEffect(() => {
    setCheckEmpty(compareProducts.length > 0);
  }, [compareProducts]);

  const handleRemoveFromCompare = (id) => {
    dispatch(removeFromCompare(id));
  };

  // console.log("compareProducts", compareProducts);

  return (
    <div className="w-full my-[5%]">
      {checkEmpty ? (
        <Box
          sx={{
            mt: { xs: 4, sm: 6, md: 2 },
            mb: 12,
          }}
        >
          {compareProducts.length === 0 ? (
            <Box
              sx={{
                maxWidth: 1200,
                margin: "auto",
                padding: 3,
                mt: 10,
                mb: 20,
              }}
            >
              <Box sx={{ textAlign: "center", mb: 4 }}>
                <Typography
                  variant="h5"
                  fontWeight={"bold"}
                  fontSize={"36px"}
                  gutterBottom
                >
                  {t("yourCompareListIsEmpty")}
                </Typography>
              </Box>
              <Box sx={{ textAlign: "center", mt: 8 }}>
                <Button
                  variant="contained"
                  startIcon={<KeyboardArrowLeftIcon />}
                  onClick={() => handleNav("/productes")}
                  sx={{
                    textTransform: "none",
                    borderRadius: 10,
                    bgcolor: "#0088ff",
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
                  {t("returnToShop")}
                </Button>
              </Box>
            </Box>
          ) : (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      {t("product")}
                    </TableCell>
                    {compareProducts.map((product, index) => (
                      <TableCell key={index} align="center">
                        <Box
                          sx={{
                            position: "relative",
                            display: "inline-block",
                          }}
                        >
                          <img
                            src={product.thumbnail}
                            alt={product.title}
                            style={{ width: 100, height: 100 }}
                          />
                          <IconButton
                            sx={{
                              position: "absolute",
                              top: -15,
                              left: "50%",
                              transform: "translateX(-50%)",
                              bgcolor: "red",
                              color: "white",
                              transition: "all 0.3s ease",
                              ":hover": {
                                bgcolor: "red",
                                color: "white",
                                transition: "0.3s",
                                transform: "translateX(-50%) rotate(180deg)",
                              },
                            }}
                            onClick={() => handleRemoveFromCompare(product._id)}
                          >
                            <Close fontSize="small" />
                          </IconButton>
                        </Box>
                        <Typography variant="subtitle1">
                          {product.title}
                        </Typography>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      {t("category")}
                    </TableCell>
                    {compareProducts.map((product, index) => (
                      <TableCell key={index} align="center">
                        <Typography>
                          {product.category?.name || t("notAvailable")}
                        </Typography>
                      </TableCell>
                    ))}
                  </TableRow>

                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>price</TableCell>
                    {compareProducts.map((product, index) => (
                      <TableCell key={index} align="center">
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {product.price && (
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{
                                textDecoration: "line-through",
                                mr: 1,
                                fontSize: { xs: "0.7rem", sm: "0.75rem" },
                              }}
                            >
                              ${product.price.toFixed(2)}
                            </Typography>
                          )}
                          <Typography
                            variant="h6"
                            color="text.primary"
                            sx={{
                              fontWeight: "bold",
                              fontSize: {
                                xs: "1.1rem",
                                sm: "1rem",
                                md: "1rem",
                              },
                            }}
                          >
                            ${product.price.toFixed(2)}
                          </Typography>
                        </Box>
                      </TableCell>
                    ))}
                  </TableRow>

                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      {t("description")}
                    </TableCell>
                    {compareProducts.map((product, index) => (
                      <TableCell key={index} align="center">
                        <Typography>{product.description}</Typography>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      ) : (
        <Box sx={{ textAlign: "center", mt: 8 }}>
          <Typography variant="h5" fontWeight="bold">
            {t("yourCompareListIsEmpty")}
          </Typography>
          <Button
            variant="contained"
            startIcon={<KeyboardArrowLeftIcon />}
            onClick={() => navigate("/")}
            sx={{
              mt: 4,
              borderRadius: 10,
              bgcolor: "#0088ff",
              px: 3,
              py: 1,
              fontWeight: "bold",
              "&:hover": { bgcolor: "black" },
            }}
          >
            {t("returnToShop")}
          </Button>
        </Box>
      )}
    </div>
  );
};

export default ComparePage;
