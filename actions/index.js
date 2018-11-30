import { SHOW_LOADING, HIDE_LOADING, SET_DATA, SET_ERROR } from "./actionTypes";

import Data from "../utils/fetchAndHandleData";

export const getData = () => {
    return async dispatch => {
        dispatch({ type: SHOW_LOADING });

        let worker = new Worker("/static/workers/handleData.worker.js");
        worker.postMessage({});

        worker.onmessage = ({ data }) => {
            if(data.error) {
                dispatch(getDataWithoutWorker());
                return;
            }else {
                dispatch({ type: SET_DATA, data: data.data });
            }

            dispatch({ type: HIDE_LOADING });

            worker.terminate();
        };

        worker.onerror = () => {
            dispatch(getDataWithoutWorker());
            worker.terminate();
        };
    };
};

export const getDataWithoutWorker = () => {
    return async dispatch => {
        try {
            let data = await Data();

            dispatch({ type: SET_DATA, data });
        }catch(err) {
            dispatch({ type: SET_ERROR, data: "Ocorreu um erro. Recarregue a página." });
        }

        dispatch({ type: HIDE_LOADING });
    };
};