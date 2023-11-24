import * as React from 'react';
import { useEffect, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import ProductsList from './ProductsList'
import Web3 from 'web3';
import { contractABI, contractAddress } from '../../constants';
import DateAndTime from './DateAndTime';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
declare let window: any;

const Payment: React.FC = () => {
    const [products, setProducts] = React.useState([
        { ItemName: '', Quantity: '', Price: '' }
    ])

    const [isLoader, setIsLoader] = React.useState(false);


    const [value, setValue] = React.useState<any>(new Date());

    const [paymentData, setPaymentData] = React.useState({
        TypeOfTransaction: 'Pharmacy Payment',
        OrderID:  "Order-" + Math.random().toString(16).slice(2),
        FromWalletAddress: '',
        ToWalletAddress: '',
        AmountOnToken: '',
        AmountOnUSD: '',
        Note: '',
        Consent: '',
        ProductList: '',
        DateAndTime: '',
        userID: 505
    });


    const [provider, setProvider] = useState(null);
    const [contract, setContract] = useState<any>(null);
    const [account, setAccount] = useState('');
    const [symbol, setSymbol] = useState('');
    // const [contractAddress, setContractAddress] = useState('');
    const [contractBalance, setContractBalance] = useState(0);
    const [isLoad, setIsLoad] = useState(false);
    const [show, setShow] = useState(false);
    const [transferData, setTransferData] = useState({
        OrderID:"",
        blockHash: "",
        blockNumber: "",
        cumulativeGasUsed: "",
        effectiveGasPrice: "",
        events: "",
        from: "",
        gasUsed: "",
        logs: "",
        logsBloom: "",
        status: "",
        to: "",
        transactionHash: "",
        transactionIndex: "",
        type: ""
    });


    useEffect(() => {
        const loadWeb3 = async () => {
            setIsLoader(true)
            if (window.ethereum) {
                window.web3 = new Web3(window.ethereum);
                await window.ethereum.enable();
                const web3 = window.web3;
                const contractTemp = new web3.eth.Contract(contractABI, contractAddress);
                const accounts = await web3.eth.getAccounts();
                const balance = await contractTemp.methods.balanceOf(accounts[0]).call();
                setContract(contractTemp)
                setAccount(accounts[0])
                setSymbol(await contractTemp.methods.symbol().call())
                setContractBalance(balance.toString() / 10 ** 18)
                // console.log(accounts);
                // console.log(balance);
                setIsLoader(false)
            } else if (window.web3) {
                window.web3 = new Web3(window.web3.currentProvider);
                const web3 = window.web3;
                const accounts = await web3.eth.getAccounts();
                setIsLoader(false)
            } else {
                window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
                setIsLoader(false)
            }
        }
        loadWeb3();
    }, []);

    return (
        <React.Fragment>
            {/* <CssBaseline /> */}
            {/* Loader */}
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isLoader}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            {/* Loader END */}
            <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
                <Paper variant="outlined" sx={{ textAlign: "center", p: { xs: 2, md: 3 } }}>
                    <h3>Contract Interaction - {symbol}</h3>
                    <div>Connected Account: {account}</div>
                    <div>Contract Address: {contractAddress}</div>
                    <div>Token Balance ({symbol}): {contractBalance}</div>
                </Paper>
            </Container>

           {transferData.transactionHash && ( <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <Typography component="h1" variant="h4" align="center">
                        Receipt
                    </Typography>

                    <Box sx={{}}    >
                        <Grid container spacing={1}>
                        <Grid item xs={12} sm={3}>
                                <Typography variant="body1" gutterBottom>
                                    Order ID :
                                </Typography>

                            </Grid>
                            <Grid item xs={12} sm={9}>
                                <Typography variant="body1" gutterBottom>
                                    {transferData.OrderID}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <Typography variant="body1" gutterBottom>
                                    Transaction Hash :
                                </Typography>

                            </Grid>
                            <Grid item xs={12} sm={9}>
                                <Typography variant="body1" gutterBottom>
                                    {transferData.transactionHash}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <Typography  variant="body1" gutterBottom>
                                    Block Hash :
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={9}>
                                <Typography variant="body1" gutterBottom>
                                    {transferData.blockHash}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <Typography variant="body1" gutterBottom>
                                    Block Number :
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={9}>
                                <Typography variant="body1" gutterBottom>
                                    {transferData.blockNumber.toString()}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <Typography  variant="body1" gutterBottom>
                                    Cumulative Gas Used :
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={9}>
                                <Typography variant="body1" gutterBottom>
                                    {transferData.cumulativeGasUsed.toString()}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <Typography  variant="body1"  gutterBottom>
                                    Effective Gas Price :
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={9}>
                                <Typography variant="body1" gutterBottom>
                                    {transferData.effectiveGasPrice.toString()}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <Typography variant="body1"  gutterBottom>
                                    From :
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={9}>
                                <Typography variant="body1" gutterBottom>
                                    {transferData.from}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <Typography  variant="body1" gutterBottom>
                                    Gas Used :
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={9}>
                                <Typography variant="body1" gutterBottom>
                                    {transferData.gasUsed.toString()}
                                </Typography>
                            </Grid>

                            <Grid item xs={12} sm={3}>
                                <Typography  variant="body1" gutterBottom>
                                    Status :
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={9}>
                                <Typography variant="body1" gutterBottom>
                                    {transferData.status.toString()}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <Typography variant="body1" gutterBottom>
                                    To :
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={9}>
                                <Typography variant="body1" gutterBottom>
                                    {transferData.to}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <Typography variant="body1" gutterBottom>
                                    Transaction Index :
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={9}>
                                <Typography variant="body1" gutterBottom>
                                    {transferData.transactionIndex.toString()}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <Typography  variant="body1" gutterBottom>
                                    Type :
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={9}>
                                <Typography variant="body1" gutterBottom>
                                    {transferData.type.toString()}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Box sx={{
                                    textAlign: "center"
                                }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    onClick={() => {
                                        setTransferData({
                                            OrderID:"",
                                            blockHash: "",
                                            blockNumber: "",
                                            cumulativeGasUsed: "",
                                            effectiveGasPrice: "",
                                            events: "",
                                            from: "",
                                            gasUsed: "",
                                            logs: "",
                                            logsBloom: "",
                                            status: "",
                                            to: "",
                                            transactionHash: "",
                                            transactionIndex: "",
                                            type: ""
                                        });

                                        setPaymentData({  ...paymentData,                                         
                                            TypeOfTransaction: 'Pharmacy Payment',
                                            OrderID:  "Order-" + Math.random().toString(16).slice(2),
                                            FromWalletAddress: '',
                                            ToWalletAddress: '',
                                            AmountOnToken: '',
                                            AmountOnUSD: '',
                                            Note: '',
                                            Consent: '',
                                            ProductList: '',
                                            DateAndTime: '',
                                            userID: 505
                                        })

                                    }}

                                >
                                    close
                                </Button>
                                </Box>
                            </Grid>

                        </Grid>



                    </Box>


                </Paper>
            </Container>)}



            {!transferData.transactionHash &&  ( <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <Typography component="h1" variant="h4" align="center">
                        Pay
                    </Typography>
                    {/* <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography> */}
                    <Box sx={{
                        mt: 3,
                        '& .MuiTextField-root': { width: '100%' },

                    }}>
                        <Grid container spacing={1}>
                            <Grid item xs={12} sm={12}>
                                <InputLabel id="demo-simple-select-label">Transaction Type</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="TypeOfTransaction"
                                    size="small"
                                    value={paymentData.TypeOfTransaction}
                                    fullWidth
                                    onChange={(event: SelectChangeEvent) => {
                                        setPaymentData({  ...paymentData,                                         
                                            TypeOfTransaction: event.target.value as string,
                                            FromWalletAddress: '',
                                            ToWalletAddress: '',
                                            AmountOnToken: '',
                                            AmountOnUSD: ''
                                        })
                                    }
                                    }
                                >
                                    <MenuItem value={'Pharmacy Payment'}>Pharmacy Payment</MenuItem>
                                    <MenuItem value={'Retail  Gold Payment'}>Retail  Gold Payment</MenuItem>
                                    <MenuItem value={'Retail payment through our POS'}>Retail payment through our POS</MenuItem>
                                </Select>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    id="OrderID"
                                    name="OrderID"
                                    disabled
                                    label="Order ID"
                                    fullWidth
                                    autoComplete="given-name"
                                    variant="outlined"
                                    size="small"
                                    value={paymentData.OrderID}
                                    // onChange={(event) => {
                                    //     setPaymentData({
                                    //         ...paymentData,
                                    //         OrderID: event.target.value as string
                                    //     })
                                    // }}

                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="userID"
                                    name="userID"
                                    label="User ID"
                                    disabled
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                    value={paymentData.userID}
                               
                                />
                            </Grid>
                            <Grid item xs={12} >
                                <TextField
                                    required
                                    id="FromWalletAddress"
                                    name="FromWalletAddress"
                                    label="From Wallet Address"
                                    fullWidth
                                    autoComplete="family-name"
                                    variant="outlined"
                                    size="small"
                                    value={paymentData.FromWalletAddress}
                                    onChange={(event) => {
                                        setPaymentData({
                                            ...paymentData,
                                            FromWalletAddress: event.target.value as string
                                        })
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    id="ToWalletAddress"
                                    name="ToWalletAddress"
                                    label="To Wallet Address"
                                    size="small"
                                    fullWidth
                                    autoComplete="shipping address-line1"
                                    variant="outlined"
                                    value={paymentData.ToWalletAddress}
                                    onChange={(event) => {
                                        setPaymentData({
                                            ...paymentData,
                                            ToWalletAddress: event.target.value as string
                                        })
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    id="AmountOnToken"
                                    name="AmountOnToken"
                                    label="Amount On Token"
                                    size="small"
                                    fullWidth
                                    autoComplete="shipping address-line2"
                                    variant="outlined"
                                    value={paymentData.AmountOnToken}
                                    onChange={(event) => {
                                        setPaymentData({
                                            ...paymentData,
                                            AmountOnToken: event.target.value as string
                                        })
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    id="AmountOnUSD"
                                    name="AmountOnUSD"
                                    label="Amount On USD"
                                    size="small"
                                    fullWidth
                                    autoComplete="shipping address-level2"
                                    variant="outlined"
                                    value={paymentData.AmountOnUSD}
                                    onChange={(event) => {
                                        setPaymentData({
                                            ...paymentData,
                                            AmountOnUSD: event.target.value as string
                                        })
                                    }}
                                />
                            </Grid>
                            {['Retail  Gold Payment'].includes(paymentData.TypeOfTransaction) &&(   <Grid item xs={12} sm={12}>
                                <TextField
                                    id="Note"
                                    name="Note"
                                    label="Note"
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                    multiline
                                    rows={2}
                                    value={paymentData.Note}
                                    onChange={(event) => {
                                        setPaymentData({
                                            ...paymentData,
                                            Note: event.target.value as string
                                        })
                                    }}
                                />
                            </Grid>)}
                            {['Retail  Gold Payment'].includes(paymentData.TypeOfTransaction) &&(    <Grid item xs={12} sm={12}>
                                <TextField
                                    id="Consent"
                                    name="Consent"
                                    label="Consent"
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                    multiline
                                    rows={2}
                                    value={paymentData.Consent}
                                    onChange={(event) => {
                                        setPaymentData({
                                            ...paymentData,
                                            Consent: event.target.value as string
                                        })
                                    }}
                                />
                            </Grid>)}
                            {['Retail payment through our POS'].includes(paymentData.TypeOfTransaction) &&(    <Grid item xs={12} sm={4}>
                                <ProductsList products={products} setProducts={setProducts} />
                            </Grid>)}
                            {['Pharmacy Payment'].includes(paymentData.TypeOfTransaction) &&( <Grid item xs={12} sm={8}>
                             <DateAndTime value={value} setValue={setValue} /> 
                            </Grid>)}

                            <Grid item xs={12}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    onClick={async () => {
                                        setIsLoader(true)
                                        try {
                                            const { TypeOfTransaction, OrderID, userID, FromWalletAddress, ToWalletAddress, AmountOnToken, AmountOnUSD, Note, Consent, ProductList, DateAndTime } = paymentData;
                                            const resp = await contract.methods.transferWithData(
                                                TypeOfTransaction,  // 1.Pharmacy Payment , 2.Retail  Gold Payment, 3.Retail payment through our POS,
                                                OrderID,
                                                FromWalletAddress,
                                                ToWalletAddress,
                                                Number(AmountOnToken) * 1000000000000000000,
                                                Number(AmountOnUSD),
                                                Note,
                                                Consent,
                                                JSON.stringify(products),// ProductList,
                                                Math.floor(value / 1000),// DateAndTime,
                                                userID
                                            ).send({ from: account })
                                            setTransferData({
                                                ...resp,
                                                OrderID: OrderID

                                            })
                                            // console.log("KKKKKKKKKKKKKKKKKKKKKKKK:", resp)
                                            setIsLoader(false)
                                        }
                                        catch (err) {
                                            setIsLoader(false)
                                            console.log(err)
                                        }
                                    }}

                                >
                                    Pay
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>
            </Container>)}
        </React.Fragment>
    );
}
export default Payment;