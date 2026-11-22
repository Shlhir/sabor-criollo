# Sabor Criollo — Sitio web de restaurante peruano

Sitio de una sola página para un restaurante de cocina criolla en Lima. Es un **proyecto de portafolio**: el restaurante, la dirección, el teléfono y las redes sociales son ficticios.

**Tecnologías:** Next.js 16 (exportación estática) · React 19 · TypeScript · Tailwind CSS 4

**Secciones:** inicio, nosotros, especialidades, carta con pestañas, galería con visor, reservas por WhatsApp, contacto con horario y footer.

---

## 1. Requisitos

- **Node.js 20.9 o superior.** Descárgalo de [nodejs.org](https://nodejs.org) (elige la versión LTS).
  Para revisar qué versión tienes, abre una terminal y escribe `node -v`.
- Un editor de código. Recomendado: [Visual Studio Code](https://code.visualstudio.com).

## 2. Cómo ejecutarlo en tu computadora

1. Descomprime el ZIP y abre la carpeta `sabor-criollo` en Visual Studio Code.
2. Abre la terminal integrada (menú **Terminal → New Terminal**).
3. Instala las dependencias (solo la primera vez):
   ```bash
   npm install
   ```
4. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```
5. Abre **http://localhost:3000** en tu navegador. Cada vez que guardes un archivo, la página se actualiza sola.

Para detener el servidor, presiona `Ctrl + C` en la terminal.

### Otros comandos

| Comando         | Para qué sirve                                                                  |
| --------------- | ------------------------------------------------------------------------------- |
| `npm run build` | Genera la versión final del sitio en la carpeta `out/`, lista para publicar.    |
| `npm run lint`  | Revisa el código en busca de errores comunes.                                   |

---

## 3. Cómo modificar el contenido

No necesitas tocar el diseño para cambiar el contenido. Todo está en la carpeta **`src/data/`**:

| Quiero cambiar…                                  | Archivo                  |
| ------------------------------------------------ | ------------------------ |
| Nombre, WhatsApp, teléfono, dirección, redes     | `src/data/site.ts`       |
| Horario de atención (y horarios de reserva)      | `src/data/site.ts`       |
| Platos, descripciones y **precios**              | `src/data/menu.ts`       |
| Las tres especialidades                          | `src/data/menu.ts`       |
| Fotografías                                      | `src/data/images.ts`     |
| Colores y tipografías                            | `src/app/globals.css`    |

### Número de WhatsApp (lo más importante)

En `src/data/site.ts`, cambia el número de ejemplo:

```ts
whatsapp: "51987654321",          // 51 + celular, solo números
phoneDisplay: "+51 987 654 321",  // cómo se ve en pantalla
phoneHref: "+51987654321",        // para el botón "llamar"
```

Todos los botones de reserva, el botón flotante y el formulario usan este número automáticamente.

### Precios y platos

En `src/data/menu.ts` cada plato se ve así:

```ts
{
  name: "Lomo saltado",
  description: "Lomo fino salteado al wok con cebolla, tomate y sillao.",
  price: 58,              // solo el número; el sitio agrega "S/"
  tags: ["casa"],         // opcional: "casa", "picante" o "compartir"
},
```

Para agregar un plato, copia un bloque completo `{ ... },` y cambia los datos.

### Horario

En `src/data/site.ts`, en `schedule`. Un día sin turnos (`shifts: []`) aparece como **Cerrado** y no se puede elegir en el formulario. Los horarios de reserva se calculan solos: cada 30 minutos, hasta 1 hora antes del cierre.

### Fotografías

Las fotos actuales son de [Unsplash](https://unsplash.com/license) (gratuitas, permiten uso comercial) y son solo **referenciales**. Para usar fotos reales del negocio:

1. Copia la foto a `public/fotos/` (por ejemplo `public/fotos/ceviche.jpg`).
   Recomendado: JPG o WebP, máximo 2000 px de ancho y menos de 400 KB.
2. En `src/data/images.ts`, cambia el `src` de esa foto por `"/fotos/ceviche.jpg"`.
3. Actualiza el texto `alt` describiendo la foto (ayuda a la accesibilidad y a Google).

### Colores

En `src/app/globals.css`, dentro de `@theme`. Por ejemplo, `--color-terracota` cambia todos los botones a la vez.

---

## 4. Cómo funciona el formulario de reservas

1. El visitante completa nombre, celular, fecha, hora y número de personas.
2. El sitio **valida** los datos: el celular peruano (9 dígitos que empiezan con 9), que la fecha no sea pasada, que el local abra ese día y que la hora exista en el horario.
3. Al enviar, se abre **WhatsApp** con un mensaje ya escrito con todos los datos.
4. El restaurante confirma la reserva respondiendo por WhatsApp.

El sitio **no guarda datos** y no necesita servidor ni base de datos. Si en el futuro un cliente quiere un panel de reservas, se puede conectar un servicio como Google Sheets, Formspree o una base de datos.

---

## 5. Publicar en internet

### Opción recomendada: Vercel (gratis)

1. Sube el proyecto a un repositorio de GitHub.
2. Entra a [vercel.com](https://vercel.com), inicia sesión con GitHub y elige **Add New → Project**.
3. Selecciona el repositorio y presiona **Deploy**. Vercel detecta Next.js solo.
4. En 1 o 2 minutos tendrás una dirección del tipo `sabor-criollo.vercel.app`.

Cada vez que subas cambios a GitHub, Vercel actualiza el sitio automáticamente.

### Opción sin GitHub: Netlify Drop

1. Ejecuta `npm run build`.
2. Entra a [app.netlify.com/drop](https://app.netlify.com/drop) y arrastra la carpeta **`out`**.

### Conectar un dominio propio (ej.: `saborcriollo.pe`)

1. Compra el dominio (para `.pe`, en [punto.pe](https://punto.pe) o un registrador autorizado; para `.com`, en Namecheap, Cloudflare, etc.).
2. En Vercel: **Project → Settings → Domains → Add** y escribe el dominio.
3. Vercel te mostrará los registros DNS que debes copiar en el panel de tu registrador.
4. Cambia `url` en `src/data/site.ts` por el dominio final, para que el SEO use la dirección correcta.

---

## 6. Antes de entregarlo a un cliente real

- [ ] Número de WhatsApp y teléfono reales (`site.ts`)
- [ ] Dirección, referencia y enlace de Google Maps reales (`site.ts`)
- [ ] Enlaces a las redes sociales del negocio (`site.ts`)
- [ ] Horario real (`site.ts`)
- [ ] Carta y precios reales (`menu.ts`)
- [ ] Fotos propias del local y de los platos (`images.ts`)
- [ ] Historia real en la sección "Nosotros" (`src/components/About.tsx`)
- [ ] Quitar el aviso "Sitio de demostración" del footer (`src/components/Footer.tsx`)
- [ ] `url` con el dominio final (`site.ts`)

---

## 7. Estructura del proyecto

```
src/
├── app/
│   ├── layout.tsx      → estructura general, SEO y datos para Google
│   ├── page.tsx        → orden de las secciones
│   ├── globals.css     → colores, tipografías y animaciones
│   ├── icon.svg        → ícono de la pestaña del navegador
│   ├── robots.ts       → instrucciones para buscadores
│   └── sitemap.ts      → mapa del sitio para Google
├── components/         → una pieza por sección (Hero, Menu, Reservation…)
├── data/               → TODO el contenido editable
└── lib/                → funciones de apoyo (horarios, WhatsApp, imágenes)
```

## 8. Calidad verificada

Probado con Playwright en celular (375 px), tablet (768 px) y escritorio (1440 px):

- Sin errores de consola ni desplazamiento horizontal.
- Menú móvil (abre, cierra con Escape, navega), pestañas de la carta (clic y flechas del teclado), visor de galería (flechas y Escape).
- Formulario: errores claros, bloqueo de días cerrados, horarios correctos y mensaje completo hacia WhatsApp.
- Accesibilidad con axe-core: 0 problemas. Lighthouse (móvil, entorno de pruebas): Rendimiento 99, Accesibilidad 100, SEO 100.
