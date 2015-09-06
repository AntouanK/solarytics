
#!/bin/sh
DATE=$1
USER=$SOLAR_AIANI_USER
PASSWD=$SOLAR_AIANI_PASSWD

echo "[$DATE]"
echo "<-- Connecting to $SOLAR_AIANI_IP to fetch files for $DATE" ;


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

echo "moving files:" $(ls | grep $DATE)

mv -v $(ls | grep $DATE) /home/antouank/.solar/aiani/data ;
