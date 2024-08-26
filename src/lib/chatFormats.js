export const chatFormats = [

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

    // [17:22:25] > Nedeljko Ljubic opens the back door and starts unloading crates.
    // [17:22:25] * Nedeljko Ljubic opens the back door and starts unloading crates.
    {
        name: "emote",
        lineColor: "#B49FCA",
        wordColor: "#B49FCA",
        triggerWords: [
            /^(>|&gt)/, // starts with >
            /^\*/], // starts with *
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



]

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

REMOVE
[19:40:30] (( PM from (308) Jasmine Wong: good game ^^ ))

`