import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Input, Textarea, Button } from "@material-tailwind/react";

const PlaceOrder = () => {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      country: "",
      streetAddress: "",
      apartment: "",
      city: "",
      state: "",
      zipCode: "",
      phone: "",
      email: "",
      orderNotes: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First name is required"),
      lastName: Yup.string().required("Last name is required"),
      country: Yup.string().required("Country is required"),
      streetAddress: Yup.string().required("Street address is required"),
      city: Yup.string().required("City is required"),
      state: Yup.string().required("State is required"),
      zipCode: Yup.string()
        .matches(/^\d{5}$/, "Zipcode must be 5 digits")
        .required("ZIP Code is required"),
      phone: Yup.string()
        .matches(/^\d{10}$/, "Phone number must be 10 digits")
        .required("Phone is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
    }),
    onSubmit: (values) => {
      console.log("Order Submitted", values);
    },
  });

  return (
    <div className="my-[10%] max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-[#284980]">
        Billing Details
      </h2>
      <form onSubmit={formik.handleSubmit} className="grid grid-cols-1 gap-4">
        <div className="md:grid md:grid-cols-2 flex flex-wrap gap-4">
          <Input
            variant="standard"
            type="text"
            label="First Name"
            {...formik.getFieldProps("firstName")}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
          />
          <Input
            variant="standard"
            type="text"
            label="Last Name"
            {...formik.getFieldProps("lastName")}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
          />
        </div>

        <Input
          variant="standard"
          type="text"
          label="Country"
          {...formik.getFieldProps("country")}
          error={formik.touched.country && Boolean(formik.errors.country)}
        />
        <Input
          variant="standard"
          type="text"
          label="Street Address"
          {...formik.getFieldProps("streetAddress")}
          error={
            formik.touched.streetAddress && Boolean(formik.errors.streetAddress)
          }
        />
        <Input
          variant="standard"
          type="text"
          label="Apartment, suite, unit (optional)"
          {...formik.getFieldProps("apartment")}
        />
        <Input
          variant="standard"
          type="text"
          label="City"
          {...formik.getFieldProps("city")}
          error={formik.touched.city && Boolean(formik.errors.city)}
        />
        <Input
          variant="standard"
          type="text"
          label="State"
          {...formik.getFieldProps("state")}
          error={formik.touched.state && Boolean(formik.errors.state)}
        />
        <Input
          variant="standard"
          type="text"
          label="ZIP Code"
          {...formik.getFieldProps("zipCode")}
          error={formik.touched.zipCode && Boolean(formik.errors.zipCode)}
        />
        <Input
          variant="standard"
          type="text"
          label="Phone"
          {...formik.getFieldProps("phone")}
          error={formik.touched.phone && Boolean(formik.errors.phone)}
        />
        <Input
          variant="standard"
          type="email"
          label="Email Address"
          {...formik.getFieldProps("email")}
          error={formik.touched.email && Boolean(formik.errors.email)}
        />

        <Textarea
          variant="standard"
          label="Order Notes (optional)"
          {...formik.getFieldProps("orderNotes")}
        />

        <Button
          type="submit"
          color="yellow"
          fullWidth
          disabled={!formik.isValid || formik.isSubmitting}
        >
          Place Order
        </Button>
      </form>
    </div>
  );
};

export default PlaceOrder;
