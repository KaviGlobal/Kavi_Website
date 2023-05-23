'use strict';

/**
 * publication-viewer service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::publication-viewer.publication-viewer');
