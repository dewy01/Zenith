import { keyframes } from '@mui/material';

export const pulseScale = keyframes`
0% {
    transform: scale(1);
}
50% {
    transform: scale(1.05);
}
100% {
    transform: scale(1);
}
`;

export const pulseOpacity = keyframes`
0% {
    opacity: 0:2;
}
50% {
    opacity: 0.8;
}
100% {
    opacity: 0:2;
}
`;
