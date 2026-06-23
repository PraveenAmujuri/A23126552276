require("dotenv").config();

const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
console.log("TOKEN:", ACCESS_TOKEN);

async function Log(stack, level, packageName, message) {
    const bodyData = {
        stack: stack,
        level: level,
        package: packageName,
        message: message
    };

    try {
        const response = await fetch(
            "http://4.224.186.213/evaluation-service/logs",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + ACCESS_TOKEN
                },
                body: JSON.stringify(bodyData)
            }
        );

        if (!response.ok) {
            console.log(
                "Logging failed with status:",
                response.status
            );
            return;
        }

        const data = await response.json();

        console.log(
            "Log created:",
            data.logID
        );
    } catch (error) {
        console.log(
            "Log API Error:",
            error.message
        );
    }
}

module.exports = Log;