const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJhbXVqdXJpc2FpcHJhdmVlbi4yMy5jc21AYW5pdHMuZWR1LmluIiwiZXhwIjoxNzgyMTkyNjE5LCJpYXQiOjE3ODIxOTE3MTksImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiI2OTgwNGViYi00ZmIyLTQ3NzAtYmVjMS02NzhkYzRlODk0NzEiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJhbXVqdXJpIHNhaSBwcmF2ZWVuIiwic3ViIjoiODQ3OGNlNjMtYjJhYi00N2ZlLTliNzEtNjA5Mzk4MzkyY2YzIn0sImVtYWlsIjoiYW11anVyaXNhaXByYXZlZW4uMjMuY3NtQGFuaXRzLmVkdS5pbiIsIm5hbWUiOiJhbXVqdXJpIHNhaSBwcmF2ZWVuIiwicm9sbE5vIjoiYTIzMTI2NTUyMjc2IiwiYWNjZXNzQ29kZSI6Ik1UcXhhciIsImNsaWVudElEIjoiODQ3OGNlNjMtYjJhYi00N2ZlLTliNzEtNjA5Mzk4MzkyY2YzIiwiY2xpZW50U2VjcmV0IjoiR1dLdkFkdFB0akJBYkRhcSJ9.So66aHz0kYpDX6V-1hJN7fa2qit75Ob7md6PKoL1Wj0";

async function Log(stack, level, packageName, message) {
    const bodyData = {
        stack: stack,
        level: level,
        package: packageName,
        message: message
    };

    try {
        await fetch("http://4.224.186.213/evaluation-service/logs", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + ACCESS_TOKEN
            },
            body: JSON.stringify(bodyData)
        });
    } catch (error) {
        console.log("Log API Error:", error.message);
    }
}

module.exports = Log;