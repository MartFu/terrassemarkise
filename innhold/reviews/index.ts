export interface Review {
  reviewer: string;
  rating: number;
  comment: string;
  year: number;
  reply?: string;
}

export const REVIEWS: Review[] = [
  {
    reviewer: "Pål Lyng-Laeng",
    comment: `Fantastisk service fra første kontakt til levert produkt!
I tillegg til å svare raskt på alle spørsmål, er levering og produktet det beste vi har bestilt.
Har bestilt zip-screen fra et par andre steder også, men dette var helt klart det beste.
«Bommen» nederst på duken har børster som hindrer denne i å slå mot skinnene ved vind.
Dermed slipper man «skrangling» når det blåser.
Solskjerming AS var også helt klart rimeligst da vi sjekket flere steder.
Så det er helt naturlig å anbefale å handle herfra!`,
    rating: 5,
    year: 2025,
    reply: `Takk for uoppfordret positiv og spesifikk tilbakemelding. Veldig hyggelig. Mvh Håkon`,
  },
  {
    reviewer: "Per Roger Aronsen",
    comment: `Veldig godt beskrevet hvordan man måler og enkelt å finne da man måtte ha.`,
    rating: 5,
    year: 2025,
    reply: `Takk for hyggelig tilbakemelding, Per Roger. Mvh Morten Øhrn`,
  },

  {
    reviewer: "Jan-Ivar Braathen",
    comment: `Svært godt fornøyd med vår Corsica terrassemarkise! Den er et elegant designelement på vår høye terrassevegg. Et knekt plastdel (om det var fra transport eller montering var aldri tema) ble erstattet med hjembesøk umiddelbart. Veldig bra! Vi valgte fast tilkopling til motor og lys - og styrer lyset enkelt med Futurehome smarthome-løsning.`,
    rating: 5,
    year: 2025,
    reply: `Takk for hyggelig tilbakemelding, Jan-Ivar. Mvh. Morten Øhrn`,
  },
  {
    reviewer: "Nina Hilstad",
    comment: `Kjøpte Zepp screen og fungerte ok noen år, men da dem løsnet fra skinnene å vi tok kontakt fikk vi beskjed at det var vi som hadde montert feil.vi monterte etter bruksanvisningen.Garantien gjaldt enda da det var 7års garanti. Anbefaler ikke noen å kjøpe her`,
    rating: 1,
    year: 2025,
    reply: `Hei - dette var en trist tilbakemelding i pågående sak. Ref. e-postdialog, så savner vi fortsatt bilde av glidelås som 'skal ha løsnet'. Iht. tilsendt dokumentasjon er det viktig å stanse all videre bruk om glidelåsen hopper ut av PVC-skinnene. I motsatt fall forventes over tid skade på glidelås og overgang glidelås/duk, dessverre.
Et overrullet system (som også er tilfellet her) kommer av feilaktig programmering. Et system som brukes med duken rullet opp feil vei vil over tid ta omfattende skade av dette.
Til slutt står alt om reklamasjon og garanti godt beskrevet i tilsendt dokumentasjon. 7 års garanti innførte vi etter din bestillingen, kun til info, men det er uvesentlig her. Uansett lengde på garanti vil ikke et skadet system som følge av igangsetting og daglig bruk uten korrekt rotasjonsretning m.m. være dekket av garanti.
Vi håper å fortsette dialogen pr epost, og ønsker ingenting annet enn at vi skal få begge systemene deres på kjøl igjen, og at dere skal være fornøyd både med produkt og oss som forhandler. Vi strekker oss langt for at våre kunder skal ha glede av våre produkter, også etter garantiperioden. Og der feil på vår side forekommer, legger vi oss flate og ser til at kunde kommer i mål. Der vi mener produsent og vi har levert iht. avtale, og kunde ikke har fulgt tilsendt informasjon fra oss, tilbyr vi - som vi dette tilfellet - nødvendige nye komponenter til kostpris.

Mvh. Håkon Renskoug
Produktansvarlig Solskjerming AS`,
  },
  {
    reviewer: "Filip Kotlarz",
    comment: `Herregud for en gjeng!
        Nr 1 er at de har gode priser og er behjelpelige under hele prosessen, salg bør jo alle klare å få til, men det er hvis det dukker opp problemer at man virkelig får se hvordan et firma er.
        
        Jeg var litt uheldig og fikk feil farge og lengde på noen av skinnene, dette medførte utsettelse av både montering og elektriker. Her la de seg flate og beklaget, det er jo ikke noe de kan noe for.
        Men de løste hele problemet på en eksemplarisk måte med jevnlige oppdateringer og bistand på spørsmål jeg hadde under montering.
        
        Jeg har ikke peiling på screens, men monteringen var utrolig enkel, kvaliteten på materialene brukt virker bra. Var ingenting som knakk eller bøyde seg under montering, eneste jeg ønsker å påpeke er at monteringsanvisningen ikke er helt gjeldende etter det som blir levert i dag (litt andre løsningen enn det man ser i video og pdf), så kan være greit å ha dette i bakhodet når man monterer.
        
        Kan virkelig anbefale å bestille herfra, hvis man er uheldig så ordner de opp med serviceinnstilling som er mangelvare hos mange i dag.`,
    rating: 5,
    year: 2025,
    reply: `Takk for hyggelig tilbakemelding Filip, og takk for reminder så vi får oppdatert all informasjon rundt montering. Det stemmer at produsent har kommet med noen produktoppdateringer som vi ikke har fått reflektert i alt av dokumentasjon på vår side. Men det kommer:-) Mvh. Håkon`,
  },

  {
    reviewer: "Cornelia Hovland",
    comment: `Vi bestilte innvendig solskjerming fra de. En stor bestilling, som viste seg å inneholde feil fra vår side. Panikken tok litt overhånd da vi skjønte at vi hadde bestilt feil. Men solskjerming as håndterte dette med den største forståelse og helt fantastisk service. Vi fikk til en løsning hvor vi ble kjempe fornøyd! Og de i tillegg strakk seg ekstra langt for å hjelpe oss med frakt.
        Vi er utrolig fornøyd! Vil virkelig anbefale dette firmaet varmt til alle:)
        (Pleier ikke å ta meg bryet å legge igjen reviews, men dette firmaet er så bra at jeg måtte).
        Cornelia Hovland`,
    rating: 5,
    year: 2025,
    reply: `Takk for hyggelig tilbakemelding Cornelia - og vi hører gjerne fra dere igjen når alt er 100%! Mvh. Håkon`,
  },

  {
    reviewer: "Zydrunas Senkus",
    comment: `Jeg kjøpte ny markiseduk fra Solskjerming AS. Jeg fikk levert den raskere enn forventet. Duken var 5,70 ganger 1,40 og var pent sydd. Jeg skiftet selv. Markisen var fra 1980, passet det ikke 2 tråd pga gammelt standart. Jeg måtte bruke 2 gamle trådene, gikk alt bra. Veldig fornøyd.
Anbefales`,
    rating: 5,
    year: 2024,
    reply: `Takk for hyggelig tilbakemelding. Mvh. Håkon`,
  },
  {
    reviewer: "Ioan Calapar",
    comment: `Takk Ståle , takk Ole !! Dere er to topp karer , det er ganske kjelden å møte så hyggelige personer som dere !
Rask levering, proff produkt, fantastisk kundebehandling !
Jeg sterkt anbefaler Solskjerming AS i Kråkerøy for måten de jobber og for høy kvalitet av produktene.`,
    rating: 5,
    year: 2022,
    reply: `Takk for hyggelig tilbakemelding!`,
  },
  {
    reviewer: "Evan Bergan",
    comment: `Gode priser, enkel og godt forklart prosess og stort utvalg. Fikk også gode råd og veiledning på telefon. Betalingsløsningen derimot er noe jeg skulle ønske kunne vært løst litt enklere for privatkunder. Forskuddsvis fakturabetaling er en dårlig løsning. Kortbetaling eller PayPal? Jatakk!`,
    rating: 4,
    year: 2021,
    reply: `Takk for tilbakemeldingen Even! Paypal har vi inntil nylig tilbudt kunder som ønsker å betale med kredittkort å bruke, men til 4% påslag. Dette falt i dårlig jord hos de fleste, og kun et lite antall valgte å benytte seg av dette. Istedet har flere valgt å forskuddsbetale halvparten ved bestilling, og siste halvdel før utlevering. Dette er til info i tråd med våre betingelser. Det sagt; vi jobber intenst med ny løsning for neste år. Her vil du finne alternative betalingsmetoder. Mvh. Håkon Renskoug`,
  },
  {
    reviewer: "Paterick Sjøberg",
    comment: `Vår markise er på veggen, og jeg kan trygt anbefale denne leverandøren. Vi hadde utfordringer med stående kledning og langt inn til godt feste for markisen. Vi var i kontakt med flere leverandører, hvorpå Solskjerming AS var eneste leverandør som tydeliggjorde utfordringen, og kom med gode løsninger både med tanke på kvalitet og finish.`,
    rating: 5,
    year: 2020,
    reply: `Takk for tilbakemeldingen Paterick! Mvh. Håkon Renskoug`,
  },
];
