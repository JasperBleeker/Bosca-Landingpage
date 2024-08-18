'use strict';

/**
 * ueber service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::ueber.ueber');
