# Coteja cada «…» del cuerpo de un estudio o folio contra versículos RVR1960.
# El corpus son archivos TSV (Libro-cap-v<TAB>texto) en rvr/ (carpeta ignorada por git: el texto
# bíblico no se commitea); se construyen con scripts/bg_extract.py a partir de BibleGateway.
# Uso: python3 -I scripts/verify_quotes.py rvr/*.tsv -- content/estudios/marcos/07/*.md
# Una cita con «…» o «...» se parte en trozos y cada trozo debe aparecer literal en algún capítulo.
import sys, re, unicodedata
args=sys.argv[1:]; i=args.index('--'); tsvs, mds = args[:i], args[i+1:]
caps={}
for t in tsvs:
    for ln in open(t,encoding='utf-8'):
        if '\t' not in ln: continue
        k,v=ln.rstrip('\n').split('\t',1); b,c,n=k.rsplit('-',2)
        caps.setdefault(f"{b}-{c}",[]).append((int(n),v))
texto={k:' '.join(v for _,v in sorted(vs)) for k,vs in caps.items()}
def norm(s): return re.sub(r'\s+',' ',s).strip()
fallos=0; total=0
for md in mds:
    s=open(md,encoding='utf-8').read()
    cuerpo=s.split('---',2)[2] if s.startswith('---') else s
    for q in re.findall(r'«([^»]+)»', cuerpo):
        total+=1
        piezas=[norm(p) for p in re.split(r'…|\.\.\.', q) if norm(p)]
        ok=all(any(p in t for t in texto.values()) for p in piezas)
        if not ok:
            fallos+=1; print(f"FALLA  {md.split('/')[-1]}: «{q}»")
print(f"{total} citas, {fallos} sin cotejar")
