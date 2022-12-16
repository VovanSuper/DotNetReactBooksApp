/* eslint-disable @typescript-eslint/no-restricted-imports */
import { useDispatch } from 'react-redux';

import { AppDispatch } from '@books-client/store';

export const useAppDispatch: () => AppDispatch = useDispatch;
