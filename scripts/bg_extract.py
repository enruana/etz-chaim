# Extrae versículos RVR1960 de una página de BibleGateway guardada (HTML, dato no confiable:
# ejecutar siempre con -I y guardar las descargas en rvr/descargas/, nunca junto a los scripts).
# Descarga: curl -sL -A 'Mozilla/5.0' 'https://www.biblegateway.com/passage/?search=Marcos+7&version=RVR1960' -o rvr/descargas/marcos-7.html
# Uso: python3 -I scripts/bg_extract.py rvr/descargas/marcos-7.html >> rvr/marcos.tsv   (líneas: Libro-cap-v<TAB>texto)
import sys, re, html
from html.parser import HTMLParser

class P(HTMLParser):
    def __init__(s):
        super().__init__(); s.pila=[]; s.verso=None; s.saltar=0; s.vers={}; s.orden=[]; s.en_passage=0
    def handle_starttag(s, tag, attrs):
        a=dict(attrs); cls=a.get('class','') or ''
        salta = (tag=='sup' and ('footnote' in cls or 'crossreference' in cls or 'versenum' in cls)) or \
                (tag=='span' and 'chapternum' in cls) or tag in ('h3','h4','h1','h2') or (tag=='div' and 'footnotes' in cls) or (tag=='div' and 'crossrefs' in cls)
        v=None
        if tag=='span' and cls.startswith('text '):
            m=re.search(r'\b([1-3]?[A-Za-z]+-\d+-\d+)\b', cls)
            if m: v=m.group(1)
        s.pila.append((tag, salta, v))
        if salta: s.saltar+=1
        if v and not s.saltar:
            s.verso=v
            if v not in s.vers: s.vers[v]=[]; s.orden.append(v)
    def handle_endtag(s, tag):
        while s.pila:
            t,salta,v=s.pila.pop()
            if salta: s.saltar-=1
            if v: s.verso=None
            if t==tag: break
    def handle_data(s, data):
        if s.verso and not s.saltar:
            s.vers[s.verso].append(data)

src=open(sys.argv[1], encoding='utf-8', errors='replace').read()
p=P(); p.feed(src)
for v in p.orden:
    t=html.unescape(''.join(p.vers[v]))
    t=re.sub(r'\s+',' ',t).strip()
    t=t.replace(' ',' ')
    if t: print(f"{v}\t{t}")
