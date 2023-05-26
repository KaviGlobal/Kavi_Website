'use strict';

/**
 * page-viewer service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::page-viewer.page-viewer');
