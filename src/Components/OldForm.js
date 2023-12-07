import { Formik, useFormik } from "formik";
import * as Yup from "yup";

const initialValues = { name: "", channel: "", email: "" };

const onSubmit = (values) => {
  console.log("form data", values);
};

// const validate = (values) => {
//   let errors = {};

//   if (!values.name) {
//     errors.name = "Username required";
//   }
//   if (!values.channel) {
//     errors.channel = "Channel name required";
//   }
//   if (!values.email) {
//     errors.email = "E-mail required";
//   } else if (!values.email.includes("@")) {
//     errors.email = "Invalid E-mail Format";
//   }

//   return errors;
// };

const validationSchema = Yup.object({
  name: Yup.string().required("Username required!"),
  channel: Yup.string().required("Channel name required"),
  email: Yup.string()
    .email("Invalid e-mail format")
    .required("E-mail required"),
});

const InitialForm = () => {
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
    // validate,
  });
  console.log("visited fields", formik.touched);

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="control-group">
        <div className="form-control">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name ? (
            <p className="error-text">{formik.errors.name}</p>
          ) : null}
        </div>
        <div className="form-control">
          <label htmlFor="name">Channel</label>
          <input
            type="text"
            id="channel"
            name="channel"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.channel}
          />
          {formik.touched.channel && formik.errors.channel ? (
            <p className="error-text">{formik.errors.channel}</p>
          ) : null}
        </div>
      </div>
      <div className="form-control">
        <label htmlFor="name">E-Mail Address</label>
        <input
          type="text"
          id="email"
          name="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email ? (
          <p className="error-text">{formik.errors.email}</p>
        ) : null}
      </div>
      <div className="form-actions">
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default InitialForm;
