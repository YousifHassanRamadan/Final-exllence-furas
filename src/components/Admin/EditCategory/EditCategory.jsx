import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input, Button, Card } from "@material-tailwind/react";
import Swal from "sweetalert2";
import {
  editCategory,
  resetEditCatState,
} from "../../../reduxSystem/slices/editCategorySlice";
import { useTranslation } from "react-i18next";

const EditCategory = ({
  setIsEditCategoryOpen,
  selectedCategory,
  Allcategories,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const category = selectedCategory;

  const categoryobj = Allcategories.find((cat) => {
    return category === cat.name;
  });

  const [categoryName, setCategoryName] = useState({
    name: categoryobj.name,
    categoryId: categoryobj._id,
  });

  const handelEditCat = (value) => {
    setCategoryName((prev) => ({ ...prev, name: value }));
  };

  const { isCategoryEdited } = useSelector((state) => state.editCategoryState);

  useEffect(() => {
    dispatch(resetEditCatState());
  }, []);

  useEffect(() => {
    if (isCategoryEdited) {
      Swal.fire({
        icon: "success",
        text: t("category_edited_success"),
      });
      setIsEditCategoryOpen(false);
    }
  }, [isCategoryEdited, setIsEditCategoryOpen, t]);

  const handleSubmitEdit = () => {
    dispatch(editCategory(categoryName));
  };

  return (
    <div className="flex justify-center items-center w-full min-h-screen bg-transparent p-4">
      <Card className="flex flex-col justify-center items-center w-full sm:max-w-lg lg:max-w-3xl bg-white shadow-2xl p-6 rounded-2xl max-h-[80vh] overflow-y-auto">
        {/* Title */}
        <h2 className="text-2xl font-semibold text-[#284980] mb-6 text-center">
          {t("edit_category")}
        </h2>

        {/* Input Field */}
        <div className="w-full mb-6">
          <label className="text-[#284980] font-medium">
            {t("category_name")}
          </label>
          <Input
            variant="outlined"
            placeholder={t("enter_category_name")}
            className="text-lg text-[#284980] "
            value={categoryName.name}
            onChange={(e) => handelEditCat(e.target.value)}
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-between gap-4 w-full">
          <Button
            onClick={handleSubmitEdit}
            className="w-full text-white bg-[#284980] rounded-lg py-3 hover:bg-[#1e3a5f] transition duration-300"
          >
            {t("edit_category")}
          </Button>
          <Button
            className="w-full text-white bg-red-500 rounded-lg py-3 hover:bg-gray-700 transition duration-300"
            onClick={() => setIsEditCategoryOpen(false)}
          >
            {t("cancel")}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default EditCategory;
