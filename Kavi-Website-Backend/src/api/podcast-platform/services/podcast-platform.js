'use strict';

/**
 * podcast-platform service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::podcast-platform.podcast-platform');
