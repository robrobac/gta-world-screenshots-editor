export const chatFormats = [
    {
        name: "chat-low",
        lineColor: "rgb(224, 6, 22)",
        wordColor: "rgb(224, 6, 22)",
        triggerWords: ["says [low]:"],
        fullLine: true,
    },
    {
        name: "chat-normal",
        lineColor: "green !important",
        wordColor: "green",
        triggerWords: ["says:"],
        fullLine: true,
    },
    {
        name: "emote",
        lineColor: "orange",
        wordColor: "orange",
        triggerWords: ["&gt", "*"],
        fullLine: true,
    },
    {
        name: "emote",
        lineColor: "gray",
        wordColor: "pink",
        triggerWords: ["/withdraw", "/deposit"],
        fullLine: false,
    },
    {
        name: "test",
        lineColor: "gray",
        wordColor: "yellow",
        triggerWords: ["money!"],
        fullLine: false,
    },
]

export const chatRemove = [
    {name: "OOC", triggerWords: [/^\(\(.*\)\)$/, "OOC"]}
]