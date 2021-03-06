import { Requester, Validator } from "@chainlink/ea-bootstrap";
import { Config, ExecuteWithConfig, InputParameters } from "@chainlink/types";
//import { NAME as AdapterName } from "../config";

// This should be filled in with a lowercase name corresponding to the API endpoint
export const supportedEndpoints = ["price"];

export const endpointResultPaths = {
  example: "price",
};

export interface ResponseSchema {
  data: {
    // Some data
  };
}

const customError = (data: any) => data.Response === "Error";

export const inputParameters: InputParameters = {
  base: ["base", "from", "coin"],
  quote: ["quote", "to", "market"],
  resultPath: false,
};

export const execute: ExecuteWithConfig<Config> = async (
  request,
  _,
  config
) => {
  const validator = new Validator(request, inputParameters);
  if (validator.error) throw validator.error;

  const jobRunID = validator.validated.id;
  // const base = validator.overrideSymbol(AdapterName);
  // const quote = validator.validated.data.quote;
  const url = `price`;
  //const resultPath = validator.validated.data.resultPath;
  const fsym = validator.validated.data.base.toUpperCase();
  const tsyms = validator.validated.data.quote.toUpperCase();

  const params = {
    fsym,
    tsyms,
    api_key: config.apiKey,
  };

  const options = { ...config.api, params, url };

  const response = await Requester.request(options, customError);
  const result = Requester.validateResultNumber(response.data, [tsyms]);

  return Requester.success(
    jobRunID,
    Requester.withResult(response, result),
    config.verbose
  );
};
