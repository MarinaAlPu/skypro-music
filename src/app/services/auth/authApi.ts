import axios from "axios";
import { BASE_URL } from "../constants";


type authUserProps = {
  email: string,
  password: string
};

type regUserProps = {
  email: string,
  username: string,
  password: string,
  passwordConfirmed: string
};

type authUserReturn = {
  email: string,
  username: string,
  _id: number | string
};

type regUserReturn = {
  message: string,
  result: {
    username: string,
    email: string,
    _id: number | string
  },
  success: true
};


export const authUser = (data: authUserProps): Promise<authUserReturn> => {
  return axios.post(BASE_URL + '/user/login/',
    data,
    {
      headers: {
        "content-type": "application/json",
      }
    }
  );
};

export const regUser = (data: regUserProps): Promise<regUserReturn> => {
  return axios.post(BASE_URL + '/user/signup/',
    data,
    {
      headers: {
        "content-type": "application/json",
      }
    }
  );
};
