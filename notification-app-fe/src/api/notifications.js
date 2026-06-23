import { Log } from "../logger";

const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJhbXVqdXJpc2FpcHJhdmVlbi4yMy5jc21AYW5pdHMuZWR1LmluIiwiZXhwIjoxNzgyMTk4ODE0LCJpYXQiOjE3ODIxOTc5MTQsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiIyNmU5MzEwYi0xN2Y0LTQ0N2YtYTdlYy01OTM5NTJjNGIyNTgiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJhbXVqdXJpIHNhaSBwcmF2ZWVuIiwic3ViIjoiODQ3OGNlNjMtYjJhYi00N2ZlLTliNzEtNjA5Mzk4MzkyY2YzIn0sImVtYWlsIjoiYW11anVyaXNhaXByYXZlZW4uMjMuY3NtQGFuaXRzLmVkdS5pbiIsIm5hbWUiOiJhbXVqdXJpIHNhaSBwcmF2ZWVuIiwicm9sbE5vIjoiYTIzMTI2NTUyMjc2IiwiYWNjZXNzQ29kZSI6Ik1UcXhhciIsImNsaWVudElEIjoiODQ3OGNlNjMtYjJhYi00N2ZlLTliNzEtNjA5Mzk4MzkyY2YzIiwiY2xpZW50U2VjcmV0IjoiR1dLdkFkdFB0akJBYkRhcSJ9.ztl86cYFcWK1E1MG8U7289qSBvYIq4-2-LG1sRKX0OY";

export async function fetchNotifications(
  page,
  limit,
  notificationType
) {
  let url =
    "http://4.224.186.213/evaluation-service/notifications?page=" +
    page +
    "&limit=" +
    limit;

  if (
    notificationType &&
    notificationType !== "All"
  ) {
    url =
      url +
      "&notification_type=" +
      notificationType;
  }

  try {
    await Log(
      "frontend",
      "info",
      "api",
      "fetch notifications called"
    );

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization:
          "Bearer " + ACCESS_TOKEN
      }
    });

    const data =
      await response.json();

    return data;
  } catch (error) {
    await Log(
      "frontend",
      "error",
      "api",
      "notification fetch failed"
    );

    return {
      notifications: []
    };
  }
}