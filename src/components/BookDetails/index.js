import {Component} from 'react'
import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'
import {BsFillStarFill} from 'react-icons/bs'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
}

class BookDetails extends Component {
  state = {bookData: {}, apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getBookData()
  }

  getBookData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/book-hub/books/${id}`

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = {
        id: data.book_details.id,
        authorName: data.book_details.author_name,
        coverPic: data.book_details.cover_pic,
        title: data.book_details.title,
        readStatus: data.book_details.read_status,
        rating: data.book_details.rating,
        aboutBook: data.book_details.about_book,
        aboutAuthor: data.book_details.about_author,
      }

      this.setState({
        bookData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  onTryAgain = () => {
    this.getBookData()
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
    const {bookData} = this.state
    const {
      authorName,
      coverPic,
      title,
      readStatus,
      rating,
      aboutBook,
      aboutAuthor,
    } = bookData

    return (
      <div className="book-detail-container">
        <div className="book-img-detail-card">
          <img className="book-cover-img" src={coverPic} alt={title} />
          <div className="book-detail-info-card">
            <h1 className="book-title">{title}</h1>
            <p className="book-author">{authorName}</p>
            <p className="book-rating">
              Avg Rating <BsFillStarFill className="star-icon" /> {rating}
            </p>
            <p className="book-status">
              Status: <span className="book-status-result">{readStatus}</span>
            </p>
          </div>
        </div>
        <hr />
        <h1 className="about-book-author-heading">About Author</h1>
        <p className="about-info">{aboutAuthor}</p>
        <h1 className="about-book-author-heading">About Book</h1>
        <p className="about-info">{aboutBook}</p>
      </div>
    )
  }

  renderBookDetails = () => {
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

  render() {
    return (
      <div className="bg-container-book-details">
        <Header />
        <div className="book-details-main-container">
          {this.renderBookDetails()}
        </div>
        <Footer />
      </div>
    )
  }
}

export default BookDetails
