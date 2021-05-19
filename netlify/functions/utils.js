const buildAPIResponse = (json, statusCode = 200) => ({
  statusCode,
  body: JSON.stringify(json),
});

module.exports = {
  buildAPIResponse,
};
