//@ts-nocheck
export async function storeFront(query: string, variables: {}) {
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': process.env.NEXT_PUBLIC_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  return await response?.json();
}
