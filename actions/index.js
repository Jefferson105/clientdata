import { SHOW_LOADING, HIDE_LOADING, SET_DATA, SET_ERROR } from "./actionTypes";

export const getData = () => {
    return async dispatch => {
        dispatch({ type: SHOW_LOADING });

        let worker = new Worker("/static/workers/handleData.worker.js");
        worker.postMessage("fire!");

        worker.onmessage = ({ data }) => {
            if(data.error) {
                dispatch({ type: SET_ERROR, data: "Ocorreu um erro. Recarregue a página." });
            }else {
                dispatch({ type: SET_DATA, data: data.data });
            }

            dispatch({ type: HIDE_LOADING });

            worker.terminate();
        };

        worker.onerror = () => {
            dispatch({ type: SET_ERROR, data: "Ocorreu um erro. Recarregue a página." });
            dispatch({ type: HIDE_LOADING });
            worker.terminate();
        };
    };
};