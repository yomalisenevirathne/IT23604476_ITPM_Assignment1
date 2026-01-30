const { test, expect } = require('@playwright/test');

const testData = [
    { id: 'Pos_Fun_001', input: 'api paasal yanavaa.' },
    { id: 'Pos_Fun_002', input: 'vahaama enna.' },
    { id: 'Pos_Fun_003', input: 'mama ehema karanne naehae' },
    { id: 'Pos_Fun_004', input: 'suba naththalak!' },
    { id: 'Pos_Fun_005', input: 'oyaa hari, ehenam api yamu.' },
    { id: 'Pos_Fun_006', input: 'vaessa unath api yanna epaeyi.' },
    { id: 'Pos_Fun_007', input: 'Adoo eeka dhiyan.' },
    { id: 'Pos_Fun_008', input: 'karuNaakaralaa eka poddak balanna.' },
    { id: 'Pos_Fun_009', input: 'kamu kamu' },
    { id: 'Pos_Fun_010', input: 'mama iiyee potha kiyevvaa' },
    { id: 'Pos_Fun_011', input: 'mama heta enavaa.' },
    { id: 'Pos_Fun_012', input: 'oyaalaa enavadha?' },
    { id: 'Pos_Fun_013', input: 'WhatsApp' },
    { id: 'Pos_Fun_014', input: 'api Kandy valata yamudha.' },
    { id: 'Pos_Fun_015', input: 'Documents tika attach karalaa mata email ekak evanna.' },
    { id: 'Pos_Fun_016', input: 'ATM, POS, CVV' },
    { id: 'Pos_Fun_017', input: 'Rs. 5690' },
    { id: 'Pos_Fun_018', input: '11.30 AM' },
    { id: 'Pos_Fun_019', input: '1/29/2026' },
    { id: 'Pos_Fun_020', input: '( ) , ! ?' },
    { id: 'Pos_Fun_021', input: 'mama   gedhara     yanavaa.' },
    { id: 'Pos_Fun_022', input: "api passee\nkathaa karamu." },
    { id: 'Pos_Fun_023', input: 'appatasiri, machan! supiri!!' },
    { id: 'Pos_Fun_024', input: 'kaeema kanna' },
    { id: 'Pos_Fun_025', input: 'dhitvaa suLi kuNaatuva samaGa aethi vuu gQQvathura saha naayayaeem heethuven maarga sQQvarDhana aDhikaariya sathu maarga kotas 430k vinaashayata pathva aethi athara, ehi samastha dhiga pramaaNaya kiloomiitar 300k pamaNa vana bava pravaahana,mahaamaarga saha naagarika sQQvarDhana amaathYA bimal rathnaayaka saDHahan kaLeeya.' },
    { id: 'Neg_Fun_001', input: 'MaMa GeDhArA yAnAvAa' },
    { id: 'Neg_Fun_002', input: 'mama @ gedhara yanavaa' },
    { id: 'Neg_Fun_003', input: 'busEka' },
    { id: 'Neg_Fun_004', input: 'I am going gedhara' },
    { id: 'Neg_Fun_005', input: 'mama gedhrara yanavaa' },
    { id: 'Neg_Fun_006', input: '10kgm' },
    { id: 'Neg_Fun_007', input: 'm m g d r y n v' },
    { id: 'Neg_Fun_008', input: 'Patta' },
    { id: 'Neg_Fun_009', input: 'koooooooohomadhaaaaa' },
    { id: 'Neg_Fun_010', input: 'mamagedharayanavaa' }
];

test.describe.serial('Swift Translator Suite - Human Readable Speed', () => {
    let page;

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        await page.goto('https://www.swifttranslator.com/', { waitUntil: 'domcontentloaded' });
    });

    for (const data of testData) {
        test(`${data.id}`, async () => {
            const inputArea = page.locator('textarea').first();
            const outputArea = page.locator('textarea').last();
            const clearBtn = page.locator('button:has-text("Clear")');

            // 1. කලින් දත්ත මකා දමන්න
            await clearBtn.click();
            await page.waitForTimeout(300);

            // 2. අකුරෙන් අකුර ටයිප් කරන්න (ටිකක් වේගය අඩු කළා - 40ms delay)
            await inputArea.pressSequentially(data.input, { delay: 40 });

            // 3. පරිවර්තනය වීමට තත්පර 1ක් රැඳී සිටීම
            await page.waitForTimeout(1000);

            // 4. Output එක එනකම් බලා සිටී
            await expect(outputArea).not.toHaveValue('', { timeout: 15000 });

            // --- ඔයාට බලාගන්න එකතු කරපු විශේෂ කොටස ---
            console.log(`✅ [${data.id}] Done.`);
            await page.waitForTimeout(2000); // තත්පර 2ක් රිසල්ට් එක පෙන්වන්න නතර වේ
            // -----------------------------------------
        });
    }

    test('Pos_UI_001: Clear Button reset fields', async () => {
        const inputArea = page.locator('textarea').first();
        const clearBtn = page.locator('button:has-text("Clear")');
        await inputArea.fill('Testing Clear functionality...');
        await page.waitForTimeout(1000); // බලාගන්න වෙලාවක්
        await clearBtn.click();
        await expect(inputArea).toHaveValue('');
        await page.waitForTimeout(2000);
    });
});