# OAuth-google-spring-react

## Backend:

- Spring-boot
- Oauth-2.0-Google
- Spring-security
- MySQL
- Maven
- Java 21
- Google Cloud Platform
- ElasticSearch
- Kibana

## Front-end

- React
- Vite
- React Magma as UI library
- TypeScript
- React Router Dom
- Axios

### To launch this react application you should use version of node like 16.20.2 app execute this command:

- node nvm use 16.20.2
- npm install --force (or --legacy-peer-deps)
- npm run build
- npm run dev

### Pass env variable in env variables for these variables:

- CLIENT_ID
- CLIENT_SECRET
- JWT_SECRET
- DATABASE_PASSWORD
- PROJECT_ID
- FRONTEND_URL
- ELASTICSEARCH_HOSTS
- ELASTICSEARCH_USERNAME
- ELASTICSEARCH_PASSWORD

To work with this application you should:

- create a project in Google Cloud Platform and enable OAuth 2.0 credentials.
- install the gcloud CLI https://cloud.google.com/sdk/docs/install
- set up ADC (Application Default Credential) for a local development
  environment https://cloud.google.com/docs/authentication/set-up-adc-local-dev-environment
- get all required information from Google Cloud Platform and pass it in env variables:
    - CLIENT_ID
    - CLIENT_SECRET
    - PROJECT_ID.

### MYSQL:

To communicate with MySQL and Elasticsearch databases you can use these commands:

- data.sql automatically populates database with test data
- docker exec -it mysql-database mysql -u root -p
- SHOW DATABASES;
- USE your_database_name;
- SHOW TABLES;
- SELECT * FROM your_table_name;
- type exit to exit from MySQL CLI;

### Elasticsearch:

#### Create and populate Elasticsearch database with test data:

- Create a new index:

```sh 
curl -X PUT "localhost:9200/tree" \
  -H "Content-Type: application/json" \
  -d '{
    "mappings": {
      "properties": {
        "title": {
          "type": "search_as_you_type"
        }
      }
    }
  }'
```

- To populate Elasticsearch database launch this command:

```sh 
/bin/bash create_trees.sh
```

- Check that data is populated:

```sh
curl -X GET "localhost:9200/tree/_search"
```

or go to http://localhost:9200/tree/_search?pretty

- Refresh index:

```sh
curl -X POST "localhost:9200/tree/_refresh"
````

#### Multi search request by title field:

```sh
curl -X POST "localhost:9200/tree/_search?pretty" \
  -H "Content-Type: application/json" \
  -d '{
  "query": {
    "bool": {
      "filter": [
        {
          "term": {
            "owners.keyword": "OWNER_EMAIL_VALUE"
          }
        }
      ],
      "must": [
        {
          "multi_match": {
            "query": "TITLE_VALUE",
            "type": "bool_prefix",
            "fields": [
              "title",
              "title._2gram",
              "title._3gram"
            ]
          }
        }
      ]
    }
  }
}
'
```

- Search document by id:
  http://localhost:9200/tree/_doc/id
- Delete item in the document:

```sh
curl -X DELETE "http://127.0.0.1:9200/tree/_doc/id"
```

- Delete index completely:

```sh
curl -X DELETE "http://localhost:9200/tree"
```


#### Kibana

- Go to http://localhost:5601/
- Go to Elasticsearch -> Console
- Create a new index with search_as_you_type field for title for autocomplete feature:

```sh 
PUT /tree
{
  "mappings": {
    "properties": {
      "title": {
        "type": "search_as_you_type"
      }
    }
  }
}
```

- Verify that the index is created:

```sh
GET /tree/_mapping
```

- To populate Elasticsearch database launch this command:

```sh
/bin/bash create_trees.sh
```

- Multi search request by title field:
  
```sh
POST /tree/_search
{
  "query": {
    "bool": {
      "filter": [
        {
          "term": {
            "owners.keyword": "OWNER_EMAIL_VALUE"
          }
        }
      ],
      "must": [
        {
          "multi_match": {
            "query": "TITLE_VALUE",
            "type": "bool_prefix",
            "fields": [
              "title",
              "title._2gram",
              "title._3gram"
            ]
          }
        }
      ]
    }
  }
}
```
You can run this app via Docker compose: Go to the root folder and run:

```sh
docker-compose up --build
```

or run only databases: Go to backend folder and run:

```sh
docker-compose up --build
```
