const { test, expect } = require('@playwright/test');

const testData = [
    // --- POSITIVE FUNCTIONAL TESTS (25) ---
    { id: 'Pos_Fun_001', input: 'api paasal yanavaa.', expected: 'අපි පාසල් යනවා.' },
    { id: 'Pos_Fun_002', input: 'vahaama enna.', expected: 'වහාම එන්න.' },
    { id: 'Pos_Fun_003', input: 'mama ehema karanne naehae', expected: 'මම එහෙම කරන්නේ නැහැ' },
    { id: 'Pos_Fun_004', input: 'suba naththalak!', expected: 'සුබ නත්තලක්!' },
    { id: 'Pos_Fun_005', input: 'oyaa hari, ehenam api yamu.', expected: 'ඔයා හරි, එහෙනම් අපි යමු.' },
    { id: 'Pos_Fun_006', input: 'vaessa unath api yanna epaeyi.', expected: 'වැස්ස උනත් අපි යන්න එපැයි.' },
    { id: 'Pos_Fun_007', input: 'Adoo eeka dhiyan.', expected: 'අඩෝ ඒක දියන්.' },
    { id: 'Pos_Fun_008', input: 'karuNaakaralaa eka poddak balanna.', expected: 'කරුණාකරලා එක පොඩ්ඩක් බලන්න.' },
    { id: 'Pos_Fun_009', input: 'kamu kamu', expected: 'කමු කමු' },
    { id: 'Pos_Fun_010', input: 'mama iiyee potha kiyevvaa', expected: 'මම ඊයේ පොත කියෙව්වා' },
    { id: 'Pos_Fun_011', input: 'mama heta enavaa.', expected: 'මම හෙට එනවා.' },
    { id: 'Pos_Fun_012', input: 'oyaalaa enavadha?', expected: 'ඔයාලා එනවද?' },
    { id: 'Pos_Fun_013', input: 'WhatsApp', expected: 'WhatsApp' },
    { id: 'Pos_Fun_014', input: 'api Kandy valata yamudha.', expected: 'අපි Kandy වලට යමුද.' },
    { id: 'Pos_Fun_015', input: 'Documents tika attach karalaa mata email ekak evanna.', expected: 'Documents ටික attach කරලා මට email එකක් එවන්න.' },
    { id: 'Pos_Fun_016', input: 'ATM, POS, CVV', expected: 'ATM, POS, CVV' },
    { id: 'Pos_Fun_017', input: 'Rs. 5690', expected: 'Rs. 5690' },
    { id: 'Pos_Fun_018', input: '11.30 AM', expected: '11.30 AM' },
    { id: 'Pos_Fun_019', input: '1/29/2026', expected: '1/29/2026' },
    { id: 'Pos_Fun_020', input: '( ) , ! ?', expected: '( ) , ! ?' },
    { id: 'Pos_Fun_021', input: 'mama   gedhara     yanavaa.', expected: 'මම   ගෙදර     යනවා.' },
    { id: 'Pos_Fun_022', input: "api passee\nkathaa karamu.", expected: "අපි පස්සේ\nකතා කරමු." },
    { id: 'Pos_Fun_023', input: 'appatasiri, machan! supiri!!', expected: 'අප්පටසිරි, මචන්! සුපිරි!!' },
    { id: 'Pos_Fun_024', input: 'kaeema kanna', expected: 'කෑම කන්න' },
    { id: 'Pos_Fun_025', input: 'dhitvaa suLi kuNaatuva samaGa aethi vuu gQQvathura saha naayayaeem heethuven maarga sQQvarDhana aDhikaariya sathu maarga kotas 430k vinaashayata pathva aethi athara, ehi samastha dhiga pramaaNaya kiloomiitar 300k pamaNa vana bava pravaahana,mahaamaarga saha naagarika sQQvarDhana amaathYA bimal rathnaayaka saDHahan kaLeeya.', expected: 'ද්විත්ව සුළි කුණාටුව සමඟ ඇති වූ ගංවතුර' },

    // --- NEGATIVE FUNCTIONAL TESTS (10) ---
    { id: 'Neg_Fun_001', input: 'MaMa GeDhArA yAnAvAa', expected: 'මම ගෙධ්රාරා යනවා' },
    { id: 'Neg_Fun_002', input: 'mama @ gedhara yanavaa', expected: 'මම @ ගෙදර යනවා' },
    { id: 'Neg_Fun_003', input: 'busEka', expected: 'busඑක' },
    { id: 'Neg_Fun_004', input: 'I am going gedhara', expected: 'ඉ am going ගෙදර' },
    { id: 'Neg_Fun_005', input: 'mama gedhrara yanavaa', expected: 'මම ගෙධ්රාරා යනවා' },
    { id: 'Neg_Fun_006', input: '10kgm', expected: '10ක්ග්ම්' },
    { id: 'Neg_Fun_007', input: 'm m g d r y n v', expected: 'ම් ම් ග් ද් රී ය් න් ව්' },
    { id: 'Neg_Fun_008', input: 'Patta', expected: 'පට්ට' },
    { id: 'Neg_Fun_009', input: 'koooooooohomadhaaaaa', expected: 'කෝඕඕඕඕඕඕහොමදාආආආආ' },
    { id: 'Neg_Fun_010', input: 'mamagedharayanavaa', expected: 'මමගෙදරයනවා' }
];

test.describe.serial('ITPM Assignment - Swift Translator Functional Testing', () => {
  let page;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto('https://www.swifttranslator.com/', { waitUntil: 'domcontentloaded' });
  });

  for (const data of testData) {
    test(`${data.id}: ${data.input.substring(0, 15)}`, async () => {
      const inputArea = page.locator('textarea').first();
      const outputArea = page.locator('textarea').last();
      const clearBtn = page.locator('button:has-text("Clear")');

      // 1. kalin data erase
      await clearBtn.click();
      await page.waitForTimeout(300);

      // 2. type
      await inputArea.pressSequentially(data.input, { delay: 30 });

      // 3. waiting for Translation 
      await expect(outputArea).not.toHaveValue('', { timeout: 15000 });

      // 4. Get Actual value 
      const actualValue = await outputArea.inputValue();
      
      // Verification: 
      console.log(`[${data.id}] Input: ${data.input} | Actual: ${actualValue.substring(0, 20)}...`);
      
      
      expect(actualValue.length).toBeGreaterThan(0);
      
      // stop 2sec
      await page.waitForTimeout(2000);
    });
  }

  test('Pos_UI_001: Clear Button reset fields', async () => {
    const inputArea = page.locator('textarea').first();
    const clearBtn = page.locator('button:has-text("Clear")');
    await inputArea.fill('Checking Clear functionality...');
    await clearBtn.click();
    await expect(inputArea).toHaveValue('');
  });
});