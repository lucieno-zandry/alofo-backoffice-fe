// ============================================
// PAGE: ProductsPage.tsx (Layout)
// ============================================
import { Outlet } from 'react-router';
import { Button } from '~/components/ui/button';
import { ScrollArea } from '~/components/ui/scroll-area';
import { Plus } from 'lucide-react';
import { ProductFilters } from './components/product-filters';
import { ProductList } from './components/product-list';

export default () => {
    return (
        <div className="h-full flex flex-col bg-background/80 backdrop-blur-md rounded-2xl">
            {/* Header */}
            <div className="border-b px-6 py-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold">Product Management</h1>
                <Button onClick={() => console.log('Navigate to create product')}>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Product
                </Button>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex overflow-hidden">
                {/* Master: Sidebar */}
                <div className="w-96 border-r flex flex-col overflow-y-auto">
                    <div className="p-4 border-b">
                        <ProductFilters />
                    </div>
                    <div className="flex-1 p-4">
                        <ProductList />
                    </div>
                </div>

                {/* Detail: Main Content */}
                <div className="flex-1 overflow-auto">
                    <ScrollArea className="h-full">
                        <div className="p-6">
                            <Outlet />
                        </div>
                    </ScrollArea>
                </div>
            </div>
        </div>
    );
};