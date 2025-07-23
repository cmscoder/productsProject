import { ProductDetailProps } from '@/utils/types/products';

export async function getProduct(
  id: string
): Promise<ProductDetailProps | null> {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`;
    const res = await fetch(url, {
      headers: {
        'x-api-key': process.env.NEXT_PUBLIC_API_KEY || '',
      },
    });
    if (!res.ok) {
      console.error('API response not ok:', res.status, url);
      return null;
    }
    const json = await res.json();
    if (!json || !json.id) {
      console.error('API returned invalid product:', json);
      return null;
    }
    return json;
  } catch (e) {
    console.error('API fetch error:', e);
    return null;
  }
}
