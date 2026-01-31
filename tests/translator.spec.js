const { test, expect } = require('@playwright/test');

const testData = [
    // --- POSITIVE FUNCTIONAL TESTS ---
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

    // --- NEGATIVE FUNCTIONAL TESTS ---
    { id: 'Neg_Fun_001', input: 'MaMa GeDhArA yAnAvAa', negative: true },
    { id: 'Neg_Fun_002', input: 'mama @ gedhara yanavaa', negative: true },
    { id: 'Neg_Fun_003', input: 'busEka', negative: true },
    { id: 'Neg_Fun_004', input: 'I am going gedhara', negative: true },
    { id: 'Neg_Fun_005', input: 'mama gedhrara yanavaa', negative: true },
    { id: 'Neg_Fun_006', input: '10kgm', negative: true },
    { id: 'Neg_Fun_007', input: 'm m g d r y n v', negative: true },
    { id: 'Neg_Fun_008', input: 'Patta', negative: true },
    { id: 'Neg_Fun_009', input: 'koooooooohomadhaaaaa', negative: true },
    { id: 'Neg_Fun_010', input: 'mamagedharayanavaa', negative: true }
];

test.describe('ITPM Assignment - Swift Translator Functional Testing', () => {
    let page;

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        await page.goto('https://www.swifttranslator.com/', {
            waitUntil: 'domcontentloaded'
        });
    });

    for (const data of testData) {
        test(`${data.id}: ${data.input.substring(0, 20)}`, async () => {

            const inputArea = page.locator('textarea').first();
            const outputArea = page.locator('textarea').last();
            const clearBtn = page.locator('button:has-text("Clear")');

            await clearBtn.click();
            await page.waitForTimeout(300);

            await inputArea.pressSequentially(data.input, { delay: 40 });
            await page.waitForTimeout(2200);

            const actualValue = await outputArea.inputValue();
            console.log(`[${data.id}] Output => "${actualValue}"`);

            // ✅ POSITIVE → output SHOULD exist
            if (!data.negative) {
                expect(actualValue.trim().length).toBeGreaterThan(0);
            }
            // ❌ NEGATIVE → output SHOULD NOT exist (SOFT ASSERT)
            else {
                expect.soft(actualValue.trim().length).toBe(0);
            }
        });
    }

    // --- UI TEST ---
    test('Pos_UI_001: Clear Button resets input field', async () => {
        const inputArea = page.locator('textarea').first();
        const clearBtn = page.locator('button:has-text("Clear")');

        await inputArea.fill('Checking Clear functionality...');
        await clearBtn.click();

        await expect(inputArea).toHaveValue('');
    });
});
