import React, { useEffect, useState } from "react";
import { Input, Select, Option, Button, Card } from "@material-tailwind/react";
import { useTranslation } from "react-i18next";
import { useCountries } from "use-react-countries";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { X } from "lucide-react";
import { editAddress } from "../../reduxSystem/slices/editAddressSlice";
import { LocalStorageUtils } from "../../utils/localStorageUtils";

const EditAddress = ({ address, setIsEditAddressOpen }) => {
  const { t } = useTranslation();
  const { countries } = useCountries();
  const dispatch = useDispatch();
  const [selectedCountry, setSelectedCountry] = useState("");

  const { isAddressEdited } = useSelector((state) => state.editAddressState);

  const sortedCountries = [...countries].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  // 🔹 Formik validation schema
  const validationSchema = Yup.object({
    street: Yup.string().required(t("street_required")),
    state: Yup.string().required(t("state_required")),
    city: Yup.string().required(t("city_required")),
    zipCode: Yup.string()
      .matches(/^\d+$/, t("zipcode_numeric"))
      .required(t("zipcode_required")),
    homeAddress: Yup.string().required(t("home_address_required")),
    landmark: Yup.string().required(t("landmark_required")),
    country: Yup.string().required(t("country_required")),
  });

  // 🔹 Initialize Formik
  const formik = useFormik({
    initialValues: {
      street: "",
      state: "",
      city: "",
      zipCode: "",
      homeAddress: "",
      landmark: "",
      country: "",
    },
    validationSchema,
    onSubmit: (values) => {
      const updatedFields = {};
      Object.keys(values).forEach((key) => {
        if (values[key] !== address[key]) {
          updatedFields[key] = values[key];
        }
      });

      if (Object.keys(updatedFields).length > 0) {
        const token = LocalStorageUtils.getAccessToken();
        const payload = {
          addressId: address._id,
          ...updatedFields,
        };

        dispatch(editAddress(payload));
        Swal.fire({
          icon: "success",
          title: t("updated_success"),
          text: t("changes_saved"),
          confirmButtonColor: "#284980",
        });
      } else {
        Swal.fire({
          icon: "info",
          title: t("no_changes"),
          text: t("no_data_modified"),
          confirmButtonColor: "#3085d6",
        });
      }
    },
  });

  useEffect(() => {
    if (formik.setValues) {
      formik.setValues({
        street: address.street || "",
        state: address.state || "",
        city: address.city || "",
        zipCode: address.zipCode || "",
        homeAddress: address.homeAddress || "",
        landmark: address.landmark || "",
        country: address.country || "",
      });

      setSelectedCountry(address.country || "");
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className="flex justify-center items-center w-full min-h-screen bg-transparent p-4">
      <Card className="w-full  max-w-md sm:max-w-lg lg:max-w-6xl bg-white shadow-xl p-10 rounded-2xl max-h-[80vh] overflow-y-auto relative">
        {/* زر الإغلاق */}
        <button
          className="absolute top-3 right-3 bg-red-500 text-white w-8 h-8 flex items-center justify-center duration-300 hover:rotate-180 rounded-full hover:bg-red-500"
          onClick={() => setIsEditAddressOpen(false)}
        >
          <X className="bg-red-500 text-white" size={20} />
        </button>

        <form onSubmit={formik.handleSubmit} className="space-y-6 mt-5">
          {/* اختيار الدولة */}
          <div className="w-full">
            <label className="text-[#284980] uppercase">
              {selectedCountry || t("select_country")}
            </label>
            <Select
              variant="static"
              size="lg"
              className="p-3 pb-10"
              onChange={(value) => {
                setSelectedCountry(value);
                formik.setFieldValue("country", value);
              }}
              value={selectedCountry}
            >
              {sortedCountries.map(({ name, flags }) => (
                <Option
                  key={name}
                  value={name}
                  className="flex items-center gap-2"
                >
                  <div className="flex">
                    <img
                      src={flags.svg}
                      alt={name}
                      className="h-5 w-5 rounded-full object-cover mr-2"
                    />
                    {name}
                  </div>
                </Option>
              ))}
            </Select>
            {formik.touched.country && formik.errors.country && (
              <p className="text-red-500 text-sm mt-2">
                {formik.errors.country}
              </p>
            )}
          </div>

          {/* حقول الإدخال */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {[
              "street",
              "state",
              "city",
              "zipCode",
              "homeAddress",
              "landmark",
            ].map((field) => (
              <div key={field}>
                <label className="text-[#284980] uppercase">{t(field)}</label>
                <Input
                  name={field}
                  variant="static"
                  placeholder={t(`enter_${field}`)}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values[field]}
                  className="p-2 "
                />
                {formik.touched[field] && formik.errors[field] && (
                  <p className="text-red-500 text-sm mt-2">
                    {formik.errors[field]}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* زر الحفظ */}
          <div className="flex justify-end">
            <Button
              type="submit"
              className="bg-[#284980] text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
            >
              {t("save_address")}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default EditAddress;
