var telegram = require('../node_modules/telegram-promise');
var TelegramAPI;

exports.hook_data = function (next, connection) {
    connection.transaction.parse_body = 1;
    next();
};

exports.hook_data_post = function (next, connection) {

    var plugin = this,
        config = plugin.config.get('telegram.forwarder.ini'),
        toEmailAddress = connection.transaction.rcpt_to[0].address(),
        telegramAccessToken = config.main.telegramAccessToken,
        fromEmailAddress = connection.transaction.mail_from.address(),
        telegramChatId,
        message = config.main.messageTemplate,
        body = connection.transaction.body,
        bodyText = '';

    if (!config) {

        connection.logerror('No config! ' +
            'Ensure config/telegram.forwarder.ini is existing!');
    }

    if (!config.messageTemplate) {

        connection.logerror('No message template found! ' +
            'Ensure messageTemplate=... is set in config/telegram.forwarder.ini!');

    }

    if (!telegramAccessToken) {

        connection.logerror('No telegram API access token found! ' +
                            'Ensure telegramAccessToken=$yourApiToken is set in config/telegram.forwarder.ini!');

    } else {

        // singleton instance
        if (!TelegramAPI) {

            connection.logdebug(plugin, 'Using Bot ACCESS_TOKEN:',  telegramAccessToken);

            TelegramAPI = new telegram(telegramAccessToken);
        }
    }

    if (!config['forwarding']) {

        connection.logerror('No forwarding rules found! ' +
            'Ensure the [forwarding] section exists in config/telegram.forwarder.ini and contains at least one email address!');
    }

    // forwarding rule exists
    if (config['forwarding'] && config['forwarding'][toEmailAddress]) {

        telegramChatId = config['forwarding'][toEmailAddress];

        connection.logdebug(plugin, 'Redirecting email from "' + fromEmailAddress +
                                  '" to Telegram chat ID: "', telegramChatId, '"');

        message = message.replace('{senderEmail}', fromEmailAddress);
        message = message.replace('{subject}', body.header.get('subject'));

        /* Message support deactivated for now
        for (var i=0; i<body.children.length; i++) {
            bodyText += body.children[i].bodytext;
        }
        message = message.replace('{message}', bodyText);
        */

        // https://github.com/mahnunchik/telegram-promise
        // https://core.telegram.org/bots/api#sendmessage
        TelegramAPI.sendMessage({
            chat_id: telegramChatId,
            text: message
        }).then(function(res) {

            connection.logdebug(plugin, 'TelegramAPI: ', arguments);

        }).catch(function(err) {

            connection.logerror(plugin, 'TelegramAPI: ', arguments);
        });

    } else {

        connection.logdebug(plugin, 'Incoming target email address: "' + toEmailAddress + '" does NOT match any forwarding rule. Omitting forwarding.');

    }
    return next();
};