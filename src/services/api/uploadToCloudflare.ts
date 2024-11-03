// export async function uploadToCloudflare(imageData: File) {
//   try {
//     const formData = new FormData();
//     formData.append("file", imageData); // Append the image data to FormData

//     const response = await axios.post(
//       "https://api.cloudflare.com/client/v4/accounts/bde5bd3a01beddab331fa8720a225013/images/v1",
//       formData,
//       {
//         headers: {
//           Authorization: `Bearer xyNzDn3HEv0gSH9V2Ba9Ti7LmaFpkxvRYzHQxseW`,
//           "Content-Type": "multipart/form-data", // Set content type to multipart/form-data
//         },
//       }
//     );

//     console.log("Upload successful:", response.data);
//     return response.data;
//   } catch (error) {
//     console.error("Upload failed:", error);
//     throw error;
//   }
// }

export async function uploadToCloudflare(imageData: File) {
  try {
    const formData = new FormData();
    formData.append("file", imageData); // Append the image data to FormData

    const response = await fetch(
      "https://api.cloudflare.com/client/v4/accounts/bde5bd3a01beddab331fa8720a225013/images/v1",
      {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer xyNzDn3HEv0gSH9V2Ba9Ti7LmaFpkxvRYzHQxseW`,
          "Content-Type": "multipart/form-data", // Set content type to multipart/form-data
        },
      }
    );

    if (!response.ok) {
      throw new Error("Upload failed");
    }

    const data = await response.json();
    console.log("Upload successful:", data);
    return data;
  } catch (error) {
    console.error("Upload failed:", error);
    throw error;
  }
}
