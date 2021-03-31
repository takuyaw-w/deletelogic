// @ts-check
const fs = require("fs");
const path = require("path")
const {format, addDays} = require("date-fns");
const FORMAT = "yyyy-MM-dd";
const currentDate = new Date();
const LoremIpsum = require("lorem-ipsum").LoremIpsum;

const lorem = new LoremIpsum({
    sentencesPerParagraph: {
        max: 8,
        min: 4
    },
    wordsPerSentence: {
        max: 16,
        min: 4
    }
});
const dummyTxt = lorem.generateParagraphs(10000);

if (!fs.existsSync("./logs")) {
    fs.mkdirSync("./logs");
}

for (let i = 0; i < 10; i++) {
    const nextDate = format(addDays(currentDate, i), FORMAT);
    fs.writeFileSync(path.resolve(__dirname, "logs", nextDate + ".log"), dummyTxt);
}