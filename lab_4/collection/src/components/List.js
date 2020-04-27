import React, {Component} from "react";
import Item from "./Item";
import Options from "./Options";
import {MDBCol, MDBContainer, MDBRow} from "mdbreact";
import {deepCopy} from "./Utils";

export default class List extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: deepCopy(props.data),
            search: "",
            sort: undefined
        };
    }

    changeState(mutate) {
        let state = deepCopy(this.state);
        mutate(state);
        this.setState(state);
    }

    remove(i) {
        this.changeState((state) => {
            state.data.splice(i, 1);
        });
    }

    sort(crit) {
        this.changeState((state) => {
            if (state.sort === crit) {
                state.sort = crit + "-down";
            } else {
                state.sort = crit;
            }
        });
    }

    search(name) {
        this.changeState((state) => {
            state.search = name;
        });
    }

    getItems() {
        let keyVals = this.state.data.map((item, i) => {
            return {key: i, val: item};
        });
        keyVals = keyVals.filter((a) => {
            return a.val.name.includes(this.state.search);
        });
        if (this.state.sort === "name") {
            keyVals.sort((a, b) => {
                return a.val.name.localeCompare(b.val.name);
            });
        } else if (this.state.sort === "name-down") {
            keyVals.sort((a, b) => {
                return b.val.name.localeCompare(a.val.name);
            });
        } else if (this.state.sort === "rating") {
            keyVals.sort((a, b) => {
                return a.val.rating - b.val.rating;
            });
        } else if (this.state.sort === "rating-down") {
            keyVals.sort((a, b) => {
                return b.val.rating - a.val.rating;
            });
        }
        return keyVals.map((keyVal, _) =>
            (
                <MDBCol key={_} sm={"12"} md={"6"} lg={"4"} className="mb-3 mb-md-4 pr-0 pl-0">
                    <Item remove={() => {
                            this.remove(keyVal.key)
                        }} update={(rating) => {
                            this.update(keyVal.key, rating)
                        }}
                        data={keyVal.val} key={keyVal.key}/>
                </MDBCol>
            )
        )
    }

    update(i, rating) {
        this.changeState((state) => {
            state.data[i].rating = rating;
        });
    }

    add(item) {
        this.changeState((state) => {
            state.data.push(item);
        });
    }

    render() {

        return (
            <MDBContainer className="list pt-3 pt-lg-5 gray z-depth-1">
                <MDBRow className="list-options sticky-top">
                    <Options add={this.add.bind(this)} sort={this.sort.bind(this)} search={this.search.bind(this)}/>
                </MDBRow>
                <MDBRow className="list-items">
                    {
                        this.getItems()
                    }
                </MDBRow>
            </MDBContainer>
        );

    }
}
