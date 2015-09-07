
#!/bin/zsh

echo "making dir";
mkdir -p /home/antouank/.solar/aiani/data ;

echo "cd to scripts"
cd /home/antouank/_repos_/solarytics/scripts


TODAY=`date +%y%m%d`
USER=$SOLAR_AIANI_USER
PASSWD=$SOLAR_AIANI_PASSWD

echo "<-- Connecting to $SOLAR_AIANI_IP to fetch files for $TODAY ($(date))" ;

ftp -n $SOLAR_AIANI_IP <<SCRIPT
user $USER $PASSWD
binary
cd /data/$TODAY/
get int_kwr_$TODAY.txt
get kaco_status_$TODAY.txt
get tag_$TODAY.txt
quit
SCRIPT

echo "ftp script done"

TOTAL_FILES_SAVED=$(ls | grep $TODAY | wc -l) ;

echo "Total files saved: $TOTAL_FILES_SAVED"

if [ "$TOTAL_FILES_SAVED" -eq 2 ]; then
	mv -v $(/bin/ls | grep $TODAY) /home/antouank/.solar/aiani/data ;
	exit 0;
else
	echo "No files saved!"
	exit 1;
fi


