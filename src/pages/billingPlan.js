// import axios from "axios";
// import { useEffect, useState } from "react";
// import { FaArrowLeft, FaTrash } from "react-icons/fa";
// import { SpinnerDotted } from "spinners-react";
// import { getUser } from "../localStorage/localStorage";

// const BillingPlan = () => {
//   const [isLoading, setIsLoading] = useState(true);
//   const [totalPrice, setTotalPrice] = useState(0);
//   const user = JSON.parse(getUser());
//   const [cartArray, setCartArray] = useState([]);
//   const backFunction = () => {
//     window.history.back();
//   };

//   const buyBtnClick = () => {
//     console.log("buying");
//   };

//   const calculateSum = (arr) => {
//     return arr.reduce((total, current) => {
//       return total + current;
//     }, 0);
//   };

//   // try it

//   const deleteFunction = async (id) => {
//     try {
//       await axios.delete(`https://receipe-app-e8yy.onrender.com/carts/${id}`);
//       window.location.reload();
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   const returnVal = (arr) => {
//     let newPrice = 0;
//     arr.forEach((obj) => {
//       newPrice += obj.price;
//       setTotalPrice(newPrice);
//       console.log(newPrice);
//     });
//     return newPrice;
//   };
//   // let newPrice = 0;
//   const getCarts = async () => {
//     try {
//       setIsLoading(true);
//       const data = await axios.get(
//         `https://receipe-app-e8yy.onrender.com/user/${user.id}?_embed=carts`
//       );
//       setCartArray(data.data.carts);
//       returnVal(data.data.carts);
//       setIsLoading(false);
//     } catch {
//       setIsLoading(true);
//     }
//   };

//   useEffect(() => {
//     getCarts();
//   }, []);

//   return isLoading ? (
//     <div className=" pt-5 mt-5">
//       <SpinnerDotted />
//     </div>
//   ) : (
//     <div className=" mt-4 pt-4">
//       <div className=" col-12  d-flex justify-content-start">
//         <div
//           onClick={backFunction}
//           className="mt-5 mb-3 offset-1  backBtn btn btn-secondary btn-sm"
//         >
//           {" "}
//           <FaArrowLeft /> Back
//         </div>
//       </div>

//       <div className=" mt-4 offset-1 text-start">
//         <h4 className=" text-white">Shopping Cart</h4>
//         <h6 className=" text-white-50">You have 4 items in your cart</h6>
//       </div>

//       <div className=" col-md-10 col-12  overflow-x-scroll offset-md-1 offset-0 ">
//         <table class="table table-dark o verflow-scroll table-borderless table-hover mb-2 text-center mb-0">
//           <thead class="thead-dark">
//             <tr>
//               <th className=" text-start">Img</th>
//               <th className=" text-start">Name</th>
//               <th className=" text-start">Quantity</th>
//               <th className=" text-start"> Price</th>
//               <th className=" text-start">Status</th>
//               <th className=" text-start">Remove</th>
//             </tr>
//           </thead>
//           <tbody class="align-middle overflow-scroll ">
//             {cartArray.map((obj, index) => (
//               <tr key={index} className=" bg-dark tableRow">
//                 <td className=" text-start bg-dark">
//                   <img src={obj.mealImg} style={{ width: "90px" }} />
//                 </td>
//                 <td className=" bg-dark">
//                   <div className=" col-5 pt-1 ms-2">
//                     <h6 className=" text-start text-white">{obj.mealName}</h6>
//                     <div className=" text-start text-white-50">
//                       {obj.mealCategory}, {obj.mealArea}
//                     </div>
//                   </div>
//                 </td>
//                 <td className=" bg-dark">{obj.quantity}</td>
//                 <td className=" bg-dark">
//                   <div className=" col-md-1 col-2  text-white text-start">
//                     {obj.price} kyats
//                   </div>
//                 </td>
//                 <td className=" text-start bg-dark">
//                   <span id="deleteOrder" class=" rounded-2 bg-primary p-1">
//                     {obj.status}
//                   </span>
//                 </td>
//                 <td className=" text-start bg-dark">
//                   <button
//                     onClick={() => {
//                       deleteFunction(obj.id);
//                     }}
//                     id="deleteOrder"
//                     class="deleteBtn btn btn-sm btn-danger"
//                   >
//                     <FaTrash />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         <div className=" text-white d-flex justify-content-end mb-3 ">
//           <h4 className=" text-white">Total Price - {totalPrice} kyats</h4>
//         </div>

//         <div className=" buyButtonContainer mb-5">
//           {cartArray?.length !== 0 && (
//             <div className=" buyButton bg-warning rounded-2  p-2">
//               Make Payment
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };
// export default BillingPlan;

import axios from "axios";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaTrash } from "react-icons/fa";
import { SpinnerDotted } from "spinners-react";
import { getUser } from "../localStorage/localStorage";

