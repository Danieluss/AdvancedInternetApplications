import React from 'react';
import List from './List.js';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router} from 'react-router-dom';
import data from '../res/data.json';
import {MDBContainer, MDBNavbar, MDBNavbarBrand, MDBRow} from "mdbreact";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/mdbreact/dist/css/mdb.css';

function App() {
    return (
        <Router className="app">
            <MDBNavbar className="mb-0" expand="lg" dark color="special-color-dark">
                <MDBNavbarBrand>
                    <strong className="white-text">Bananas Go</strong>
                </MDBNavbarBrand>
            </MDBNavbar>
            <MDBContainer fluid="md">
                <MDBRow className="list-row ml-2 mr-2 mt-0">
                    <List data={data}></List>
                </MDBRow>
            </MDBContainer>
        </Router>
    );
}

export default App;
