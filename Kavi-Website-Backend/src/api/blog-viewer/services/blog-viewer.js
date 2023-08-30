'use strict';

/**
 * blog-viewer service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::blog-viewer.blog-viewer');
