import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from 'react';
import Web3 from 'web3';
import { contractABI, contractAddress } from '../../constants';
import { ToastContainer, toast } from 'react-toastify';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import 'react-toastify/dist/ReactToastify.css';

declare let window: any;

const History = () => {
    const [isLoader, setIsLoader] = React.useState(false);
    const [provider, setProvider] = useState(null);
    const [contract, setContract] = useState<any>(null);
    const [account, setAccount] = useState('');
    const [symbol, setSymbol] = useState('');
    // const [contractAddress, setContractAddress] = useState('');
    const [contractBalance, setContractBalance] = useState(0);
    const [isLoad, setIsLoad] = useState(false);
    const [show, setShow] = useState(false);
    const [searchOrder, setSearchOrder] = useState('');
    const [Tweb3, setTWeb3] = useState<any>(null);
    const [transactions, setTransactions] = useState<any>([]);


    useEffect(() => {
        const loadWeb3 = async () => {
            setIsLoader(true)
            if (window.ethereum) {
                try {
                    window.web3 = new Web3(window.ethereum);
                    await window.ethereum.enable();
                    const web3 = window.web3;
                    setTWeb3(web3)
                    const contractTemp = new web3.eth.Contract(contractABI, contractAddress);
                    const accounts = await web3.eth.getAccounts();
                    const balance = await contractTemp.methods.balanceOf(accounts[0]).call();
                    setContract(contractTemp)
                    setAccount(accounts[0])
                    getContractTransactions(accounts[0])
                    // const infuraApiKey = '1cfcc1afcfea46ebba9cca655e7493e7';
                    // const infuraUrl = `https://optimism-sepolia.infura.io/v3/${infuraApiKey}`;
                    // const infuraProvider = new Web3.providers.HttpProvider(infuraUrl);
                    // const infuraProviderwEB3 = new Web3(infuraProvider);
                    // getContractTransactions(infuraProviderwEB3,accounts[0])
                    const token = await contractTemp.methods.symbol().call()
                    setSymbol(token)
                    setContractBalance(balance.toString() / 10 ** 18)
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

    const getOrders = async () => {
        try {
            // const transactionHash = await Tweb3.eth.getTransaction(searchOrder).call();
            const orders = await contract.methods.getOrderData(searchOrder).call();
            console.log(orders)
        } catch (err: any) {
            toast.error(err.message);
            // console.log(err)
        }
    }

    // 1cfcc1afcfea46ebba9cca655e7493e7

    const getContractTransactions = async (accounts: string) => {
        const infuraApiKey = '8f61122d11514e96ab84a1ffba67763e';
        const infuraUrl = `https://sepolia.infura.io/v3/8f61122d11514e96ab84a1ffba67763e`;
        const web3 = new Web3(infuraUrl);

        // Get the transaction count (number of transactions sent from the address)
        web3.eth.getTransactionCount(accounts)
            .then(count => {
                const List:any[] = [];
                // Retrieve transaction history
                for (let i = 0; i < count; i++) {
                    web3.eth.getTransactionFromBlock('latest', i)
                        .then(transaction => {
                            List.push(transaction)
                            setTransactions(List)
                        })
                        .catch(error => {
                            console.error('Error retrieving transaction:', error);
                        });
                }
            })
            .catch(error => {
                console.error('Error retrieving transaction count:', error);
            });

    }
    return (<div>
        <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
        >
            <ToastContainer />
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Order ID"
                value={searchOrder}
                onChange={(e) => setSearchOrder(e.target.value)}
                inputProps={{ 'aria-label': 'search google maps' }}
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={getOrders}>
                <SearchIcon />
            </IconButton>
        </Paper>
        <TableContainer>
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Block Hash</TableCell>
            <TableCell >Block Number</TableCell>
            <TableCell >Data</TableCell>
            <TableCell >To</TableCell>
            <TableCell >Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((row:any,index:number) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell >{row.blockHash.substring(0, 20) + '...'}</TableCell>
              <TableCell >{row.blockNumber.toString()}</TableCell>
              <TableCell >{row.data.toString().substring(0, 10) + '...'}</TableCell>
                <TableCell >{row.to}</TableCell>
                <TableCell >{row.value.toString()/ 10 ** 18}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </div>
    )
}
export default History;