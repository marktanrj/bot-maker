import JSZip from "jszip";
import { saveAs } from "file-saver";

export async function downloadZipFile(base64Data: string, fileName: string) {
  if (fileName === "") {
    fileName = "Untitled";
  }

  let zip = new JSZip();
  zip = await zip.loadAsync(base64Data, { base64: true });
  const blob = await zip.generateAsync({ type: "blob" });
  saveAs(blob, `${fileName}.zip`);
}
