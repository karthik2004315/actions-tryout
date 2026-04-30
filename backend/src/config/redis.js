const { createClient } = require("redis")
const client = createClient({
    url: "redis://redis:6379"
});
client.connect().catch(console.error);
module.exports = client;