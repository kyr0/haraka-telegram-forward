#!/bin/bash

# Requires sendEmail to be installed. (brew install sendEmail, apt-get install sendEmail etc.)
# See: http://caspian.dotconf.net/menu/Software/SendEmail/
#
# Usage: ./testSendMail.sh $emailAdress $subject $message

sendEmail -f testSendMail@localhost -t $1 -u $2 -m $3
