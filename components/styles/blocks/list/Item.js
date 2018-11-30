import styled  from "styled-components";

import { appear, delayTime, slideLine } from "../../utils";

const Item = styled.li`
    background-color: #2980b9;
    color: #FFF;
    padding: 2rem;
    text-align: center;
    cursor: pointer;
    z-index: 1;
    opacity: 0;
    animation: ${appear} 1s forwards;
    animation-delay: ${props => (props.i * delayTime) + (props.i * 1000)}ms;
    border-radius: 5px;
    :before {
        content: "";
        top: 50%;
        z-index: -1;
        position: absolute;
        height: 1px;
        width: ${props => 100 / props.length}%;
        border-top: thin dashed #2980b9;
        transform: scale(0);
        transform-origin: 0 0;
        animation: ${slideLine} 1s forwards;
        animation-delay: ${props => (props.i * delayTime) + delayTime}ms;
    }
    :last-child {
        :before {
            display: none;
        }
    }
    :hover {
        box-shadow: 0 0 20px 2px rgba(0,0,0,.2);
    }
`;

//position: relative;

export default Item;