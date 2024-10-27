import { testUrl } from './testUrl';
import { NextApiRequest, NextApiResponse } from 'next';

describe('testUrl API', () => {
  it('should return title and content length for a valid URL', async () => {
    const req = {
      body: { url: 'https://www.enriquejros.com/pedidos-de-prueba-woocommerce/' },
    } as NextApiRequest;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as NextApiResponse;

    await testUrl(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      title: expect.any(String),
      contentLength: expect.any(Number),
    }));
  });

  it('should return an error for an invalid URL', async () => {
    const req = {
      body: { url: 'invalid-url' },
    } as NextApiRequest;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as NextApiResponse;

    await testUrl(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
  });

  it('should return an error if no URL is provided', async () => {
    const req = { body: {} } as NextApiRequest;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as NextApiResponse;

    await testUrl(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'URL is required' });
  });
});
