function ImageTextSection({ imageRight, imagePath, heading, text }) {
    return (
        <div className={`flex ${imageRight ? 'flex-row-reverse' : 'flex-row'} items-center h-screen`}>
            <div className="w-1/2 h-full">
                <img src={imagePath} alt="Description" className="h-full w-full object-cover" />
            </div>
            <div className="w-1/2 p-8">
                <h2 className="text-3xl font-bold mb-4">{heading}</h2>
                <p>{text}</p>
            </div>
        </div>
    );
}

export default ImageTextSection;

