import { useProductsPage } from "~/components/products/products-page.controller";
import { ProductList } from "~/components/products/product-list.view";
import { Outlet } from "react-router";
import ProductEditor from "~/components/product-editor/product-editor";

export default function ProductsPage() {
  const { selectedId, selectedProduct, handleSelect } = useProductsPage();

  return (
    <>
      <div className="flex h-full gap-2">
        {/* Left: Product list — always visible, shrinks on md when detail opens */}
        <div
          className={`
          flex-col bg-background/80 backdrop-blur-md rounded-2xl transition-all duration-300 h-full overflow-y-auto
          ${selectedProduct ? "hidden md:flex md:w-72 lg:w-80 xl:w-96" : "flex w-full md:w-96 lg:w-[420px]"}
          `}
        >
          <ProductList
            selectedId={selectedId}
            onSelect={handleSelect}
          />
        </div>

        <Outlet />
      </div>

      <ProductEditor />
    </>
  );
}