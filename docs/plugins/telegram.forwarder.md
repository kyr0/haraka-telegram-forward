# A Telegram plugin for the Haraka mailserver

This plugin enables you to configure your Haraka mailserver in a way that it
forwards incoming emails to a certain email address (i.e.: support@acme.com) 
to a certain Telegram chat. (i.e.: The team chat of your customer support team at ACME Inc.).

## Requirements

1. You need a running Haraka instance or install it like this (therefore you need Node.js and npm installed):

    sudo npm -g install Haraka
    
2. Setup and run Haraka like this:

    haraka -i /path/to/your/haraka_mailserver_config

3. You should edit some important Haraka config files like:

    /path/to/your/haraka_mailserver_config/config/host_list
    /path/to/your/haraka_mailserver_config/config/smtp_forward

4. Install "telegram-promise":

    cd /path/to/your/haraka_mailserver_config/
    npm install telegram-promise --save
    
5. Talk to the Telegram BotFather and fetch an ACCESS_TOKEN
   Contact https://telegram.me/botfather or @BotFather

## Setup step-by-step

1. Download/clone the files from this repository.
    
2. Then copy the following 3 files to your Haraka directory:

    cp config/telegram.forwarder.ini /path/to/your/haraka_mailserver_config/telegram.forwarder.ini
    cp docs/plugins/telegram.forwarder.md /path/to/your/haraka_mailserver_config/docs/plugins/telegram.forwarder.md
    cp plugins/telegram.forwarder.js /path/to/your/haraka_mailserver_config/plugins/telegram.forwarder.js

3. Add the telegram-forwarder plugin to the plugins config:

Therefore add:

    # FORWARD
    telegram.forwarder
    
To:

    /path/to/your/haraka_mailserver_config/config/plugins
    
4. Last but not least configure the telegram-forwarder plugin itself:

Edit:

    /path/to/your/haraka_mailserver_config/telegram.forwarder.ini
    
And put your Telegram API Access Token and email addresses as long 
as some Telegram Chat ID's where they belong.

## Finally, run Haraka with Telegram Chat forwarding

    sudo haraka -c /path/to/your/haraka_mailserver_config
    
There should be a debug log message of "telegram-forwarder" for each
message forwarded to a Telegram chat.

## FAQ / Errors

- Error: Cannot find module 'telegram-promise'
  -> See section requirements, 4.