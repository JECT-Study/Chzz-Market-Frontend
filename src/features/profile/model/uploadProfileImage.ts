export const uploadProfileImage = async (uploadUrl: string, file: File | null) => {
  try {
    const response = await fetch(uploadUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "text/plain",
      },
      body: file
    });

    if (!response.ok) {
      throw new Error(`Failed to upload image: ${response.statusText}`);
    }

    return response; // fetch returns a Response object
  } catch (error) {
    throw error;
  }
};