. ./env
DATABUNKER="http://localhost:3000"

USER="johndow"
curl -s $DATABUNKER/v1/user/login/${USER} -H "X-Bunker-Token: $DATABUNKER_ROOTTOKEN" 
