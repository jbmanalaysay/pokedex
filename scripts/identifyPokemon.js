// Define the Bearer Token and URL
import { readFile } from 'fs/promises';

const BEARER_TOKEN = "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";
const API_URL = "https://api.groq.com/openai/v1/chat/completions";

// Convert an image file to Base64
const convertImageToBase64 = async (imageFilePath) => {
    const fileBuffer = await readFile(imageFilePath); // Read the file
    return fileBuffer.toString("base64"); // Convert buffer to Base64
};

// Function to send the request
const sendRequest = async (imageFilePath) => {
    try {
        // Convert the image to Base64
        const imagebase64 = await convertImageToBase64(imageFilePath);

        // Request payload
        const payload = {
            messages: [
                {
                    role: "user",
                    content: [
                        { type: "text", text: 'Name the pokemon only. Say if you cant.' },
                        { type: "image_url", image_url: { url: `data:image/jpeg;base64,${imagebase64}` } },
                    ],
                },
            ],
            model: "llama-3.2-90b-vision-preview",
        };

        // Make the POST request using fetch
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${BEARER_TOKEN}`
            },
            body: JSON.stringify(payload),
        });

        // Parse and log the response
        if (response.status !==200) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        console.log("Response:", JSON.stringify(result, null, 2));
    } catch (error) {
        console.error("Error:", error.message);
    }
};

// Call the function with the image file path
sendRequest("C:\\Users\\manal\\Downloads\\images (16).png"); // Replace with the actual image file path
