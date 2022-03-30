import { Carousel } from "react-bootstrap";
import "./styles/MainCarousel.css";

function MainCarousel() {
    return (
        <Carousel>
            <Carousel.Item>
                <img
                    className="img "
                    src="https://res.cloudinary.com/cloud-513/image/upload/v1648496342/compfest/MainPageCaroussel/razerNagaProMainPage_efhqgy.jpg"
                    alt="First slide"

                />
                <Carousel.Caption style={{ textAlign: "left" }}>
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="img "
                    src="https://res.cloudinary.com/cloud-513/image/upload/v1648496342/compfest/MainPageCaroussel/blackWiddowEliteMainPage_nplt0k.jpg"
                    alt="Second slide"
                />

                <Carousel.Caption style={{ textAlign: "left" }} >
                    <h3>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="img "
                    src="https://res.cloudinary.com/cloud-513/image/upload/v1648496342/compfest/MainPageCaroussel/RazerBlackSharkV2ESLEditionMainPage_k08myh.jpg"
                    alt="Third slide"
                />

                <Carousel.Caption style={{ textAlign: "left" }}>
                    <h3>Third slide label</h3>
                    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    )
}

export default MainCarousel;
