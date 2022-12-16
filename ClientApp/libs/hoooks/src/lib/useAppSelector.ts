/* eslint-disable @typescript-eslint/no-restricted-imports */
import { TypedUseSelectorHook, useSelector } from 'react-redux';

import { RootState } from '@books-client/store';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
