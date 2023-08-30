'use strict';

/**
 * offering-viewer service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::offering-viewer.offering-viewer');
