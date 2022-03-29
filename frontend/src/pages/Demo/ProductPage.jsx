import { useParams } from "react-router-dom"
import './styles/ProductPage.css';

function ProductPage() {
    const params = useParams();
    const { slug } = params;
    return (
        < div >
            <h1 className="test">{slug}</h1>
        </div >
    );
}

export default ProductPage;
