
#!/bin/zsh
TODAY=`date +%y%m%d`
USER=$SOLAR_AIANI_USER
PASSWD=$SOLAR_AIANI_PASSWD

echo "Fetching files for " $TODAY ;

ftp -n $SOLAR_AIANI_IP <<SCRIPT
user $USER $PASSWD
binary
cd /data/$TODAY/
get int_kwr_$TODAY.txt
get kaco_status_$TODAY.txt
get tag_$TODAY.txt
quit
SCRIPT
