const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    // Read the HTML content from the file
    const htmlPath = path.join(__dirname, 'index.html');
    const htmlContent = fs.readFileSync(htmlPath, 'utf8');
    
    // Set the content of the page to the HTML content
    await page.setContent(htmlContent, { waitUntil: 'load' });
    
    // Add the CSS file to the page
    const cssPath = path.join(__dirname, 'output.css');
    const cssContent = fs.readFileSync(cssPath, 'utf8');
    await page.addStyleTag({ content: cssContent });
    
    // Convert the page to PDF
    const pdfPath = path.join(__dirname, 'Akash Patel Resume.pdf');
    await page.pdf({
        path: pdfPath,
        format: 'A4',
        // margin: {
        //     top: '1mm',
        //     bottom: '1mm',
        //     left: '1mm',
        //     right: '1mm'
        // }
    });
    
    await browser.close();
    console.log('PDF generated:', pdfPath);
})();
