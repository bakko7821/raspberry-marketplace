import { Link } from "react-router-dom"

export const NotFoundPage = () => {
    return (
        <div className="page">
            <div className="404component flex column g16">
                <p className="upErrorText">Возникла ошибка</p>
                <p className="bottomErrorText">404</p>
            </div>
            <Link to="/">Вернуться на главную</Link>
        </div>
    )
}