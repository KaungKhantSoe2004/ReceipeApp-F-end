const IngredientCard = ({ obj }) => {
  return (
    <a
      href={`/ingredient/${obj?.strIngredient}`}
      className=" text-decoration-none col-md-3 position-relative mt-4  offset-1 col-10 mealCard"
    >
      <img
        src={`https://www.themealdb.com/images/ingredients/${obj?.strIngredient}.png`}
        className="mealCardImg w-100 "
        aria-label="For screen readers"
      />
      <div className=" categoryCardText">
        <h3 className=" text-white">{obj?.strIngredient}</h3>
      </div>
      {/* <div className="mealCardText align-items-end h-100 pb-3 d-flex justify-content-center ">
          <div className="mealCardtextcontainer  ">
            <h5 className=" text-start  fw-bold">Name - {obj?.strCategory}</h5>
          </div>
        </div> */}
    </a>
  );
};
export default IngredientCard;
