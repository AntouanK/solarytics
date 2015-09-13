
echo "[parser] Building image...";

VERSION=$(cat package.json | grep -oE "version.+" | grep -oE "[0-9]+\.[0-9]+\.[0-9]+");

docker build -t parser:$VERSION ./ ;

# tag the current version as the latest
docker tag -f parser:$VERSION parser:latest ;

echo "[parser] Building finished.";
