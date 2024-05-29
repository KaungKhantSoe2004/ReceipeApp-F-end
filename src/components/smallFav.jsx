const SmallFavCard = ({ obj, id }) => {
  return (
    <a
      href={`/mealInfo/${id}`}
      className=" text-decoration-none text-black mt-3 smallFav  d-flex  row col-12"
    >
      <div className=" col-5 ms-1">
        <img src={`${obj.img}`} className=" w-100" alt="" />
      </div>
      <div className=" col-6">
        <h6 className=" fw-bold  text-start">{obj.name} </h6>
        <div className="   text-start"> {obj.category} </div>
        <div className="   text-start"> {obj.cuisine}</div>
      </div>
    </a>
  );
};
export default SmallFavCard;
