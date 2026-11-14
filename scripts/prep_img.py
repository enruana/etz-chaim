# Redimensiona a <=1400 px, JPEG q78 progresivo. Uso: python3 -I prep_img.py <entrada> <salida> [recorte x0,y0,x1,y1]
import sys
from PIL import Image
src, dst = sys.argv[1], sys.argv[2]
im = Image.open(src).convert("RGB")
if len(sys.argv) > 3:
    x0,y0,x1,y1 = map(int, sys.argv[3].split(",")); im = im.crop((x0,y0,x1,y1))
w,h = im.size; m = max(w,h)
if m > 1400:
    r = 1400/m; im = im.resize((round(w*r), round(h*r)), Image.LANCZOS)
im.save(dst, "JPEG", quality=78, progressive=True, optimize=True)
print(dst.split("/")[-1], im.size[0], im.size[1], __import__("os").path.getsize(dst))
