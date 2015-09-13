

curl -H "Content-Type: text/plain" \
-X POST \
--data-binary @$1 \
http://solarytics:10000/parse
