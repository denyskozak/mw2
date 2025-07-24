import { ASSET_BASE_URL } from "../consts/index.js";

export function assetUrl(path) {
  if (!path.startsWith("/")) {
    path = `/${path}`;
  }

  return `${ASSET_BASE_URL}${path}`;
}
