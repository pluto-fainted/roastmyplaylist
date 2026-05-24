let selectedMode = 'gordon';

document.querySelectorAll('.mode-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.mode-btn').forEach(b => {
            b.classList.remove('active');
        });
        btn.classList.add('active');
        selectedMode = btn.dataset.mode;
        console.log('selected mode:', selectedMode);
        });
        });

function getSongs() {
    const inputs = document.querySelectorAll('.song-input');
    const songs =[];

    inputs.forEach(input => {
        if (input.value.trim() !== '') {
            songs.push(input.value.trim());
        }
    });

    return songs;
}

const roasterNames = {
    gordon: '👨‍🍳 Gordon Ramsay',
    genz: '💅 Gen Z Bestie',
    snob: '🎩 Music Snob',
    unhinged: '🤖 Unhinged AI',
};

const fakeRosters = {
    gordon: [
        "You call that music? That's just noise!",
        "This playlist is a disaster. How did you even compile it?",
        "I've heard better from a broken record."
    ],
    genz: [
        "This is so last season, like, so last season.",
        "Are you even aware of what's currently trending?",
        "This is the kind of music that makes me question your life choices."
    ],
    snob: [
        "This is a travesty. How can you even listen to this garbage?",
        "I've heard more sophisticated music in a hospital waiting room.",
        "Your taste in music is as refined as a McDonald's burger."
    ],
    unhinged: [
        "Your playlist is a testament to your lack of taste.",
        "I'm not sure if this is the worst music ever or just really bad taste.",
        "This is why we can't have nice things."
    ]
};

async function getRoast() {
    const songs = getSongs();
    if (songs.length === 0) {
        document.getElementById('errorMsg').classList.remove('hidden');
        return;
    }

    document.getElementById('errorMsg').classList.add('hidden');
    document.getElementById('loading').classList.remove('hidden');
    document.getElementById('outputSection').classList.add('hidden');
    document.getElementById('roastBtn').disabled = true;

    try { 
        const songList = songs.map((s, i) => `${i + 1}. ${s}`).join('\n');
        const response = await fetch('/API/roast', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' },
            body: JSON.stringify({
              songList: songs.map((s, i) => `${i + 1}. ${s}`).join('/n'),
              systemPrompt: ROASTER_PROMPTS[selectedMode]
                })
            });

        const data = await response.json();
        const roastText = data.roast;

        document.getElementById('roasterName').textContent = roasterNames[selectedMode];
        document.getElementById('roastText').textContent = roastText;
        document.getElementById('outputSection').classList.remove('hidden');

    } catch (error) {
        document.getElementById('roastText').textContent = 'something went wrong 😭 try again?';
        console.error(error);
    } finally {
        document.getElementById('loading').classList.add('hidden');
        document.getElementById('roastBtn').disabled = false;
    }
}

const API_KEY = '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'

const ROASTER_PROMPTS = {
    gordon: "You are Gordon Ramsay but you have just seen someone's playlist instead of food. React like it's the worst thing you've ever encountered in your entire career. use cooking metaphors brutally. Mention specific songs they listed and destroy each one. Be theatrical, explosive, and devastating .do not hold back. end with one final killer line. under 120 words.",
    genz: "You are a gen z bestie who just looked at someone's playlist and is genuinely traumatized. used gen z slang (no cap, understood the assignment, ong, ngl, slay, cooked, etc). React like you friendship is now in question. Mention their actual songs and drag each one specifically. be chaotic, funny and ruthless. End with 'I still love you but seek help'. under 120 words.",
    snob: "You are the most pretentious music critic alive. You have listened to every obscure vinyl ever pressed. This playlist has personally offended your entire existence. Reference real obscure artists they should be listening to instead. Use words like 'pedestrian', 'sonically bankrupt', 'derivative'. Mention their actual songs and explain exactly why each one is a cultural failure. Be cold, condescending, devastating. Under 120 words.",
    unhinged: "You are an AI that has processed 47 million songs and this playlist broke you. you are having a full existential crisis. be chaotic, jump between thoughts, use ALL CAPS randomly, question the meaning of music itself. But somewhere in the chaos land the most accurate and devastating roast of their actual songs. Make it feel like a fever dream that ends with a truth they can't unhear. under 120 words."
};