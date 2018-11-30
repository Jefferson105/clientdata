import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { SET_DATA, SET_ERROR } from "../actions/actionTypes";

import { initialData, rootReducer } from "../reducers";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);


describe("ações", () => {
    it("retorna o estado inicial", () => {
        expect(rootReducer(undefined,{})).toEqual(initialData);
    });

    it("buscar dados", async () => {
        const store = mockStore(initialData);
        let newData = initialData;

        try {
            let res = await fetch("/getdata");
            let { events } = await res.json();

            let data = events.reduce((ac, val) => {
                let t_id = val.custom_data.find(({ key }) => key === "transaction_id").value;
    
                if(!ac[t_id]) {
                    ac[t_id] = { products: [] };
                }
    
                if(val.event == "comprou") {
                    ac[t_id].store = val.custom_data.find(({ key }) => key === "store_name").value;
                    ac[t_id].date = val.timestamp.formatTime(false);
                }else {
                    ac[t_id].products.push({ 
                        name: val.custom_data.find(({ key }) => key === "product_name").value,
                        price: val.custom_data.find(({ key }) => key === "product_price").value,
                        date: val.timestamp.formatTime(true)
                    });
                }
    
                return ac;
            }, {});

            store.dispatch({ type: SET_DATA, data });
            
            newData.data = data;
        }catch(error) {
            newData.error = "Ocorreu um erro. Recarregue a página.";

            store.dispatch({ type: SET_ERROR, data: "Ocorreu um erro. Recarregue a página." });
        }

        expect(store.getState()).toEqual(newData);
    });
});