const fastify = require('fastify')({ logger: true })
const fetch = require('node-fetch');
const { parse } = require('node-html-parser');
const puppeteer = require('puppeteer');


fastify.get('/statblock', async (request, reply) => {
	const { url } = request.query;
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
    await page.setRequestInterception(true);
  page.on('request', interceptedRequest => {
    console.log(interceptedRequest.url(), interceptedRequest.url().includes('captcha'))
    if (interceptedRequest.url().includes('captcha'))
      interceptedRequest.abort();
    else
      interceptedRequest.continue();
  });
  await page.goto(url);
  const html = await page.content();
	const root = parse(html);
  console.log(html, root);
	console.log(root.querySelector(".mon-stat-block"));
  reply.type('text/html')
  reply.send(html);
})

// Run the server!
const start = async () => {
  try {
    await fastify.listen(3006)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
