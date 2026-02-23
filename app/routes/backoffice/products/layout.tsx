import { MousePointerClick, X } from "lucide-react";
import { Button } from "~/components/ui/button";
import { useProductsPage } from "~/components/products/products-page.controller";
import { ProductList } from "~/components/products/product-list.view";
import { Outlet, useLoaderData } from "react-router";
import { getProducts } from "~/api/http-requests";
import CreateProductSheet from "~/components/products/create-product";

export async function clientLoader() {
  const response = await getProducts({ with: ['category', 'images', 'variants'] });
  return { products: response.data?.products || [] };
}

export default function ProductsPage() {
  const { products } = useLoaderData<typeof clientLoader>()!;
  const { selectedId, selectedProduct, handleSelect } = useProductsPage(products);

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
            products={products}
            selectedId={selectedId}
            onSelect={handleSelect}
          />
        </div>

        <Outlet />
      </div>

      <CreateProductSheet />
    </>
  );
}