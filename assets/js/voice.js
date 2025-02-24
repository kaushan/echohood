export async function generateSpeech(text, voiceid) {
    console.log('generateSpeech function called');
    
    try {
        console.log('generateSpeech function called', text);
        // API endpoint
        const voiceId = voiceid || 'fFEdjRYjm0g861eu6r3F';
        const url = 'https://api.elevenlabs.io/v1/text-to-speech/' + voiceId;

        // API key
        const apiKey = localStorage.getItem('11LABS_API_KEY');
        if (!apiKey) {
            throw new Error('MISTRAL_API_KEY is not set');
        }

        // Payload
        const data = {
            text: text,
            model_id: 'eleven_monolingual_v1',
            voice_settings: {
                stability: 0.5,
                similarity_boost: 0.5
            }
        };

        // Request options
        const options = {
            method: 'POST',
            headers: {
                'xi-api-key': apiKey,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };

        // Send request
        const response = await fetch(url, options);

        if (response.ok) {
            const audioBlob = await response.blob();
            const audioUrl = URL.createObjectURL(audioBlob);
            return audioUrl;
        } else {
            const errorText = await response.text();
            console.error('Error:', response.status, errorText);
            return null;
        }
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

