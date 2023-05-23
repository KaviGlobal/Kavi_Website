'use strict';

/**
 * news-media service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::news-media.news-media');
