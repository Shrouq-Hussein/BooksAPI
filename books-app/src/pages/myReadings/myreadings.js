import React from "react"
import './myreadings.css';
import BookCard from "../../components/bookCard/bookcard.js"
import { Outlet} from  "react-router-dom"

class MyReadings extends React.Component{
    goToSearch =()=>{
       this.props.openSearch()
    }
    changeState =(bookList,book,index)=>{
      return this.props.changeState(bookList,book)
    }
    render(){
        return(
            <>
            <h1 className="title  mb-5"> MyReads</h1>
            <div className="container">
                
                  <h2 className="subTitle">Currently Reading</h2>
                  <div id="currentlyReadingList" className=" row">
                    {
                      this.props.currentlyreading.length > 0 ?
                      this.props.currentlyreading.map((book,index)=>{
                        return(
                          <BookCard key={index} book={book} index={index} changeState={this.changeState} />
                      )
                      })
                      :
                       <div className="booksSection"></div>
                    }
                  </div>
            
                  <h2 className="subTitle">Want to Read</h2>
                  <div id="wantReadList" className="  row">
                  {
                      this.props.wanttoread.length > 0 ?
                      this.props.wanttoread.map((book,index)=>{
                        return(
                          <BookCard key={index} book={book} index={index} changeState={this.changeState} />
                      )
                      })
                      :
                       <div className="booksSection"></div>
                    }
                  </div>
               
                  <h2 className="subTitle">Read</h2>
                  <div id="ReadList" className=" row">
                  {
                      this.props.read.length >0 ?
                      this.props.read.map((book,index)=>{
                        return(
                          <BookCard key={index} book={book} index={index} changeState={this.changeState} />
                      )
                      })
                      :
                       <div className="booksSection"></div>
                    }
                  </div>
                  
                
            
                <button type="button" className="btn btn-success addBookBtn" onClick={this.goToSearch}>+</button>
              
                
            </div>
                   <Outlet />
            </>
            
        )

    }

}
export default MyReadings