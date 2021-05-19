import { monsterImport, MONSTER_REGEX } from "./monster";

const PROXY_URL = `/.netlify/functions`;

const ddbImport = (url) => {
  let processFunction;
  if (MONSTER_REGEX.test(url)) {
    const name = url.match(MONSTER_REGEX)[2];
    if (!name) throw new Error("No monster name!");
    return fetch(`${PROXY_URL}/monsters`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cobalt:
          "eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..M8BeGrinvr3bE20CGIu4dQ.1OyNemWcpERC-YOouORG2CWujm44ZbG_5CJfScM72gCH6dB19giu7C8ClS_YnRr0.ZguZxNaiLdVZHoYLzOkWHA",
        searchTerm: name,
        exactMatch: true,
      }),
    })
      .then((r) => r.json())
      .then(({ data }) => monsterImport(data));
  }
  return Promise.reject();
};

export default ddbImport;
