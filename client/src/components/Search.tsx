import { SeacrhIcon } from "../assets/Icons"

export const Search = () => {
    return (
        <div className="searchBox flex between">
            <input type="text" placeholder="Искать на Raspberry"/>
            <button><SeacrhIcon /></button>
        </div>
    )
}