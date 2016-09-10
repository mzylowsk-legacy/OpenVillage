var config = require('../config/config');

module.exports = {
    email: {
        types: {
            resetPassword: {
                subject: 'Reset password',
                content: function(username, token) {
                    return 'Click on this link to reset your password: \n' +
                        config.environment.host + '/#/users/' + username + '/resetPassword/' + token;
                }
            },
            accountActivation: {
                subject: 'Account activation',
                content: function(username, token) {
                    return 'Click on this link to activate your account: \n' +
                        config.environment.host + '/api/users/' + username + '/activate/' + token;
                }
            }
        }
    },
    token: {
        type: {
            activation: 'activation',
            resetPassword: 'reset_password'
        }
    },
    builder: {
        uberScriptPath: process.cwd() +'/server/lib/utils/scripts-tools/uber_script.py'
    }
};
