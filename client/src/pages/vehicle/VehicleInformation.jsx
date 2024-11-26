import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import useAddVehicleMutation from "@/hooks/vehicle/vehicleInformation";
import { useRef } from "react";

const VehicleInformation = () => {
  const { mutate: addVehicleInformation, isLoading } = useAddVehicleMutation();
  const fileInputRef = useRef(null);
  const initialValues = {
    carModel: "",
    phoneNumber: "",
    price: "",
    images: null,
  };

  const validationSchema = Yup.object({
    phoneNumber: Yup.string()
      .matches(/^[0-9]{11}$/, "Phone number must be 11 digits")
      .required("Phone number is required"),
    price: Yup.number().required("Price is required"),
    carModel: Yup.string().min(
      3,
      "Car model must be at least 3 characters long"
    ),
    images: Yup.array()
      .min(1, "At least one image is required")
      .max(10, "Maximum 10 images are allowed"),
  });

  const onSubmit = (values, { resetForm }) => {
    const formData = new FormData();

    formData.append("carModel", values.carModel);
    formData.append("phoneNumber", values.phoneNumber);
    formData.append("price", values.price);

    values.images.forEach((image) => {
      formData.append("images", image);
    });

    addVehicleInformation(formData, {
      onSuccess: () => {
        resetForm();
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      },
    });
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Vehicle Information</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ setFieldValue }) => (
          <Form className="space-y-4">
            <div>
              <label htmlFor="phoneNumber" className="block mb-1">
                Car Model
              </label>
              <Field
                type="text"
                id="carModel"
                name="carModel"
                className="w-full px-3 py-2 border rounded-md"
              />
              <ErrorMessage
                name="carModel"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div>
              <label htmlFor="phoneNumber" className="block mb-1">
                Phone Number
              </label>
              <Field
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                className="w-full px-3 py-2 border rounded-md"
              />
              <ErrorMessage
                name="phoneNumber"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div>
              <label htmlFor="price" className="block mb-1">
                Price
              </label>
              <Field
                type="number"
                id="price"
                name="price"
                className="w-full px-3 py-2 border rounded-md"
              />
              <ErrorMessage
                name="price"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div>
              <label htmlFor="images" className="block mb-1">
                Vehicle Images (1-10)
              </label>
              <input
                type="file"
                multiple
                accept="image/jpeg, image/png, image/jpg"
                id="images"
                name="images"
                ref={fileInputRef}
                onChange={(event) => {
                  const files = Array.from(event.currentTarget.files);
                  setFieldValue("images", files.slice(0, 10));
                }}
                className="w-full px-3 py-2 border rounded-md"
              />
              <ErrorMessage
                name="images"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <Button disabled={isLoading} type="submit" className="w-full">
              {isLoading ? "loading..." : "Submit"}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default VehicleInformation;
