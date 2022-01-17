. ./env
DATABUNKER="http://localhost:3000"

EMAIL="john@doe.com"
LOGIN="johndow"
TOKEN="d1aa2d1b-481b-072c-4ac1-54dd85001d6b"
curl -s $DATABUNKER/v1/user/email/${EMAIL} -H "X-Bunker-Token: $DATABUNKER_ROOTTOKEN" |jq

curl -s $DATABUNKER/v1/user/login/${LOGIN} -H "X-Bunker-Token: $DATABUNKER_ROOTTOKEN" |jq

curl -s $DATABUNKER/v1/user/token/${TOKEN} -H "X-Bunker-Token: $DATABUNKER_ROOTTOKEN" |jq
