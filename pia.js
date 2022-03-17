import puppeteer from 'puppeteer';
import axios from 'axios';

const PAGE = 'https://novelpia.com';
const TITLE_CODE = '1234';

async function connection() {
	const browser = await puppeteer.launch({
		headless: false, // false면 브라우저가 동작하는게 눈에 보인다.
		defaultViewport: null,
		devtools: true,
	});

	// 1. 로그인
	// POST 요청하기 http://www.google.com
	const params = new URLSearchParams();
	params.append('email', EMAIL);
	params.append('wd', WD);
	const result = await axios.post(`${PAGE}/proc/login`, params);
	console.log(result);

	// 2. 로그인 세팅 상태로 메인페이지 접속
	const page = await browser.newPage();
	// USERKEY=; LOGINKEY=; 쿠키 추가
	await page.goto(PAGE);

	// cookie 확인

	// 2. 로그인

	return [browser, page];
}

async function getTargetList(page) {
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

(async () => {
	const [browser, page] = await connection();

	await getTargetList(page);

	await browser.close();
})();
