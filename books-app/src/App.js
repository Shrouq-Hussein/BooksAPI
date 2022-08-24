import React from 'react'
import './App.css';
import MyReadings from "./pages/myReadings/myreadings.js"
import Search from "./components/searchComponent/search.js"
import { BrowserRouter, Route, Routes} from "react-router-dom"
import NotFound from "./pages/notFound.js"

class App extends React.Component {
  constructor() {
    super()
    this.state = {
        books:[],
        currentlyreading: [],
        wanttoread:[],
        read:[],
        openSearch:false,
    }
}
  openSearch =()=>{
    this.setState({...this.state,openSearch: !this.state.openSearch})
  }

  componentDidUpdate(perProp,prevState){
    if ( prevState.books !== this.state.books){
        console.log(" books changed","prev:",prevState.books,":current",this.state.books)

    }
}


  changeState = (bookList,book) =>{
    bookList =   bookList.replace(/\s/g, '').toLowerCase()

    !this.state.books.find(b=> b.key == book.key)?   //new book
    (
    bookList === "currentlyreading" ?
    this.setState({
      ...this.state,
      books:[...this.state.books,book],
      currentlyreading:[...this.state.currentlyreading,book],
    })
    :
    bookList === "wanttoread"?
    this.setState({
      ...this.state,
      books:[...this.state.books,book],
      wanttoread: [...this.state.wanttoread,book],
    })
    :
    bookList === "read" ?
    this.setState({
      ...this.state,
      books:[...this.state.books,book],
      read: [...this.state.read,book],
    })
    : 
     bookList === "none" &&
     //delete
     console.log("")
    )
     
     :
     // old
     this.changeBookSection(bookList,book)
 
  }

  changeBookSection = (bookList,book) =>{
      bookList === "currentlyreading" ? 
       this.state.wanttoread.find(b=> b.key == book.key) ?
       (
        this.setState(
          {
            ...this.state,
            currentlyreading:[...this.state.currentlyreading,book],
            wanttoread:this.state.wanttoread.filter(b=>b.key != book.key)
          }
         )
       )
      :
       this.state.read.find(b=> b.key == book.key) &&
       (
        this.setState(
          {
            ...this.state,
            currentlyreading:[...this.state.currentlyreading,book],
            read:this.state.read.filter(b=>b.key != book.key)
          }
         )
       )
     :
     bookList === "wanttoread" ? 
     this.state.currentlyreading.find(b=> b.key == book.key) ?
     (
      this.setState(
        {
          ...this.state,
          wanttoread:[...this.state.wanttoread,book],
          currentlyreading:this.state.currentlyreading.filter(b=>b.key != book.key)
        }
       )
     )
    :
     this.state.read.find(b=> b.key == book.key) &&
     (
      this.setState(
        {
          ...this.state,
          wanttoread:[...this.state.wanttoread,book],
          read:this.state.read.filter(b=>b.key != book.key)
        }
       )
     )
     :
     bookList === "read" ?
     this.state.currentlyreading.find(b=> b.key == book.key) ?
     (
      this.setState(
        {
          ...this.state,
          read:[...this.state.read,book],
          currentlyreading:this.state.currentlyreading.filter(b=>b.key != book.key)
        }
       )
     )
    :
     this.state.wanttoread.find(b=> b.key == book.key) &&
     (
      this.setState(
        {
          ...this.state,
          read:[...this.state.read,book],
          wanttoread:this.state.wanttoread.filter(b=>b.key != book.key)
        }
       )
     )
    :
     bookList === "none" &&
     this.setState(
      {
        ...this.state,
        books:this.state.books.filter(b=>b.key != book.key),
        wanttoread:this.state.wanttoread.filter(b=>b.key != book.key),
        read:this.state.read.filter(b=>b.key != book.key),
        currentlyreading:this.state.currentlyreading.filter(b=>b.key != book.key)

      }
     )


     

  }

 
  render (){
    return (
      this.state.openSearch ?
      <Search openSearch={this.openSearch} Allbooks={this.state.books} changeState={this.changeState}/>
      :<MyReadings openSearch={this.openSearch} currentlyreading={this.state.currentlyreading} read={this.state.read} wanttoread={this.state.wanttoread} changeState={this.changeState} />




      // <BrowserRouter>
  
      // <div className="App">
      //     <Routes>
      //       {/* default page */}
      //       <Route path={"/"} element={<MyReadings />} />
      //       <Route path={"/search"} element={<SearchPage/>} />
      //       <Route path={"*"}  element={<NotFound/>} />
      //     </Routes>
      // </div>
      // </BrowserRouter>
    )
  }
}

export default App;
