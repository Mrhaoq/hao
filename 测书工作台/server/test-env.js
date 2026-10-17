import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dir = fs.mkdtempSync(path.join(os.tmpdir(), "ceshu-test-"));
process.env.CESHU_DATA_DIR = path.join(dir, "data");
process.env.CESHU_MANUSCRIPT_ROOT = path.join(dir, "文稿");
fs.mkdirSync(process.env.CESHU_DATA_DIR, { recursive: true });
fs.mkdirSync(process.env.CESHU_MANUSCRIPT_ROOT, { recursive: true });
