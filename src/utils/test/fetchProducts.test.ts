import { fetchProducts } from '../fetchProducts';

const OLD_ENV = process.env;

describe('fetchProducts', () => {
  beforeEach(() => {
    jest.resetModules();
    process.env = {
      ...OLD_ENV,
      NEXT_PUBLIC_API_URL: 'http://api',
      NEXT_PUBLIC_API_KEY: 'key',
    };
  });

  afterEach(() => {
    process.env = OLD_ENV;
    jest.clearAllMocks();
  });

  it('fetches products without query', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => [
        {
          id: '1',
          name: 'Test',
          brand: 'Brand',
          basePrice: 100,
          imageUrl: 'img',
        },
      ],
    });
    const result = await fetchProducts();
    expect(global.fetch).toHaveBeenCalledWith(
      'http://api/products?limit=20',
      expect.objectContaining({ headers: { 'x-api-key': 'key' } })
    );
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Test');
  });

  it('fetches products with query', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => [
        {
          id: '2',
          name: 'Search',
          brand: 'Brand',
          basePrice: 200,
          imageUrl: 'img2',
        },
      ],
    });
    const result = await fetchProducts('phone');
    expect(global.fetch).toHaveBeenCalledWith(
      'http://api/products?search=phone&limit=20',
      expect.objectContaining({
        headers: { 'x-api-key': 'key' },
        cache: 'no-store',
      })
    );
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Search');
  });

  it('returns empty array on error', async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error('fail'));
    const result = await fetchProducts();
    expect(result).toEqual([]);
  });

  it('returns empty array if response not ok', async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: false });
    const result = await fetchProducts();
    expect(result).toEqual([]);
  });
});
