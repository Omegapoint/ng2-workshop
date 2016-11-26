# Workshop Angular 2.0
Detta dokument beskriver labbdelen av Angular 2.0 workshop.
Vi kommer utgå från en applikation som saknar en del implementation, och vi kommer fylla i luckorna.
Applikationen används för att betygsätta filmer, med en kommentarstext och ett betyg 1-10.
## Steg 1 - inloggning
Applikationen kommunicerar mot en rest-tjänst som kräver autentisiering, JSON web token. Första steget är alltså
att göra klart ett inloggningsformulär.
Flödet är som följer: användaren skriver in användarnamn och lösenord, vid submit så ska användaruppgifter postas till tjänsten som
vid lyckad inlogging returnerar ett giltigt token, detta sparar vi i en cookie, som sedan används i alla efterföljande anrop.
### Deluppgifter
<ol>
  <li>
  Skriv en sass fil som du döper till login.component.scss, importera sedan filen i login.component.ts, använd filändelsen .scss!
  Exempel: import './mystyle.scss!'; <br>
  I sass filen, lägg in styling för input-fälten så att det syns om fältet validerar eller inte.
  .ng-valid kan användas när valideringen är ok, och .ng-touched.ng-invalid kan användas när valideringen failar.
  Vanlig css fungerar utmärkt med sass, men prova gärna att använda någon sass funktionalitet t.e.x $myColor: #eee;
  </li>
  <li>
  I inloggningsformuläret finns redan klientvalidering implementerat för användarnamn och lösenord, men vi behöver en validering efter
  att uppgifterna postats till servern. Lägg därför till en div med klasserna altert alert-danger under submitknappen, denna ska bara visas om
  inloggningen misslyckats. Det finns en flagga authFailure som kan användas för detta.
  Det går att använda input propety hidden för att styra om något ska visas eller inte, eller så använder man *ngIf
  </li>
  <li>
  I klassen LoginComponent finns en metod onSubmit, denna anropas vid submit av formuläret. Uppgiften blir att implementera denna metod.
  Skapa ett post-anrop med http servicen och skicka inloggningsuppgifter till endpointen /authenticate.
  Om inloggningen går bra ska cookien auth-token
  uppdateras med giltig JWT och vi navigerar till routen lectures.
  I svaret från tjänsten kan token hämtas från attributet token.
  Om inloggningen misslyckas ska vi sätta authFailure till true och visa felmeddelandet. Så användaren kan försöka logga in på nytt.
  </li>
</ol>

## Steg 2 - enhetstest och byggen
Vi ska nu skriva ett enhetstest för implementationen i onSubmit. Vad vi behöver göra är att mocka ut anropet till /authenticate och sedan verifiera beteendet i våra callbacks.
Vi kommer använda jasmine för att skriva tester, jasmine kommer med ett antal matchers. Matchers använder man i it-funktioner, som innehåller implementationen av testfallet. Här är ett exempel:
<pre>
expect('olle').toBe('olle');
</pre>

### Deluppgifter
<ol>
  <li>
  Det finns en stub för ett test i filen login.component.spec.ts, denna ska vi nu utöka. Implementera ett testfall som verifierar att vi sparar cookien när autentisieringen går igenom.
  För att mocka ett response från tjänsten finns det två varianter:
  <pre>
  //I detta fall mockar vi ett svar med data
  mockBackend.connections.subscribe(
      (connection: MockConnection) => {
        connection.mockRespond(new Response(
          new ResponseOptions({
              body:
                {
                  token: "abc"
                }
            }
        )));
    });
  </pre>
  <pre>
  //I detta fall mockar vi bara statusen i svaret
  mockBackend.connections.subscribe(connection => {
      connection.mockRespond(new ResponseOptions({status: 403}));
  });
  </pre>
  </li>
  <li>
  Verifiera lokalt att testet är ok genom att köra <pre>npm test</pre>
  </li>
  <li>
  Installera http-server genom: <pre>npm install -g http-server</pre>
  kör:
   <pre>npm run build</pre>
    Gå sedan till build katalogen starta en webbserver med http-server, 
    nu kan du öppna applikation utan beroenden till typescript eller systemJS.
  </li>
</ol>

## Steg 3 - Implementera lista
När vi loggat in routas vi till LecturesComponent, den ska innehålla en lista med föredrag som ska presenteras i en accordion.
Det finns en service som är inkluderad som hämtar filmer och ratings, den ska vi anropa i lectures komponenten.

### Deluppgifter
<ol>
  <li>
    I lectures.component.ts finns en metod getLectures.
    Implementera denna metod genom att använda lecturesService.getLectures.
    Skapa en lista i komponenten som vi sen refererar till i vyn.
  </li>
  <li>
    I lectures.component.html, lägg till ngFor direktivet så att vi kan visa listan. ngFor är "repeatern" för Angular 2.0.
    <br><br>
    Exempel:
     <pre> *ngFor="let box of boxes" </pre>
  </li>
  <li>
  Använd sträng interpolation för att visa data från listan.
  Det gör man med {{ expr }}
  </li>  
</ol>

### Steg 4 - Lägg till en ny rating
Nu ska vi göra klart movie-rating.component, som blir en barn-komponent till movie komponenten.

### Deluppgifter
<ol>
  <li>
    I lectures.component.html, skicka med lecture objektet till lecture-rating
  </li>
  <li>
    I lecture-rating.component, implementera addRating. När en ny rating lagts in behöver vi skapa ett event för detta,
    det kan vi göra med en EventEmitter.
    I komponenten finns redan en EventEmitter som är dekorerad som en output property 
  </li>
  <li>
    Skapa ett nytt event när en rating skapats med:
    <pre> this.newRating.next(null) </pre>
  </li>
  <li>
    Slutligen koppla ihop eventet som kommer från lecture-rating med metoden som hämtar alla lectures i lectures.component,
    så att listan uppdateras.
  </li>
</ol>

### Steg 5 - Visa rating
I denna del ska vi kolla på hur vi kan initiera data genom att implementera OnInit interfacet.
### Deluppgifter
Öppna lecture-show-rating.component.ts och gör följande:
<ol>
  <li>
    Implementera OnInit i LectureShowRatingComponent, metoden som ska implementeras heter ngOnInit. ngOnInit ska i sin tur anropa fetchMovies och den metoden måste också implementeras.
  </li>
  <li>
    fetchMovies måste få ett id som vi ska använda för att hämta en specifik föreläsning, vi kan extrahera id:t med
    ActivatedRoute. I ActivatedRoute finns en property params som är en observable av Params. Params innehåller sedan routens parametrar.
    Params kan användas som ett vanligt JavaScript-objekt.
  </li>
</ol>

### Steg 6 - immutables
I denna sista del ska vi kolla på hur man kan ändra angulars change detection strategi och använda immuterbara datastrukturer i en komponent.
Om en komponent endast har immuterbart data som input så kan komponenten endast påverka sitt egna data,
och därmed inte skapa sidoeffekter för andra komponenter.
Detta gör också att angular inte behöver utföra change detection på alla komponenter i trädet, utan endast på de vars data har förändrats.
