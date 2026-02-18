import { useNavigate, useParams } from "react-router";
import useRouterStore from "~/hooks/use-router-store";

export function useProductsPage(products: Product[]) {
    const { productId } = useParams<{ productId?: string }>();
    const { lang } = useRouterStore();

    const navigate = useNavigate();

    const selectedId = productId ? parseInt(productId) : null;

    const selectedProduct = products.find((p) => p.id === selectedId) ?? null;

    const handleSelect = (product: Product) => {
        navigate(`/${lang}/products/${product.id}`);
    };

    const handleClose = () => {
        navigate(`/${lang}/products`);
    };

    return { selectedId, selectedProduct, handleSelect, handleClose };
}