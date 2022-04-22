const crypto = require("crypto");

const CONFIG = require("./config.js");

const filterModifiers = require("./filterModifiers.js");

const spells = require("./spells.js");
const character = require("./character.js");

/**
 * Get Class Spells RAW
 */
app.options("/proxy/class/spells", cors(), (req, res) =>
  res.status(200).send()
);
app.post("/proxy/class/spells", cors(), express.json(), (req, res) => {
  const className = req.body.className
    ? req.body.className
    : req.params.className;
  const campaignId = req.body.campaignId;

  const klass = CONFIG.classMap.find((cls) => cls.name == className);
  if (!klass) return res.json({ success: false, message: "Invalid query" });
  if (!req.body.cobalt || req.body.cobalt == "")
    return res.json({ success: false, message: "No cobalt token" });
  const cobaltToken = req.body.cobalt;

  const cacheId = authentication.getCacheId(cobaltToken);

  const mockClass = [
    {
      characterClassId: cacheId,
      name: klass.name,
      id: klass.id,
      level: 20,
      spellLevelAccess: 20,
      spells: [],
      classId: klass.id,
      subclassId: klass.id,
      characterClass: klass.name,
      characterSubclass: klass.name,
      characterId: cacheId,
      spellType: klass.spells,
      campaignId: campaignId,
    },
  ];

  authentication.getBearerToken(cacheId, cobaltToken).then((token) => {
    if (!token)
      return res.json({
        success: false,
        message: "You must supply a valid cobalt value.",
      });
    spells
      .loadSpells(mockClass, cacheId, true)
      .then((data) => {
        // console.log(data);
        const rawSpells = data.map((d) => d.spells).flat();
        // const parsedSpells = getSpells(rawSpells);
        // return parsedSpells;
        return rawSpells;
      })
      .then((data) => {
        return res.status(200).json({
          success: true,
          message: "All available spells successfully received.",
          data: data,
        });
      })
      .catch((error) => {
        console.log(error);
        if (error === "Forbidden") {
          return res.json({
            success: false,
            message: "You must supply a valid cobalt value.",
          });
        }
        return res.json({
          success: false,
          message: "Unknown error during spell loading: " + error,
        });
      });
  });
});

/**
 * Attempt to parse the character remotely
 */
app.options("/proxy/character", cors(), (req, res) => res.status(200).send());
app.post("/proxy/character", cors(), express.json(), (req, res) => {
  // check for cobalt token
  const cobalt = req.body.cobalt;

  let characterId = 0;
  try {
    const characterIdString = req.body.characterId
      ? req.body.characterId
      : req.params.characterId;
    characterId = parseInt(characterIdString);
  } catch (exception) {
    return res.json({ message: "Invalid query" });
  }

  const updateId = req.body.updateId ? req.body.updateId : 0;
  const cobaltId = `${characterId}${cobalt}`;

  authentication.getBearerToken(cobaltId, cobalt).then(() => {
    character
      .extractCharacterData(cobaltId, characterId, updateId) // this caches
      .then((data) => {
        console.log(
          `Name: ${data.name}, URL: ${CONFIG.urls.baseUrl}/character/${data.id}`
        );
        return Promise.resolve(data);
      })
      .then((result) => {
        if (cobalt) {
          const campaignId =
            result.campaign && result.campaign.id && result.campaign.id !== ""
              ? result.campaign.id
              : null;
          const optionIds = result.optionalClassFeatures.map(
            (opt) => opt.classFeatureId
          );
          return character.getOptionalFeatures(
            result,
            optionIds,
            campaignId,
            cobaltId
          );
        } else {
          return result;
        }
      })
      .then((result) => {
        const spellListIds = result.classOptions
          ? result.classOptions
              .filter((option) => option.spellListIds)
              .map((option) => option.spellListIds)
              .flat()
          : [];
        return spells.getSpellAdditions(result, spellListIds, cobaltId);
      })
      .then((data) => {
        data = filterModifiers(data);
        return {
          success: true,
          messages: ["Character successfully received."],
          ddb: data,
        };
      })
      .then((data) => {
        return res.status(200).json(data);
      })
      .catch((error) => {
        console.log(error);
        if (error === "Forbidden") {
          return res.json({
            success: false,
            message:
              "Character must be set to public in order to be accessible.",
          });
        }
        return res.json({
          success: false,
          message: "Unknown error during character parsing: " + error,
        });
      });
  });
});
