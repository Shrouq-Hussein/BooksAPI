import React from "react"
import "./search.css"
import axios from 'axios'
import BookCard from "../bookCard/bookcard.js"
class Search extends React.Component {
    constructor() {
        super()
        this.state = {
            searchTerm: "",
            searchResult: [],
        }

        this.searchInput = React.createRef()
        this.timeoutID = ""
    }

    filterBooks = (searchResult) => {
        var searchResultFiltered = searchResult.filter((book) => {
            return !(this.props.Allbooks.find(element => element.key == book.key))
        })
        return searchResultFiltered
    }

    onSearch = (e) => {
        this.setState({ ...this.state, searchTerm: e.target.value })

    }
    changeState = (bookList,book,index) =>{
        if (bookList.toLowerCase() != "none")
        {
            this.state.searchResult.splice(index,1)
            this.setState({ ...this.state,searchResult:this.state.searchResult})
        }
       
        return this.props.changeState(bookList,book)
    }
   
    componentDidUpdate(prevprop,prevState) {
        if (prevState.searchTerm !== this.state.searchTerm) {
           clearTimeout(this.timeoutID)
           this.timeoutID = setTimeout(()=>{
                axios.get(`https://openlibrary.org/search.json?q=${this.state.searchTerm}`)
                .then((res) => {
                    console.log(res.data.docs)
                    const searchResultFiltered = this.filterBooks(res.data.docs)
                    this.setState({
                      ...this.state,
                      searchResult: searchResultFiltered,
  
                    })
                }
                ) 
            },1000)
            
        }
    }

    render() {
        return (
            <>
             <div className="input-group mb-3">
                <span className="input-group-text my-input-group-text" onClick={this.props.openSearch}>{"<-"}</span>
                <input id="search" type="text" className="form-control" placeholder="search by Title or Author" onChange={this.onSearch} value={this.state.searchTerm} ref={this.searchInput} />

            </div>
            <div className="container">
                    <div className="row justify-content-center">

                    {
                        this.state.searchResult.length >0 &&
                        this.state.searchResult.map((book,index) => {
                            return(
                                book.isbn &&
                                <BookCard key={index} book={book} index={index} changeState={this.changeState} />
                            )
                        })
                    }
                    </div>
                </div>
            </>
           
        )
    }
}
export default Search