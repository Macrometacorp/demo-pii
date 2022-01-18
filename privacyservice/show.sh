#execute this as follows:  show.sh token (e.g show.sh )
#

. ./env
DATABUNKER="http://localhost:3000"

TOKEN=$1
curl -s $DATABUNKER/v1/user/token/${TOKEN} -H "X-Bunker-Token: $DATABUNKER_ROOTTOKEN" 
