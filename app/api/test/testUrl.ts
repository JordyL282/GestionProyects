
import { NextApiRequest, NextApiResponse } from 'next';
import puppeteer from 'puppeteer';

export const testUrl = async (req: NextApiRequest, res: NextApiResponse) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  try {
    await page.goto(url, { waitUntil: 'networkidle2' });
    const title = await page.title();
    const contentLength = (await page.content()).length;

    res.status(200).json({
      title,
      contentLength,
    });
  } catch (error) {
    // Proporciona más información sobre el error
    console.error('Error al acceder a la URL:', error);
    const errorMessage = (error as Error).message || 'Error desconocido';
    res.status(500).json({ error: errorMessage });
  } finally {
    await browser.close();
  }
};
