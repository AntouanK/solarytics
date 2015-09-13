
echo "[web-client] Building image...";

VERSION=$(cat package.json | grep -oE "version.+" | grep -oE "[0-9]+\.[0-9]+\.[0-9]+");

docker build -t web-client:$VERSION ./ ;

# tag the current version as the latest
docker tag -f web-client:$VERSION web-client:latest ;

echo "[web-client] Building finished.";
