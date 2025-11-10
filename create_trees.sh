#!/bin/bash

ES_URL="http://localhost:9200"
ES_USERNAME="elastic"
ES_PASSWORD="password"

# Execute bulk insert
curl -u "$ES_USERNAME:$ES_PASSWORD" \
     -X POST "$ES_URL/_bulk" \
     -H 'Content-Type: application/json' \
     --data-binary @create_bulk_trees_elasticsearch.json

echo "Bulk insert completed!"