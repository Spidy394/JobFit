export interface PdfConversionResult {
  imageUrl: string;
  file: File | null;
  error?: string;
}

let pdfjsLib: any = null;
let isLoading = false;
let loadPromise: Promise<any> | null = null;

async function loadPdfJs(): Promise<any> {
  if (pdfjsLib) return pdfjsLib;
  if (loadPromise) return loadPromise;

  isLoading = true;
  try {
    let lib;
    try {
      // @ts-expect-error - pdfjs-dist/build/pdf.mjs is not a module
      lib = await import("pdfjs-dist/build/pdf.mjs");
    } catch (error) {
      console.warn("Failed to load from pdf.mjs, trying alternative:", error);
      lib = await import("pdfjs-dist");
    }

    // Set the worker source to use local file
    if (lib.GlobalWorkerOptions) {
      lib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
    } else if (lib.default?.GlobalWorkerOptions) {
      lib.default.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
    }

    pdfjsLib = lib.default || lib;
    isLoading = false;
    loadPromise = null;
    return pdfjsLib;
  } catch (error) {
    console.error("Failed to load PDF.js:", error);
    isLoading = false;
    loadPromise = null;
    throw new Error(
      `Failed to load PDF.js library: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
}

export async function extractTextFromPdf(file: File): Promise<string | null> {
  try {
    if (typeof window === "undefined" || typeof document === "undefined") {
      throw new Error("PDF text extraction is only available in browser environment");
    }

    if (!file) {
      throw new Error("No file provided");
    }

    if (file.type !== "application/pdf") {
      throw new Error("File is not a PDF");
    }

    const lib = await loadPdfJs();
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await lib.getDocument({ data: arrayBuffer, verbosity: 0 }).promise;

    let fullText = "";
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map((item: any) => item.str).join(" ");
      fullText += pageText + "\n";
    }
    return fullText;
  } catch (error) {
    console.error("Error extracting text from PDF:", error);
    return null;
  }
}

export async function convertPdfToImage(
  file: File
): Promise<PdfConversionResult> {
  try {
    // Check if we're in a browser environment
    if (typeof window === "undefined" || typeof document === "undefined") {
      throw new Error(
        "PDF conversion is only available in browser environment"
      );
    }

    // Validate input file
    if (!file) {
      throw new Error("No file provided");
    }

    if (file.type !== "application/pdf") {
      throw new Error("File is not a PDF");
    }

    console.log("Loading PDF.js library...");
    const lib = await loadPdfJs();

    console.log("Reading file as array buffer...");
    const arrayBuffer = await file.arrayBuffer();

    if (arrayBuffer.byteLength === 0) {
      throw new Error("PDF file is empty");
    }

    console.log("Loading PDF document...");
    const pdf = await lib.getDocument({
      data: arrayBuffer,
      verbosity: 0, // Reduce console noise
    }).promise;

    console.log("Getting first page...");
    const page = await pdf.getPage(1);

    // Use a reasonable scale for better performance and quality
    const viewport = page.getViewport({ scale: 2 });
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    if (!context) {
      throw new Error("Unable to get canvas 2D context");
    }

    canvas.width = viewport.width;
    canvas.height = viewport.height;

    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = "high";

    console.log("Rendering page to canvas...");
    await page.render({
      canvasContext: context,
      viewport,
      enableWebGL: false, // Disable WebGL for better compatibility
    }).promise;

    console.log("Converting canvas to blob...");
    return new Promise((resolve) => {
      canvas.toBlob(
        (blob) => {
          if (blob) {
            try {
              // Create a File from the blob with the same name as the pdf
              const originalName = file.name.replace(/\.pdf$/i, "");
              const imageFile = new File([blob], `${originalName}.png`, {
                type: "image/png",
              });

              console.log("Successfully converted PDF to image");
              resolve({
                imageUrl: URL.createObjectURL(blob),
                file: imageFile,
              });
            } catch (error) {
              console.error("Error creating file from blob:", error);
              resolve({
                imageUrl: "",
                file: null,
                error: `Failed to create image file: ${error}`,
              });
            }
          } else {
            console.error("Failed to create image blob");
            resolve({
              imageUrl: "",
              file: null,
              error: "Failed to create image blob",
            });
          }
        },
        "image/png",
        0.95 // Slightly reduce quality for better performance
      );
    });
  } catch (err) {
    console.error("PDF conversion error:", err);
    const errorMessage = err instanceof Error ? err.message : String(err);
    return {
      imageUrl: "",
      file: null,
      error: `Failed to convert PDF: ${errorMessage}`,
    };
  }
}

// Debug function to test PDF.js loading capabilities
export async function debugPdfCapabilities(): Promise<{
  canLoadPdfJs: boolean;
  hasDocument: boolean;
  hasCanvas: boolean;
  workerAvailable: boolean;
  error?: string;
}> {
  try {
    const hasDocument = typeof document !== "undefined";
    const hasCanvas =
      hasDocument && document.createElement("canvas").getContext("2d") !== null;

    let canLoadPdfJs = false;
    let workerAvailable = false;

    try {
      const lib = await loadPdfJs();
      canLoadPdfJs = true;

      // Check if worker is accessible
      try {
        const response = await fetch("/pdf.worker.min.mjs", { method: "HEAD" });
        workerAvailable = response.ok;
      } catch {
        workerAvailable = false;
      }
    } catch (error) {
      console.error("PDF.js loading failed:", error);
    }

    return {
      canLoadPdfJs,
      hasDocument,
      hasCanvas,
      workerAvailable,
    };
  } catch (error) {
    return {
      canLoadPdfJs: false,
      hasDocument: typeof document !== "undefined",
      hasCanvas: false,
      workerAvailable: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}
