import { useParams } from "react-router-dom"
import type { Card } from "../components/CardsList";
import { useEffect, useState } from "react";
import axios from "axios";
import { ImagesComponents } from "../components/CardPage/ImagesComponent";
import { CopyIcon, ShareIcon } from "../assets/Icons";
import { InfoCardComponents } from "../components/CardPage/InfoCardComponent";
import { PriceComponent } from "../components/CardPage/PriceComponent";

import "../styles/card_page.scss"

export const CardPage = () => {
    const {id} = useParams()

    const [card, setCard] = useState<Card | null>(null)

    useEffect(() => {
        const fetchCardById = async () => {
            try {
                const res = await axios.get<Card>(`http://localhost:5000/api/cards/${id}`);
                setCard(res.data);
            } catch (error) {
                console.error("Ошибка при получении карточек:", error);
            }
        };

        fetchCardById();
        
    }, [id]);

    return (
        <div className="page flex column g16">
            <div className="headingInfoBox flex between">
                <div className="routeBox flex center g8">
                    <p>Категория №1</p>
                    <span className="circle"></span>
                    <p>Категория №2</p>
                    <span className="circle"></span>
                    <p>Категория №3</p>
                    <span className="circle"></span>
                    <p>Категория №4</p>
                </div>
                <div className="leftBox flex center g8">
                    <button className="articleBox flex center g8"><CopyIcon />Артикул: {card?.article}</button>
                    <button className="shareButton flex center g8"><ShareIcon /> Поделиться</button>
                </div>

            </div>
            <div className="mainPageCardInfoBox flex center g24">
                <ImagesComponents mainImage={card?.images[0] || ""} images={card?.images || []}/>
                <InfoCardComponents title={card?.title || ""} about={card?.about || []}/>
                <PriceComponent price={card?.price || 0}/>
            </div>
            <div className="bottomBox flex column g16">
                <p className="descriptionText">{card?.description}</p>
            </div>
        </div>
        
    )
}