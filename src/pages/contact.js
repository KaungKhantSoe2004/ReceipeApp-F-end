import { FaAddressBook, FaMailBulk, FaPhoneAlt } from "react-icons/fa";

import { useReducer, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { useForm } from "react-hook-form";
function Contact() {
  const [isMailed, setIsMailed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const form = useRef();
  const submit = (data) => {
    // email js library function
    setIsLoading(true);
    console.log(data);
    setIsMailed(false);
    emailjs
      .sendForm(
        "service_kow2nt9",
        "template_cb400bp",
        form.current,
        "taWHxGleX6BjcDvid"
      )
      .then(
        (result) => {
          setIsMailed(true);
          setIsLoading(false);
          console.log(result.text);
          setIsPosted(true);

          setTimeout(() => {
            setIsPosted(false);
          }, 3000);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm();
  const [isPosted, setIsPosted] = useState(false);

  return (
    <div className=" col-12 row aboutPage">
      <div>
        <div className=" pt-5 mt-5 col-12 aboutContainer">
          <h2 className=" col-12 text-center text-white   mt-5 position-absolute about">
            Contact Page
          </h2>
        </div>
        <div className=" contactContainer">
          <div>
            <h3 className=" mt-5 aboutLin text-center">Contact Us !</h3>
          </div>
          <div className=" col-12 row">
            <div className=" contacts col-12 col-md-5 offset-md-1 ps-5 ">
              <div className=" mt-5 ">
                <h3 className="  text-white address">
                  <FaAddressBook className="aboutHeader   aboutLin me-3" />
                  Address
                </h3>
                <h5 className=" ps-2 text-whit aboutHeader">
                  Myingyan , Semekhon
                </h5>
              </div>
              <div className=" mt-5 ">
                <h3 className="  text-white address">
                  <FaPhoneAlt className=" aboutHeader aboutLin me-3" />
                  Phone
                </h3>
                <h5 className=" ps-2  aboutHeader">09796788834</h5>
              </div>
              <div className=" mt-5 ">
                <h3 className="  text-white address">
                  <FaMailBulk className="aboutHeader aboutLin me-3" />
                  Email
                </h3>
                <h5 className=" ps-2  aboutHeader">kaungkhants892@gmail.com</h5>
              </div>
            </div>
            <div className=" col-md-5 col-12  ps-5 mt-4 ">
              {isPosted && (
                <div class="alert alert-primary" role="alert">
                  This is a primary alert—check it out!
                </div>
              )}
              <div className=" ">
                {isMailed && (
                  <div class="alert alert-success">
                    <strong>Success!</strong> You have successfully mailed to
                    Kaung Khant Soe.
                  </div>
                )}

                <form
                  action=" formContainer"
                  onSubmit={handleSubmit(submit)}
                  ref={form}
                >
                  <input
                    type="text"
                    placeholder=" Enter Your Name"
                    className=" mt-4 name form-control"
                    {...register("name", { required: true })}
                  />
                  {errors.name && (
                    <div className=" text-danger mt-1">
                      Please fill your Name
                    </div>
                  )}
                  <input
                    type="text "
                    placeholder=" Enter Your Email"
                    className="mt-4 email form-control"
                    {...register("email", { required: true })}
                  />
                  {errors.email && (
                    <div className=" text-danger mt-1">
                      Please fill your Email Address
                    </div>
                  )}
                  <input
                    type=" text"
                    placeholder=" Enter Your Subject"
                    className="mt-4 subject form-control"
                    {...register("subject", { required: true })}
                  />
                  {errors.subject && (
                    <div className=" text-danger mt-1">
                      Please fill your Subject
                    </div>
                  )}
                  <textarea
                    name=""
                    className=" mt-4 message form-control"
                    placeholder="  Enter Your Message"
                    id=""
                    cols="30"
                    rows="10"
                    {...register("message", { required: true })}
                  ></textarea>
                  {errors.message && (
                    <div className=" text-danger mt-1">
                      Please fill in Message Box
                    </div>
                  )}

                  {/* <button
              type="submit"
              value="Send"
              
              className="contactBtn col-3 p-1 my-2"
            >
              {isLoading ? "loading" : "Send"}
            </button> */}

                  <button
                    className=" float-start  btn btn-primary  mb-5   px-4 mt-3 "
                    type="submit"
                  >
                    {isLoading ? "loading" : "Send"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Contact;
