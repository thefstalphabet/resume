const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    // Read the HTML content from the file
    const htmlPath = path.join(__dirname, 'resume.html');
    const htmlContent = fs.readFileSync(htmlPath, 'utf8');
    
    // Set the content of the page to the HTML content
    await page.setContent(htmlContent, { waitUntil: 'load' });
    
    // Add the CSS file to the page
    const cssPath = path.join(__dirname, 'styles.css');
    const cssContent = fs.readFileSync(cssPath, 'utf8');
    await page.addStyleTag({ content: cssContent });
    
    // Convert the page to PDF
    const pdfPath = path.join(__dirname, 'resume.pdf');
    await page.pdf({
        path: pdfPath,
        format: 'A4',
        margin: {
            top: '10mm',
            bottom: '10mm',
            left: '10mm',
            right: '10mm'
        }
    });
    
    await browser.close();
    console.log('PDF generated:', pdfPath);
})();
