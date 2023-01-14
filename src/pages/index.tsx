import Head from 'next/head';
import { storeFront } from '@/utils/store';
import Header from '@/components/Header';
import Products from '@/components/Products';

export default function Home({ products }: any) {
  if (!products) {
    return <>Loading</>;
  }

  return (
    <>
      <section className="flex flex-col lg:flex-row justify-between gap-6 sm:gap-10 md:gap-16 mb-8 md:mb-16">
        <div className="xl:w-5/12 flex flex-col justify-center sm:text-center lg:text-left lg:py-12">
          <p className="text-indigo-500 md:text-lg xl:text-xl font-semibold mb-4 md:mb-6">
            Very proud to introduce
          </p>
          <h1 className="text-gray-600 text-4xl sm:text-5xl md:text-6xl font-bold mb-8 md:mb-12">
            Revolutionary way to build the web
          </h1>
          <div className="flex flex-col sm:flex-row sm:justify-center lg:justify-start gap-2.5">
            <a
              href="#"
              className="inline-block bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 focus-visible:ring ring-indigo-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3"
            >
              Buy now
            </a>
          </div>
        </div>
        <div className="xl:w-5/12 h-48 lg:h-96 bg-gray-100 overflow-hidden shadow-lg rounded-lg">
          <img
            src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            loading="lazy"
            alt="Photo by Fakurian Design"
            className="w-full h-full object-cover object-center"
          />
        </div>
      </section>
      <Products products={products} />
    </>
  );
}

const queryFetchAllProducts = `
  {
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

export async function getStaticProps() {
  const { data } = await storeFront(queryFetchAllProducts, {});

  if (data?.products) {
    return {
      props: {
        products: data.products.edges,
      },
    };
  }
  return {
    props: {
      products: [],
    },
  };
}
