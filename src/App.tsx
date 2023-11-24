import React from 'react';
import Button from '@mui/material/Button';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Layout from './Pages/Layout';
import Home from './Pages/Home';
import Login from './Pages/Login';
import NotFound from './Pages/NotFound';
import Payment from './Pages/Payment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// date-fns
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const App: React.FC = () => {

    return ( <LocalizationProvider dateAdapter={AdapterDateFns}>
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route element={<Layout />} >
                        <Route path="/home" element={<Home />} />
                        <Route path="/payment" element={<Payment />} />
                    </Route>
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </div>
        </LocalizationProvider>
    );
}

export default App;