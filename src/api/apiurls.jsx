export const baseURL = "https://telemetriaperu.com:4015";

export const WEBSOCKET_SERVER = "ws://samloto.com:7094/ws";

export const loginURL = `${baseURL}/login`;
export const baseAPIURL = `${baseURL}/api`;

// Device  group routes
export const DeviceGroupRoutes = {
  base: `${baseAPIURL}/device-groups`,
  paged: `${baseAPIURL}/device-groups/paged`,
  auth: `${baseAPIURL}/device-groups/auth-web`,
  byGroup: `${baseAPIURL}/device-groups/by-group`,
  groupCredentials: `${baseAPIURL}/device-groups/credentials`,
  wifiCredentials: `${baseAPIURL}/device-groups/wifi`,
};

export const DeviceRoutes = {
  base: `${baseAPIURL}/devices`,
  paged: `${baseAPIURL}/devices/paged`,
  update: `${baseAPIURL}/devices/update`,
  byGroup: `${baseAPIURL}/devices/group`,
};
