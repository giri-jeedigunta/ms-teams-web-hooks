const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

  require('dotenv').config()
  function generateTeamsMessageCard(totals) {
    const expression = 'Test'

    return teamsTemplate = {
        "@type": "MessageCard",
        "@context": "http://schema.org/extensions",
        "themeColor": "064e3b",
        "summary": `PS ❤️ Musikhjälpen - 2022`,
        "sections": [
            {
                "text": `
                <div style='
                    font-family: Consolas, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", Monaco, "Courier New", Courier, monospace;
                    background-color: #064e3b;
                    padding: .5rem;
                    color: white;
                '>
                <h1 style='margin:0 auto;padding:8px 0;text-align:center'>PS ❤️ Musikhjälpen</h1>
                <div style='display:flex;flex-wrap:wrap;justify-content:space-between;color:#fff;background-color:#064e3b;box-sizing:border-box;'> 
                <div style='flex: 0 32%; margin: 0.5%; background: rgb(6 95 70); border: 1px solid rgb(4 120 87); border-radius: 0.5rem; box-sizing: border-box;''> 
                    <div style='box-sizing: border-box; height: 100px; overflow: hidden; background: url(https://ps-musikhjalpen.vercel.app/_next/image?url=%2Fgbg.webp&w=828&q=75);background-size: 200px 100px; background-repeat: no-repeat;'></div> 
                    <div style='margin:0;padding:1rem'> 
                        <h2 style='margin:0;padding:0 0 5px;font-weight:normal;font-size:20px;line-height:28px;'>${expression}</h2> 
                        <h3 style='margin:0;padding:0 0 10px;font-weight:700;font-size:30px;line-height:36px;'>1400 SEK</h3> 
                        <button style='background: transparent; display: block; border: 0; text-align: center; margin: 0; border-radius: 0.5rem;'> <span style='background: rgb(190 18 60); color: #fff;'><a href="https://bossan.musikhjalpen.se/publicis-sapient-gothenburg-office" target="_blank" rel="noreferrer" style='border-radius: 0.5rem; background: rgb(190 18 60); color: #fff; padding: 14px; font-size: 14px; text-transform: uppercase; text-decoration: none; border: 0; color: #fff; display: block; font-weight: bold;'>DONATE</a ></span > </button> 
                    </div> 
                </div> 
                </div>
                </div>
            `
            }
        ]
    }
}

let temp = generateTeamsMessageCard();

console.log(temp);

async function sendUpdatesTeamMessage(template) {
    const result = fetch(process.env.TEAMS_HOOK_URL, {
        method: 'post',
        body: JSON.stringify(generateTeamsMessageCard()),
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