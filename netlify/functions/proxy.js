export async function handler(event) {
  try {
    const targetUrl = "https://learn.zone01oujda.ma" + event.path.replace("/.netlify/functions/proxy", "");
    
    const response = await fetch(targetUrl, {
      method: event.httpMethod,
      headers: {
        ...event.headers,
        host: "learn.zone01oujda.ma",
      },
      body: ["GET", "HEAD"].includes(event.httpMethod) ? undefined : event.body,
    });

    const body = await response.text();

    return {
      statusCode: response.status,
      body,
      headers: {
        "Content-Type": response.headers.get("content-type"),
      },
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}
