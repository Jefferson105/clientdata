String.prototype.formatTime = function(withHour) {
    let str = this.toString();

    let div = str.split(".")[0].split("T");
    let mdy = div[0].split("-");

    let date = `${mdy[2]}/${mdy[1]}/${mdy[0]}`;
    let hour = `${div[1]}`;

    return withHour ? `${date} ${hour}` : date;
};

self.onmessage = async () => {
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
    
        postMessage({ data });
    }catch(error) {
        postMessage({ error });
    }
};