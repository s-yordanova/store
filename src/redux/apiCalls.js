import { loginStart, loginFail, loginSuccess, registerStart, registerFail, registerSuccess,reset, logout, updateStart, updateSuccess, updateFail } from "./userRedux";
import { publicRequest, userRequest } from "../requestMethods";

export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try {
      const res = await publicRequest.post("/auth/login", user);
      dispatch(loginSuccess(res.data));
    } catch (err) {
      dispatch(loginFail());
    }
  };

export const register = async (dispatch, user) => {
  dispatch(registerStart());
  try {
    const res = await publicRequest.post(`/auth/register`, user);
    dispatch(registerSuccess(res.data));
  } catch (err) {
    dispatch(registerFail());
  }
};


export const update = async (dispatch,id, user) => {
  dispatch(updateStart());
  try {
    const res = await userRequest.put(`/users/${id}`, user);
    //dispatch(updateUsersSuccess({ id: id, user: user }));
    dispatch(updateSuccess(res.data));
  } catch (err) {
    dispatch(updateFail());
  }
};

export const resetFailSucc = async (dispatch) => {
  dispatch(reset());
};

export const logoutUser = async (dispatch) => {
  dispatch(logout());
};

