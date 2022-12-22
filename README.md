# Examenopdracht Web Services

- Student: FLORIS BUYSE
- Studentennummer: 202080000
- E-mailadres: floris.buyse@student.hogent.be

## Vereisten

Ik verwacht dat volgende software reeds geïnstalleerd is:

- [NodeJS](https://nodejs.org)
- [Yarn](https://yarnpkg.com)
- [MySQL Community Server](https://dev.mysql.com/downloads/mysql/)

## Opstarten

1. Open terminal en type: ```yarn install```
2. Maak een ```.env``` bestand met volgende code:
```
NODE_ENV=____
DB_USER=____
DB_PW=____

AUTH_JWKS_URI='____'

AUTH_AUDIENCE='____'

AUTH_ISSUER='____'

AUTH_USER_INFO='____'

AUTH_CLIENT_ID='____'

AUTH_CLIENT_SECRET='____'

AUTH_TOKEN_URL='____'
```
- Voor NODE_ENV kan je kiezen tussen development of production
- DB_USER en DB_PW zijn de gebruikersnaam en wachtwoord van jouw lokale databank
- De AUTH_JWKS_URI is typisch ```https://tenantOpAuth0/.well-known/jwks.json```
- AUTH_AUDIENCE is de identifier van je API op Auth0
- AUTH_ISSUER is ```https://tenantOpAuth0/``` let op `/` op einde is belangrijk!
- AUTH_USER_INFO is ```https://tenantOpAuth0/userinfo```
- AUTH_CLIENT_ID en AUTH_CLIENT_SECRET kan je vinden op je auth0 dashboard bij de applicatie
- AUTH_TOKEN_URL is ```https://tenantOpAuth0/oauth/token```

## Testen

1. Maak een ```.env.test``` bestand aan met volgende code
```
NODE_ENV=test
DB_USER=____
DB_PW=____

AUTH_JWKS_URI='____'

AUTH_AUDIENCE='____'

AUTH_ISSUER='____'

AUTH_USER_INFO='____'

AUTH_CLIENT_ID='____'

AUTH_CLIENT_SECRET='____'

AUTH_TOKEN_URL='____'

AUTH_TEST_USER_USER_ID=zelfKiezen

AUTH_TEST_USER_USERNAME=____

AUTH_TEST_USER_PASSWORD=____
```
Alle auth info blijft hetzelfde als bij `Opstarten`, behalve op het einde zijn er 3 nieuwe bijgekomen:
 - De AUTH_TEST_USER_USER_ID kan je zelf kiezen (bvb 123)
 - AUTH_TEST_USER_USERNAME en AUTH_TEST_USER_PASSWORD kan je vinden in het dossier bij inloggegevens