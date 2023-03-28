import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Slider from 'react-slick'
import Header from '../Header'
import Footer from '../Footer'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
}

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
}

class Home extends Component {
  state = {topRatedBooks: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getTopRatedBooks()
  }

  getTopRatedBooks = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/book-hub/top-rated-books'
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
      }))

      this.setState({
        topRatedBooks: updatedData,
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
    this.getTopRatedBooks()
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
    const {topRatedBooks} = this.state

    return (
      <Slider {...settings} className="slider">
        {topRatedBooks.map(book => {
          const {id, authorName, coverPic, title} = book
          return (
            <Link to={`/books/${id}`} className="slider-link-item">
              <div className="slider-item-card" key={id}>
                <img className="slider-img" src={coverPic} alt={title} />
                <h1 className="slider-title">{title}</h1>
                <p className="slider-author">{authorName}</p>
              </div>
            </Link>
          )
        })}
      </Slider>
    )
  }

  renderTopRatedBooks = () => {
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

  onFindBooks = () => {
    const {history} = this.props
    history.replace('/shelf')
  }

  render() {
    return (
      <div className="bg-container-home">
        <Header />
        <div className="home-container">
          <h1 className="home-heading">Find Your Next Favorite Books?</h1>
          <p className="home-detail">
            You are in the right place. Tell us what titles or genres you have
            enjoyed in the past, and we will give you surprisingly insightful
            recommendations.
          </p>

          <div className="top-rated-books-card">
            <div className="heading-btn-card">
              <h1 className="top-rated-heading">Top Rated Books</h1>
              <button
                onClick={this.onFindBooks}
                className="find-books-btn"
                type="button"
              >
                Find Books
              </button>
            </div>

            <div className="slider-card">{this.renderTopRatedBooks()}</div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default Home
