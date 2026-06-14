import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import EditProduct from "../Admin/EditProduct/EditProduct";
import { useDispatch, useSelector } from "react-redux";
import { deleteAdminProducts } from "../../reduxSystem/slices/deleteProductSlice";
import { getAdminProducts } from "../../reduxSystem/slices/adminProductsSlice";
import { getAllProducts } from "../../reduxSystem/slices/getAllProductsSlice";
import Swal from "sweetalert2";
import CustomizeProduct from "../Admin/CustomizeProduct/CustomizeProduct";
import { LocalStorageUtils } from "../../utils/localStorageUtils";
import { useTranslation } from "react-i18next";

const AdminCard = ({ product, page }) => {
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const [isEditOpen, setIsEditOpen] = useState(false);

  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);

  const { title, thumbnail, _id } = product;

  const { Allproducts } = useSelector((state) => state.adminProductsState);

  const [token, setToken] = useState(
    LocalStorageUtils.getAccessToken() || null
  );

  const handleDelete = () => {
    Swal.fire({
      title: t("are_you_sure"),
      text: t("delete_product_warning"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: t("yes_delete"),
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteAdminProducts(_id)).then(() => {
          dispatch(getAdminProducts(token));
        });
        Swal.fire(t("deleted"), t("product_deleted_success"), "success");
      }
    });
  };

  return (
    <Card className="w-full">
      <CardHeader floated={false} className="h-auto">
        <img src={thumbnail} alt={title} />
      </CardHeader>
      <CardBody>
        <div className="title">
          <p className="text-[#284980] text-xl text-center font-semibold">
            {title}
          </p>
        </div>
        <button
          onClick={() => setIsEditOpen(true)}
          className="w-full my-5 flex items-center justify-center bg-yellow-500 text-[#284980] font-semibold py-2 px-4 rounded shadow cursor-pointer hover:text-white hover:bg-[#284980] transition duration-200"
        >
          {t("edit")}
        </button>
        <button
          onClick={handleDelete}
          className="w-full my-5 flex items-center justify-center bg-[#f44336] text-white font-semibold py-2 px-4 rounded shadow cursor-pointer hover:text-white hover:bg-[#284980] transition duration-200"
        >
          {t("delete")}
        </button>
        <button
          onClick={() => setIsCustomizeOpen(true)}
          className="w-full my-5 flex items-center justify-center bg-[#284980] text-white font-semibold py-2 px-4 rounded shadow cursor-pointer hover:text-white hover:bg-[#284980] transition duration-200"
        >
          {t("customize_product")}
        </button>
      </CardBody>
      <CardFooter className="text-center gap-7 pt-2">{product.name}</CardFooter>

      {isEditOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-transparent backdrop-blur-md z-50 w-full">
          <EditProduct item={product} setIsEditOpen={setIsEditOpen} />
        </div>
      )}

      {isCustomizeOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-transparent backdrop-blur-md z-50 w-full">
          <CustomizeProduct
            item={product}
            setIsCustomizeOpen={setIsCustomizeOpen}
          />
        </div>
      )}
    </Card>
  );
};

export default AdminCard;
