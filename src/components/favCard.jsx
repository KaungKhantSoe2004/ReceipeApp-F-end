const FavCard = ({ obj }) => {
  return (
    <a
      href={`/mealInfo/${obj.mealId}`}
      className=" text-decoration-none col-md-3 position-relative mt-4  offset-1 col-10 mealCard"
    >
      <img
        src={`${obj?.img}`}
        className="mealCardImg w-100 "
        aria-label="For screen readers"
      />
      <div className="mealCardText align-items-end h-100 pb-3 d-flex justify-content-center ">
        <div className="mealCardtextcontainer  ">
          <h5 className=" text-start  fw-bold">Name - {obj?.mealName}</h5>
          {obj.mealCategory && (
            <div className=" fw-bold text-start">
              Category - {obj?.mealCategory}
            </div>
          )}
          {obj.mealArea && (
            <div className="text-start fw-bold">Area - {obj?.mealArea}</div>
          )}
        </div>
      </div>
    </a>
  );
};
export default FavCard;
