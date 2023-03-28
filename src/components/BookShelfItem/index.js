import {Link} from 'react-router-dom'
import {BsFillStarFill} from 'react-icons/bs'
import './index.css'

const BookShelfItem = props => {
  const {bookDetails} = props
  const {id, title, coverPic, authorName, readStatus, rating} = bookDetails

  return (
    <Link className="Link-book-item" to={`/books/${id}`}>
      <li className="bookListItem">
        <img className="cover-pic" src={coverPic} alt={title} />
        <div className="book-detail-card">
          <h1 className="book-item-title">{title}</h1>
          <p className="book-item-author">{authorName}</p>
          <p className="book-item-rating">
            Avg Rating <BsFillStarFill className="book-item-star" />
            {rating}
          </p>
          <p className="book-item-status">
            Status:{' '}
            <span className="book-item-status-result">{readStatus}</span>
          </p>
        </div>
      </li>
    </Link>
  )
}

export default BookShelfItem
