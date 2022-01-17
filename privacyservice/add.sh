. ./env
DATABUNKER="http://localhost:3000"

curl -s $DATABUNKER/v1/user \
  -v \
  -H "X-Bunker-Token: $DATABUNKER_ROOTTOKEN" -H "Content-Type: application/json" \
  -d '{"first": "john", "last": "dow", "login": "johndow", "phone": "404-555-1111", "email": "john@doe.com"}'
