'use strict';

/**
 * people-viewer service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::people-viewer.people-viewer');
