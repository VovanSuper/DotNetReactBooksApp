import { useState } from 'react';

import { SnackbarProps } from '@mui/material';

const iniProps: SnackbarProps = {
    message: '',
    color: 'green',
    autoHideDuration: 4000,
    anchorOrigin: {
        horizontal: 'center',
        vertical: 'top',
    },
};

export const useNotify = () => {
    const [visible, setVisible] = useState(false);
    const [props, setProps] = useState<SnackbarProps>(iniProps);
    const showSnackbar = (message: string, props?: SnackbarProps) => {
        setProps({
            ...props,
            message,
            title: props?.title ? props.title : message,
            onClose: props?.onClose ? props.onClose : (e) => setVisible(false),
        });
        setVisible(true);
    };

    return { visible, setVisible, showSnackbar, snackbarProps: props };
};
