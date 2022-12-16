import { ButtonHTMLAttributes, FC } from 'react';

import { StyledBaseBtn } from './styled/StyledBaseBtn';
import { StyledSubmitButton } from './styled/StyledSubmit';

import type { IStyledBaseBtnProps } from './styled/StyledBaseBtn';

type BooksAppButtonPropsType = ButtonHTMLAttributes<HTMLButtonElement> & IStyledBaseBtnProps;

const BooksAppButton: FC<BooksAppButtonPropsType> = ({ children, ...props }) => <StyledBaseBtn {...props}>{children}</StyledBaseBtn>;

const BooksAppSubmit: FC<BooksAppButtonPropsType> = ({ children, ...props }) => (
    <StyledSubmitButton type='submit' {...props}>
        {children}
    </StyledSubmitButton>
);

export { BooksAppButton, BooksAppSubmit, BooksAppButtonPropsType };
