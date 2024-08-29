export const getChatFormats = (name) => {
    const chatFormats = [

        // [17:22:43] Tom Kennedy says [low]: Going well, really.
        {
            name: "chat-low",
            lineColor: "#979797",
            wordColor: "#979797",
            triggerWords: ["says [low]:"],
            fullLine: true,
        },
    
        // [17:22:25] Nedeljko Ljubic says: How's going?
        {
            name: "chat-normal",
            lineColor: "#CACACA",
            wordColor: "#CACACA",
            triggerWords: ["says:"],
            fullLine: true,
        },

        // [23:14:29] Nedeljko Ljubic shouts: Heeeey, STOP IT!
        {
            name: "chat-shout",
            lineColor: "#EBEBEB",
            wordColor: "#EBEBEB",
            triggerWords: ["shouts:"],
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
            lineColor: "#CACACA",
            wordColor: "#CACACA",
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

        // [23:14:29] You took 1 Smoking Pipe from the vehicle.
        {
            name: "item taking from vehicle",
            lineColor: "#E3A31F",
            wordColor: "#E3A31F",
            triggerWords: [
                /^You took\s+\d+\s+.*\s+from/, // has You took whatever from
                ],
            fullLine: true,
        },

        // [23:14:29] Info: You took Marijuana (1) from the Zipbag.
        {
            name: "item taking from storage",
            lineColor: "#EBEBEB",
            wordColor: "#E3A31F",
            triggerWords: [
                /^Info:(?=\sYou took\s+.*\s+\(\d+\)\s+from)/ // has Info: followed with You took whatever (number) from
            ],
            fullLine: false,
        },

        // [23:14:29] You've just taken Marijuana! You will feel the effects of the drug soon.
        {
            name: "Drug taking",
            lineColor: "#EBEBEB",
            wordColor: "#53B359",
            triggerWords: [
                /(?<=You've just taken\s)(\w+)/ // has Word after You've just taken
            ],
            fullLine: false,
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

        // [23:14:29] You have shown John Doe (M) your Smoking Pipe.
        {
            name: "Item showing",
            lineColor: "#EBEBEB",
            wordColor: "#348FE2",
            triggerWords: [
                /^You have shown\s+([A-Za-z' ]+)(\s+\(M\))?\s+your\s+/ // has You have shown John Doe (M) your
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
[23:14:29] Nedeljko Ljubic shouts: Heeeey, STOP IT!
[23:14:29] [Character kill] Nedeljko Ljubic has been killed.
[23:14:29] You have shown John Doe (M) your Smoking Pipe.
[23:14:29] You've just taken Marijuana! You will feel the effects of the drug soon.
[23:14:29] You took 1 Smoking Pipe from the vehicle.
[23:14:29] Info: You took Marijuana (1) from the Zipbag.

REMOVE
[19:40:30] (( PM from (308) Jasmine Wong: good game ^^ ))

`