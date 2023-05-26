'use strict';

/**
 * list-viewer service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::list-viewer.list-viewer');
