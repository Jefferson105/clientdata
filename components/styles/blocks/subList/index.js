import styled from "styled-components";

import Item from "./Item";

const List = styled.ul`
    position: absolute;
    list-style: none;
    top: calc(100% + 2rem);
    transform: translateX(-14%);
`;

/* 
width: 100%;
    left: 0;
*/

List.Item = Item;

export default List;