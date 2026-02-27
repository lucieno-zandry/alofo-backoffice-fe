import { useProductsPage } from "~/components/products/products-page.controller";
import { ProductList } from "~/components/products/product-list.view";
import { Outlet } from "react-router";
import ProductEditor from "~/components/product-editor/product-editor";

export default function ProductsPage() {
  const { selectedId, selectedProduct, handleSelect } = useProductsPage();

  return (
    <>
      <div className="flex overflow-y-auto bg-background/80 backdrop-blur-md border border-sidebar-border rounded-2xl">
        {/* Left: Product list — always visible, shrinks on md when detail opens */}
        <div
          className={`
          flex-col border-r border-border transition-all duration-300
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