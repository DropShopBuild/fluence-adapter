import { Builder } from "@chainlink/ea-bootstrap";
import {
  AdapterRequest,
  APIEndpoint,
  ExecuteFactory,
  ExecuteWithConfig,
  Config,
} from "@chainlink/types";
import { makeConfig } from "./config";
import * as endpoints from "./endpoint";

export const execute: ExecuteWithConfig<Config> = async (
  request,
  context,
  config
) => {
  config = config || makeConfig();
  return Builder.buildSelector(request, context, config, endpoints);
};

export const endpointSelector = (request: AdapterRequest): APIEndpoint =>
  Builder.selectEndpoint(request, makeConfig(), endpoints);

export const makeExecute: ExecuteFactory<Config> = (config?) => {
  return async (request, context) =>
    execute(request, context, config || makeConfig());
};
