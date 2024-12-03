// Define the Bearer Token and URL



const BEARER_TOKEN = "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";
const API_URL = "https://api.groq.com/openai/v1/chat/completions";



// Function to send the request
const sendRequest = async (base64String) => {
    try {
        // Request payload
        const payload = {
            messages: [
                {
                    role: "user",
                    content: [
                        { type: "text", text: 'Name the pokemon only. Say if you cant.' },
                        { type: "image_url", image_url: { url: `${base64String}` } },
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
        return result.choices[0].message.content;
    } catch (error) {
        console.error("Error:", error.message);
    }
};

// Call the function with the image file path
export default sendRequest;