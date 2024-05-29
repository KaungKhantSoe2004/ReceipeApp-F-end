import axios from "axios";
import { useEffect, useReducer, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SpinnerDotted } from "spinners-react";
import { setUser } from "../localStorage/localStorage";

const LoginPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [validation, setValidation] = useState(false);
  const [falseData, setFalseData] = useState(false);
  const [error, setError] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const [users, setUsers] = useState();

  const login = async (e) => {
    e.preventDefault();
    setValidation(false);
    setFalseData(false);

    if (emailRef.current.value === "" || passwordRef.current.value === "") {
      setValidation(true);
      return;
    }

    users.map((item, index) => {
      if (
        item.email === emailRef.current.value &&
        item.password === passwordRef.current.value
      ) {
        setUser(JSON.stringify(item));
        navigate("/");
        return;
      }
      if (index === users.length - 1) {
        setFalseData(true);
      }
    });
  };

  const getUsers = async () => {
    const res = await axios.get("https://receipe-app-e8yy.onrender.com/user");

    if (res.data) {
      setIsLoading(true);
      setUsers(res.data);
      setIsLoading(false);
    } else {
      setError(true);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className=" my-5 registerPage">
      <div className=" col-md-6 col-10 offset-1  my-5 py-5 offset-md-3">
        {isLoading ? (
          <h3 className=" mt-5 bg-white p-4 card text-danger text-center">
            <SpinnerDotted />
          </h3>
        ) : (
          <div className=" my-5 bg-white py-4 card">
            <div className="  border-0 card-header">
              <div className=" d-flex justify-content-center">
                <img
                  src={require("../img/logo.jpg")}
                  className=" registerLogo rounded-circle"
                  alt="fsadf"
                />
              </div>
              <h4 className=" mt-3 text-center aboutLin">REGENERATION</h4>
            </div>
            <div className=" card-body mt-5 border-0">
              <h5 className=" text-center text-dark">Log in Page</h5>
              <form action="" className=" mt-4">
                <div className=" mt-3 inputContainer">
                  <h6 className=" text-start form-label">Enter Your Email</h6>
                  <input
                    type="email"
                    className=" my-2 me-4 form-control"
                    placeholder=" Enter Your Email"
                    ref={emailRef}
                  />
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
                {validation && (
                  <small className=" text-danger">
                    Please fill the blanks Correctly!
                  </small>
                )}

                {falseData && (
                  <small className=" text-danger">
                    Sorry , You have to fill the blanks correctly
                  </small>
                )}
                <div className=" mt-3">
                  <button
                    onClick={login}
                    className=" float-end p-2 rounded-1 bg-black text-white"
                  >
                    Log in
                  </button>
                </div>
              </form>
            </div>
            <div className=" border-top card-footer text-center border-0">
              <Link to="/register" className=" text-decoration-none">
                Don't have an account? Sign Up !
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
