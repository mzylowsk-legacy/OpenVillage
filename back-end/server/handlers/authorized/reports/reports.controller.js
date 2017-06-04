'use strict';

var _ = require('lodash'),
    reportsManager = require('../../../api/reports'),
    schemaValidator = require('../../../lib/schema-validator'),
    scriptsSchemas = require('../../../schemas/scripts-schema.json'),
    httpStatuses = require('../../../components/http-statuses');

