import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { generateJSON } from '@tiptap/core';
import { defaultExtensions } from '@tiptap/starter-kit';


const MONSTER_REGEX = /https:\/\/(www.)?dndbeyond.com\/monsters\/([a-zA-Z0-9-]+)/;
const PROXY_URL = `http://localhost:3000/proxy`;

const parseDDBLinkToProxy = (url) => {
  if (MONSTER_REGEX.test(url)) {
    const name = url.match(MONSTER_REGEX)[2];
    if (!name) throw new Error('No monster name!');
    return fetch(`${PROXY_URL}/monsters`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cobalt:
          'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..M8BeGrinvr3bE20CGIu4dQ.1OyNemWcpERC-YOouORG2CWujm44ZbG_5CJfScM72gCH6dB19giu7C8ClS_YnRr0.ZguZxNaiLdVZHoYLzOkWHA',
        searchTerm: name,
        exactMatch: true,
      }),
    });
  }
};

const modalRoot = document.getElementById('modal-root');

const Modal = ({ children }) => {
  const element = document.createElement('div');
  element.classList.add('modal');
  useEffect(() => {
    modalRoot.appendChild(element);
    return () => {
      modalRoot.removeChild(element);
    };
  });
  return ReactDOM.createPortal(children, element);
};

// {
//   "collectionUserId": 0,
//   "isReleased": true,
//   "url": "https://www.dndbeyond.com/monsters/tiamat",
//   "conditionImmunitiesHtml": "Blinded, Charmed, Deafened, Frightened, Poisoned, Stunned",
//   "sensesHtml": "Darkvision 240 ft., Truesight 120 ft.",
//   "skillsHtml": "Arcana +17, Religion +17, Perception +26",
//   "stats": [
//     {
//       "statId": 1,
//       "name": null,
//       "value": 30
//     },
//     {
//       "statId": 2,
//       "name": null,
//       "value": 10
//     },
//     {
//       "statId": 3,
//       "name": null,
//       "value": 30
//     },
//     {
//       "statId": 4,
//       "name": null,
//       "value": 26
//     },
//     {
//       "statId": 5,
//       "name": null,
//       "value": 26
//     },
//     {
//       "statId": 6,
//       "name": null,
//       "value": 28
//     }
//   ],
//   "senses": [
//     {
//       "senseId": 2,
//       "notes": "240 ft."
//     },
//     {
//       "senseId": 4,
//       "notes": "120 ft."
//     }
//   ],
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
//   "name": "Tiamat",
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

const processingExtensions = [
  ...defaultExtensions(),
];

const processDataToBlock = (data) => {
  return data.map((imported) => {
    const generatedActions = generateJSON(
      imported.actionsDescription,
      processingExtensions,
    ).content;
    const generatedSpecial = generateJSON(
      imported.specialTraitsDescription,
      processingExtensions,
    ).content;
    const generatedLegendary = generateJSON(
      imported.legendaryActionsDescription,
      processingExtensions,
    ).content;
    return {
      type: 'statBlock',
      content: [
        {
          type: 'heading',
          attrs: { level: 2 },
          content: [{ type: 'text', text: imported.name }],
        },
        { type: "horizontalRule" },
        generatedActions.length > 0 && {
          type: 'heading',
          attrs: { level: 3 },
          content: [{ type: 'text', text: 'Actions' }],
        },
        ...generatedActions,
        { type: "horizontalRule" },
        generatedLegendary.length > 0 && {
          type: 'heading',
          attrs: { level: 3 },
          content: [{ type: 'text', text: 'Legendary Actions' }],
        },
        ...generatedLegendary,
      ].filter(Boolean),
    };
  });
};

const ImportModal = () => {
  const [importUrl, setImportUrl] = useState('');
  const [showing, setShowing] = useState(false);
  const rangeRef = useRef(null);
  const importRef = useRef(null);
  const onCreate = (e) => {
    const { editor, range } = e.detail;
    rangeRef.current = range;
    setShowing(true);
  };
  useEffect(() => {
    document.addEventListener('ddbImport', onCreate);
    if (importRef.current) importRef.current.focus();
    return () => {
      document.removeEventListener('ddbImport', onCreate);
    };
  });
  const onImport = () => {
    if (!importUrl) {
      return;
    }
    if (!(window.editor && rangeRef.current)) {
      setShowing(false);
      return;
    }
    parseDDBLinkToProxy(importUrl)
      .then((r) => r.json())
      .then(({ data }) => {
        return window.editor
          .chain()
          .focus()
          .insertContentAt(rangeRef.current, processDataToBlock(data))
          .run();
      })
      .then(() => {
        rangeRef.current = null;
        setShowing(false);
      });
  };
  return (
    showing && (
      <Modal>
        <div className="ImportModal">
          <input
            onChange={(e) => setImportUrl(e.target.value)}
            ref={importRef}
            value={importUrl}
            placeholder="https://www.dndbeyond.com/..."
            type="text"
          />
          <button onClick={onImport}>Import</button>
        </div>
      </Modal>
    )
  );
};

export default ImportModal;
