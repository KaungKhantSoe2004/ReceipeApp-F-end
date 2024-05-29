import axios from "axios";
export const apiCall = async (urls) => {
  const options = {
    method: "GET",
    url: urls,
    // params: { limit: "1330" },
    // headers: {
    //   "X-RapidAPI-Key": "fe3a5115a7msh0841f7079962453p1fedf8jsn4e98a4100a26",
    //   "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
    // },
  };
  try {
    const response = await axios.request(options);

    return response.data;
  } catch (error) {
    return error;
  }
};
