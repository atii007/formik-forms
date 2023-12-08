import {
  Formik,
  ErrorMessage,
  Field,
  Form,
  FieldArray,
  FastField,
} from "formik";
import * as Yup from "yup";
import TextError from "./TextError";
import { useState } from "react";

const initialValues = {
  name: "",
  email: "",
  comments: "",
  address: "",
  social: {
    facebook: "",
    twitter: "",
  },
  phoneNumbers: ["", ""],
  skills: [""],
};

const savedValues = {
  name: "Testing",
  email: "test@test.com",
  comments: "Here is my comment",
  address: "22F Baker Street",
  social: {
    facebook: "",
    twitter: "",
  },
  phoneNumbers: ["(0123)-456789", ""],
  skills: ["Web Developer"],
};

// Field Level Validation
const validateComments = (value) => {
  let error;
  if (!value) {
    error = "Required!";
  }
  return error;
};

const onSubmit = (values, onSubmitprops) => {
  console.log("form data", values);
  console.log("Submit Props", onSubmitprops);
  onSubmitprops.setSubmitting(false);
  onSubmitprops.resetForm();
};

const validationSchema = Yup.object({
  name: Yup.string().required("Username required!"),
  email: Yup.string()
    .email("Invalid e-mail format")
    .required("E-mail required"),
});

const InitialForm = () => {
  const [formValues, setFormValues] = useState(null);
  return (
    <Formik
      initialValues={formValues || initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      // validateOnMount
      enableReinitialize
    >
      {(formik) => {
        console.log("Formik Props", formik);
        return (
          <Form>
            <div className="heading">
              <h2>Be A Part of the Organization</h2>
            </div>
            <div className="control-group">
              <div className="form-control">
                <label htmlFor="name">Name</label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your Username"
                />
                <ErrorMessage name="name" component={TextError} />
              </div>

              <div className="form-control">
                <label htmlFor="email">E-Mail Address</label>
                <Field
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Enter your E-Mail"
                />
                <ErrorMessage name="email">
                  {(errorMsg) => <div className="error-text">{errorMsg}</div>}
                </ErrorMessage>
              </div>

              <div className="form-control">
                <label htmlFor="address">Address</label>
                <FastField name="address">
                  {(props) => {
                    const { field, meta } = props;
                    return (
                      <div>
                        <input
                          type="text"
                          placeholder="Address (Optional)"
                          id="address"
                          {...field}
                        />
                        {meta.touched && meta.error ? (
                          <div>{meta.error}</div>
                        ) : null}
                      </div>
                    );
                  }}
                </FastField>
              </div>

              {/* Formik Objects */}

              <div className="form-control">
                <label htmlFor="facebook">Facebook Profile</label>
                <Field
                  type="text"
                  id="facebook"
                  name="social.facebook"
                  placeholder="Facebook profile URL"
                />
              </div>
              <div className="form-control">
                <label htmlFor="twitter">Twitter Profile</label>
                <Field
                  type="text"
                  id="twitter"
                  name="social.twitter"
                  placeholder="Twitter profile URL"
                />
              </div>

              {/* Formik Arrays Example */}

              <div className="form-control">
                <label htmlFor="primaryPh">Primary Phone Number</label>
                <Field
                  type="text"
                  id="primaryPh"
                  name="phoneNumbers[0]"
                  placeholder="Phone Number"
                />
              </div>
              <div className="form-control">
                <label htmlFor="secondaryPh">Secondary Phone Number</label>
                <Field
                  type="text"
                  id="secondaryPh"
                  name="phoneNumbers[1]"
                  placeholder="Phone Number"
                />
              </div>
            </div>

            {/* Field Array Component */}
            <div className="form-control">
              <label htmlFor="skills">List of Skills</label>
              <FieldArray name="skills">
                {(fieldArrayProps) => {
                  const { push, remove, form } = fieldArrayProps;

                  const { values } = form;
                  const { skills } = values;
                  return (
                    <div>
                      {skills.map((skill, index) => (
                        <div key={index}>
                          <Field name={`skills[${index}]`} />
                          {index > 0 && (
                            <button
                              type="button"
                              className="btn-small"
                              onClick={() => remove(index)}
                            >
                              -
                            </button>
                          )}

                          <button
                            type="button"
                            className="btn-small"
                            onClick={() => push("")}
                          >
                            +
                          </button>
                        </div>
                      ))}
                    </div>
                  );
                }}
              </FieldArray>
            </div>

            <div className="form-control">
              <label htmlFor="comments">Comments</label>
              <Field
                as="textarea"
                id="comments"
                name="comments"
                validate={validateComments}
              />
              <ErrorMessage name="comments" component={TextError} />
            </div>

            <div className="form-actions">
              <button type="button" onClick={() => setFormValues(savedValues)}>
                Load Previous Data
              </button>
              <button type="reset">Reset</button>
              <button
                type="submit"
                disabled={!formik.isValid || formik.isSubmitting}
              >
                Submit
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default InitialForm;
