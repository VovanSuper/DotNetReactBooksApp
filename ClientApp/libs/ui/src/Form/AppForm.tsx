import type { FC, FormHTMLAttributes } from 'react';

import { IStyledFormProps, StyledForm } from './StyledForm';

type IBooksAppFormProps = FormHTMLAttributes<HTMLFormElement> & IStyledFormProps;

const BooksAppForm: FC<IBooksAppFormProps> = ({ children, ...props }) => <StyledForm {...props}>{children}</StyledForm>;

export { BooksAppForm, IBooksAppFormProps };
