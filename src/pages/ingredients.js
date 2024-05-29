import axios from "axios";
import { useEffect, useState } from "react";
import IngredientCard from "../components/ingredientsCard";

const Ingredients = () => {
  const [arrayIndex, setArrayIndex] = useState(0);
  const [ingredients, setIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [splitedArray, setSplitedArray] = useState([]);
  const [firstIndex, setFirstIndex] = useState(0);
  const [secondIndex, setSecondIndex] = useState(99);
  const splitArray = (array, size) => {
    let result = [];
    for (let i = 0; i < array.length; i += size) {
      let chunk = array.slice(i, i + size);
      result.push(chunk);
    }
    return result;
  };
  const apiCall = async () => {
    try {
      setIsLoading(true);
      const data = await axios.get(
        "https://www.themealdb.com/api/json/v1/1/list.php?i=list"
      );
      setIngredients(data.data.meals);
      // splitArray(store.searchExercises, 40)
      console.log(data.data.meals);
      setIsLoading(false);
    } catch {
      setIsLoading(true);
    }
  };
  useEffect(() => {
    apiCall();
  }, []);
  return (
    <div className=" mt-5 pt-5 ingredientsPage">
      <h5 className="  text-white text-start offset-1">
        Check All Ingredients
      </h5>
      <div className=" mt-4 row mealCardContainer">
        {ingredients?.slice(firstIndex, secondIndex).map((obj, index) => (
          <IngredientCard obj={obj} key={index} />
        ))}
      </div>
      <div className=" mb-5 d-flex justify-content-center ms-5 mt-4">
        <nav aria-label="Page navigation example">
          <ul class="pagination my-3">
            {ingredients?.slice(0, 6).map((item, index) => (
              <li class="page-item ">
                <button
                  onClick={() => {
                    console.log(index + 1);
                    // console.log(ingredients[index]);
                    // setArrayIndex(index);
                    switch (index + 1) {
                      case 1:
                        {
                          setFirstIndex(0);
                          setSecondIndex(99);
                        }
                        break;
                      case 2:
                        {
                          setFirstIndex(100);
                          setSecondIndex(199);
                        }
                        break;
                      case 3:
                        {
                          setFirstIndex(200);
                          setSecondIndex(299);
                        }
                        break;
                      case 4:
                        {
                          setFirstIndex(300);
                          setSecondIndex(399);
                        }
                        break;
                      case 5:
                        {
                          setFirstIndex(400);
                          setSecondIndex(499);
                        }
                        break;
                      default: {
                        setFirstIndex(500);
                        setSecondIndex(575);
                      }
                    }
                    //                   if(index +1  === 1){
                    // setFirstIndex(0);
                    // setSecondIndex(99);
                    //                   }else if(index+ 1)
                    setIsLoading(true);
                    setTimeout(() => {
                      setIsLoading(false);
                    }, 2000);
                  }}
                  class="page-link p-1 p-md-3"
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};
export default Ingredients;
