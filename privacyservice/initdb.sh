#KEY=`< /dev/urandom LC_CTYPE=C tr -dc 'a-f0-9' | head -c${1:-48};`
#ROOTTOKEN=`uuidgen 2> /dev/null`
#
#echo DATABUNKER_MASTERKEY=${KEY} > env
#echo DATABUNKER_ROOTTOKEN=${ROOTTOKEN} >> env
. ./env

export MMURL="https://api-smoke4.eng.macrometa.io"
export MMAPIKEY="demo.piidemo.EvFoIF5Nu8MioaFRuHyi4In2n9QgdVRIkhNIJr16E5dRkWzTtg8SgiJ7T8M4EusN269678"

./databunker -init -masterkey ${DATABUNKER_MASTERKEY} -roottoken ${DATABUNKER_ROOTTOKEN}
