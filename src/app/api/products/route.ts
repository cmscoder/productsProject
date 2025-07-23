import { NextRequest, NextResponse } from 'next/server';
import { fetchProducts } from '@/utils/fetchProducts';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('q') || '';
  const products = await fetchProducts(query);
  return NextResponse.json(products);
}
