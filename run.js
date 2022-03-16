import puppeteer from 'puppeteer';

async function connection() {
	const browser = await puppeteer.launch({
		headless: false, // false면 브라우저가 동작하는게 눈에 보인다.
		defaultViewport: null,
		devtools: true,
	});
	const page = await browser.newPage();
	await page.goto('https://novelpia.com/viewer/520863');
	/**
	 * novel_drawing element 하위의
	 * <font id="line_2" class="line">&nbsp;&nbsp;&nbsp; </font  font 엘레멘트들에 대해
	 * class가 line이고 내용물이 있다면 내용을 갖다 붙이기
	 *
	 */
	const getFullLine = await page.$$eval('.line', (nodes) => {
		return nodes.map((n) => {
			return n.innerText;
		});
	});
	let code = '';
	getFullLine.forEach((element) => {
		if (element.trim() !== '') {
			code += `${element.trim()}\r\n`;
		} else {
			code += '\r\n';
		}
	});
	code += '-------------------------------------------\r\n';
	console.log(code);
	await browser.close();
}

connection();
