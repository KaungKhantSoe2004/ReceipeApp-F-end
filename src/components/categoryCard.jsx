const CategoryCard = ({ obj }) => {
  return (
    <a
      href={`/category/${obj.strCategory}`}
      className=" text-decoration-none col-md-3 position-relative mt-4  offset-1 col-10 mealCard"
    >
      <img
        src={`${obj?.strCategoryThumb}`}
        className="mealCardImg w-100 "
        aria-label="For screen readers"
      />
      <div className=" categoryCardText">
        <h3 className=" text-white">{obj?.strCategory}</h3>
      </div>
      {/* <div className="mealCardText align-items-end h-100 pb-3 d-flex justify-content-center ">
        <div className="mealCardtextcontainer  ">
          <h5 className=" text-start  fw-bold">Name - {obj?.strCategory}</h5>
        </div>
      </div> */}
    </a>
  );
};
export default CategoryCard;
