import axios from "axios";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import MealCard from "../components/mealCard";
import { SpinnerDotted } from "spinners-react";
import { useParams } from "react-router-dom";

const Alphabet = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [productArray, setProductArray] = useState([]);
  const [noMeals, setNoMeals] = useState(false);
  const { name } = useParams();
  const backFunction = () => {
    window.history.back();
  };
  const loading = async () => {
    try {
      setIsLoading(true);
      const data = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/search.php?f=${name}`
      );
      setProductArray(data.data.meals);

      setIsLoading(false);
      if (data.data.meals === null) {
        setNoMeals(true);
      }
    } catch {
      setIsLoading(true);
    }
  };
  useEffect(() => {
    loading();
  }, []);
  return isLoading ? (
    <div className=" mt-5 pt-5">
      <SpinnerDotted />
    </div>
  ) : (
    <div className=" mt-5 pt-4 mealInfoPage">
      <div className=" col-12  d-flex justify-content-start">
        <div
          onClick={backFunction}
          className="mt-5 mb-3 offset-1  backBtn btn btn-secondary btn-sm"
        >
          {" "}
          <FaArrowLeft /> Back
        </div>
      </div>

      {noMeals ? (
        <h2 className=" text-white text-center my-4">There is no meals </h2>
      ) : (
        <div className=" col-12">
          <div className=" my-4 row mealCardContainer">
            {productArray?.map((obj, index) => (
              <MealCard obj={obj} key={index} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Alphabet;