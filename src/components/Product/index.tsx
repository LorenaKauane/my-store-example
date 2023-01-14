import React from 'react';

interface Props {
  product: any;
  isLoading: boolean;
  checkout: Function;
}

const Product: React.FC<Props> = ({ product, isLoading, checkout }) => {
  const image = product.images.edges[0].node;
  const variantId = product.variants.edges[0].node.id;

  return (
    <div className="container px-5  mx-auto pb-24">
      <div className="lg:w-4/5 mx-auto flex flex-wrap">
        <img
          alt="ecommerce"
          className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
          src={image.url}
        />
        <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
          <h2 className="text-sm title-font text-gray-500 tracking-widest">
            WEB COURSE
          </h2>
          <h1 className="text-gray-600 text-3xl title-font font-medium mb-1">
            {product.title}
          </h1>

          <p className="leading-relaxed">{product.description}</p>

          <div className="flex">
            <span className="title-font font-medium text-2xl text-gray-600">
              ${product.priceRange.minVariantPrice.amount}
            </span>
            <button
              disabled={isLoading}
              onClick={() => checkout(variantId)}
              className="disabled:opacity-25 flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
            >
              {isLoading ? 'Loading...' : 'Buy'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
