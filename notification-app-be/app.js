const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJhbXVqdXJpc2FpcHJhdmVlbi4yMy5jc21AYW5pdHMuZWR1LmluIiwiZXhwIjoxNzgyMTk4ODE0LCJpYXQiOjE3ODIxOTc5MTQsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiIyNmU5MzEwYi0xN2Y0LTQ0N2YtYTdlYy01OTM5NTJjNGIyNTgiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJhbXVqdXJpIHNhaSBwcmF2ZWVuIiwic3ViIjoiODQ3OGNlNjMtYjJhYi00N2ZlLTliNzEtNjA5Mzk4MzkyY2YzIn0sImVtYWlsIjoiYW11anVyaXNhaXByYXZlZW4uMjMuY3NtQGFuaXRzLmVkdS5pbiIsIm5hbWUiOiJhbXVqdXJpIHNhaSBwcmF2ZWVuIiwicm9sbE5vIjoiYTIzMTI2NTUyMjc2IiwiYWNjZXNzQ29kZSI6Ik1UcXhhciIsImNsaWVudElEIjoiODQ3OGNlNjMtYjJhYi00N2ZlLTliNzEtNjA5Mzk4MzkyY2YzIiwiY2xpZW50U2VjcmV0IjoiR1dLdkFkdFB0akJBYkRhcSJ9.ztl86cYFcWK1E1MG8U7289qSBvYIq4-2-LG1sRKX0OY";

async function fetchNotifications() {
    const response = await fetch(
        "http://4.224.186.213/evaluation-service/notifications",
        {
            method: "GET",
            headers: {
                Authorization: "Bearer " + ACCESS_TOKEN
            }
        }
    );

    const data = await response.json();

    return data.notifications;
}

function getWeight(type) {
    if (type === "Placement") {
        return 3;
    }

    if (type === "Result") {
        return 2;
    }

    return 1;
}

function calculateScore(notification) {
    const weight = getWeight(notification.Type);

    const timeValue =
        new Date(notification.Timestamp).getTime();

    return weight * 1000000000000 + timeValue;
}

function sortNotifications(notificationList) {
    let tempList = [...notificationList];

    for (let i = 0; i < tempList.length; i++) {
        for (
            let j = i + 1;
            j < tempList.length;
            j++
        ) {
            const firstScore =
                calculateScore(tempList[i]);

            const secondScore =
                calculateScore(tempList[j]);

            if (secondScore > firstScore) {
                const temp = tempList[i];
                tempList[i] = tempList[j];
                tempList[j] = temp;
            }
        }
    }

    return tempList;
}

async function main() {
    const notifications =
        await fetchNotifications();

    const sortedNotifications =
        sortNotifications(notifications);

    console.log("TOP 10 PRIORITY NOTIFICATIONS");

    for (
        let i = 0;
        i < 10 &&
        i < sortedNotifications.length;
        i++
    ) {
        console.log(
            i + 1,
            sortedNotifications[i]
        );
    }
}

main();