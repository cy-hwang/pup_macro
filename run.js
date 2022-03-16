import puppeteer from 'puppeteer';

// const username = 'cy_orchid';
// const password = 'dlfnf13!eks';

async function connection() {
	const browser = await puppeteer.launch({
		headless: false, // false면 브라우저가 동작하는게 눈에 보인다.
		defaultViewport: null,
		devtools: true,
	});
	const page = await browser.newPage();
	// await page.goto('https://www.naver.com');
	// await page.goto('https://nid.naver.com/nidlogin.login');
	await page.goto('https://novelpia.com/viewer/520863');
	/**
	 * novel_drawing element 하위의
	 * <font id="line_2" class="line">&nbsp;&nbsp;&nbsp; </font  font 엘레멘트들에 대해
	 * class가 line이고 내용물이 있다면 내용을 갖다 붙이기
	 *
	 */
	const temp = await page.$('#novel_drawing');
	const tt = await page.$eval('#novel_drawing', (t) => {
		return t.classList;
	});
	const getPtag = await page.$$eval('.line', (nodes) => {
		return nodes.map((n) => {
			return n.innerText;
		});
	});
	let code = '';
	getPtag.forEach((element) => {
		if (element.trim() !== '') {
			code += `${element.trim()}\r\n`;
		} else {
			code += '\r\n';
		}
	});
	code += '-------------------------------------------\r\n';
	console.log(code);
	await browser.close();

	// await page.type('#id', username);
	// await page.type('#pw', password);
	// await page.click('#log.login');
	// await page.waitForNavigation();
}

connection();
