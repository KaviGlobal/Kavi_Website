'use strict';

/**
 * podcast-viewer service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::podcast-viewer.podcast-viewer');
