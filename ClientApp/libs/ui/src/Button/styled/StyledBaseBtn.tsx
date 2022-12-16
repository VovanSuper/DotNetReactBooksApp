import styled from 'styled-components';

import { appColors, } from '@books-client/const';

export interface IStyledBaseBtnProps {
    full?: true | false;
    color?: string;
    backgroundColor?: string;
    hoverColor?: string;
    hoverBg?: string;
    width?: string;
    height?: string;
    maxWidth?: string;
}

const StyledBaseBtn = styled.button<IStyledBaseBtnProps>`
    width: ${({ width }) => (width ? width : '100%')};
    max-width: ${({ full, maxWidth }) => (full ? '100%' : maxWidth ? maxWidth : '20rem')};
    height: 100%;
    cursor: pointer;
    font-size: 1rem;
    color: ${({ color }) => (color ? color : appColors.fullWhite)};
    border: none;
    height: ${({ height }) => (height ? height : '4rem')};
    border-radius: .5rem;
    text-transform: uppercase;
    transition: 0.2s ease-out;

    &:not([disabled]) {
        background-color: ${({ backgroundColor }) => (backgroundColor ? backgroundColor : appColors.bluePrimary)};
        &:hover {
            background-color: ${({ hoverBg }) => (hoverBg ? hoverBg : appColors.blueDarker)};
            color: ${({ hoverColor }) => (hoverColor ? hoverColor : appColors.fullWhite)};
        }
    }
`;

export { StyledBaseBtn };
