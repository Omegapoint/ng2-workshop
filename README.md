# ng2-workshop
Detta repo innehåller en Angular 2.0 app och en node backend för en framtida workshop med Angular 2.0 <br>
För att kunna köra applikationen krävs NodeJS och NPM installerat.
## Instruktion för setup:
Börja med att köra igång rest tjänsten så att den är igång:
<pre>
npm run api
</pre>
Nu finns en enklare rest tjänst tillgänglig på port 80 <br><br>
Kör sedan följande kommando:
<pre>
npm run setup
</pre>
Setup scriptet konfigurerar hela projektet med hjälp av jspm och npm, det är många paket som laddas ner så se till att ha en bra
internetanslutning innan du börjar. <br><br>
Nu kan vi starta applikationen:
<pre>
npm start
</pre>
När index-sidan laddas i browsern körs följande script:
<pre>

  var readyForMainLoad;
  if (location.origin.match(/localhost/)) {
    System.trace = true
    readyForMainLoad = System.import('systemjs-hot-reloader').then(function(HotReloader) {
      hr = new HotReloader.default('http://localhost:9089');
    });
  }
  Promise.resolve(readyForMainLoad).then(function() {
    System.import("app").then(function(){ console.log("running") });
  });
</pre>
Detta konfigurerar SystemJS med systemjs-hot-reloader, så filer under app-katalogen laddas in och om vi gör en ändring och sparar uppdateras sidan automatiskt. <br><br>
Det går även att köra enhetstester, tester inkluderas om vi lägger till typescript-filer med ändelsen spec.ts, dessa skrivs med jasmine.
<pre>
npm run test
</pre>
Testscriptet är konfiguerat att köra PhantomJS2 och singleRun, d.v.s samma inställning som om man kör på en CI-server.
