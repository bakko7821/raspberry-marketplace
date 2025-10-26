export const ImagesComponents = (props: {mainImage: string, images: string[]}) => {
    return (
        <div className="imagesBox flex g8">
            <div className="secondImages flex column g8">
                {props.images.slice(0, 7).map((image, index) => (
                    <img src={`http://localhost:5000${image}`} className="image" id={`${index}`} alt="" key={index}/>
                ))}
            </div>
            <img src={`http://localhost:5000${props.mainImage}`} alt="" className="mainImage" />
        </div>
    )
}