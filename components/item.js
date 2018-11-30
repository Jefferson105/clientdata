import React from "react";
import PropTypes from "prop-types";

import List from "./styles/blocks/list";
import SubList from "../components/styles/blocks/subList";

class Item extends React.Component {
    state = { clicked: false };

    render() {
        const { clicked } = this.state;
        const { length, val, i } = this.props;

        return(
            <List.Item length={length} i={i} onClick={() => this.setState({ clicked: !clicked })}>
                <h3>{val[1].store}</h3>
                <p>{val[1].date}</p>
                <small>{val[0]}</small>

                {
                    !!clicked &&
                    <SubList>
                        {
                            val[1].products.map(({ name, price, date }, i) => 
                                <SubList.Item i={i} key={i}>
                                    <h3>{name}</h3>
                                    <p>R$ {price},00</p>
                                    <small>{date}</small>
                                </SubList.Item>
                            )
                        }
                    </SubList>
                }
            </List.Item>
        );
    }
}

Item.propTypes = {
    length: PropTypes.number.isRequired,
    val: PropTypes.array.isRequired,
    i: PropTypes.number.isRequired
};

export default Item;
