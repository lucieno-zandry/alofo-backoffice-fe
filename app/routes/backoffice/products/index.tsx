import { MousePointerClick, X } from "lucide-react";
import { Button } from "~/components/ui/button";
import { useProductsPage } from "~/components/products/products-page.controller";
import { MOCK_PRODUCTS } from "~/api/mock-products";
import { ProductList } from "~/components/products/product-list.view";
import { ProductDetail } from "~/components/products/product-detail.view";

export default function ProductsPage() {
  const { selectedId, selectedProduct, handleSelect, handleClose } = useProductsPage(MOCK_PRODUCTS);

  return (
    <div className="flex overflow-y-auto bg-background/80 backdrop-blur-md border border-sidebar-border rounded-2xl">
      {/* Left: Product list — always visible, shrinks on md when detail opens */}
      <div
        className={`
          flex-col border-r border-border transition-all duration-300
          ${selectedProduct ? "hidden md:flex md:w-72 lg:w-80 xl:w-96" : "flex w-full md:w-96 lg:w-[420px]"}
        `}
      >
        <ProductList
          products={MOCK_PRODUCTS}
          selectedId={selectedId}
          onSelect={handleSelect}
        />
      </div>

      {/* Right: Detail panel */}
      {selectedProduct ? (
        <div className="flex-1 flex flex-col min-w-0 relative">
          {/* Mobile back button */}
          <div className="md:hidden absolute top-4 right-4 z-10">
            <Button
              size="icon"
              variant="ghost"
              onClick={handleClose}
              className="rounded-full"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          <ProductDetail product={selectedProduct} />
        </div>
      ) : (
        /* Empty state — only visible on larger screens */
        <div className="hidden md:flex flex-1 items-center justify-center flex-col gap-3 text-muted-foreground">
          <MousePointerClick className="w-10 h-10" />
          <p className="text-sm">Select a product to see its details</p>
        </div>
      )}
    </div>
  );
}