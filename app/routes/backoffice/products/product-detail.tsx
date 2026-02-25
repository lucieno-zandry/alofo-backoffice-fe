import { Separator } from "~/components/ui/separator";
import { ScrollArea } from "~/components/ui/scroll-area";
import { useProductDetail } from "../../../components/product-detail/product-detail.controller";
import { ProductImages } from "../../../components/product-detail/product-images.view";
import { VariantsTable } from "../../../components/variants/variants-table.view";
import { getProduct } from "~/api/http-requests";
import { redirect, useLoaderData, type LoaderFunctionArgs } from "react-router";
import { MobileBackButton } from "~/components/product-detail/mobile-back-button";
import ProductHeader from "~/components/product-detail/product-header";
import { SummaryStats } from "~/components/product-detail/summary-stats";
import { PriceRange } from "~/components/product-detail/price-range";
import { CategoryBadge } from "~/components/product-detail/category-badge";
import { ProductDescription } from "~/components/product-detail/product-description";
import { ProductMetadata } from "~/components/product-detail/product-metadata";

export async function clientLoader({ params }: LoaderFunctionArgs) {
  const response = await getProduct(params.slug!);
  const product = response.data?.product

  if (!product) return redirect(`/${params.lang}/404`);

  return { product };
}

export default function ProductDetail() {
  const { product } = useLoaderData<typeof clientLoader>();
  const { priceRange, totalStock, skusOnSale, createdAt, updatedAt, handleClose } =
    useProductDetail(product);

  return (
    <div className="flex-1 flex flex-col min-w-0 relative">
      <MobileBackButton onClose={handleClose} />

      <div className="flex flex-col h-full">
        <ProductHeader title={product.title} slug={product.slug} />

        <ScrollArea className="flex-1">
          <div className="px-6 py-5 space-y-6">
            <ProductImages images={product.images ?? []} />
            <SummaryStats
              variants={product.variants?.length ?? 0}
              totalStock={totalStock}
              skusOnSale={skusOnSale}
            />
            <PriceRange priceRange={priceRange} />
            <CategoryBadge category={product.category} />
            <ProductDescription description={product.description} />
            <Separator />
            <VariantsTable
              variants={product.variants ?? []}
              variantGroups={product.variant_groups ?? []}
            />
            <Separator />
            <ProductMetadata createdAt={createdAt} updatedAt={updatedAt} />
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}