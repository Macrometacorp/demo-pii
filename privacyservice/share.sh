. ./env
DATABUNKER="http://localhost:3000"

TOKEN="d1aa2d1b-481b-072c-4ac1-54dd85001d6b"

curl --location --request POST $DATABUNKER/v1/sharedrecord/token/${TOKEN} \
    -H "Content-Type: application/json" \
	-H "X-Bunker-Token: $DATABUNKER_ROOTTOKEN" \
    --data-raw '{
	    "fields": "email"
        }'
