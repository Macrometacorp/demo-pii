#execute this as follows:  add.sh first last phone (e.g add.sh joubert berger 4045551234)

. ./env
DATABUNKER="http://localhost:3000"

FIRST=$1
LAST=$2
PHONE=$3
LOGIN=${FIRST}${LAST}
EMAIL="${FIRST}@${LAST}.com"

curl -s $DATABUNKER/v1/user \
  -v \
  -H "X-Bunker-Token: $DATABUNKER_ROOTTOKEN" -H "Content-Type: application/json" \
  -d "{\"first\": \"${FIRST}\", \"last\": \"${LAST}\", \"login\": \"${LOGIN}\", \"phone\": \"${PHONE}\", \"email\": \"${EMAIL}\"}"
