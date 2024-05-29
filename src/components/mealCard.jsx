const MealCard = ({ obj }) => {
  return (
    <a
      href={`/mealInfo/${obj.idMeal}`}
      className=" text-decoration-none col-md-3 position-relative mt-4  offset-1 col-10 mealCard"
    >
      <img
        src={`${obj?.strMealThumb}`}
        className="mealCardImg w-100 "
        aria-label="For screen readers"
      />
      <div className="mealCardText align-items-end h-100 pb-3 d-flex justify-content-center ">
        <div className="mealCardtextcontainer  ">
          <h5 className=" text-start  fw-bold">Name - {obj?.strMeal}</h5>
          {obj.strCategory && (
            <div className=" fw-bold text-start">
              Category - {obj?.strCategory}
            </div>
          )}
          {obj.strArea && (
            <div className="text-start fw-bold">Area - {obj?.strArea}</div>
          )}
        </div>
      </div>
    </a>
  );
};
export default MealCard;
