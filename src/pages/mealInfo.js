import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiCall } from "../apiCall/apiCall";
import { SpinnerDotted } from "spinners-react";
import {
  FaArrowLeft,
  FaCartPlus,
  FaFacebook,
  FaHeart,
  FaMinus,
  FaPlus,
  FaYoutube,
} from "react-icons/fa";
import axios from "axios";
import { getUser } from "../localStorage/localStorage";

const MealInfo = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [objInfo, SetObjInfo] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [ingArray, setIngArray] = useState([]);
  const [isAddtoFav, setIsAddToFav] = useState(true);
  const [favArray, setFavArray] = useState([]);
  const [instructions, setInstructions] = useState("");
  const [numberOfMeal, setNumberOfMeal] = useState(0);
  const [youTubeLink, setYouTubeLink] = useState();
  const [lang, setLang] = useState("English");
  const [para, setPara] = useState("");
  const user = JSON.parse(getUser());

  const plusFunction = () => {
    let plusNumber = numberOfMeal + 1;
    setNumberOfMeal(plusNumber);
  };

  const getFav = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `https://receipe-app-e8yy.onrender.com/user/${user.id}?_embed=favorites`
      );
      setIsLoading(false);
      setFavArray(response.data.favorites);
      for (let i = 0; i < response.data.favorites.length; i++) {
        if (response.data.favorites[i].mealId == id) {
          setIsAddToFav(false);
        }
      }
    } catch {
      setIsLoading(true);
    }
  };

  const addToFav = async () => {
    let data = {
      userId: user.id,
      mealId: objInfo?.idMeal,
      MealName: objInfo?.strMeal,
      mealCategory: objInfo?.strCategory,
      mealArea: objInfo?.strArea,
      img: objInfo?.strMealThumb,
    };
    await axios.post("https://receipe-app-e8yy.onrender.com/favorites", data);
    setIsAddToFav(false);
  };

  const minusFunction = () => {
    let minusNumber = numberOfMeal - 1;
    if (minusNumber < 0) {
      return;
    } else {
      setNumberOfMeal(minusNumber);
    }
  };

  const backFunction = () => {
    window.history.back();
  };

  const returnIngredients = (key) => {
    return key[0].includes("strIngredient") && key[1] !== "" && key[1] !== null;
  };

  const returnAmount = (key) => {
    return key[0].includes("strMeasure") && key[1] !== "" && key[1] !== null;
  };

  const getData = async () => {
    try {
      setIsLoading(true);
      const data = await apiCall(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );

      SetObjInfo(data?.meals[0]);
      setPara(data?.meals[0].strInstructions);
      const objArray = Object.entries(data?.meals[0]);
      const ingredientArray = objArray.filter(returnIngredients);
      setYouTubeLink(data?.meals[0].strYouTube);
      for (let i = 1; i < 21; i++) {
        let namae = "strIngredient" + i;
        let measure = "strMeasure" + i;
        let ingredient = data?.meals[0][namae];
        let ingredientMeasure = data?.meals[0][measure];
        if (
          ingredient !== "" &&
          ingredient !== null &&
          ingredientMeasure !== "" &&
          ingredientMeasure !== null
        ) {
          let ingredientObj = {
            ingredient: ingredient,
            measure: ingredientMeasure,
          };
          if (ingArray.length < ingredientArray.length) {
            ingArray.push(ingredientObj);
          }
        }
      }

      setIsLoading(false);
    } catch {
      setIsLoading(true);
    }
  };

  const changeLang = async (lang) => {
    // const axios = require('axios');

    const options = {
      method: "GET",
      url: "https://translated-mymemory---translation-memory.p.rapidapi.com/get",
      params: {
        langpair: `en|${lang}`,
        q: objInfo.strInstructions,
        mt: "1",
        onlyprivate: "0",
        de: "a@b.c",
      },
      headers: {
        "X-RapidAPI-Key": "b77de5620bmsh313996f7f5958c4p171782jsnf199d2da21e0",
        "X-RapidAPI-Host":
          "translated-mymemory---translation-memory.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      setPara(response.data.responseData.translatedText);
    } catch (error) {
      alert(error);
    }
  };

  const addToCart = async () => {
    if (numberOfMeal == 0) {
      return;
    }
    const data = {
      mealImg: objInfo?.strMealThumb,
      mealName: objInfo?.strMeal,
      mealCategory: objInfo?.strCategory,
      mealArea: objInfo?.strArea,
      mealId: id,
      userId: user.id,
      quantity: numberOfMeal,
      price: numberOfMeal * 4000,
      status: "pending",
    };

    try {
      const postedData = await axios.post(
        "https://receipe-app-e8yy.onrender.com/carts",
        data
      );
      navigate("/BillingPlan");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
    getFav();
  }, []);

  //   use obj.entries to convert obj to array
  return isLoading ? (
    <div className=" mt-5 pt-5">
      <SpinnerDotted />
    </div>
  ) : (
    <div className=" mt-5 pt-4 mealInfoPage">
      <div
        onClick={backFunction}
        className="mt-5 mb-3 float-start offset-1  backBtn btn btn-secondary btn-sm"
      >
        {" "}
        <FaArrowLeft /> Back
      </div>
      <div className="   mt-4 col-12 row">
        <div className=" eachMealImgContainer pb-0 offset-1 col-10 col-md-6 ">
          <img
            src={objInfo?.strMealThumb}
            // className="  h-md-50 h-100 pb-md-0 pb-2  w-100"
            className=" pb-2 pb-md-0  w-100 h-100"
            alt="img"
          />
        </div>

        <div className=" col-md-5 col-10  mt-md-5 mt-0 offset-md-0 offset-1">
          <h3 className=" text-start text-white">
            {objInfo?.strMeal.toUpperCase()}
          </h3>
          <h6 className=" text-start text-white-50">
            CATEGORY - {objInfo?.strCategory.toUpperCase()}
          </h6>
          <h6 className=" text-start text-white-50">
            NATIONALITY - {objInfo?.strArea.toUpperCase()}
          </h6>

          <div className=" d-flex">
            <h6 className=" text-start fw-bold  mt-2 text-danger">
              PRICE - 4000 kyats ( only Avilable with Wave Money)
            </h6>
          </div>

          <div className="  addToCartContainer">
            <div className=" mt-md-2 mt-1 p-2 col-12 row ">
              <div className="text-md-start text-center col-md-4 col-100     p-2 rounded-1">
                <span
                  onClick={plusFunction}
                  className=" cartfun  rounded-start-1  bg-warning py-1 px-2"
                >
                  <FaPlus />
                </span>
                <span className=" text-white py-1 px-3 bg-black ">
                  {numberOfMeal}
                </span>
                <span
                  onClick={minusFunction}
                  className=" cartfun rounded-end-1  bg-warning py-1 px-2"
                >
                  <FaMinus />
                </span>
              </div>
              <div
                onClick={addToCart}
                className="addToCart bg-warning  ms-3 col-md-4 col-10  tex-start px-2 py-2 rounded-1"
              >
                Add To Cart <FaCartPlus />{" "}
              </div>
            </div>
          </div>

          <h4 className=" text-start ms-1  mt-2 text-white-50">
            {" "}
            PRICE - <span className=" text-white">
              {4000 * numberOfMeal}
            </span>{" "}
            kyats
          </h4>

          <div className=" goToTubeContainer">
            <a
              href={objInfo?.strYoutube}
              className=" float-start btn btn-danger"
            >
              <FaYoutube />
            </a>
          </div>
          {isAddtoFav && (
            <div className="  goToTubeContainer">
              <div
                onClick={addToFav}
                className=" ms-3 float-start btn btn-primary"
              >
                <FaHeart />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className=" mt-5 ingredientContainer pb-5 ">
        <h3 className=" text-white">INGREDIENTS</h3>

        {ingArray?.length === 0 ? (
          <div>There is no Ingredients</div>
        ) : (
          <div className=" ingredientContainer col-12 row">
            {ingArray?.map((obj, index) => (
              <div className=" col-md-3 offset-1 col-10" key={index}>
                {/* {setIngredientsTran(ingreDientsTran + eachIngredient.measure + "/")} */}
                <img
                  src={`https://www.themealdb.com/images/ingredients/${obj.ingredient}.png`}
                  className="ingredientImg w-100 h-75 "
                />
                <div className=" text-white">
                  {obj.measure} of {obj.ingredient}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className=" mt-5 ingredientContainer pb-5 ">
        <h3 className=" text-white">INSTRUCTIONS</h3>

        <div className=" ms-4 d-flex">
          <select
            className=" p-1 rounded-1"
            onChange={(e) => {
              console.log(e.target.value);
              setLang(e.target.value);
            }}
          >
            <option value="English">English</option>
            <option value="Spanish">Spanish es</option>
            <option value="Italy">Italy it</option>
            <option value="Chinese">Chinese zh</option>
          </select>

          <div className="chooseLang text-white mx-2">Chose a Language</div>

          <button
            className=" p-1 rounded-1"
            onClick={() => {
              if (lang === "English") {
                setPara(para);
                console.log(para);
              }
              if (lang === "Spanish") {
                changeLang("es");
              }
              if (lang === "Italy") {
                changeLang("it");
              }
              if (lang === "Chinese") {
                changeLang("zh");
              }
              if (lang === "Thiland") {
              }
            }}
          >
            Translate to {lang}
          </button>
        </div>

        <div className=" px-2  text-white-50 text-start text-white">
          &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
          {para}
        </div>
      </div>
    </div>
  );
};
export default MealInfo;
