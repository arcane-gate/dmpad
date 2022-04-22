require("dotenv").config();
const { buildAPIResponse } = require("./utils");
const fetch = require("node-fetch");

const searchURL =
  "https://api.bing.microsoft.com/v7.0/images/search?imageType=Transparent";

const handler = async (event, context) => {
  const { q } = event.queryStringParameters;
  try {
    fetch(
      "https://api.bing.microsoft.com/v7.0/images/search?imageType=Transparent&q=dragon",
      {
        method: "GET",
        credentials: "omit",
        headers: {
          Accept: "*/*",
          "Accept-Language": "en-US,en;q=0.5",
          "Ocp-Apim-Subscription-Key": "380f47e379dc4cd5967dc9fea0011c76",
          "Sec-GPC": "1",
        },
        mode: "cors",
      }
    )
      .then((r) => r.json())
      .then(console.log)
      .catch((err) => {
        console.error(err);
      });
    return buildAPIResponse({}, 200);
  } catch (err) {
    return buildAPIResponse({ error: err }, 500);
  }
};

exports.handler = handler;
