import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function ProductsList({ products, setProducts }: any) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Button variant="outlined" onClick={handleClickOpen}>
                Products
            </Button>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Products List
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent dividers>
                    <Box sx={{
                        mt: 3,
                        '& .MuiTextField-root': { width: '100%' },
                        '& .MuiButton-root': { mt: 1 },

                    }}>
                        {products.map((x: any, index: number) => <Grid  key={index} container mt={1} spacing={1}>
                            <Grid item xs={4}>
                                <TextField id="outlined-basic" label="Item Name" value={x.ItemName} onChange={(e: any) => {
                                    const List = [...products]
                                    List[index].ItemName = e.target.value
                                    setProducts(List)
                                }} variant="outlined" />
                            </Grid>
                            <Grid item xs={2}>
                                <TextField id="outlined-basic" value={x.Quantity} onChange={(e: any) => {
                                    const List = [...products]
                                    List[index].Quantity = e.target.value
                                    setProducts(List)
                                }} label="Qty" variant="outlined" />
                            </Grid>
                            <Grid item xs={2}>
                                <TextField id="outlined-basic" value={x.Price} onChange={(e: any) => {
                                    const List = [...products]
                                    List[index].Price = e.target.value
                                    setProducts(List)
                                }} label="Price" variant="outlined" />
                            </Grid>

                            {products.length - 1 === index && (<Grid item xs={2}>
                                <Button variant="contained" size="small" onClick={() => {
                                    setProducts([...products, {
                                        ItemName: "",
                                        Quantity: "",
                                        Price: ""
                                    }])
                                }}> <AddIcon /> </Button>
                            </Grid>)}
                            {products.length !== 1 && (<Grid item xs={2}>
                                <Button variant="contained" size="small" onClick={() => {
                                    const List = [...products]
                                    List.splice(index, 1)
                                    setProducts(List)
                                }}> <RemoveIcon /></Button>
                            </Grid>)}


                        </Grid>)}
                    </Box>

                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Save changes
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </React.Fragment>
    );
}
