import { ProductProps } from '@/utils/types/products';

export async function fetchProducts(query?: string): Promise<ProductProps[]> {
  try {
    let url = `${process.env.NEXT_PUBLIC_API_URL}/products?limit=20`;
    if (query) {
      url = `${process.env.NEXT_PUBLIC_API_URL}/products?search=${encodeURIComponent(query)}&limit=20`;
    }
    const res = await fetch(url, {
      headers: {
        'x-api-key': process.env.NEXT_PUBLIC_API_KEY || '',
      },
      cache: query ? 'no-store' : undefined,
      next: query ? undefined : { revalidate: 320 },
    });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    return [];
  }
}
