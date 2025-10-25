import axios from "axios";
import { useEffect, useState } from "react";
import { CardComponent } from "./CardComponent";

export interface Card {
    id: number;
    title: string;
    description: string;
    price: number;
    about: About[];
    images: string[];
    article: string;
}

interface About {
    key: string;
    value: string;
}

export const CardList = () => {
    const [cards, setCards] = useState<Card[]>([])

    useEffect(() => {
        const fetchCards = async () => {
            try {
                const res = await axios.get<Card[]>("http://localhost:5000/api/cards/");
                setCards(res.data);
                console.log(res.data)
            } catch (error) {
                console.error("Ошибка при получении карточек:", error);
            }
        };

        fetchCards();
    }, []);

    return (
        <div className="cardList">
            {cards.length === 0 ? (
                <span className="nullMessage">Отсутствуют карты в базе данных</span>
            ) : (
                cards.map((card) => (
                    <CardComponent cardContent={card} />
                ))
            )}
        </div>
    )
}