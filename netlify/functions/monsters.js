const authentication = require("../../ddb-proxy/auth");
const crypto = require("crypto");
const monsters = require("../../ddb-proxy/monsters");
const { buildAPIResponse } = require("./utils");

const handler = async (event, context) => {
  if (!event.body)
    return buildAPIResponse(
      {
        success: false,
        message: "No body!",
      },
      500
    );

  const {
    cobalt,
    sources,
    search,
    searchTerm,
    homebrew,
    homebrewOnly,
    exactNameMatch,
  } = JSON.parse(event.body);

  if (!cobalt || cobalt == "") {
    return buildAPIResponse(
      {
        success: false,
        message: "No cobalt token",
      },
      401
    );
  }

  const performExactMatch = exactNameMatch && searchTerm && searchTerm !== "";
  const hash = crypto.createHash("sha256");
  hash.update(cobalt + searchTerm);
  const cacheId = hash.digest("hex");

  const token = await authentication.getBearerToken(cacheId, cobalt);
  if (!token) {
    return buildAPIResponse(
      {
        success: false,
        message: "You must supply a valid cobalt value.",
      },
      401
    );
  }

  try {
    const data = await monsters.extractMonsters(
      cacheId,
      searchTerm,
      homebrew,
      homebrewOnly,
      sources
    );
    let returnMonsters = {};
    if (performExactMatch) {
      const filteredMonsters = data.filter((monster) => {
        return (
          monster.name.toLowerCase() === searchTerm.toLowerCase() ||
          monster.url ===
            `https://www.dndbeyond.com/monsters/${searchTerm.toLowerCase()}`
        );
      });
      returnMonsters = filteredMonsters;
    } else {
      returnMonsters = data;
    }
    return buildAPIResponse({
      success: true,
      message: "All available monsters successfully received.",
      data: data,
    });
  } catch (error) {
    console.log(error);
    if (error === "Forbidden") {
      return res.json({
        success: false,
        message: "You must supply a valid cobalt value.",
      });
    }
    return res.json({
      success: false,
      message: "Unknown error during monster loading: " + error,
    });
  }
};

exports.handler = handler;
