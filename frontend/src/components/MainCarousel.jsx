import { Carousel } from "react-bootstrap";
import "./styles/MainCarousel.css";

function MainCarousel() {
    return (
        <Carousel >
            <Carousel.Item className="item">
                <img
                    className="img "
                    src="https://res.cloudinary.com/cloud-513/image/upload/v1648496342/compfest/MainPageCaroussel/razerNagaProMainPage_efhqgy.jpg"
                    alt="First slide"

                />
                <Carousel.Caption style={{ textAlign: "left" }}>
                    <h3>Click Your Way to Victory</h3>
                    <p>Get ready to win every battle with our wide range of mice perfect for work or play.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item className="item">
                <img
                    className="img "
                    src="https://res.cloudinary.com/cloud-513/image/upload/v1648496342/compfest/MainPageCaroussel/blackWiddowEliteMainPage_nplt0k.jpg"
                    alt="Second slide"
                />

                <Carousel.Caption style={{ textAlign: "left" }} >
                    <h3>Play With Passion</h3>
                    <p>Gaming or working with the newest RGB ready keyboards now!</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item className="item">
                <img
                    className="img "
                    src="https://res.cloudinary.com/cloud-513/image/upload/v1648657632/compfest/MainPageCaroussel/razer-kraken-ultimate_e0cmge.jpg"
                    alt="Third slide"
                />


                <Carousel.Caption style={{ textAlign: "left" }}>
                    <h3>"FPS Gaming? Just nail it!"</h3>
                    <p>Bring your gameplay to the next level with our audio system.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item className="item">
                <img
                    className="img "
                    src="https://res.cloudinary.com/cloud-513/image/upload/v1648658094/compfest/MainPageCaroussel/RazerFireflyv2_okmtq4.jpg"
                    alt="Third slide"
                />


                <Carousel.Caption style={{ textAlign: "left" }}>
                    <h3>Own Your Style</h3>
                    <p>Design your own light effect with our RGB equipped mousepad.</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    )
}

export default MainCarousel;
