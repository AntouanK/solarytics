
echo "[data-store] Building image...";

VERSION=$(cat package.json | grep -oE "version.+" | grep -oE "[0-9]+\.[0-9]+\.[0-9]+");

docker build -t data-store:$VERSION ./ ;

# tag the current version as the latest
docker tag -f data-store:$VERSION data-store:latest ;

echo "[data-store] Building finished.";
