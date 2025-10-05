# OAuth-google-spring-react

Backend:
- Spring-boot
- Oauth-2.0-Google
- Spring-security
- MySQL
- Maven
- Java 21
- Google Cloud Platform

Front-end
- React
- Vite
- React Magma as UI library
- TypeScript
- React Router Dom
- Axios

To launch this react application you should use version of node like 16.20.2 app execute this command:
- node nvm use 16.20.2
- npm install --force (or --legacy-peer-deps)
- npm run build
- npm run dev

Pass env variable in env variables for these variables:
- CLIENT_ID
- CLIENT_SECRET
- JWT_SECRET
- DATABASE_PASSWORD
- PROJECT_ID
- FRONTEND_URL
- ELASTICSEARCH_URL
- ELASTICSEARCH_USERNAME
- ELASTICSEARCH_PASSWORD

To work with this application you should: 
- create a project in Google Cloud Platform and enable OAuth 2.0 credentials.
- install the gcloud CLI https://cloud.google.com/sdk/docs/install
- set up ADC (Application Default Credential) for a local development environment https://cloud.google.com/docs/authentication/set-up-adc-local-dev-environment
- get all required information from Google Cloud Platform and pass it in env variables:
  - CLIENT_ID
  - CLIENT_SECRET
  - PROJECT_ID.

To communicate with MySQL and Elasticsearch databases you can use these commands:

MYSQL:
- docker exec -it mysql-database mysql -u root -p
- SHOW DATABASES;
- USE your_database_name;
- SHOW TABLES;
- type exit to exit from MySQL CLI;

Elasticsearch:
- Go to http://localhost:9200/ or
- docker exec -it elasticsearch-database bash or
- curl -u elastic:password/password http://localhost:9200/_cat/indices?v or
- curl -u elastic:password/password -X GET "http://localhost:9200/tree/_search?pretty" -H 'Content-Type: application/json' -d'
  {
  "query": {
  "match_all": {}
  }
  }'
- type exit to exit from bash;
