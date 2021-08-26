export const fetcher = async (url: string) => {
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  // If the status code is not in the range 200-299,
  // the body should be status object in JSON
  if (!res.ok) {
    const error: any = new Error("An error occurred while fetching the data.");
    // Attach extra info to the error object.
    error.status = await res.json();
    throw error;
  }

  return res.json();
};