import {
  initiatePayment,
  checkPaymentStatus,
} from "../components/waveServices";

const BillingPlan = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const [paymentStatus, setPaymentStatus] = useState("");
  const user = JSON.parse(getUser());
  const [cartArray, setCartArray] = useState([]);
  const backFunction = () => {
    window.history.back();
  };

  const buyBtnClick = async () => {
    console.log("buying");
    const paymentDetails = {
      amount: totalPrice,
      recipient: "recipient_account", // Replace with actual recipient account details
      userId: user.id,
    };

    try {
      const paymentResponse = await initiatePayment(paymentDetails);
      const transactionId = paymentResponse.transactionId;
      setPaymentStatus("Payment initiated. Transaction ID: " + transactionId);

      //
      const statusResponse = await checkPaymentStatus(transactionId);
      setPaymentStatus("Payment status: " + statusResponse.status);
    } catch (error) {
      setPaymentStatus("Payment failed");
    }
  };

  const calculateSum = (arr) => {
    return arr.reduce((total, current) => {
      return total + current;
    }, 0);
  };

  const deleteFunction = async (id) => {
    try {
      await axios.delete(`https://receipe-app-e8yy.onrender.com/carts/${id}`);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const returnVal = (arr) => {
    let newPrice = 0;
    arr.forEach((obj) => {
      newPrice += obj.price;
      setTotalPrice(newPrice);
      console.log(newPrice);
    });
    return newPrice;
  };

  const getCarts = async () => {
    try {
      setIsLoading(true);
      const data = await axios.get(
        `https://receipe-app-e8yy.onrender.com/user/${user.id}?_embed=carts`
      );
      setCartArray(data.data.carts);
      returnVal(data.data.carts);
      setIsLoading(false);
    } catch {
      setIsLoading(true);
    }
  };

  useEffect(() => {
    getCarts();
  }, []);

  return isLoading ? (
    <div className=" pt-5 mt-5 pb-5">
      <SpinnerDotted />
    </div>
  ) : (
    <div className=" mt-4 pt-4">
      <div className=" col-12  d-flex justify-content-start">
        <div
          onClick={backFunction}
          className="mt-5 mb-3 offset-1  backBtn btn btn-secondary btn-sm"
        >
          <FaArrowLeft /> Back
        </div>
      </div>

      <div className=" mt-4 offset-1 text-start">
        <h4 className=" text-white">Shopping Cart</h4>
        <h6 className=" text-white-50">You have 4 items in your cart</h6>
      </div>

      <div className=" col-md-10 col-12  overflow-x-scroll offset-md-1 offset-0 ">
        <table class="table table-dark overflow-scroll table-borderless table-hover mb-2 text-center mb-0">
          <thead class="thead-dark">
            <tr>
              <th className=" text-start">Img</th>
              <th className=" text-start">Name</th>
              <th className=" text-start">Quantity</th>
              <th className=" text-start"> Price</th>
              <th className=" text-start">Status</th>
              <th className=" text-start">Remove</th>
            </tr>
          </thead>
          <tbody class="align-middle overflow-scroll ">
            {cartArray.map((obj, index) => (
              <tr key={index} className=" bg-dark tableRow">
                <td className=" text-start bg-dark">
                  <img src={obj.mealImg} style={{ width: "90px" }} />
                </td>
                <td className=" bg-dark">
                  <div className=" col-5 pt-1 ms-2">
                    <h6 className=" text-start text-white">{obj.mealName}</h6>
                    <div className=" text-start text-white-50">
                      {obj.mealCategory}, {obj.mealArea}
                    </div>
                  </div>
                </td>
                <td className=" bg-dark">{obj.quantity}</td>
                <td className=" bg-dark">
                  <div className=" col-md-1 col-2  text-white text-start">
                    {obj.price} kyats
                  </div>
                </td>
                <td className=" text-start bg-dark">
                  <span id="deleteOrder" class=" rounded-2 bg-primary p-1">
                    {obj.status}
                  </span>
                </td>
                <td className=" text-start bg-dark">
                  <button
                    onClick={() => {
                      deleteFunction(obj.id);
                    }}
                    id="deleteOrder"
                    class="deleteBtn btn btn-sm btn-danger"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className=" text-white d-flex justify-content-end mb-3 ">
          <h4 className=" text-white">Total Price - {totalPrice} kyats</h4>
        </div>

        <div className=" buyButtonContainer mb-5">
          {cartArray?.length !== 0 && (
            <div
              className=" buyButton bg-warning rounded-2 p-2"
              onClick={buyBtnClick}
            >
              Make Payment
            </div>
          )}
        </div>

        {paymentStatus && (
          <div className=" mb-5 text-white mt-3">
            <h5>{paymentStatus}</h5>
          </div>
        )}
      </div>
    </div>
  );
};
export default BillingPlan;
