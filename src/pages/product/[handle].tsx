import Product from '@/components/Product';
import Products from '@/components/Products';
import { storeFront } from '@/utils/store';
import React, { useState } from 'react';

interface Props {
  product: any;
  products: [];
}

const ProductPage: React.FC<Props> = ({ product, products }) => {
  const [isLoading, setIsLoading] = useState(false);

  async function checkout(variableId: string) {
    setIsLoading(true);
    const { data } = await storeFront(mutationCreateCheckout, { variableId });
    const { webUrl } = data.checkoutCreate.checkout;
    window.location.href = webUrl;
  }

  if (!product) {
    return <>Loading...</>;
  }

  const relatedProduct: any[] = products
    .filter((item: any) => item.node.handle !== product.handle)
    .splice(0, 4);

  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <Product product={product} isLoading={isLoading} checkout={checkout} />
      <Products products={relatedProduct} />
    </section>
  );
};

const mutationCreateCheckout = `
  mutation CheckoutCreate($variableId: ID!) {
    checkoutCreate(
      input: { lineItems: { variantId: $variableId, quantity: 1 } }
    ) {
      checkout {
        webUrl
      }
    }
  }
`;

const queryOneProduct = `
  query SingleProduct($handle: String!) {
    productByHandle(handle: $handle) {
      description
      handle
      title
      priceRange {
        minVariantPrice {
          amount
        }
      }
      variants(first: 1) {
        edges {
          node {
            id
          }
        }
      }
      images(first: 1) {
        edges {
          node {
            url
          }
        }
      }
    }
    products(first: 6) {
      edges {
        node {
          handle
          title
          tags
          priceRange {
            minVariantPrice {
              amount
            }
          }
          images(first: 1) {
            edges {
              node {
                url
              }
            }
          }
        }
      }
    }
  }
`;

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export async function getStaticProps({ params }: any) {
  const { data } = await storeFront(queryOneProduct, { handle: params.handle });
  return {
    props: {
      product: data?.productByHandle,
      products: data?.products?.edges,
    },
  };
}

export default ProductPage;
