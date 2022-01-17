KEY=`< /dev/urandom LC_CTYPE=C tr -dc 'a-f0-9' | head -c${1:-48};`
ROOTTOKEN=`uuidgen 2> /dev/null`

echo DATABUNKER_MASTERKEY=${KEY} > env
echo DATABUNKER_ROOTTOKEN=${ROOTTOKEN} >> env

./databunker -init -masterkey ${KEY} -roottoken ${ROOTTOKEN}
