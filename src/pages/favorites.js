import axios from "axios";
import { json } from "react-router-dom";
import { getUser } from "../localStorage/localStorage";
import { useEffect, useState } from "react";
import { SpinnerDotted } from "spinners-react";
import MealCard from "../components/mealCard";
import FavCard from "../components/favCard";

const Favorites = () => {
  const user = JSON.parse(getUser());
  const [favArray, setFavArray] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const getFavorites = async () => {
    try {
      setIsLoading(true);
      const data = await axios.get(
        `https://receipe-app-e8yy.onrender.com/user/${user.id}?_embed=favorites`
      );
      setFavArray(data.data.favorites);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(true);
    }
  };

  // useEffect
  useEffect(() => {
    getFavorites();
  }, []);

  return isLoading ? (
    <div className=" mt-5 pt-5">
      <SpinnerDotted />
    </div>
  ) : (
    <div className=" mt-5 pt-5 ingredientsPage">
      <h5 className="  text-white text-start offset-1">
        Your Favorites Receipe
      </h5>
      {favArray === null || favArray.length === 0 ? (
        <h2 className=" text-white text-center">There is no Meals Result</h2>
      ) : (
        <div className=" mt-4 row mealCardContainer">
          {favArray?.map((obj, index) => (
            <FavCard obj={obj} key={index} />
          ))}
        </div>
      )}
    </div>
  );
};
export default Favorites;
