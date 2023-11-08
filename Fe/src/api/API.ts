import axios from "axios";

const URL: string = "http://localhost:4500/api/v1";

export const getData = async () => {
  try {
    return await axios.get(`${URL}/get-data`).then((res: any) => {
      return res.data.data;
    });
  } catch (error) {}
};

export const sortKids = async () => {
  try {
    return await axios.get(`${URL}/sort-data`).then((res: any) => {
      return res.data.data;
    });
  } catch (error) {}
};

export const getDataBySearch = async () => {
  try {
    return await axios.get(`${URL}/get-data`).then((category: any) => {
      return category.data.data;
    });
  } catch (error) {}
};
