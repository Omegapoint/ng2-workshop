# Setup av utveklingsmiljö
Klona följande repo till din maskin:
<pre>git clone https://github.com/Omegapoint/ng2-workshop.git</pre>

## Konfigurera applikationen
I repot finns tre grenar, master, develop och facit.
Checka ut develop, det är den vi utgår från i labben. I facit finns alla lösningar på labbuppgifterna.

Förutsättningarna är att du har följande installerat:

<ul>
  <li>
  Node: >= 4.x
  </li>
  <li>
  Npm: >= 2.x
  </li>
</ul>
Du kan verifiera detta genom att i en terminal skriva node --version samt npm --version.
Kör följande script i ng2-workshop katalogen:
<pre>npm run setup</pre>
Scriptet installerar alla nödvändiga moduler och det kan ta lite tid, så se till att du har en bra internetanslutning innan du börjar.
När installationen är klar kan du köra följande script för att starta applikationen:
<pre>npm start</pre>
