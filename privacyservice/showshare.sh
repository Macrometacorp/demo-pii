. ./env
DATABUNKER="http://localhost:3000"

TOKEN="cd940727-c168-0357-d944-304ea3ce5735"
curl -s $DATABUNKER/v1/get/${TOKEN} -H "X-Bunker-Token: $DATABUNKER_ROOTTOKEN" 
