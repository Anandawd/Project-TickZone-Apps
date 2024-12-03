import {
  ERROR_FETCHING_PAYMENTS,
  START_FETCHING_PAYMENTS,
  SUCCESS_FETCHING_PAYMENTS,
} from "./constants";

import debounce from "debounce-promise";
import { getData } from "../../utils/fetch";
import { clearNotif } from "../notif/actions";

let debouncedFetchPayments = debounce(getData, 1000);

export const startFetchingPayments = () => {
  return {
    type: START_FETCHING_PAYMENTS,
  };
};

export const errorFetchingPayments = () => {
  return {
    type: ERROR_FETCHING_PAYMENTS,
  };
};

export const successFetchingPayments = ({ payments }) => {
  return {
    type: SUCCESS_FETCHING_PAYMENTS,
    payments,
  };
};

export const fetchPayments = () => {
  return async (dispatch) => {
    dispatch(startFetchingPayments());

    try {
      setTimeout(() => {
        dispatch(clearNotif());
      }, 3000);

      let res = await debouncedFetchPayments(`/cms/payments`);

      res.data.data.forEach((res) => {
        res.avatar = res.image.name;
      });

      dispatch(
        successFetchingPayments({
          payments: res.data.data,
        })
      );
    } catch (error) {
      dispatch(errorFetchingPayments());
    }
  };
};
