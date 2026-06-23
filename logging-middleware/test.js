const Log = require("./logger");

async function test() {
    await Log(
        "backend",
        "info",
        "utils",
        "testing logger from node"
    );

    console.log("Test completed");
}

test();