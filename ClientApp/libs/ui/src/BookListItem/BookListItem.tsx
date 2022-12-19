import { appColors } from '@books-client/const';
import { IBook } from '@books-client/models';
import { DeleteOutline, EditOutlined, MoreVert } from '@mui/icons-material';
import { Checkbox, Divider, FormControlLabel, IconButton, MenuItem, Popover, Stack } from '@mui/material';
import { FC, SyntheticEvent, useState } from 'react';

export interface IBookItemProps {
    book: IBook;
    checked: boolean;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
    onSelected: (id: number) => void;
}

export const BookListItem: FC<IBookItemProps> = ({ book, checked, onSelected, onDelete, onEdit }) => {
    const [open, setOpen] = useState<HTMLElement | null>(null);

    const handleOpenMenu = (event: SyntheticEvent<HTMLElement>) => setOpen(event.currentTarget);

    const handleCloseMenu = () => setOpen(null);

    const handleEditBook = () => {
        onEdit(book.id);
        handleCloseMenu();
    };

    const handleDeleteBook = () => {
        onDelete(book.id);
        handleCloseMenu();
    };

    const handleChecked = () => {
        onSelected(book.id);
        handleCloseMenu();
    };

    return (
        <Stack
            direction='row'
            sx={{
                px: 2,
                py: 0.75,
                ...(checked && {
                    color: appColors.blueDarker,
                }),
            }}
        >
            <FormControlLabel control={<Checkbox checked={checked} />} onChange={handleChecked} label={book.name} sx={{ flexGrow: 1, m: 0 }} />

            <IconButton size='large' color='inherit' sx={{ opacity: 0.48 }} onClick={handleOpenMenu}>
                <MoreVert />
            </IconButton>

            <Popover
                open={Boolean(open)}
                anchorEl={open}
                onClose={handleCloseMenu}
                anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                PaperProps={{
                    sx: {
                        p: 1,
                        '& .MuiMenuItem-root': {
                            px: 1,
                            typography: 'body2',
                            borderRadius: 0.75,
                        },
                    },
                }}
            >
                <MenuItem onClick={handleEditBook}>
                    <EditOutlined />
                </MenuItem>

                <Divider sx={{ borderStyle: 'dashed' }} />

                <MenuItem onClick={handleDeleteBook} sx={{ color: 'error.main' }}>
                    <DeleteOutline />
                </MenuItem>
            </Popover>
        </Stack>
    );
};
