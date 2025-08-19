export async function login(username, password) {
  try {
    const res = await fetch("https://learn.zone01oujda.ma/api/auth/signin", {
      method: "POST",
      headers: {
        "Authorization": "Basic " + btoa(username + ":" + password),
      },
      credentials: "include" // store cookie
    });

    if (!res.ok) throw new Error("Invalid credentials");
    return true; // cookie set
  } catch (err) {
    throw err;
  }
}

export async function logout() {
  await fetch("https://learn.zone01oujda.ma/api/auth/signout", {
    method: "POST",
    credentials: "include"
  });
}
