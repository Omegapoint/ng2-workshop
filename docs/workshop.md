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
  Starta applikationen med npm start, det följer med routing som visar ett inloggningsformulär om man inte är inloggad. Men det finns ingen funktionalitet bakom submitknappen.
  </li>
  <li>
  I inloggningsformuläret finns redan klientvalidering implementerat för användarnamn och lösenord, men vi behöver en validering efter
  att uppgifterna postats till servern. Lägg därför till en div med klasserna altert alert-danger under submitknappen, denna ska bara visas om
  inloggningen misslyckats. Det finns en flagga authFailure som kan användas för detta.
  </li>
  <li>
  I klassen LoginComponent finns en metod onSubmit, denna anropas vid submit av formuläret. Uppgiften blir att implementera denna metod.
  Skapa ett post-anrop med http servicen och skicka inloggningsuppgifter till endpointen /authenticate. Inloggningsuppgifterna kan hämtas ut från user-objektet. Om inloggningen går bra ska cookien auth-token
  uppdateras med giltig JWT och vi navigerar till en ny route, ['Movies']. Cookien kan uppdateras med servicen Cookie, och metoden setCookie.
  Om inloggningen misslyckas ska vi sätta authFailure till true och visa felmeddelandet. Så användaren kan försöka logga in på nytt.
  </li>
</ol>

## Steg 2 - enhetstest och byggen
Vi ska nu skriva ett enhetstest för implementationen i onSubmit. Vad vi behöver göra är att mocka ut anropet till /authenticate och sedan verifiera beteendet i våra callbacks.

### Deluppgifter
<ol>
  <li>
  Skapa en fil login.component.spec.ts i katalogen login, och skriv ett jasmine-test för onSubmit
  </li>
  <li>
  Verifiera lokalt att testet är ok genom att köra <pre>npm run test</pre>
  </li>
  <li>
  Checka in och pusha koden till ci-boxen. I den miljön finns jenkins installerad. Öppna http://192.168.33.10:8080, där ska ett jenkinsjobb finnas konfigurerat. Jobbet checkar ut ng2-workshop, kör tester och om alla är gröna så byggs applikationen och installeras på en apache web server.
  </li>
  <li>
  Kör jobbet, öppna sedan http://192.168.33.10/ng2-workshop/index.html
  </li>
</ol>
