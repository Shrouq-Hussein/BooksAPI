import React from 'react'
import './App.css';
import MyReadings from "./pages/myReadings/myreadings.js"
import Search from "./components/searchComponent/search.js"

class App extends React.Component {
  constructor() {
    super()
    this.state = {
        books:[], 
        // currentlyreading: [],
        // wanttoread:[],
        // read:[],
        openSearch:false,
    }

}
  openSearch =()=>{
    this.setState({...this.state,openSearch: !this.state.openSearch})
  }

  componentDidUpdate(perProp,prevState){
    const { books, currentlyreading,wanttoread,read,openSearch } = this.state;
    if ( prevState.books !== this.state.books){
      localStorage.setItem('books', JSON.stringify(books));
    }
    // if ( prevState.currentlyreading !== this.state.currentlyreading){
    //   localStorage.setItem('currentlyreading', JSON.stringify(currentlyreading));

    // }
    // if ( prevState.wanttoread !== this.state.wanttoread){
    //   localStorage.setItem('wanttoread', JSON.stringify(wanttoread));

    // }
    // if ( prevState.read !== this.state.read){
    //   localStorage.setItem('read', JSON.stringify(read));

    // }
    if(prevState.openSearch !== this.state.openSearch){
      console.log(this.state.openSearch)
      localStorage.setItem('openSearch', this.state.openSearch);
    }
  }
/////////////////////////////////////////////////////////////////////////////////////////////
  changeState = (bookSelf,book) =>{
    bookSelf =   bookSelf.replace(/\s/g, '').toLowerCase()

    !this.state.books.find(b=> b.key == book.key)?   //new book
    (
      bookSelf === "currentlyreading" ?
    this.setState({
      ...this.state,
      books:[...this.state.books,{...book,shelf:"currentlyreading"}],
    })
    :
    bookSelf === "wanttoread"?
    this.setState({
      ...this.state,
      books:[...this.state.books,{...book,shelf:"wanttoread"}],
    })
    :
    bookSelf === "read" ?
    this.setState({
      ...this.state,
      books:[...this.state.books,{...book,shelf:"read"}],
    })
    : 
    bookSelf === "none" &&
    this.setState({
      ...this.state,
      books:[...this.state.books,{...book,shelf:"none"}],
    })
    )
     
     :
     // old
     this.changeBookSection(bookSelf,book)
  }
  changeBookSection = (bookSelf,book) =>{
          const temp = this.state.books.filter(b=>b.key != book.key)
          this.setState({
            ...this.state,
            books:[...temp,{...book,shelf:bookSelf}],
          })  
}
/////////////////////////////////////////////////////////////////////////////////////////////


  // changeState = (bookSelf,book) =>{
  //   bookSelf =   bookSelf.replace(/\s/g, '').toLowerCase()

  //   !this.state.books.find(b=> b.key == book.key)?   //new book
  //   (
  //     bookSelf === "currentlyreading" ?
  //   this.setState({
  //     ...this.state,
  //     books:[...this.state.books,book],
  //     currentlyreading:[...this.state.currentlyreading,book],
  //   })
  //   :
  //   bookSelf === "wanttoread"?
  //   this.setState({
  //     ...this.state,
  //     books:[...this.state.books,book],
  //     wanttoread: [...this.state.wanttoread,book],
  //   })
  //   :
  //   bookSelf === "read" ?
  //   this.setState({
  //     ...this.state,
  //     books:[...this.state.books,book],
  //     read: [...this.state.read,book],
  //   })
  //   : 
  //   bookSelf === "none" &&
  //    //delete
  //    console.log("")
  //   )
     
  //    :
  //    // old
  //    this.changeBookSection(bookSelf,book)
  // }

  // changeBookSection = (bookList,book) =>{
  //     bookList === "currentlyreading" ? 
  //      this.state.wanttoread.find(b=> b.key == book.key) ?
  //      (
  //       this.setState(
  //         {
  //           ...this.state,
  //           currentlyreading:[...this.state.currentlyreading,book],
  //           wanttoread:this.state.wanttoread.filter(b=>b.key != book.key)
  //         }
  //        )
  //      )
  //     :
  //      this.state.read.find(b=> b.key == book.key) &&
  //      (
  //       this.setState(
  //         {
  //           ...this.state,
  //           currentlyreading:[...this.state.currentlyreading,book],
  //           read:this.state.read.filter(b=>b.key != book.key)
  //         }
  //        )
  //      )
  //    :
  //    bookList === "wanttoread" ? 
  //    this.state.currentlyreading.find(b=> b.key == book.key) ?
  //    (
  //     this.setState(
  //       {
  //         ...this.state,
  //         wanttoread:[...this.state.wanttoread,book],
  //         currentlyreading:this.state.currentlyreading.filter(b=>b.key != book.key)
  //       }
  //      )
  //    )
  //   :
  //    this.state.read.find(b=> b.key == book.key) &&
  //    (
  //     this.setState(
  //       {
  //         ...this.state,
  //         wanttoread:[...this.state.wanttoread,book],
  //         read:this.state.read.filter(b=>b.key != book.key)
  //       }
  //      )
  //    )
  //    :
  //    bookList === "read" ?
  //    this.state.currentlyreading.find(b=> b.key == book.key) ?
  //    (
  //     this.setState(
  //       {
  //         ...this.state,
  //         read:[...this.state.read,book],
  //         currentlyreading:this.state.currentlyreading.filter(b=>b.key != book.key)
  //       }
  //      )
  //    )
  //   :
  //    this.state.wanttoread.find(b=> b.key == book.key) &&
  //    (
  //     this.setState(
  //       {
  //         ...this.state,
  //         read:[...this.state.read,book],
  //         wanttoread:this.state.wanttoread.filter(b=>b.key != book.key)
  //       }
  //      )
  //    )
  //   :
  //    bookList === "none" &&
  //    this.setState(
  //     {
  //       ...this.state,
  //       books:this.state.books.filter(b=>b.key != book.key),
  //       wanttoread:this.state.wanttoread.filter(b=>b.key != book.key),
  //       read:this.state.read.filter(b=>b.key != book.key),
  //       currentlyreading:this.state.currentlyreading.filter(b=>b.key != book.key)

  //     }
  //    )


     

  // }
  componentDidMount(){
    if(localStorage.getItem("books")){
      const  books = JSON.parse(localStorage.getItem("books"))
      // const  currentlyreading = JSON.parse(localStorage.getItem("currentlyreading"))
      // const  wanttoread = JSON.parse(localStorage.getItem("wanttoread"))
      // const  read = JSON.parse(localStorage.getItem("read"))
      const  openSearch =  localStorage.getItem('openSearch') === "true" ? true : false
      // this.setState({books,currentlyreading,wanttoread,read,openSearch})
      this.setState({books,openSearch})
     console.log("did mount",books,openSearch)

    }
    else if (localStorage.getItem('openSearch')){
      const  openSearch =  localStorage.getItem('openSearch') === "true" ? true : false
      this.setState({...this.state,openSearch})

    }

  }

  render (){
    return (
      this.state.openSearch ?
      <Search openSearch={this.openSearch} Allbooks={this.state.books} changeState={this.changeState}/>
      :<MyReadings openSearch={this.openSearch} Allbooks={this.state.books} changeState={this.changeState} />
    
 

    )
  }
}

export default App;
