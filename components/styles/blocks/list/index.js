import styled from "styled-components";

import Item from "./Item";

const List = styled.ul`
    max-width: 1367px;
    margin: 2rem auto;
    display: flex;
    justify-content: space-around;
    position: relative;
    list-style: none;
`;

List.Item = Item;

export default List;