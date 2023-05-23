'use strict';

/**
 * news-viewer service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::news-viewer.news-viewer');
