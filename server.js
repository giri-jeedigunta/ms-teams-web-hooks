const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));


async function sendUpdatesTeamMessage(template) {
    const result = fetch('YOU_HOOKS_URL', {
        method: 'post',
        body: JSON.stringify({
            "@type": "MessageCard",
            "@context": "http://schema.org/extensions",
            "themeColor": "0f0f23",
            "summary": `Test Hook by Giri`,
            "sections": [
                {
                    "text": "HEllo World"
                }
            ]
        }),
        headers: { 'Content-Type': 'application/json' },
    }).then(response => response.text())
        .then(data => {
            console.log('response --- ', data);
            // Teams webhook sends back a body with '1' on success
            if (data !== '1') {
                // Various errors can come back as body messages with a 200 status code, which maskes errors as success
                throw new Error('Failed to send the Message. The Teams webhook responded with the following error:\n\    ' + data)
            }
        })
    return result
}

sendUpdatesTeamMessage();