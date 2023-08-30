'use strict';

/**
 * presentation-viewer service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::presentation-viewer.presentation-viewer');
