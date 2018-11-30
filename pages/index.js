import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getData } from "../actions";

import Loading from "../components/styles/elements/loading";
import List from "../components/styles/blocks/list";
import Item from "../components/item";

class Index extends React.Component {
    componentDidMount() {
        this.props.dispatch(getData());
    }

    render() {
        const { loading, data, error } = this.props;
        
        return(
            <React.Fragment>
                {
                    loading ? 
                        <Loading src="/static/loading.svg" /> :
                        error ?
                            <p>{error}</p> :
                            <React.Fragment>
                                <h2 style={{ textAlign: "center", margin: "1rem 0" }}>Clique nos boxes abaixo</h2>
                                <List>
                                    { 
                                        Object.entries(data).map((val, i) => <Item key={i} i={i} val={val} length={Object.keys(data).length} />) 
                                    }
                                </List>
                            </React.Fragment>

                }
            </React.Fragment>
        );
    }
} 

Index.propTypes = {
    dispatch: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    data: PropTypes.object,
    error: PropTypes.string
};

export default connect(state => state)(Index);