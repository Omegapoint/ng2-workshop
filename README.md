# ng2-workshop
Detta repo innehåller en Angular 2.0 app och en node backend för en framtida workshop med Angular 2.0 <br>
För att kunna köra applikationen krävs NodeJS och NPM installerat.
## Instruktion för setup:
Alla nödvändiga beroenden laddas ner genom att köra följande kommando:
<pre>
npm run setup
</pre>
Efter setup scriptet så måste vi göra en liten ändring, detta p.g.a beroenden mellan biblioteken angular2-beta och rxjs. <br><br>
<ol>
  <li>
    Öppna filen config.js (ng2-workshop/config.js)
  </li>
  <li>
    Leta upp alla förekomster av "rxjs" i map-objektet och ta bort dom.
  </li>
  <li>
    Spara och stäng filen.
  </li>
</ol>
Öppna ett nytt terminalfönster och starta backend tjänsten:
<pre>
npm run api
</pre>
Nu finns en enklare rest tjänst tillgänglig på port 80 <br><br>
Nu kan vi starta frontend applikationen:
<pre>
npm start
</pre>

Det går även att köra enhetstester, tester inkluderas om vi lägger till typescript-filer med ändelsen spec.ts
<pre>
npm run test
</pre>
