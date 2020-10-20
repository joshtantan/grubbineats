# 20/10 SCRUM
## UPDATES
1. For code consistency, please:
  - USE ALL-CAPS FOR PSQL KEYWORDS
  - use snake_case for psql variables
  - use camelCase for js
  - use kebab-case for ejs
  - `
      SEPARATE sql_queries
      INTO new_lines LIKE '%this%'
      WHERE each_line HAVING some='point';
    `
2. Please do not push test code or commented-out code without comments explaining what it was for
3. Comment tags to be placed at top of function or code block being worked on:
  - @TODO - self-explanatory
  - @TODELETE - functional code useful for testing but not intended for use in final submission
4. ORDER STATUS CONVENTIONS
  1. created
  2. accepted
  3. ready
  4. completed
    - must implement completed_at in database table orders
    - for now, use Now() > ready_at to see check

## TECH DEBT
- must refactor data helpers to use pool for parameterized queries
- must add completed_at to orders table via sql schema
  - must adapt seed data to match
  - must inform team to reset database with new schema and seeds
    - use `npm run db:reset` after pulling new seed and schema files

## REFACTORING
- refactor folder directory structure
  - mkdir server
    - place server.js inside
    - place helpers.js inside /server/lib
- rename styles (sass folder in root) to sass
- capitalize PSQL command keywords in db/seeds/02_menu.sql
- Remove unnecessary comments and test code

## MEMBER DISCUSSION
- Any issues with past work?
  - Avvai: 
  - Ayushi: 
- What are you working on today?
  - Avvai: 
  - Ayushi: 
  - Josh: sync up and merge Ayushi's BE code with master, refactoring, POST routes, Twilio (if extra time)
