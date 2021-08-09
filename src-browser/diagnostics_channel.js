import * as dc from "../node_modules/diagnostics_channel/index.js";

const { channel, Channel, hasSubscribers } = dc

export default {
    channel,
    Channel,
    hasSubscribers
};

export { channel, hasSubscribers, Channel };
