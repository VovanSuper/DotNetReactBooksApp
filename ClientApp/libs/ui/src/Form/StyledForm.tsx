import styled from 'styled-components';

export interface IStyledFormProps {
    align?: 'start' | 'end';
    justify?: 'center' | 'start' | 'end';
}

const StyledForm = styled.form<IStyledFormProps>`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: ${({ align }) => (align ? align : 'center')};
    justify-content: ${({ justify }) => (justify ? justify : 'start')};
`;

export { StyledForm };
