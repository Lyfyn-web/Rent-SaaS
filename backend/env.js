import dotenv from "dotenv";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const currentFile = fileURLToPath(import.meta.url);
const currentDir = dirname(currentFile);

dotenv.config({ path: resolve(currentDir, ".env") });