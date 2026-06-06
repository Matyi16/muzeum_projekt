# Iskolatörténeti műszerek és bemutatóeszközök

Ez a projekt egy egyszerű, böngészőben futtatható múzeumi katalógusoldal. Az oldal régi iskolai laboratóriumi, gyakorlati és bemutatóeszközöket listáz, kereshető és kategóriák szerint szűrhető formában.

## Funkciók

- Eszközök listázása külön kártyákon
- Keresés műszer, gyártó vagy évszám alapján
- Kategória szerinti szűrés
- Részletes adatlap felugró ablakban
- Képek megjelenítése az egyes eszközökhöz
- Retró hangulatú, reszponzív megjelenés

## Projekt felépítése

```text
muzeum_prjekt/
+-- index.html
+-- gallery_snippet.html
+-- assets/
    +-- css/
    |   +-- style.css
    +-- js/
    |   +-- app.js
    |   +-- app_gallery.js
    |   +-- content.json
    |   +-- content_gallery.json
    |   +-- contentold.json
    +-- images/
```

## Indítás

A projekt statikus weboldal, ezért nincs szükség telepítésre. Mivel az eszközök adatai JSON fájlból töltődnek be, a legbiztosabb helyi szerverről megnyitni.

Példa:

```bash
python -m http.server 8000
```

Ezután a böngészőben:

```text
http://localhost:8000
```

## Tartalom szerkesztése

Az eszközök adatai az `assets/js/content.json` fájlban találhatók. Egy elem tipikus mezői:

```json
{
  "id": 1,
  "title": "Eszköz neve",
  "manufacturer": "Gyártó",
  "year": "Korszak vagy év",
  "category": "fizika",
  "badge": "Fizika & Optika",
  "location": "Hely",
  "meta": "Rövid leírás",
  "description": "Részletes leírás",
  "image": "assets/images/kep-neve.jpg"
}
```

Új eszköz hozzáadásakor figyelni kell arra, hogy az `id` egyedi legyen, a `category` pedig egyezzen valamelyik szűrőgomb `data-filter` értékével.

## Kategóriák

Jelenleg ezek a kategóriák szerepelnek az oldalon:

- `elektro` - Elektrotechnika & Elektronika
- `fizika` - Fizika & Optika
- `gepeszet` - Gépészet & Modellek
- `egyeb` - Egyéb & Iskolatörténet

## Stílus módosítása

A megjelenés az `assets/css/style.css` fájlban szerkeszthető. A színek és fő vizuális beállítások a fájl elején, a `:root` részben vannak összegyűjtve.

## Megjegyzés

Ha az oldal közvetlenül fájlként van megnyitva, egyes böngészők biztonsági okokból nem engedik a JSON fájl betöltését. Ilyenkor érdemes a fenti helyi szerveres indítást használni.
