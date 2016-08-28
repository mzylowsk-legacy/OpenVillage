'use strict';


module.exports.translateError = function (err) {
    if ('status' in err) {
        return JSON.stringify(err);
    } else if (Array.isArray(err) || typeof(err) === 'string') {
        return JSON.stringify({
            status: 500,
            message: err
        });
    } else {
        return JSON.stringify({
            status: 500,
            message: String(err),
            stringified: JSON.stringify(err)
        });
    }
};
