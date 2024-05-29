import axios from "axios";
import { SpinnerDotted } from "spinners-react";
import { setUser } from "../localStorage/localStorage";

const { useState, useReducer, useRef, useEffect } = require("react");
const { Link, useNavigate } = require("react-router-dom");

const RegisterPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [validation, setValidation] = useState(false);
  const [emailValidation, setEmailValidation] = useState(false);
  const [users, setUsers] = useState(null);
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  // registerFunction
  const register = async (e) => {
    setError(false);
    setValidation(false);
    setEmailValidation(false);
    e.preventDefault();
    if (
      emailRef.current.value === "" ||
      nameRef.current.value === "" ||
      passwordRef.current.value === ""
    ) {
      setValidation(true);
      return;
    }

    users.map((item) => {
      if (item.email === emailRef.current.value) {
        setEmailValidation(true);
        return;
      }
    });

    const passData = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    console.log(passData);

    try {
      const response = await axios.post(
        "https://receipe-app-e8yy.onrender.com/user",
        passData
      );
      console.log(response.data);

      setUser(JSON.stringify(response.data));
      navigate("/");
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };
  const getUsers = async () => {
    const res = await axios.get("https://receipe-app-e8yy.onrender.com/user");

    if (res.data) {
      // setIsShow(true);
      setUsers(res.data);
      console.log(users);
    } else {
      setError(true);
    }
  };
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className=" mt-5 registerPage">
      <div className=" col-md-6 col-10 offset-1  mt-5 pt-5 offset-md-3">
        {isLoading ? (
          <h3 className=" mt-5 bg-white p-4 card text-danger text-center">
            <SpinnerDotted />
          </h3>
        ) : (
          <div className=" mt-5 bg-white p-4 card">
            <div className="  border-0 card-header">
              <div className=" d-flex justify-content-center">
                <img
                  src={require("../img/logo.jpg")}
                  className=" registerLogo rounded-circle"
                  alt="fsadf"
                />
              </div>
              <h4 className=" mt-3 text-center aboutLin">URAVITY</h4>
            </div>
            <div className=" card-body mt-5 border-0">
              <h5 className=" text-start text-dark">Register Page</h5>
              <form action="" className=" mt-4">
                <div className=" mt-3 text-start inputContainer">
                  <h6 className=" form-label">Enter Your Name</h6>
                  <input
                    type="text"
                    className=" my-2 me-4 form-control"
                    placeholder=" Enter Your Name"
                    ref={nameRef}
                  />
                  {/* {validation && (
                    <small className=" text-danger">
                      ! Please fill all the forms
                    </small>
                  )} */}
                </div>
                <div className=" mt-3 inputContainer">
                  <h6 className=" text-start form-label">Enter Your Email</h6>
                  <input
                    type="email"
                    className=" my-2 me-4 form-control"
                    placeholder=" Enter Your Email"
                    ref={emailRef}
                  />
                  {emailValidation && (
                    <small className=" text-danger">
                      ! Your Email already exists
                    </small>
                  )}
                </div>
                <div className=" mt-3 inputContainer">
                  <h6 className=" text-start form-label">
                    Enter Your Password
                  </h6>
                  <input
                    type="password"
                    className=" my-2 me-4 form-control"
                    placeholder=" Enter Your Password"
                    ref={passwordRef}
                  />
                </div>

                {error && (
                  <small className=" text-danger">
                    Sorry, Something has gone wrong in the server side.Try Later
                    !
                  </small>
                )}
                {validation && (
                  <small className=" text-danger">
                    Please fill the blanks Correctly!
                  </small>
                )}
                {/* {emailValidation && (
                  <small className=" text-danger">
                    Your Email has already registered, Please Sign In
                  </small>
                )} */}
                <div className=" mt-3">
                  <button
                    onClick={register}
                    className=" float-end p-2 rounded-1 bg-black text-white"
                  >
                    Register
                  </button>
                </div>
              </form>
            </div>

            <div className=" border-top card-footer text-center border-0">
              <Link to="/login" className=" mt-5 text-decoration-none">
                Alreay have an account, Sign In !
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default RegisterPage;
