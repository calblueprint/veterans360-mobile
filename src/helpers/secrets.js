import { Constants } from "expo";

const ENV = {
  dev: "http://10.6.9.136:3000",
  prod: "https://boiling-falls-70427.herokuapp.com/",
};

function getEnvVars(env = "") {
  if (env === null || env === undefined || env === "") return ENV.dev;
  if (env.indexOf("dev") !== -1) return ENV.dev;
  if (env.indexOf("prod") !== -1) return ENV.prod;
}

const HOST_ADDR = getEnvVars(Constants.manifest.releaseChannel);

export { HOST_ADDR };
