const authentication = require("../../ddb-proxy/auth");
const items = require("../../ddb-proxy/items");
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
  const { cobalt, campaignId } = event.body;
  if (!cobalt || cobalt == "") {
    return buildAPIResponse(
      {
        success: false,
        message: "No cobalt token",
      },
      401
    );
  }

  const cacheId = authentication.getCacheId(cobalt);
  const campaignId = event.body.campaignId;
  const token = authentication.getBearerToken(cacheId, cobalt);
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
    const data = await items.extractItems(cacheId, campaignId);
    return buildAPIResponse(
      {
        success: true,
        message: "All available items successfully received.",
        data: data,
      },
      200
    );
  } catch (error) {
    if (error === "Forbidden") {
      return buildAPIResponse(
        {
          success: false,
          message: "You must supply a valid bearer token.",
        },
        401
      );
    }
    return buildAPIResponse(
      {
        success: false,
        message: "Unknown error during item loading: " + error,
      },
      500
    );
  }
};

exports.handler = handler;
