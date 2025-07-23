import { GET } from '../route';

jest.mock('next/server', () => ({
  NextResponse: {
    json: (data: any) => ({
      json: async () => data,
    }),
  },
}));

jest.mock('@/utils/fetchProducts', () => ({
  fetchProducts: jest.fn(),
}));

import { fetchProducts } from '@/utils/fetchProducts';

const mockProducts = [
  { id: '1', name: 'Phone' },
  { id: '2', name: 'Tablet' },
];

describe('GET /api/products', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (fetchProducts as jest.Mock).mockResolvedValue(mockProducts);
  });

  it('returns products for a given query', async () => {
    const url = 'http://localhost/api/products?q=phone';
    const req = { url } as unknown as any;
    const res = await GET(req);
    const json = await res.json();
    expect(fetchProducts).toHaveBeenCalledWith('phone');
    expect(json).toEqual(mockProducts);
  });

  it('returns products for empty query', async () => {
    const url = 'http://localhost/api/products';
    const req = { url } as unknown as any;
    const res = await GET(req);
    const json = await res.json();
    expect(fetchProducts).toHaveBeenCalledWith('');
    expect(json).toEqual(mockProducts);
  });
});
