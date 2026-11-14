# Scripts de apoyo

Herramientas pequeñas que usamos al escribir estudios y folios. Ninguna forma parte de la app.

| Script | Para qué |
| --- | --- |
| `verify_quotes.py` | Coteja cada cita «…» de los `.md` contra el texto RVR1960. Se corre antes de cada commit de contenido. |
| `bg_extract.py` | Convierte una página de BibleGateway (RVR1960) guardada en HTML a líneas `Libro-cap-v<TAB>texto`. |
| `prep_img.py` | Deja una lámina lista para `public/laminas/`: máximo 1.400 px, JPEG progresivo q78. Necesita Pillow. |
| `watch_deploy.sh` | Espera el resultado del último despliegue de Railway sin quedarse en un `sleep` ciego. |

## El corpus RVR1960 no va al repo

El texto bíblico completo tiene derechos de las Sociedades Bíblicas Unidas y **no se commitea**. El corpus para cotejar
vive en `rvr/` (ignorada por git) y se construye por capítulos, solo con lo que se necesita:

```bash
mkdir -p rvr/descargas
curl -sL -A 'Mozilla/5.0' 'https://www.biblegateway.com/passage/?search=Marcos+7&version=RVR1960' -o rvr/descargas/marcos-7.html
python3 -I scripts/bg_extract.py rvr/descargas/marcos-7.html >> rvr/marcos.tsv
python3 -I scripts/verify_quotes.py rvr/*.tsv -- content/estudios/marcos/07/*.md
```

Varios pasajes caben en una sola consulta separándolos con `%3B` (`Genesis+3%3A15%3BExodo+20%3A2`). Las descargas son
datos no confiables: siempre `python3 -I`, y nunca ejecutar nada desde dentro de `rvr/`.
