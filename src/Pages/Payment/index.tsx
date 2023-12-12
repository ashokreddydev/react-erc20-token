import * as React from 'react';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import ProductsList from './ProductsList'
import Web3 from 'web3';
import { contractABI, contractAddress } from '../../constants';
import DateAndTime from './DateAndTime';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { Btc, Eth, Usdc, Ada, Ltc } from 'react-web3-icons';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

declare let window: any;


const Payment: React.FC = () => {
    const [products, setProducts] = React.useState([
        { ItemName: '', Quantity: '', Price: '' }
    ])

    const [isLoader, setIsLoader] = React.useState(false);


    const [value, setValue] = React.useState<any>(new Date());

    const [paymentData, setPaymentData] = React.useState({
        TypeOfTransaction: 'Pharmacy Payment',
        OrderID: "Order-" + Math.random().toString(16).slice(2),
        coin: "",
        FromWalletAddress: '',
        ToWalletAddress: '',
        AmountOnToken: '',
        AmountOnUSD: '',
        Note: '',
        Consent: '',
        ProductList: '',
        DateAndTime: '',
        userID: 505,
        /* Pharmacy Payment start */
        PrescriptionNumber: '',
        FillDate: '',
        NDC: '',
        DaysSupply: '',
        Quantity: '',
        MemberID: '',
        BIN: '',
        PCN: '',
        GroupID: '',
        PharmacyId: '',
        ServiceProviderNPI: '',
        PrescriberId: '',
        other: '',  // JSON
        /* Pharmacy Payment end */
        /* gold Payment start */
        weight: '',
        purity: '',
        price: '',


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
        OrderID: "",
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
                try {
                    window.web3 = new Web3(window.ethereum);
                    await window.ethereum.enable();
                    const web3 = window.web3;
                    const contractTemp = new web3.eth.Contract(contractABI, contractAddress);
                    const accounts = await web3.eth.getAccounts();
                    const balance = await contractTemp.methods.balanceOf(accounts[0]).call();
                    setContract(contractTemp)
                    setAccount(accounts[0])
                    const token = await contractTemp.methods.symbol().call()
                    setSymbol(token)
                    setContractBalance(balance.toString() / 10 ** 18)
                    setPaymentData({
                        ...paymentData,
                        coin: token,
                        FromWalletAddress: accounts[0]
                    })
                    setIsLoader(false)
                } catch (err: any) {
                    setIsLoader(false)
                    toast.error(err.message);
                    // console.log(err)
                }
            } else if (window.web3) {
                window.web3 = new Web3(window.web3.currentProvider);
                const web3 = window.web3;
                const accounts = await web3.eth.getAccounts();
                setIsLoader(false)
            } else {
                toast.error('Non-Ethereum browser detected. You should consider trying MetaMask!');
                // window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
                setIsLoader(false)
            }
        }
        loadWeb3();
    }, []);

    return (
        <React.Fragment>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
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

            {transferData.transactionHash && (<Container component="main" maxWidth="md" sx={{ mb: 4 }}>
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
                                <Typography variant="body1" gutterBottom>
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
                                <Typography variant="body1" gutterBottom>
                                    Cumulative Gas Used :
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={9}>
                                <Typography variant="body1" gutterBottom>
                                    {transferData.cumulativeGasUsed.toString()}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <Typography variant="body1" gutterBottom>
                                    Effective Gas Price :
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={9}>
                                <Typography variant="body1" gutterBottom>
                                    {transferData.effectiveGasPrice.toString()}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <Typography variant="body1" gutterBottom>
                                    From :
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={9}>
                                <Typography variant="body1" gutterBottom>
                                    {transferData.from}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <Typography variant="body1" gutterBottom>
                                    Gas Used :
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={9}>
                                <Typography variant="body1" gutterBottom>
                                    {transferData.gasUsed.toString()}
                                </Typography>
                            </Grid>

                            <Grid item xs={12} sm={3}>
                                <Typography variant="body1" gutterBottom>
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
                                <Typography variant="body1" gutterBottom>
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
                                                OrderID: "",
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

                                            setPaymentData({
                                                ...paymentData,
                                                TypeOfTransaction: 'Pharmacy Payment',
                                                OrderID: "Order-" + Math.random().toString(16).slice(2),
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



            {!transferData.transactionHash && (<Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
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
                                <InputLabel id="demo-simple-select-label">Coin</InputLabel>
                                <Select
                                    labelId="demo-simple-Coin-label"
                                    id="demo-simple-Coin"
                                    label="Coin"
                                    size="small"
                                    fullWidth
                                    value={paymentData.coin}
                                    SelectDisplayProps={{
                                        style: { display: 'flex', alignItems: 'center' },
                                    }}
                                    onChange={(event: SelectChangeEvent) => {
                                        setPaymentData({
                                            ...paymentData,
                                            coin: event.target.value as string
                                        })
                                    }
                                    }

                                >
                                    <MenuItem disabled value={'BTC'}>
                                        <ListItemIcon>
                                            <Btc style={{ fontSize: '1.5rem' }} />
                                        </ListItemIcon>
                                        <ListItemText>BTC</ListItemText>
                                    </MenuItem>
                                    <MenuItem disabled value={'ETH'}>
                                        <ListItemIcon>
                                            <Eth style={{ fontSize: '1.5rem' }} />
                                        </ListItemIcon>
                                        <ListItemText>ETH</ListItemText>
                                    </MenuItem>
                                    <MenuItem disabled value={'ADA'}>
                                        <ListItemIcon>
                                            <Ada style={{ fontSize: '1.5rem' }} />
                                        </ListItemIcon>
                                        <ListItemText>ADA</ListItemText>
                                    </MenuItem>
                                    <MenuItem disabled value={'LTC'}>
                                        <ListItemIcon>
                                            <Ltc style={{ fontSize: '1.5rem' }} />
                                        </ListItemIcon>
                                        <ListItemText>LTC</ListItemText>
                                    </MenuItem>
                                    <MenuItem disabled value={'USDC'}>
                                        <ListItemIcon>
                                            <Usdc style={{ fontSize: '1.5rem' }} />
                                        </ListItemIcon>
                                        <ListItemText>USDC</ListItemText>
                                    </MenuItem>
                                    <MenuItem value={symbol}>
                                        <ListItemIcon>
                                        </ListItemIcon>
                                        <ListItemText>{symbol}</ListItemText>
                                    </MenuItem>
                                </Select>


                            </Grid>
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
                                        setPaymentData({
                                            ...paymentData,
                                            TypeOfTransaction: event.target.value as string,
                                            FromWalletAddress: account,
                                            coin: symbol,
                                            ToWalletAddress: '',
                                            AmountOnToken: '',
                                            AmountOnUSD: '',
                                            /* Pharmacy Payment start */
                                            PrescriptionNumber: '',
                                            FillDate: '',
                                            NDC: '',
                                            DaysSupply: '',
                                            Quantity: '',
                                            MemberID: '',
                                            BIN: '',
                                            PCN: '',
                                            GroupID: '',
                                            PharmacyId: '',
                                            ServiceProviderNPI: '',
                                            PrescriberId: '',
                                            other: '',  // JSON
                                            /* Pharmacy Payment end */
                                            /* gold Payment start */
                                            weight: '',
                                            purity: '',
                                            price: '',
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
                                    disabled
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
                            {['Retail  Gold Payment'].includes(paymentData.TypeOfTransaction) && (<Grid item xs={12} sm={12}>
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
                            {['Retail  Gold Payment'].includes(paymentData.TypeOfTransaction) && (<Grid item xs={12} sm={12}>
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
                            {['Retail payment through our POS'].includes(paymentData.TypeOfTransaction) && (<Grid item xs={12} sm={4}>
                                <ProductsList products={products} setProducts={setProducts} />
                            </Grid>)}
                            {['Pharmacy Payment'].includes(paymentData.TypeOfTransaction) && (<Grid item xs={12} sm={8}>
                                <DateAndTime value={value} setValue={setValue} />
                            </Grid>)}

                            {['Pharmacy Payment'].includes(paymentData.TypeOfTransaction) && (<>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="PrescriptionNumber"
                                        name="PrescriptionNumber"
                                        label="Prescription Number"
                                        fullWidth
                                        variant="outlined"
                                        size="small"
                                        value={paymentData.PrescriptionNumber}
                                        onChange={(event) => {
                                            setPaymentData({
                                                ...paymentData,
                                                PrescriptionNumber: event.target.value as string
                                            })
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="FillDate"
                                        name="FillDate"
                                        label="Fill Date"
                                        type='date'
                                        fullWidth
                                        variant="outlined"
                                        size="small"
                                        value={paymentData.FillDate}
                                        onChange={(event) => {
                                            setPaymentData({
                                                ...paymentData,
                                                FillDate: event.target.value as string
                                            })
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="NDC"
                                        name="NDC"
                                        label="NDC"
                                        fullWidth
                                        variant="outlined"
                                        size="small"
                                        value={paymentData.NDC}
                                        onChange={(event) => {
                                            setPaymentData({
                                                ...paymentData,
                                                NDC: event.target.value as string
                                            })
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="DaysSupply"
                                        name="DaysSupply"
                                        label="Days Supply"
                                        fullWidth
                                        variant="outlined"
                                        size="small"
                                        value={paymentData.DaysSupply}
                                        onChange={(event) => {
                                            setPaymentData({
                                                ...paymentData,
                                                DaysSupply: event.target.value as string
                                            })
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="Quantity"
                                        name="Quantity"
                                        label="Quantity"
                                        fullWidth
                                        variant="outlined"
                                        size="small"
                                        value={paymentData.Quantity}
                                        onChange={(event) => {
                                            setPaymentData({
                                                ...paymentData,
                                                Quantity: event.target.value as string
                                            })
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="MemberID"
                                        name="MemberID"
                                        label="Member ID"
                                        fullWidth
                                        variant="outlined"
                                        size="small"
                                        value={paymentData.MemberID}
                                        onChange={(event) => {
                                            setPaymentData({
                                                ...paymentData,
                                                MemberID: event.target.value as string
                                            })
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        id="BIN"
                                        name="BIN"
                                        label="BIN"
                                        fullWidth
                                        variant="outlined"
                                        size="small"
                                        value={paymentData.BIN}
                                        onChange={(event) => {
                                            setPaymentData({
                                                ...paymentData,
                                                BIN: event.target.value as string
                                            })
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        id="PCN"
                                        name="PCN"
                                        label="PCN"
                                        fullWidth
                                        variant="outlined"
                                        size="small"
                                        value={paymentData.PCN}
                                        onChange={(event) => {
                                            setPaymentData({
                                                ...paymentData,
                                                PCN: event.target.value as string
                                            })
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        id="GroupID"
                                        name="GroupID"
                                        label="Group ID"
                                        fullWidth
                                        variant="outlined"
                                        size="small"
                                        value={paymentData.GroupID}
                                        onChange={(event) => {
                                            setPaymentData({
                                                ...paymentData,
                                                GroupID: event.target.value as string
                                            })
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="PharmacyId"
                                        name="PharmacyId"
                                        label="Pharmacy Id"
                                        fullWidth
                                        variant="outlined"
                                        size="small"
                                        value={paymentData.PharmacyId}
                                        onChange={(event) => {
                                            setPaymentData({
                                                ...paymentData,
                                                PharmacyId: event.target.value as string
                                            })
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="ServiceProviderNPI"
                                        name="ServiceProviderNPI"
                                        label="Service Provider NPI"
                                        fullWidth
                                        variant="outlined"
                                        size="small"
                                        value={paymentData.ServiceProviderNPI}
                                        onChange={(event) => {
                                            setPaymentData({
                                                ...paymentData,
                                                ServiceProviderNPI: event.target.value as string
                                            })
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="PrescriberId"
                                        name="PrescriberId"
                                        label="Prescriber Id"
                                        fullWidth
                                        variant="outlined"
                                        size="small"
                                        value={paymentData.PrescriberId}
                                        onChange={(event) => {
                                            setPaymentData({
                                                ...paymentData,
                                                PrescriberId: event.target.value as string
                                            })
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="other"
                                        name="other"
                                        label="Other"
                                        fullWidth
                                        variant="outlined"
                                        size="small"
                                        value={paymentData.other}
                                        onChange={(event) => {
                                            setPaymentData({
                                                ...paymentData,
                                                other: event.target.value as string
                                            })
                                        }}
                                    />
                                </Grid>


                            </>)}
                            {['Retail  Gold Payment'].includes(paymentData.TypeOfTransaction) && (<>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    id="weight"
                                    name="weight"
                                    label="Weight"
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                    value={paymentData.weight}
                                    onChange={(event) => {
                                        setPaymentData({
                                            ...paymentData,
                                            weight: event.target.value as string
                                        })
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    id="purity"
                                    name="purity"
                                    label="Purity"
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                    value={paymentData.purity}
                                    onChange={(event) => {
                                        setPaymentData({
                                            ...paymentData,
                                            purity: event.target.value as string
                                        })
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    id="price"
                                    name="price"
                                    label="Price"
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                    value={paymentData.price}
                                    onChange={(event) => {
                                        setPaymentData({
                                            ...paymentData,
                                            price: event.target.value as string
                                        })
                                    }}
                                />
                            </Grid>

                            </>)}

                            <Grid item xs={12}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    onClick={async () => {
                                        setIsLoader(true)
                                        try {
                                            const { TypeOfTransaction, OrderID, userID, FromWalletAddress, ToWalletAddress, AmountOnToken, AmountOnUSD } = paymentData;
                                            const data = {
                                                PrescriptionNumber: paymentData.PrescriptionNumber,
                                                FillDate: paymentData.FillDate,
                                                NDC: paymentData.NDC,
                                                DaysSupply: paymentData.DaysSupply,
                                                Quantity: paymentData.Quantity,
                                                MemberID: paymentData.MemberID,
                                                BIN: paymentData.BIN,
                                                PCN: paymentData.PCN,
                                                GroupID: paymentData.GroupID,
                                                PharmacyId: paymentData.PharmacyId,
                                                ServiceProviderNPI: paymentData.ServiceProviderNPI,
                                                PrescriberId: paymentData.PrescriberId,
                                                other: paymentData.other,  // JSON
                                                weight: paymentData.weight,
                                                purity: paymentData.purity,
                                                price: paymentData.price,
                                                Note: paymentData.Note,
                                                Consent: paymentData.Consent
                                            }

                                            // string memory TypeOfTransaction,  // 1.Pharmacy Payment , 2.Retail  Gold Payment, 3.Retail payment through our POS,
                                            // string memory OrderID,
                                            // address FromWalletAddress,
                                            // address ToWalletAddress,
                                            // uint256 AmountOnToken,
                                            // uint256 AmountOnUSD,
                                            // string memory ProductList, 
                                            // uint256 DateAndTime,
                                            // uint256 userID,
                                            // string memory raw
                                            const resp = await contract.methods.transferWithData(
                                                TypeOfTransaction,  // 1.Pharmacy Payment , 2.Retail  Gold Payment, 3.Retail payment through our POS,
                                                OrderID,
                                                account,
                                                ToWalletAddress,
                                                Number(AmountOnToken) * 1000000000000000000,
                                                Number(AmountOnUSD),
                                                // Note,
                                                // Consent,
                                                JSON.stringify(products),// ProductList,
                                                Math.floor(value / 1000),// DateAndTime,
                                                userID,
                                                JSON.stringify(data)
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