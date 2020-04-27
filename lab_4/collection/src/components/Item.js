import React, {Component} from "react";
import img from "../res/img.png"
import './Item.scss';
import {MDBBtn} from "mdbreact";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from '@fortawesome/free-solid-svg-icons'
import {deepCopy} from "./Utils";

export default class Item extends Component{
    constructor(props) {
        super(props);
        this.state = {
            data: deepCopy(props.data),
            hovered: -1,
            rating_unlocked: false,
            rating_colors: this.makeColors(this.props.data.rating, "deep-orange-text", "indigo-text"),
        };
    }

    makeColors(n0, color0, color1) {
        let result = [];
        result.push(...Array(n0).fill(color0));
        result.push(...Array(5 - n0).fill(color1));
        return result;
    }

    changeState(mutate) {
        let state = deepCopy(this.state);
        mutate(state);
        return new Promise((resolve) => {
            this.setState(state, () => {resolve()});
        });
    }

    toggleEdition(i) {
        if(this.state.rating_unlocked) {
            this.changeState((state) => {
                state.data.rating = i + 1;
                state.rating_unlocked = false;
                state.hovered = -1;
                state.rating_colors = this.makeColors(i + 1, "deep-orange-text", "indigo-text");
            }).then(() => {
                this.props.update(i + 1);
            });
        } else {
            this.changeState((state) => {
                state.rating_unlocked = true;
                state.rating_colors = this.makeColors(i + 1, "orange-text", "blue-text");
            })
        }
    }

    hovered(i) {
        this.changeState((state) => {
           state.hovered = i;
        });
        if (this.state.rating_unlocked) {
            this.changeState((state) => {
                state.rating_colors = this.makeColors(i + 1, "orange-text", "blue-text");
            });
        }
    }

    render() {
        let that = this;
        return (
            <div className="item h-100 m-2 border border-light d-flex flex-column">
                <h5 className="card-header font-weight-bold d-flex">
                    <div className="w-100 text-left">
                        {this.props.data.name}
                    </div>
                    <div className="text-right rating">
                        {this.state.rating_colors.map(function (x, i) {
                            return <span onClick={(e) => {
                                            that.toggleEdition(i);
                                        }}
                                        onMouseEnter={(e) => {
                                            if (that.state.rating_unlocked) {
                                                that.hovered(i);
                                            }
                                        }}
                                        className={x}>&#9733;</span>;
                        })}
                    </div>
                </h5>
                <div className="p-2">
                    <img className="m-2 item-image img-thumbnail img-fluid darken-1" src={img}>
                    </img>
                    <span className="">
                        {this.getDescription()}
                    </span>
                </div>
                <div className="action-panel mt-auto d-flex">
                    <MDBBtn color={"danger"} outline={true} rounded={true} onClick={this.props.remove} className="rounded ml-auto">
                        <FontAwesomeIcon icon={faTrash}/>
                    </MDBBtn>
                </div>
            </div>
        )
    }

    getDescription() {
        if(this.state.data.description.length > 300) {
            return this.state.data.description.substring(0, 297) + "...";
        }
        return this.state.data.description;
    }
}
