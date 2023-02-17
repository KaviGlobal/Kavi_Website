'use strict';

/**
 * sample-menu service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::sample-menu.sample-menu');
