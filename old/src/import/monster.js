import { defaultExtensions } from "@tiptap/starter-kit";
import { generateJSON } from "@tiptap/core";
import { DDB_CONFIG } from "./ddb-config";

export const MONSTER_REGEX =
  /https:\/\/(www.)?dndbeyond.com\/monsters\/([a-zA-Z0-9-]+)/;

// {
//   "url": "https://www.dndbeyond.com/monsters/tiamat",
//   "savingThrows": [
//     {
//       "statId": 1,
//       "bonusModifier": null
//     },
//     {
//       "statId": 2,
//       "bonusModifier": null
//     },
//     {
//       "statId": 5,
//       "bonusModifier": null
//     }
//   ],
//   "skills": [
//     {
//       "skillId": 6,
//       "value": 17,
//       "additionalBonus": null
//     },
//     {
//       "skillId": 10,
//       "value": 17,
//       "additionalBonus": null
//     },
//     {
//       "skillId": 14,
//       "value": 26,
//       "additionalBonus": null
//     }
//   ],
//   "languages": [
//     {
//       "languageId": 1,
//       "notes": ""
//     },
//     {
//       "languageId": 11,
//       "notes": ""
//     },
//     {
//       "languageId": 13,
//       "notes": ""
//     }
//   ],
//   "hitPointDice": {
//     "diceCount": 30,
//     "diceValue": 20,
//     "diceMultiplier": 0,
//     "fixedValue": 300,
//     "diceString": "30d20 + 300"
//   },
//   "swarm": null,
//   "movements": [
//     {
//       "movementId": 1,
//       "speed": 60,
//       "notes": null
//     },
//     {
//       "movementId": 4,
//       "speed": 120,
//       "notes": null
//     }
//   ],
//   "homebrewStatus": 0,
//   "id": 21927,
//   "entityTypeId": 779871897,
//   "alignmentId": 9,
//   "sizeId": 7,
//   "typeId": 9,
//   "armorClass": 25,
//   "armorClassDescription": "(natural armor)",
//   "averageHitPoints": 615,
//   "passivePerception": 36,
//   "isHomebrew": false,
//   "challengeRatingId": 35,
//   "sourceId": 11,
//   "sourcePageNumber": null,
//   "isLegendary": true,
//   "isMythic": false,
//   "hasLair": false,
//   "avatarUrl": "https://media-waterdeep.cursecdn.com/avatars/15/531/636373689866756922.jpeg",
//   "largeAvatarUrl": "https://media-waterdeep.cursecdn.com/avatars/thumbnails/15/532/400/404/636373689867850686.png",
//   "basicAvatarUrl": null,
//   "version": null,
//   "subTypes": [],
//   "environments": [],
//   "tags": [
//     "NPC"
//   ],
//   "sources": [],
//   "damageAdjustments": [
//     20,
//     22,
//     23,
//     25,
//     27,
//     29
//   ],
//   "conditionImmunities": [
//     1,
//     2,
//     3,
//     5,
//     11,
//     14
//   ],
//   "reactionsDescription": "",
//   "mythicActionsDescription": null,
//   "bonusActionsDescription": null,
//   "characteristicsDescription": "",
//   "lairDescription": "",
//   "languageDescription": null,
//   "languageNote": ""
// }

const parseStats = (stats) =>
  stats.map((stat) => ({
    name: DDB_CONFIG.stats.find((s) => s.id === stat.statId).key,
    value: stat.value,
  }));

const processingExtensions = [...defaultExtensions()];

const monsterStats = (stats) => ({
  type: "attributeBlock",
  content: [
    {
      type: "attributeRow",
      content: stats.map(({ name, value }) => ({
        type: "attributeCell",
        attrs: { name },
        content: [{ type: "text", text: `${value}` }],
      })),
    },
  ],
});

export const monsterImport = (data) => {
  return data.map((imported) => {
    const generatedActions = generateJSON(
      imported.actionsDescription,
      processingExtensions
    ).content;
    const generatedSpecial = generateJSON(
      imported.specialTraitsDescription,
      processingExtensions
    ).content;
    const generatedLegendary = generateJSON(
      imported.legendaryActionsDescription,
      processingExtensions
    ).content;
    const generatedConditions = generateJSON(
      imported.conditionImmunitiesHtml,
      processingExtensions
    ).content;
    const generatedSenses = generateJSON(
      imported.sensesHtml,
      processingExtensions
    ).content;
    const generatedSkills = generateJSON(
      imported.skillsHtml,
      processingExtensions
    ).content;
    return {
      type: "statBlock",
      content: [
        {
          type: "heading",
          attrs: { level: 2 },
          content: [
            {
              type: "text",
              marks: [{ type: "link", attrs: { href: imported.url } }],
              text: imported.name,
            },
          ],
        },
        monsterStats(parseStats(imported.stats)),
        {
          type: "text",
          text: "Condition Immunities",
          marks: [{ type: "bold" }],
        },
        ...generatedConditions,
        {
          type: "text",
          text: "Senses",
          marks: [{ type: "bold" }],
        },
        ...generatedSenses,
        {
          type: "text",
          text: "Skills",
          marks: [{ type: "bold" }],
        },
        ...generatedSkills,
        generatedActions.length > 0 && {
          type: "heading",
          attrs: { level: 3 },
          content: [{ type: "text", text: "Actions" }],
        },
        ...generatedActions,
        { type: "horizontalRule" },
        generatedLegendary.length > 0 && {
          type: "heading",
          attrs: { level: 3 },
          content: [{ type: "text", text: "Legendary Actions" }],
        },
        ...generatedLegendary,
      ].filter(Boolean),
    };
  });
};
