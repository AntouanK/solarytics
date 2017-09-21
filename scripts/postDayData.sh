

curl -H "Content-Type: text/plain" \
-X POST \
--data-binary @$1 \
https://crazy.homeip.net:11043/api/parse
