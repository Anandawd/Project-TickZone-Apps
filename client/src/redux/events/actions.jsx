import {
  ERROR_FETCHING_EVENTS,
  SET_CATEGORY,
  SET_KEYWORD,
  SET_TALENT,
  START_FETCHING_EVENTS,
  SUCCESS_FETCHING_EVENTS,
} from "./constants";

import debounce from "debounce-promise";
import { getData } from "../../utils/fetch";
import { clearNotif } from "../notif/actions";

let debouncedFetchEvents = debounce(getData, 1000);

export const startFetchingEvents = () => {
  return {
    type: START_FETCHING_EVENTS,
  };
};

export const errorFetchingEvents = () => {
  return {
    type: ERROR_FETCHING_EVENTS,
  };
};

export const successFetchingEvents = ({ events }) => {
  return {
    type: SUCCESS_FETCHING_EVENTS,
    events,
  };
};

export const setKeyword = (keyword) => {
  return {
    type: SET_KEYWORD,
    keyword,
  };
};

export const setCategory = (category) => {
  return {
    type: SET_CATEGORY,
    category,
  };
};

export const setTalent = (talent) => {
  return {
    type: SET_TALENT,
    talent,
  };
};

export const fetchEvents = () => {
  return async (dispatch, getState) => {
    dispatch(startFetchingEvents());

    try {
      setTimeout(() => {
        dispatch(clearNotif());
      }, 3000);

      let params = {
        keyword: getState().events.keyword,
        category: getState().events?.category?.value || "",
        talent: getState().events?.talent?.value || "",
      };

      let res = await debouncedFetchEvents(`/cms/events`, params);

      res.data.data.forEach((res) => {
        res.categoryName = res?.category?.name ?? "";
        res.talentName = res?.talent?.name ?? "-";
      });

      dispatch(
        successFetchingEvents({
          events: res.data.data,
        })
      );
    } catch (error) {
      dispatch(errorFetchingEvents());
    }
  };
};
