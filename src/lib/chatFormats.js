export const getChatFormats = (name) => {
    const chatFormats = [

        // [17:22:43] Tom Kennedy says [low]: Going well, really.
        {
            name: "chat-low",
            lineColor: "#B7B7B7",
            wordColor: "#B7B7B7",
            triggerWords: ["says [low]:"],
            fullLine: true,
        },
    
        // [17:22:25] Nedeljko Ljubic says: How's going?
        {
            name: "chat-normal",
            lineColor: "#EBEBEB",
            wordColor: "#EBEBEB",
            triggerWords: ["says:"],
            fullLine: true,
        },

        // [23:14:29] Nedeljko Ljubic whispers: Psst, hey.
        {
            name: "chat-whisper",
            lineColor: "#EFB84A",
            wordColor: "#EFB84A",
            triggerWords: ["whispers:"],
            fullLine: true,
        },

        // [23:14:29] Nedeljko Ljubic says (cellphone): (your character)
        {
            name: "chat-cellphone",
            lineColor: "#EBEBEB",
            wordColor: "#EBEBEB",
            triggerWords: [`${name} says (cellphone):`],
            fullLine: true,
        },

        // [23:14:29] Nedeljko Ljubic says (cellphone): (other character)
        {
            name: "chat-cellphone-you",
            lineColor: "#F5F920",
            wordColor: "#F5F920",
            triggerWords: [`says (cellphone):`],
            fullLine: true,
        },
    
        // [17:22:25] > Nedeljko Ljubic opens the back door and starts unloading crates.
        // [17:22:25] * Nedeljko Ljubic opens the back door and starts unloading crates.
        {
            name: "emote",
            lineColor: "#B49FCA",
            wordColor: "#B49FCA",
            triggerWords: [
                /^(>|&gt)/, // starts with >
                /^\*/, // starts with *
            ], 
            fullLine: true,
        },
    
        // You paid $2,000 to Mask_84E53_6 (15/AUG/2024 - 23:25:44).
        // Mask_84E53_6 paid you $3,000 (15/AUG/2024 - 23:30:45).
        {
            name: "cash payments",
            lineColor: "#53B359",
            wordColor: "#53B359",
            triggerWords: [
                /You paid \$\d{1,3}(?:,\d{3})*(?:\.\d{2})? to [\w\s'-.]+ \(\d{2}\/[A-Z]{3}\/\d{4} - \d{2}:\d{2}:\d{2}\)/, // You paid
                /[\w\s]+ paid you \$[\d,]+ \(\d{2}\/[A-Z]{3}\/\d{4} - \d{2}:\d{2}:\d{2}\)\./, // paid you
                ],
            fullLine: true,
        },
    
        // [17:22:43] [INFO]: [04/NOV/2021] *SIGN*: Right lane vans and cars only - height barrier ahead.
        {
            name: "INFO",
            lineColor: "#EBEBEB",
            wordColor: "#2F81D5",
            triggerWords: [
                /^\[INFO\]:/ // starts with [INFO]:
            ],
            fullLine: false,
        },
        {
            name: "INFO DATE",
            lineColor: "#EBEBEB",
            wordColor: "#E48332",
            triggerWords: [
                /\[\d{2}\/[A-Z]{3}\/\d{4}\]/ // has date format [MM/DD/YYYY]
            ],
            fullLine: false,
        },
        {
            name: "Character Kill",
            lineColor: "#B70F08",
            wordColor: "#348FE2",
            triggerWords: [
                "[Character kill]" // has [Character kill]
            ],
            fullLine: false,
        },
    ]

    return chatFormats
}

export const chatRemove = [

    // [19:40:30] (( PM from (308) Jasmine Wong: good game ^^ ))
    {
        name: "OOC",
        triggerWords: [
            /^\(\(.*\)\)$/, // starts with (( and ends with ))
        ]
    }
]

export const chatColorsArray = () => {
    var colors = [];

    const chatFormats = getChatFormats();

    chatFormats.forEach(chatFormat => {

        if (!colors.includes(chatFormat.lineColor)) {
            colors.push(chatFormat.lineColor);
        }

        if (!colors.includes(chatFormat.wordColor)) {
            colors.push(chatFormat.wordColor);
        }
        
    })
    return colors
}

const testStrings = `

KEEP AND STYLE:
[17:22:25] > Nedeljko Ljubic opens the back door and starts unloading crates.
[17:22:25] * Nedeljko Ljubic opens the back door and starts unloading crates.
[17:22:25] Nedeljko Ljubic says: How's going?
[17:22:43] Tom Kennedy says [low]: Going well, really.
[17:22:43] [INFO]: [04/NOV/2021] *SIGN*: Right lane vans and cars only - height barrier ahead.
[17:22:43] You paid $2,000 to Nedeljko Ljubic (15/AUG/2024 - 23:25:44).
[17:22:43] Nedeljko Ljubic paid you $3,000 (15/AUG/2024 - 23:30:45).
[23:14:20] Julian Volesky says (cellphone): Yow.
[23:14:29] Nedeljko Ljubic says (cellphone): Hello, do you still need a ride, taxi driver on the phone.
[23:14:29] Nedeljko Ljubic says whispers: Psst, hey.
[23:14:29] [Character kill] Nedeljko Ljubic has been killed.

REMOVE
[19:40:30] (( PM from (308) Jasmine Wong: good game ^^ ))

`