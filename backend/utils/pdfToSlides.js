const path = require("path");
const fs = require("fs");

/**
 * Converts each page of a PDF file into a PNG image saved to /uploads/.
 * Returns an array of relative URLs like ["/uploads/<prefix>-slide-1.png", ...]
 *
 * Uses pdfjs-dist v3 (CJS) + canvas (Node.js canvas implementation).
 */
async function pdfToSlides(pdfPath, prefix) {
  const pdfjsLib = require("pdfjs-dist/legacy/build/pdf.js");
  const { createCanvas } = require("canvas");

  const uploadsDir = path.join(__dirname, "../uploads");
  if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

  // Custom canvas factory for Node.js
  class NodeCanvasFactory {
    create(width, height) {
      const canvas = createCanvas(width, height);
      return { canvas, context: canvas.getContext("2d") };
    }
    reset(canvasAndCtx, width, height) {
      canvasAndCtx.canvas.width = width;
      canvasAndCtx.canvas.height = height;
    }
    destroy(canvasAndCtx) {
      canvasAndCtx.canvas.width = 0;
      canvasAndCtx.canvas.height = 0;
    }
  }

  const canvasFactory = new NodeCanvasFactory();
  const data = new Uint8Array(fs.readFileSync(pdfPath));

  const loadingTask = pdfjsLib.getDocument({
    data,
    disableFontFace: true,
    verbosity: 0,
  });
  const pdfDoc = await loadingTask.promise;

  const slideUrls = [];

  for (let pageNum = 1; pageNum <= pdfDoc.numPages; pageNum++) {
    const page = await pdfDoc.getPage(pageNum);
    const viewport = page.getViewport({ scale: 1.5 });

    const canvasAndCtx = canvasFactory.create(viewport.width, viewport.height);

    await page.render({
      canvasContext: canvasAndCtx.context,
      viewport,
      canvasFactory,
    }).promise;

    const filename = `${prefix}-slide-${pageNum}.png`;
    const outPath = path.join(uploadsDir, filename);
    fs.writeFileSync(outPath, canvasAndCtx.canvas.toBuffer("image/png"));
    slideUrls.push(`/uploads/${filename}`);
  }

  return slideUrls;
}

module.exports = pdfToSlides;
