import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Input, Button, Card } from "@material-tailwind/react";
import Swal from "sweetalert2";
import {
  addCategory,
  resetAddCategoryState,
} from "../../../reduxSystem/slices/addCategorySlice";
import { useTranslation } from "react-i18next";

const AddCategory = ({ setIscategoryOpen }) => {
  const { t } = useTranslation();
  const [categoryNameInEnglish, setCategoryNameInEnglish] = useState("");
  const [categoryNameInArabic, setCategoryNameInArabic] = useState("");
  const [errors, setErrors] = useState({ arabic: "", english: "" });

  // console.log(categoryNameInEnglish);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetAddCategoryState());
  }, []);

  // Validate Arabic input
  const validateArabicInput = (text) => {
    // Regular expression for Arabic characters
    const arabicRegex = /^[\u0600-\u06FF\s]+$/;

    if (text && !arabicRegex.test(text)) {
      return t("arabic_only");
    }
    return "";
  };

  // Validate English input
  const validateEnglishInput = (text) => {
    // Regular expression for English characters
    const englishRegex = /^[A-Za-z\s'\-]+$/;

    if (text && !englishRegex.test(text)) {
      return t("english_only");
    }
    return "";
  };

  const handleArabicInputChange = (e) => {
    const value = e.target.value;
    setCategoryNameInArabic(value);
    setErrors({ ...errors, arabic: validateArabicInput(value) });
  };

  const handleEnglishInputChange = (e) => {
    const value = e.target.value;
    setCategoryNameInEnglish(value);
    setErrors({ ...errors, english: validateEnglishInput(value) });
  };

  const handleAddCategory = async () => {
    const trimmedCategoryNameInEng = categoryNameInEnglish.trim();
    const trimmedCategoryNameInAra = categoryNameInArabic.trim();

    const arabicError = validateArabicInput(trimmedCategoryNameInAra);
    const englishError = validateEnglishInput(trimmedCategoryNameInEng);

    setErrors({ arabic: arabicError, english: englishError });

    if (!trimmedCategoryNameInEng && !trimmedCategoryNameInAra) {
      return Swal.fire({ icon: "error", text: t("please_enter_both") });
    }
    if (!trimmedCategoryNameInEng) {
      return Swal.fire({ icon: "error", text: t("please_enter_en") });
    }
    if (!trimmedCategoryNameInAra) {
      return Swal.fire({ icon: "error", text: t("please_enter_ar") });
    }
    if (arabicError || englishError) return;

    const catNameObj = {
      name: trimmedCategoryNameInEng,
      arabicName: trimmedCategoryNameInAra,
    };

    try {
      await dispatch(addCategory(catNameObj)).unwrap(); // throws if rejected
      Swal.fire({ icon: "success", text: t("category_added_success") });
      setIscategoryOpen(false);
    } catch (error) {
      Swal.fire({ icon: "error", text: error });
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="flex justify-center items-center w-full min-h-screen bg-transparent p-4">
      <Card className="flex flex-col justify-center items-center w-full sm:max-w-lg lg:max-w-3xl bg-white shadow-2xl p-6 rounded-2xl max-h-[80vh] overflow-y-auto">
        {/* Title */}
        <h2 className="text-2xl font-semibold text-[#284980] mb-6 text-center">
          {t("add_new_category")}
        </h2>

        {/* Input Field */}
        <div className="w-full mb-6">
          <label className="text-[#284980] font-medium">
            {t("category_name_en")}
          </label>
          <Input
            variant="outlined"
            placeholder={t("enter_category_name_en")}
            className="text-lg text-[#284980]"
            value={categoryNameInEnglish}
            onChange={handleEnglishInputChange}
          />
          {errors.english && (
            <p className="text-red-500 text-sm mt-1">{errors.english}</p>
          )}
        </div>
        <div className="w-full mb-6">
          <label className="text-[#284980] font-medium">
            {t("category_name_ar")}
          </label>
          <Input
            variant="outlined"
            placeholder={t("enter_category_name_ar")}
            className="text-lg text-[#284980]"
            value={categoryNameInArabic}
            onChange={handleArabicInputChange}
          />
          {errors.arabic && (
            <p className="text-red-500 text-sm mt-1">{errors.arabic}</p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-between gap-4 w-full">
          <Button
            onClick={handleAddCategory}
            className="w-full text-white bg-[#284980] rounded-lg py-3 hover:bg-[#1e3a5f] transition duration-300"
          >
            {t("add_category")}
          </Button>
          <Button
            className="w-full text-white bg-red-500 rounded-lg py-3 hover:bg-gray-700 transition duration-300"
            onClick={() => setIscategoryOpen(false)}
          >
            {t("cancel")}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default AddCategory;
