hub_box_domotique
===========

Liaison entre différentes box domotique

Description
===========

petit serveur nodejs qui me permet de faire la liasion entre mes différentes box domotique

Installation
============
télécharger le projet dans un repertoire

prérequis : 
- node js installé

- pour le lancement automatique j'utilise : supervisord


npm install supervisor -g
pip install supervisor

nano /etc/init.d/supervisord 

#! /bin/bash -e
### BEGIN INIT INFO
# Provides:          supervisord
# Required-Start:    $remote_fs $named $syslog
# Required-Stop:     $remote_fs $named $syslog
# Default-Start:     2 3 4 5
# Default-Stop:      0 1 6
# Short-Description: Start supervisord at boot
# Description:       Lancement nodemon supervisord.
### END INIT INFO
SUPERVISORD=/usr/local/bin/supervisord
PIDFILE=/tmp/supervisord.pid
OPTS="-c /etc/supervisord.conf"

test -x $SUPERVISORD || exit 0

. /lib/lsb/init-functions

export PATH="${PATH:+$PATH:}/usr/local/bin:/usr/sbin:/sbin"

case "$1" in
  start)
    log_begin_msg "Starting Supervisor daemon manager..."
    start-stop-daemon --start --quiet --pidfile $PIDFILE --exec $SUPERVISORD -- $OPTS || log_end_msg 1
    log_end_msg 0
    ;;
  stop)
    log_begin_msg "Stopping Supervisor daemon manager..."
    start-stop-daemon --stop --quiet --oknodo --pidfile $PIDFILE || log_end_msg 1
    log_end_msg 0
    ;;

  restart|reload|force-reload)
    log_begin_msg "Restarting Supervisor daemon manager..."
    start-stop-daemon --stop --quiet --oknodo --retry 30 --pidfile $PIDFILE
    start-stop-daemon --start --quiet --pidfile /var/run/sshd.pid --exec $SUPERVISORD -- $OPTS || log_end_msg 1
    log_end_msg 0
    ;;

  *)
    log_success_msg "Usage: /etc/init.d/supervisor
{start|stop|reload|force-reload|restart}"
    exit 1
esac

exit 0



chmod +x /etc/init.d/supervisord
update-rc.d supervisord defaults

echo_supervisord_conf > supervisord.conf
mv supervisord.conf /etc/supervisord.con

nano /etc/supervisord.conf

[program:hub_domo_cuesmes]
command=supervisor server.js
strdout_logfile = /var/log/supervisor/hub_domo_cuesmes.log
strderr_logfile = /var/log/supervisor/hub_domo_cuesmes_err.log
directory=/home/hub_domo_cuesmes
environment=NODE_ENV=production  



adaptez cette ligne pour correspondre a votre install: directory=/home/hub_domo_cuesmes

pour utilisé les test de la home page pour le moment il faut modifier le fichier 
manager/variable_objets_box.js
a la main

Usage
=====

ouvrir une page internet avec l'adresse :

http://ip-nodejs:8777

le port peut etre changer par après.