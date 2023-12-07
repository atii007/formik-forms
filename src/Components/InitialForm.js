import { Formik, ErrorMessage, Field, Form } from "formik";
import * as Yup from "yup";

const initialValues = {
  name: "",
  channel: "",
  email: "",
  comments: "",
  address: "",
};

const onSubmit = (values) => {
  console.log("form data", values);
};

const validationSchema = Yup.object({
  name: Yup.string().required("Username required!"),
  channel: Yup.string().required("Channel name required"),
  email: Yup.string()
    .email("Invalid e-mail format")
    .required("E-mail required"),
});

const InitialForm = () => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form>
        <div className="control-group">
          <div className="form-control">
            <label htmlFor="name">Name</label>
            <Field type="text" id="name" name="name" />
            <ErrorMessage name="name" />
          </div>

          <div className="form-control">
            <label htmlFor="channel">Channel</label>
            <Field type="text" id="channel" name="channel" />
            <ErrorMessage name="channel" />
          </div>

          <div className="form-control">
            <label htmlFor="address">Address</label>
            <Field name="address">
              {(props) => {
                console.log("render props", props);
                return <input type="text" id="address" />;
              }}
            </Field>
          </div>

          <div className="form-control">
            <label htmlFor="email">E-Mail Address</label>
            <Field type="text" id="email" name="email" />
            <ErrorMessage name="email" />
          </div>
        </div>

        <div className="form-control">
          <label htmlFor="comments">Comments</label>
          <Field as="textarea" id="comments" name="comments" />
        </div>

        <div className="form-actions">
          <button type="submit">Submit</button>
        </div>
      </Form>
    </Formik>
  );
};

export default InitialForm;
