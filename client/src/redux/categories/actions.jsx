import {
  ERROR_FETCHING_CATEGORIES,
  START_FETCHING_CATEGORIES,
  SUCCESS_FETCHING_CATEGORIES,
} from "./constants";

import { getData } from "../../utils/fetch";
import { clearNotif } from "../notif/actions";

import debounce from "debounce-promise";

let debouncedFetchCategories = debounce(getData, 1000);

export const startFetchingCategories = () => {
  return {
    type: START_FETCHING_CATEGORIES,
  };
};

export const errorFetchingCategories = () => {
  return {
    type: ERROR_FETCHING_CATEGORIES,
  };
};

export const successFetchingCategories = ({ categories }) => {
  return {
    type: SUCCESS_FETCHING_CATEGORIES,
    categories,
  };
};

export const fetchCategories = () => {
  return async (dispatch) => {
    dispatch(startFetchingCategories());

    try {
      setTimeout(() => {
        dispatch(clearNotif());
      }, 3000);

      let res = await debouncedFetchCategories(`/cms/categories`);

      dispatch(
        successFetchingCategories({
          categories: res.data.data,
        })
      );
    } catch (error) {
      dispatch(errorFetchingCategories());
    }
  };
};
