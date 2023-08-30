'use strict';

/**
 * news-viewer controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::news-viewer.news-viewer');
