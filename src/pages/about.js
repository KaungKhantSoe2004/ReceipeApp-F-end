const About = () => {
  return (
    <div className=" mt-5 text-white pt-5">
      <h2 className=" aboutHeader fw-semibold  text-center mt-5 ">OUR STORY</h2>
      <div className=" aboutHeadText text-center">
        In 2006, REGENERATION was founded with a single mission , Share our{" "}
        <br></br>
        techniques with anyone in the world .
      </div>
      <div className=" col-8 offset-md-2 offset-0  mt-4">
        <img src={require("../img/aboutImg.jpeg")} className=" " />
      </div>

      <div className=" my-5 offset-0 offset-md-1 col-md-10 col-12  pb-4">
        <h5 className="  text-start aboutHeader">Who We Are</h5>
        <div className=" text-start">
          &nbsp; &nbsp; &nbsp; There are many variations of passages of Lorem
          Ipsum available, but the majority have suffered alteration in some
          form, by injected humour, or randomised words which don't look even
          slightly believable. If you are going to use a passage of Lorem Ipsum,
          you need to be sure there isn't anything embarrassing hidden in the
          middle of text. All the Lorem Ipsum generators on the Internet tend to
          repeat predefined chunks as necessary, making this the first true
          generator on the Internet. It uses a dictionary of over 200 Latin
          words, combined with a handful of model sentence structures, to
          generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum
          is therefore always free from repetition, injected humour, or
          non-characteristic words etc.
        </div>
      </div>
    </div>
  );
};
export default About;
