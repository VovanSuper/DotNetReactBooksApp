import styled from 'styled-components';

import { appColors } from '@books-client/const';

import { StyledBaseBtn } from './StyledBaseBtn';

const StyledSubmitButton = styled(StyledBaseBtn)`
    &:hover:not(:disabled) {
        background-color: ${appColors.blueLight};
    }

    &:disabled {
        cursor: not-allowed;
        background-color: ${appColors.greyLight};
    }
`;

export { StyledSubmitButton };
