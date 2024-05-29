import { useEffect, useState } from "react";
import MealCard from "../components/mealCard";
import SmallFavCard from "../components/smallFav";
import { FaCalendar, FaSearch } from "react-icons/fa";
import { SpinnerDotted } from "spinners-react";
import { apiCall } from "../apiCall/apiCall";
import { getUser } from "../localStorage/localStorage";
import { useNavigate } from "react-router-dom";
import CategoryCard from "../components/categoryCard";
import axios from "axios";
const Home = () => {
  const OurFav = [
    {
      id: "https://www.themealdb.com/images/media/meals/1529446352.jpg",
      name: "Chicken Congee",
      img: "https://www.themealdb.com/images/media/meals/1529446352.jpg",
      area: "Chinese",
      category: "Chicken",
    },
    {
      id: "52836",
      name: "Seafood fideuà",
      img: "https://www.themealdb.com/images/media/meals/wqqvyq1511179730.jpg",
      area: "Spanish",
      category: "Seafood",
    },
    {
      id: "52813",
      name: "Kentuky Fried Chicken",
      img: "https://www.themealdb.com/images/media/meals/xqusqy1487348868.jpg",
      area: "American",
      category: "Chicken",
    },
    {
      id: 52955,
      name: "Egg Drop Soup",
      img: "https://www.themealdb.com/images/media/meals/1529446137.jpg",
      area: "Chinese",
      category: "Vegetarian",
    },
    {
      id: 53049,
      name: "Apam balik",
      img: "https://www.themealdb.com/images/media/meals/adxcbq1619787919.jpg",
      area: "Malaysian",
      category: "Dessert",
    },
    {
      id: "52772",
      name: "Teriyaki Chicken Casserole",
      img: "https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg",
      area: "Japanese",
      category: "Chicken",
    },
  ];
  const alphabets = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];

  const [isLoading, setIsLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [randomMeal, setRandomMeal] = useState(null);
  const [categories, setCategories] = useState([]);
  const [countries, setCountries] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchedValue, setSearchedValue] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const navigate = useNavigate();

  const [mealsArray, setMealsArray] = useState([]);

  const searchFunction = async () => {
    searchml();
    setIsSearch(!isSearch);
  };

  const changeSearchText = (e) => {
    setSearchText(e.target.value);
  };

  const searchml = async () => {
    if (searchText === "") {
      apiClassicMeals();
      setSearchedValue("");
      return;
    }
    setSearchedValue(searchText);

    try {
      setSearchLoading(true);
      const data = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchedValue}`
      );
      setMealsArray(data.data.meals);
      setSearchLoading(false);
    } catch {
      setSearchLoading(true);
    }
  };

  // useEffect
  const apiCountries = async () => {
    try {
      setIsLoading(true);
      const data = await apiCall(
        "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
      );

      setCountries(data.meals);
      setIsLoading(false);
      console.log(countries, "is countries");
    } catch {
      setIsLoading(true);
    }
  };

  const apiCategory = async () => {
    try {
      const data = await apiCall(
        "https://www.themealdb.com/api/json/v1/1/categories.php"
      );

      // console.log(data, "is Array");
      setCategories(data.categories);
      // console.log
      setIsLoading(false);
    } catch {
      setIsLoading(true);
    }
  };

  const apiClassicMeals = async () => {
    try {
      const data = await apiCall(
        "https://www.themealdb.com/api/json/v1/1/search.php?f=c"
      );

      console.log(data, "is Array");
      setMealsArray(data.meals);
      console.log(mealsArray);
      setIsLoading(false);
    } catch {
      setIsLoading(true);
    }
  };

  const apiRandomMeal = async () => {
    try {
      const data = await apiCall(
        "https://www.themealdb.com/api/json/v1/1/random.php"
      );
      setRandomMeal(data?.meals[0]);
      setIsLoading(false);
    } catch {
      setIsLoading(true);
    }
    // setIsLoading(false);
  };

  useEffect(() => {
    const user = JSON.parse(getUser());
    if (user) {
      try {
        setIsLoading(true);
        apiRandomMeal();
        searchml();
        apiCategory();
        apiCountries();
        // setIsLoading(false);
      } catch {
        setIsLoading(true);
      }
    } else {
      navigate("/login");
    }
  }, [isSearch]);

  // useEffect(() => {
  //   searchml();
  // }, isSearch);

  return isLoading ? (
    <div className=" mt-5 w-100 h-100 d-flex align-items-center justify-content-center  spinnerContainer">
      <h3 className=" fs-1 pt-5 mt-5">
        <SpinnerDotted className=" text-white pt-5" />
      </h3>
    </div>
  ) : (
    <div className=" home mt-5">
      {/* Home First Row */}
      <div className=" pt-5 pb-4 col-12 row mt-5">
        <div className=" homeBoxContainer position-relative col-md-8 col-11 ms-4">
          <img
            className=" homeBoxImg w-100"
            src={`${randomMeal?.strMealThumb}`}
          />
          <div className=" ">
            <div className="homeBoxText  col-8 h-md-100 h-75   align-items-end pb-5 d-flex justify-content-center ">
              <div className="textcontainer ms-3 w-100 ">
                <h5 className=" text-start fw-bold">
                  Meal Name - {randomMeal?.strMeal}
                </h5>

                <h6 className=" text-start fw-bold">
                  Nationality - {randomMeal?.strArea}
                </h6>
                <h6 className=" text-start fw-bold">
                  Category - {randomMeal?.strCategory}
                </h6>
              </div>
            </div>
          </div>
          {/* <div className=" bg-danger homeBoxText  w-50"> hEllo</div> */}
        </div>
        <div className=" col-md-3 mt-md-0 mt-5 col-10 offset-1 offset-md-0 ourFavContainer ms-md-3 ">
          <div className=" ourFav">
            <h4 className="ourFavText mt-5">OUR FAVORITES</h4>
          </div>
          {OurFav.map((obj, index) => (
            <SmallFavCard key={index} obj={obj} id={obj.id} />
          ))}
        </div>
      </div>
      {/* Home First Row End
       */}

      {/* Home Second Row */}
      <div className=" col-12  mt-4 ">
        <div className=" col-12 searchContainer">
          <div className=" col-12 row searchBarContainer">
            <div className=" col-md-5 offset-md-3 col-9 offset-1">
              <input
                onChange={changeSearchText}
                value={searchText}
                className="  form-control"
                placeholder="Search Your Meals with mealName or ingredients e.g Retutalia,chicken"
              />
            </div>
            <button
              onClick={searchFunction}
              className=" col-1 btn searchBtn btn-secondary btn-sm"
            >
              <FaSearch />
            </button>
          </div>
          <div className=" mt-3">
            {searchedValue === "" ? (
              <h5 className=" mt-4 fw-bold text-white text-start offset-md-1 offset-0 ">
                Our Classis Meals
              </h5>
            ) : (
              <h5 className=" mt-4 fw-bold text-white text-start offset-md-1 offset-0 ">
                Searching - {searchedValue}
              </h5>
            )}
            {mealsArray === null ? (
              <h2 className=" text-white text-center">
                There is no Meals Result
              </h2>
            ) : (
              <div className=" mt-4 row mealCardContainer">
                {mealsArray?.map((obj, index) => (
                  <MealCard obj={obj} key={index} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      {/* HOme Second Row End */}

      {/* Home Third Row Start(Categories) */}
      <div className=" mt-4">
        <div className=" categoryContainer">
          <h5 className=" mt-4 fw-bold text-white text-start offset-md-1 offset-0 ">
            Search With Categories
          </h5>
          <div className=" mt-4 row mealCardContainer offset-1 col-10">
            <div className=" mt-4 row mealCardContainer">
              {categories?.map((obj, index) => (
                <CategoryCard obj={obj} key={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Home Thir Row End */}

      {/* Home Forth Row Start(Area) */}
      <div className=" my-4">
        <div className=" categoryContainer">
          <h5 className=" mt-4 fw-bold text-white text-start offset-md-1 offset-0 ">
            Search With Nations
          </h5>
          <div className="categoryBtnContainer offset-1 col-10">
            {countries?.map((obj, index) => (
              <a
                href={`/area/${obj.strArea}`}
                key={index}
                className=" text-decoration-none text-black categoryBtn rounded-1 p-3"
              >
                {obj.strArea}
              </a>
            ))}
          </div>
        </div>
      </div>
      {/* Home Forth Row End */}

      {/* Home Fifth row Start( alphabet) */}
      <div className=" my-4">
        <div className=" categoryContainer">
          <h5 className=" mt-4 fw-bold text-white text-start offset-md-1 offset-0 ">
            Search With first Letters
          </h5>
          <div className="categoryBtnContainer my-4 pb-5 offset-1 col-10">
            {alphabets?.map((obj, index) => (
              <a
                href={`/alphabet/${obj}`}
                key={index}
                className=" text-decoration-none text-black categoryBtn rounded-1 p-3"
              >
                {obj}
              </a>
            ))}
            {/* <a
                href={`/area/${obj.strArea}`}
                key={index}
                className=" text-decoration-none text-black categoryBtn rounded-1 p-3"
              >
                {obj.strArea}
              </a> */}
          </div>
        </div>
      </div>
      {/* Home Fifth row End (Alphabet) */}
    </div>
  );
};
export default Home;
