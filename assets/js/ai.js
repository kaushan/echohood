export async function getPlaceDescription(name, address) {
    const apiKey = localStorage.getItem('MISTRAL_API_KEY');
    if (!apiKey) {
      throw new Error('MISTRAL_API_KEY is not set');
    }
    const prompt = `Provide a short, around 50 words, informative description as for audio tour/guide for the following location:\n\nName: ${name}\nAddress: ${address}\n\nDescription:`;
    console.log('getPlaceDescription function called');
    console.log('Prompt:', prompt);
    const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}` // Replace with your actual API key
      },
      body: JSON.stringify({
        model: 'mistral-medium', // or your preferred model
        messages: [
          { role: 'user', content: prompt }
        ],
        max_tokens: 500
      })
    });
  
    const data = await response.json();
    console.log('Response:', data);
  
    if (response.ok) {
      return data.choices[0].message.content.trim();
    } else {
      throw new Error(`API Error: ${data.error.message}`);
    }
  }

  export async function getMistralAIResponse(prompt, maxTokens = 150) {
    const apiKey = localStorage.getItem('MISTRAL_API_KEY');
    if (!apiKey) {
      throw new Error('MISTRAL_API_KEY is not set');
    }
    const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}` // Replace with your actual API key
      },
      body: JSON.stringify({
        model: 'mistral-medium', // or your preferred model
        messages: [
          { role: 'user', content: prompt }
        ],
        max_tokens: maxTokens
      })
    });
  
    const data = await response.json();
  
    if (response.ok) {
      return data.choices[0].message.content.trim();
    } else {
      throw new Error(`API Error: ${data.error.message}`);
    }
  }
  

  