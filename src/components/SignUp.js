import React from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const navigate = useNavigate();

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    userType: "client",
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
    },
  };

  const validate = (values) => {
    const errors = {};

    // Add your custom validation logic here
    if (!values.firstName) {
      errors.firstName = "First Name is required";
    }

    if (!values.lastName) {
      errors.lastName = "Last Name is required";
    }

    if (!values.email) {
      errors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }

    if (!values.password) {
      errors.password = "Password is required";
    } else if (
      !/(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/.test(
        values.password
      )
    ) {
      errors.password =
        "Password must contain at least 8 characters with one uppercase letter, one digit, and one special symbol (@ $ ! % * ? &)";
    }

    return errors;
  };

  const handleSubmit = async (values) => {
    const { street, city, state, zipCode } = values.address;
    // Create an address array
    const address = [{ street, city, state, zipCode }];
    try {
      const res = await axios.post(
        process.env.REACT_APP_API_BASE_URL + "/auth/auth/signup",
        { ...values, address }
      );
      alert(res.data.message);
      navigate("/");
    } catch (err) {
      alert(err);
    }
  };

  const formik = useFormik({
    initialValues,
    validate,
    onSubmit: handleSubmit,
  });

  return (
    <div className="w-100">
      <div className="loginContainer float-right  p-4  row">
        <div className="col-12">
          <h2
            className="text-center text-danger text-decoration-underline w-100"
            style={{ fontStyle: "oblique" }}
          >
            Signup
          </h2>

          <form className="W-100" onSubmit={formik.handleSubmit}>
            <div className="col-12 row">
              <label className="w-100" htmlFor="firstName">
                First Name :
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                className="w-100"
                autoComplete="off"
                placeholder="First Name"
              />
              {formik.touched.firstName && formik.errors.firstName ? (
                <div className="error">{formik.errors.firstName}</div>
              ) : null}
            </div>

            <div className="col-12 row">
              <label className="w-100" htmlFor="lastName">
                Last Name :
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                className="w-100"
                autocomplete="off"
                placeholder="Last Name"
              />
              {formik.touched.lastName && formik.errors.lastName ? (
                <div className="error">{formik.errors.lastName}</div>
              ) : null}
            </div>
            <div className="col-12 row">
              <label className="w-100" htmlFor="email">
                Email :
              </label>
              <input
                type="text"
                id="email"
                name="email"
                autocomplete="off"
                value={formik.values.email}
                onChange={formik.handleChange}
                className="w-100"
                placeholder="examaple@gmail.com"
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="error">{formik.errors.email}</div>
              ) : null}
            </div>
            <div className="col-12 row">
              <label className="w-100" htmlFor="password">
                Password:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                autocomplete="new-password"
                value={formik.values.password}
                onChange={formik.handleChange}
                className="w-100"
                placeholder="password"
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="error">{formik.errors.password}</div>
              ) : null}
            </div>
            <div className="col-12 row">
              <label className="w-100" htmlFor="address.street">
                Street:
              </label>
              <input
                type="text"
                id="address.street"
                name="address.street"
                value={formik.values.address.street}
                onChange={formik.handleChange}
                className="w-100"
                autoComplete="off"
                placeholder="Street"
              />
              <label className="w-100" htmlFor="address.city">
                City:
              </label>
              <input
                type="text"
                id="address.city"
                name="address.city"
                value={formik.values.address.city}
                onChange={formik.handleChange}
                className="w-100"
                autoComplete="off"
                placeholder="City"
              />
              <label className="w-100" htmlFor="address.state">
                State:
              </label>
              <input
                type="text"
                id="address.state"
                name="address.state"
                value={formik.values.address.state}
                onChange={formik.handleChange}
                className="w-100"
                autoComplete="off"
                placeholder="State"
              />
              <label className="w-100" htmlFor="address.zipcode">
                Zipcode:
              </label>
              <input
                type="text"
                id="address.zipcode"
                name="address.zipcode"
                value={formik.values.address.zipcode}
                onChange={formik.handleChange}
                className="w-100"
                autoComplete="off"
                placeholder="Zipcode"
              />
              {/* Add similar fields for city, state, and zipCode */}
            </div>
            {/* <div className="col-12 row">
              <label htmlFor="userType" className="w-100">
                User Type:
              </label>
              <select
                id="userType"
                name="userType"
                value={formik.values.userType}
                onChange={formik.handleChange}
                className="w-100"
              >
                <option value="">Select User Type</option>
                <option value="admin">Admin</option>
                <option value="client">Client</option>
                <option value="restaurant">Restaurant</option>
              </select>
              {formik.touched.userType && formik.errors.userType ? (
                <div className="error">{formik.errors.userType}</div>
              ) : null}
            </div> */}

            <div className="col-12 mt-3 p-3">
              <button
                className="bg-danger float-end float-right rounded-3"
                type="submit"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
