import styled from "styled-components";

import { appear, delayTime, slideLine } from "../../utils";

const Item = styled.li`
    padding: 1rem;
    background-color: #27ae60;
    color: #FFF;
    margin-bottom: 2rem;
    border-radius: 5px;
    position: relative;
    opacity: 0;
    animation: ${appear} 1s forwards;
    animation-delay: ${props => (props.i * delayTime) + (props.i * 1000) + delayTime}ms;
    :before {
        content: "";
        position: absolute;
        width: 1px;
        height: 2rem;
        left: 50%;
        bottom: 100%;
        border-right: thin dashed #27ae60;
        transform: scale(0);
        transform-origin: top;
        animation: ${slideLine} 1s forwards;
        animation-delay: ${props => (props.i * delayTime)}ms;
    }
`;

export default Item;