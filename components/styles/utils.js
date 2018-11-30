import { keyframes } from "styled-components";

export const delayTime = 200; 

export const appear = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

export const slideLine = keyframes`
    from {
        transform: scale(0);
    }
    to {
        transform: scale(1);
    }
`;