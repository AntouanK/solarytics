
#!/bin/zsh

echo "making dir";
mkdir -p /home/antouank/.solar/aiani/data ;

echo "cd to scripts"
cd /home/antouank/_repos_/solarytics/scripts

echo "pwd:" $(pwd)

echo "ftping...";

TODAY=`date +%y%m%d`
USER=$SOLAR_AIANI_USER
PASSWD=$SOLAR_AIANI_PASSWD

echo --- "$(date)"
echo "<-- Connecting to $SOLAR_AIANI_IP to fetch files for $TODAY" ;

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

echo "moving files:" $(ls | grep $TODAY)

mv -v $(ls | grep $TODAY) /home/antouank/.solar/aiani/data ;

echo "list of /home/antouank/.solar/aiani/data" $(ls -lahG /home/antouank/.solar/aiani/data)

echo 'exit code' $?

