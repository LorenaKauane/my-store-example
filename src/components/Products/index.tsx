import Link from 'next/link';
import React from 'react';

interface Props {
  products: any[];
}

const Products: React.FC<Props> = ({ products }) => {
  return (
    <div className="bg-white py-6 sm:py-8 lg:py-12">
      <div className="max-w-screen-2xl px-4 md:px-8 mx-auto">
        <div className="flex justify-between items-end gap-4 mb-6">
          <h2 className="text-gray-600 text-2xl lg:text-3xl font-bold">
            Courses
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-8">
          {products.map(({ node }) => {
            const product: any = node;
            const imageProduct = product.images.edges[0].node;

            return (
              <Link key={product.handle} href={`/product/${product.handle}`}>
                <div className="group h-80 block bg-gray-100 rounded-lg overflow-hidden relative mb-2 lg:mb-3">
                  <img
                    src={imageProduct.url}
                    loading="lazy"
                    alt="Photo by Fakurian Design"
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition duration-200"
                  />
                </div>
                <div>
                  <div className="text-gray-500 hover:gray-800 lg:text-lg transition duration-100 mb-1">
                    {product.title}
                  </div>
                  <div className="flex items-end gap-2">
                    <span className="text-gray-600 lg:text-lg font-bold">
                      ${product.priceRange.minVariantPrice.amount}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Products;
