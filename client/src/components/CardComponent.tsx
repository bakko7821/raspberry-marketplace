import type { Card } from "./CardsList"
import '../styles/home_page.scss'
import { ReviewIcon, StarIcon } from "../assets/Icons"
import { Link } from "react-router-dom"

export const CardComponent = (props: {cardContent: Card}) => {
    return (
        <Link 
            to={`/card/${props.cardContent.article}`}
            target="_blank"
            rel="noreferrer">
            <div className="card flex column g16" key={props.cardContent.article}>
                <img src={`http://localhost:5000${props.cardContent.images[0]}`} alt=""/>
                <div className="priceBox flex g8">
                    <p className="price count">{Math.floor(props.cardContent.price)} ₽</p>
                    <p className="price old-count">{Math.floor(props.cardContent.price) + 500} ₽</p>
                </div>
                <p className="title">{props.cardContent.title}</p>
                <div className="cardInfoBox flex g16">
                    <div className="raitingInfo flex center g8">
                        <StarIcon /> 
                        <p>4.8</p>    
                    </div>
                    <div className="reviewInfo flex center g8">
                        <ReviewIcon />
                        <p>127 645 отзыва</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}