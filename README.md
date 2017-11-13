# Provider Prescriber

![](https://github.com/maverickg59/buckler-pcd-client/blob/master/providerPrescriber.gif)

Provider Prescriber is a project envisioned by Galvanize Data Science student Christine Buckler(find data science info in her repo listed below). The purpose of this web service is for the user to input a National Provider Identifier and return ten providers (identifier and other information) with the closest provider credentials by Jaccard Distance. The link to the web app and a number of searchable NPI's can be found below:

URL: https://buckler-pcd.firebaseapp.com/

NPI's:
1801899851, 1063415016, 1760485718, 1699778613,
1396748315, 1184627101, 1336142348, 1326041500,
1740283753, 1295738219, 1124021134, 1033112040,
1669475679, 1831192848


The web app portion of this project was created by Galvanize Web Development Immersive student Christopher White in his free time (this was not a required project for Mr. White).

Front-end: HTML/CSS w/ jQuery handling DOM manipulation hosted on Firebase
Back-end: Node.js, Express, Knex, PostgreSQL, fast-csv, highland hosted on Heroku

Heroku API: https://buckler-pcd.herokuapp.com/api/v1/new-similars/

Logic: GET request to Heroku API asking to return all records matching given search input where jaccard distance is >= 0. Simultaneously (kinda, lolz), search input is sent to NPPES API using GET and response is appended to DOM in table format using template literal. Loop over JSON object from Heroku API where each iteration is sent to NPPES API. Each NPPES API response is appended to the DOM below given.

Data Science: Christine Buckler

GitHub: https://github.com/christinebuckler/provider-prescriber

LinkedIn: https://www.linkedin.com/in/christinebuckler/



Web Development: Christopher White

GitHub: https://github.com/maverickg59

Back-end repo: https://github.com/maverickg59/buckler-pcd-server/tree/master/server

Front-end repo: https://github.com/maverickg59/buckler-pcd-client/tree/master/client

LinkedIn: https://www.linkedin.com/in/chrisewhite/
