
#!/bin/sh

echo "making dir";
mkdir -p /home/antouank/.solar/aiani/data ;


DATE=$1
USER=$SOLAR_AIANI_USER
PASSWD=$SOLAR_AIANI_PASSWD

echo "<-- Connecting to $SOLAR_AIANI_IP to fetch files for $DATE ($(date))" ;

ftp -n $SOLAR_AIANI_IP <<SCRIPT
user $USER $PASSWD
binary
cd /data/$DATE/
get int_kwr_$DATE.txt
get kaco_status_$DATE.txt
get tag_$DATE.txt
quit
SCRIPT

echo "ftp script done"

TOTAL_FILES_SAVED=$(/bin/ls | grep $DATE | wc -w) ;

echo "Total files saved: $TOTAL_FILES_SAVED"

if [ "$TOTAL_FILES_SAVED" -gt 1 ]; then
	mv -v $(/bin/ls | grep $DATE) /home/antouank/.solar/aiani/data ;
	exit 0;
else
	echo "No files saved!"
	exit 1;
fi
