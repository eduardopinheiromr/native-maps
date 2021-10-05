import axios from "axios";

export const googleApi = axios.create({
  baseURL: "https://maps.googleapis.com/maps/api/directions/",
});

export const getDirectionsFromGoogle = async (
  origin: string,
  destination: string
) => {
  const { data } = await googleApi.get(
    `json?origin=${origin}&destination=${destination}&key=${process.env.GOOGLE_API_KEY}`
  );

  return data;
};
