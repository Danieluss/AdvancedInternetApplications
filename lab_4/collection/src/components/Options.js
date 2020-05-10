import React, {Component} from "react";
import {
    MDBBtn,
    MDBCollapse,
    MDBFormInline,
    MDBModal, MDBModalBody, MDBModalFooter, MDBModalHeader,
    MDBNavbar,
    MDBNavbarNav,
    MDBNavbarToggler,
    MDBNavItem
} from "mdbreact";
import ImageUploader from 'react-images-upload';
import {deepCopy} from "./Utils";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHamburger} from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Options.scss";

export default class Options extends Component{


    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            sortOpen: false,
            popupOpen: false,
            newItem: {}
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

    showPopup = (() => {
        this.changeState((state) => {
            state.popupOpen = !state.popupOpen;
            state.newItem = {};
        });
    }).bind(this);

    onDrop(img) {
        this.changeState((state) => {
            state.newItem.img = URL.createObjectURL(img[0]);
        });
    }

    handleRating(e) {
        this.changeState((state) => {
            state.newItem.rating = e.target.value;
        });
    }

    handleName(e) {
        this.changeState((state) => {
            state.newItem.name = e.target.value;
        });
    }

    handleDescription(e) {
        this.changeState((state) => {
            state.newItem.description = e.target.value;
        });
    }

    newItem() {
        if (!!this.state.newItem.description
                && !!this.state.newItem.name
                && Number(this.state.newItem.rating) >= 1 && Number(this.state.newItem.rating) <= 5
                && !!this.state.newItem.img) {
            this.props.add(this.state.newItem);
            this.showPopup();
            toast("You have successfully added a banana");
            console.log("You have successfully added a banana");
        } else {
            toast("Please fill the entire form");
            console.log("Please fill the entire form");
        }
    }

    render() {
        return (
            <MDBNavbar color="special-color-dark" expand="md" className="w-100">
                <MDBCollapse id="navbar" expand="lg" isOpen={this.state.isOpen}  navbar>
                    <MDBNavbarNav left>
                        <MDBNavItem >
                            <MDBBtn color="light" className="m-auto" onClick={() => this.showPopup()}>
                                Add
                            </MDBBtn>
                            <MDBModal className="d-flex flex-center flex-column" isOpen={this.state.popupOpen} toggle={this.showPopup} position="top-center">
                                <MDBModalHeader toggle={this.showPopup}>Add a banana</MDBModalHeader>
                                <MDBModalBody>
                                    <img className="m-2 new-item-image img-thumbnail img-fluid darken-1 float-left w-50" src={this.state.newItem.img}/>
                                    <ImageUploader
                                        singleImage={true}
                                        withIcon={false}
                                        withLabel={false}
                                        buttonText='Choose image'
                                        onChange={this.onDrop.bind(this)}
                                        maxFileSize={5242880}
                                    />
                                    <input type="text" placeholder="rating"
                                           onInput={this.handleRating.bind(this)}/>
                                    <input type="text" placeholder="name" className="w-100"
                                           onInput={this.handleName.bind(this)} />
                                    <textarea placeholder="description" className="w-100"
                                           onInput={this.handleDescription.bind(this)} />

                                </MDBModalBody>
                                <MDBModalFooter>
                                    <MDBBtn color="danger" onClick={this.showPopup}>Close</MDBBtn>
                                    <MDBBtn color="indigo" onClick={this.newItem.bind(this)}>Save</MDBBtn>
                                </MDBModalFooter>
                            </MDBModal>
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
