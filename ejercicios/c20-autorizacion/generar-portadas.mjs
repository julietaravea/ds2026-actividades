// para generar una portada SVG por libro, todas con el mismo estilo
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const DESTINO = process.argv[2] ?? 'public/imagenes';

const LIBROS = [
  { slug: 'orgullo-y-prejuicio', titulo: 'Orgullo y prejuicio', autor: 'Jane Austen' },
  { slug: 'sensatez-y-sentimientos', titulo: 'Sensatez y sentimientos', autor: 'Jane Austen' },
  { slug: 'emma', titulo: 'Emma', autor: 'Jane Austen' },
  { slug: 'persuasion', titulo: 'Persuasión', autor: 'Jane Austen' },
  { slug: 'la-abadia-de-northanger', titulo: 'La abadía de Northanger', autor: 'Jane Austen' },
  { slug: 'jane-eyre', titulo: 'Jane Eyre', autor: 'Charlotte Brontë' },
  { slug: 'cumbres-borrascosas', titulo: 'Cumbres borrascosas', autor: 'Emily Brontë' },
  { slug: 'norte-y-sur', titulo: 'Norte y sur', autor: 'Elizabeth Gaskell' },
  { slug: 'rebeca', titulo: 'Rebeca', autor: 'Daphne du Maurier' },
  { slug: 'frankenstein', titulo: 'Frankenstein', autor: 'Mary Shelley' },
  { slug: 'primer-amor', titulo: 'Primer amor', autor: 'Iván Turguénev' },
];

// Tres fondos de la misma familia + un dorado y un crema comunes.
const FONDOS = ['#5c1f2e', '#1f3d33', '#1f2a44'];
const ORO = '#c8a560';
const CREMA = '#f3e9d2';
const FUENTE = "Georgia, 'Times New Roman', serif";

const esc = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function partir(texto, max) {
  const lineas = [];
  let actual = '';
  for (const palabra of texto.split(' ')) {
    const prueba = actual ? `${actual} ${palabra}` : palabra;
    if (prueba.length > max && actual) {
      lineas.push(actual);
      actual = palabra;
    } else {
      actual = prueba;
    }
  }
  if (actual) lineas.push(actual);
  return lineas;
}

function portada({ titulo, autor }, indice) {
  const fondo = FONDOS[indice % FONDOS.length];
  const lineas = partir(titulo, 14);
  const largo = Math.max(...lineas.map((l) => l.length));
  const tamano = largo > 12 ? 34 : 40;
  const interlineado = tamano * 1.25;
  const inicio = 300 - ((lineas.length - 1) * interlineado) / 2 + tamano * 0.3;

  const textoTitulo = lineas
    .map(
      (l, i) =>
        `<text x="200" y="${(inicio + i * interlineado).toFixed(1)}" text-anchor="middle" font-family="${FUENTE}" font-size="${tamano}" font-style="italic" fill="${CREMA}">${esc(l)}</text>`,
    )
    .join('\n  ');

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 600" width="400" height="600">
  <rect width="400" height="600" fill="${fondo}"/>
  <rect x="22" y="22" width="356" height="556" fill="none" stroke="${ORO}" stroke-width="2"/>
  <rect x="32" y="32" width="336" height="536" fill="none" stroke="${ORO}" stroke-width="0.8"/>
  <text x="200" y="110" text-anchor="middle" font-family="${FUENTE}" font-size="15" letter-spacing="4" fill="${ORO}">${esc(autor.toUpperCase())}</text>
  <line x1="130" y1="135" x2="188" y2="135" stroke="${ORO}" stroke-width="1"/>
  <path d="M200 128 L207 135 L200 142 L193 135 Z" fill="${ORO}"/>
  <line x1="212" y1="135" x2="270" y2="135" stroke="${ORO}" stroke-width="1"/>
  ${textoTitulo}
  <line x1="130" y1="465" x2="188" y2="465" stroke="${ORO}" stroke-width="1"/>
  <path d="M200 458 L207 465 L200 472 L193 465 Z" fill="${ORO}"/>
  <line x1="212" y1="465" x2="270" y2="465" stroke="${ORO}" stroke-width="1"/>
  <text x="200" y="520" text-anchor="middle" font-family="${FUENTE}" font-size="13" letter-spacing="6" fill="${ORO}">LIBRERÍA</text>
</svg>
`;
}

mkdirSync(DESTINO, { recursive: true });
LIBROS.forEach((libro, i) => {
  writeFileSync(join(DESTINO, `${libro.slug}.svg`), portada(libro, i), 'utf8');
  console.log(`✔ ${libro.slug}.svg`);
});
console.log(`\nListo: ${LIBROS.length} portadas en ${DESTINO}`);