import { copyFile, mkdir, access } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const distDirectory = join(projectRoot, 'dist');
const thankYouDirectory = join(distDirectory, 'obrigado');

await mkdir(thankYouDirectory, { recursive: true });
await copyFile(
  join(distDirectory, 'index.html'),
  join(thankYouDirectory, 'index.html'),
);
console.log('Rota física criada: dist/obrigado/index.html');

const envSource = join(projectRoot, '.env');
const envDest = join(distDirectory, '.env');
try {
  await access(envSource);
  await copyFile(envSource, envDest);
  console.log('.env copiado para dist/.env');
} catch {
  console.warn('Aviso: .env não encontrado na raiz — não copiado para dist/');
}
