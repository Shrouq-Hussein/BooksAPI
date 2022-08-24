import React from "react";
import { Card, CardBody, CardTitle, CardSubtitle, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import "./bookcard.css"

class BookCard extends React.Component {
    constructor() {
        super()
        this.state = {
            dropdownOpen: false,
            dropDownValue: "",

        }
    }

    componentDidUpdate(perProp,prevState){
        if ( prevState.dropDownValue !== this.state.dropDownValue){
            console.log("changed","prev:",prevState.dropDownValue,":current",this.state.dropDownValue)
            this.props.changeState(this.state.dropDownValue,this.props.book,this.props.index)
        }
    }

    toggle = () => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        })
    }


    changeDropDownValue = (e) => {
        this.setState({ ...this.state, dropDownValue: e.currentTarget.textContent })

    }

    render() {
        return (
            <Card

                className="col-3 m-2 p-2 myCard"
                color="success"
                outline
                style={{
                    width: '18rem'
                }}
            >
                <img src={`https://covers.openlibrary.org/b/isbn/${this.props.book.isbn[0]}-M.jpg`} className="bookCover" />
                <Dropdown toggle={this.toggle} isOpen={this.state.dropdownOpen} >
                    <DropdownToggle caret color="success" className="bookOptions" size="lg">
                    </DropdownToggle>
                    <DropdownMenu >
                        <DropdownItem  onClick={this.changeDropDownValue}>Currently reading</DropdownItem>
                        <DropdownItem onClick={this.changeDropDownValue}>Want to read</DropdownItem>
                        <DropdownItem onClick={this.changeDropDownValue}>Read</DropdownItem>
                        <DropdownItem onClick={this.changeDropDownValue}>None</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <CardBody>

                    <CardTitle tag="h5">
                        {this.props.book.title}
                    </CardTitle>
                    <CardSubtitle
                        className="mb-2 text-muted"
                        tag="h6"
                    >
                        {this.props.book.author_name}
                    </CardSubtitle>
                </CardBody>
            </Card>
        )
    }
}
export default BookCard