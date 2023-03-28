import {Component} from 'react'
import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import Footer from '../Footer'
import BookShelfItem from '../BookShelfItem'
import './index.css'

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
}

class Bookshelves extends Component {
  state = {
    searchInput: '',
    booksList: [],
    bookshelveId: bookshelvesList[0].id,
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getBooksShelvesList()
  }

  getBooksShelvesList = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {searchInput, bookshelveId} = this.state
    const bookshelfName = bookshelvesList.find(each => each.id === bookshelveId)

    const jwtToken = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/book-hub/books?shelf=${bookshelfName.value}&search=${searchInput}`

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.books.map(each => ({
        id: each.id,
        authorName: each.author_name,
        coverPic: each.cover_pic,
        title: each.title,
        readStatus: each.read_status,
        rating: each.rating,
      }))

      this.setState({
        booksList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  onTryAgain = () => {
    this.getBooksShelvesList()
  }

  renderFailureView = () => (
    <div className="failure-card">
      <img
        className="failure-img"
        src="https://res.cloudinary.com/dpk1vp7a8/image/upload/v1679739346/Group_7522_1x_ffsobo.png"
        alt="failure view"
      />
      <p className="failure-text">Something went wrong, Please try again.</p>
      <button onClick={this.onTryAgain} className="try-again-btn" type="button">
        Try Again
      </button>
    </div>
  )

  renderSuccessView = () => {
    const {booksList, searchInput} = this.state

    return (
      <>
        {booksList.length === 0 ? (
          <div className="empty-card">
            <img
              className="empty-img"
              src="https://res.cloudinary.com/dpk1vp7a8/image/upload/v1679739053/Asset_1_1_wgn5r9.png"
              alt="no books"
            />
            <p className="empty-text">
              Your search for {searchInput} did not find any matches.
            </p>
          </div>
        ) : (
          <ul className="books-list-container">
            {booksList.map(book => (
              <BookShelfItem key={book.id} bookDetails={book} />
            ))}
          </ul>
        )}
      </>
    )
  }

  renderBooksShelvesListPage = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  onClickBookshelve = id => {
    this.setState({bookshelveId: id}, this.getBooksShelvesList)
  }

  renderBookshelvesList = () => (
    <div className="bookshelve-list-container">
      <h1 className="bookshelve-heading">Bookshelves</h1>
      <ul className="bookshelve-list-card">
        {bookshelvesList.map(each => {
          const {id, value, label} = each
          const {bookshelveId} = this.state
          const onClick = () => {
            this.onClickBookshelve(id)
          }

          const activeItem =
            bookshelveId === id ? 'active-item-btn' : 'bookshelve-list-item-btn'

          return (
            <li onClick={onClick} value={value} key={id}>
              <button className={activeItem} type="button">
                {label}
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )

  onClickSearchBtn = () => {
    this.getBooksShelvesList()
  }

  render() {
    const {searchInput, bookshelveId} = this.state

    const ActiveLabel = bookshelvesList.find(each => each.id === bookshelveId)

    return (
      <div className="bg-container-bookshelve">
        <Header />
        <div data-testid="bookshelves" className="bookshelve-container">
          {this.renderBookshelvesList()}
          <div className="book-shelves-sub-container">
            <div className="heading-search-card">
              <h1 className="book-shelve-heading">{ActiveLabel.label} Books</h1>
              <div className="search-input-card">
                <input
                  className="search-input"
                  type="search"
                  value={searchInput}
                  onChange={this.onChangeSearchInput}
                  placeholder="Search"
                />
                <button
                  testid="searchButton"
                  onClick={this.onClickSearchBtn}
                  className="search-btn"
                  type="button"
                >
                  <BsSearch />
                </button>
              </div>
            </div>
            {this.renderBooksShelvesListPage()}
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default Bookshelves
