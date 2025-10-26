import { HeartIcon } from "../../assets/Icons"

export const PriceComponent = (props: {price: number}) => {
    return (
        <div className="priceBox flex column g16">
            <div className="priceCount flex g8">
                <p className="price newCount">{Math.floor(props?.price)} ₽</p>
                <p className="price oldCount">{Math.floor(props?.price) + 500} ₽</p>
            </div>
            <div className="buttonsBox flex center g8">
                <button className="addToCart">Добавить в корзину</button>
                <button className="addToFavorite flex center"><HeartIcon /></button>
            </div>
        </div>
    )
}