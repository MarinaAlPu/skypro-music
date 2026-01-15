import axios from "axios";
import { BASE_URL } from "../constants";
import { TrackType, CategoryType } from "@/sharedTypes/sharedTypes";


export const getTracks = (): Promise<TrackType[]> => {
  return axios(BASE_URL + '/catalog/track/all/')
    .then((res) => {
      // console.log(res.data.data);
      return res.data.data;
    });
}

export const getCategoryTracks = (trackId: string): Promise<CategoryType> => {
  return axios(BASE_URL + `/catalog/selection/${trackId}/`)
    .then((res) => {
      // console.log(res.data.data);
      return res.data.data;
    })
}
