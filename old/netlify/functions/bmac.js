require("dotenv").config();
const BMC = require("buymeacoffee.js");
const { buildAPIResponse } = require("./utils");

const coffee = new BMC(process.env.BMACTOKEN);

const handler = async (event, context) => {
  console.log(process.env.BMACTOKEN);
  coffee.Supporters((data) => {
    console.log(data);
  });
  return buildAPIResponse(
    {
      data: {},
    },
    200
  );
};

exports.handler = handler;
