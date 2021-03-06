'use strict';

const BaseEmbed = require('./BaseEmbed.js');

/**
 * Generates fissure embeds
 */
class FissureEmbed extends BaseEmbed {
  /**
   * @param {Genesis} bot - An instance of Genesis
   * @param {Array.<Fissure>} fissures - The fissures to be included in the embed
   * @param {string} platform - platform
   */
  constructor(bot, fissures, platform) {
    super();

    if (fissures.length > 1) {
      this.title = `[${platform.toUpperCase()}] Worldstate - Void Fissures`;
    }
    this.url = 'http://warframe.wikia.com/wiki/Void_Fissure';
    this.thumbnail = {
      url: 'http://i.imgur.com/EfIRu6v.png',
    };
    if (fissures.length > 1) {
      fissures.sort((a, b) => a.tierNum - b.tierNum);

      this.fields = fissures.map(f => ({
        name: `${f.missionType} ${f.tier}`,
        value: `[${f.eta}] ${f.node} against ${f.enemy}`,
      }));
    } else if (fissures.length === 0) {
      this.fields = {
        name: 'Currently no fissures',
        value: '\u200B',
      };
    } else {
      const f = fissures[0];
      this.title = `[${platform.toUpperCase()}] ${f.missionType} ${f.tier}`;
      this.description = `${f.node} against ${f.enemy}`;
      this.footer.text = `${f.eta} remaining • Ends at `;
      this.timestamp = new Date(f.expiry);
      this.thumbnail.url = 'https://i.imgur.com/EfIRu6v.png';
    }

    this.color = 0x4aa1b2;
  }
}

module.exports = FissureEmbed;
