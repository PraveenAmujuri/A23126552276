const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJhbXVqdXJpc2FpcHJhdmVlbi4yMy5jc21AYW5pdHMuZWR1LmluIiwiZXhwIjoxNzgyMTk4ODE0LCJpYXQiOjE3ODIxOTc5MTQsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiIyNmU5MzEwYi0xN2Y0LTQ0N2YtYTdlYy01OTM5NTJjNGIyNTgiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJhbXVqdXJpIHNhaSBwcmF2ZWVuIiwic3ViIjoiODQ3OGNlNjMtYjJhYi00N2ZlLTliNzEtNjA5Mzk4MzkyY2YzIn0sImVtYWlsIjoiYW11anVyaXNhaXByYXZlZW4uMjMuY3NtQGFuaXRzLmVkdS5pbiIsIm5hbWUiOiJhbXVqdXJpIHNhaSBwcmF2ZWVuIiwicm9sbE5vIjoiYTIzMTI2NTUyMjc2IiwiYWNjZXNzQ29kZSI6Ik1UcXhhciIsImNsaWVudElEIjoiODQ3OGNlNjMtYjJhYi00N2ZlLTliNzEtNjA5Mzk4MzkyY2YzIiwiY2xpZW50U2VjcmV0IjoiR1dLdkFkdFB0akJBYkRhcSJ9.ztl86cYFcWK1E1MG8U7289qSBvYIq4-2-LG1sRKX0OY";

export async function Log(
  stack,
  level,
  packageName,
  message
) {
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
          Authorization:
            "Bearer " +
            ACCESS_TOKEN
        },
        body: JSON.stringify(
          bodyData
        )
      }
    );

    if (!response.ok) {
      console.log(
        "Log failed:",
        response.status
      );
      return;
    }

    const data =
      await response.json();

    console.log(
      "Log created:",
      data.logID
    );
  } catch (error) {
    console.log(
      "Logger Error:",
      error.message
    );
  }
}