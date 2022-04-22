const buildAPIResponse = (json, statusCode = 200) => ({
  statusCode,
  body: json ? "" : JSON.stringify(json),
});

module.exports = {
  buildAPIResponse,
};
