import type { About } from "../CardsList"

export const InfoCardComponents = (props: {title: string, about: About[]}) => {
    return (
        <div className="infoBox flex column g16">
            <p className="title">{props.title}</p>
            <div className="aboutInfo">
                <p className="headingTitle">О товаре</p>
                {props.about.map((about, index) => (
                    <div className="aboutCard flex g8" key={index}>
                        <p className="aboutKey">{about.key}</p>
                        <p className="aboutValue">{about.value}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}