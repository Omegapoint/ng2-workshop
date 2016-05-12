# Setup av utveklingsmiljö
Följande program måste vara installerade innan du börjar: VirtualBox, git, NodeJs och NPM.

Ladda ner följande fil:

https://omegapointcloud-my.sharepoint.com/personal/olltha_omegapoint_se/_layouts/15/guestaccess.aspx?guestaccesstoken=3LD0iYBtYORv8CnUTodsLN3soMrFf0x50L8OjqrSWIE%3d&docid=07f47e9b916dc44d298a299eaaa69c26e&expiration=2016-07-11T09%3a07%3a22.000Z


Börja med att importera den virtuella miljön i Virtual Box, via import appliance.
När det är klart så är det bara att starta boxen, när den är uppstartad utför följande:

## Konfigurera nyckeluppsättning
För windows-användare, använd git bash, cygwin eller liknande för att utföra instruktionen nedan.
För att kunna arbeta mot git-repot som finns på boxen behövs en uppsättning SSH-nycklar. Börja med att se efter om du redan har en publik nyckel:

<pre>$ ls -al ~/.ssh</pre>

Finns en .pub-fil som t.ex. id_rsa.pub finns det redan en nyckeluppsättning, annars behöver det genereras:

<pre> $ ssh-keygen -t rsa </pre>

Därefter kan din publika nyckel adderas till authorized_keys hos git-användaren:

$ cat ~/.ssh/id_rsa.pub | ssh -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no vagrant@192.168.33.10 "sudo tee -a /home/git/.ssh/authorized_keys"

Får du upp en lösenordsprompt är lösenordet till vagrant-användaren 'vagrant'.

Nu kan du klona git-repot:

<pre>$ git clone git@192.168.33.10:ng2-workshop.git</pre>

## Konfigurera applikationen
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
Scriptet installerar alla nödvändiga moduler och det kan ta lite tid, så se till att du har en bra internetanslutning när du börjar.
När installationen är klar kan du köra följande script för att starta applikationen:
<pre>npm start</pre>
