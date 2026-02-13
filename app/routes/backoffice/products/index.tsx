import Button from "~/components/custom-ui/button";
import { Input } from "~/components/ui/input";

export default function Products() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="flex gap-2 mb-4">
        <Input placeholder="Search products..." className="w-64" />
        <Button>Add Product</Button>
      </div>
      {/* <DataTable /> */}
    </div>
  );
}
