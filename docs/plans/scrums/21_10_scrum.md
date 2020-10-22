## CORE FUNCTIONALITY / REQUIREMENTS (BY EOD)
1. display active and inactive orders on client dashboard
2. integrate helper files into one
3. must verify one full successful test run of an order from creation to completion
  - must add new properties to db schema
4. must get styling and spacing at a presentable level
5. Twilio for client 
  - after placing order, send text to restaurant

## TECH DEBT (BY EOD)
1. research and implement Heroku
2. must add completed_at to orders table via sql schema
  - must adapt seed data to match
  - must inform team to reset database with new schema and seeds
    - use `npm run db:reset` after pulling new seed and schema files

## REFACTORING (BY EOD)
1. refactor folder directory structure
  - mkdir server
    - place server.js inside
    - place helpers.js inside /server/lib
2. rename styles (sass folder in root) to sass

## SEEDS
1. standardize image sizes of data

## STRETCH
1. implement login/logout for multiple customers

## MEMBER DISCUSSION
- What are you working on today?
  - Avvai: C1, C4, S1
  - Ayushi: C2, T1
  - Josh: C5, T1, R1, R2
