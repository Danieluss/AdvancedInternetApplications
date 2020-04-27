import React, {Component} from "react";
import {MDBBtn, MDBCollapse, MDBFormInline, MDBNavbar, MDBNavbarNav, MDBNavbarToggler, MDBNavItem} from "mdbreact";
import {deepCopy} from "./Utils";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHamburger} from "@fortawesome/free-solid-svg-icons";

export default class Options extends Component{

    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            sortOpen: false
        }
    }

    changeState(mutate) {
        let state = deepCopy(this.state);
        mutate(state);
        this.setState(state);
    }

    isSortOpen() {
        return this.state.sortOpen ? "d-inline-block" : "d-none";
    }

    toggleCollapse = (() => {
        this.changeState((state) => {
           state.isOpen = !state.isOpen;
        });
    }).bind(this);

    toggleSort = (() => {
        this.changeState((state) => {
            state.sortOpen = !state.sortOpen;
        });
    }).bind(this);

    render() {
        return (
            <MDBNavbar color="special-color-dark" expand="md" className="w-100">
                <MDBCollapse id="navbar" expand="lg" isOpen={this.state.isOpen}  navbar>
                    <MDBNavbarNav left>
                        <MDBNavItem className="d-flex">
                            <MDBBtn color="light" className="m-auto" onClick={this.toggleSort}>
                                Sort by
                            </MDBBtn>
                            <MDBBtn color="light" className={"m-auto " + this.isSortOpen()} onClick={() => this.props.sort("rating")}>
                                Rating
                            </MDBBtn>
                            <MDBBtn color="light" className={"m-auto " + this.isSortOpen()} onClick={() => this.props.sort("name")}>
                                Name
                            </MDBBtn>
                        </MDBNavItem>
                    </MDBNavbarNav>
                    <MDBNavbarNav right className="mt-3 mb-3">
                        <MDBNavItem>
                            <MDBFormInline waves>
                                <div className="md-form my-0 m-auto w-100">
                                    <input className="form-control mr-sm-2 text-white w-100" type="text" placeholder="Search"
                                           aria-label="Search" onChange={(ev) => {this.props.search(ev.target.value)}}/>
                                </div>
                            </MDBFormInline>
                        </MDBNavItem>
                    </MDBNavbarNav>
                </MDBCollapse>
                <MDBNavbarToggler color="white" className="m-auto" onClick={this.toggleCollapse} right>
                    <FontAwesomeIcon color="white" icon={faHamburger}/>
                </MDBNavbarToggler>
            </MDBNavbar>
        )
    }

}
