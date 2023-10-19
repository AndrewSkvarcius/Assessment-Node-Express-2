function timeToWords(timeStr) {
  const hoursWords = {
      '00': 'twelve', '01': 'one', '02': 'two', '03': 'three',
      '04': 'four', '05': 'five', '06': 'six', '07': 'seven',
      '08': 'eight', '09': 'nine', '10': 'ten', '11': 'eleven',
      '12': 'twelve', '13': 'one', '14': 'two', '15': 'three',
      '16': 'four', '17': 'five', '18': 'six', '19': 'seven',
      '20': 'eight', '21': 'nine', '22': 'ten', '23': 'eleven'
  };
  const minutesWords = {
    '00': '', '01': 'one', '02': 'two', '03': 'three',
    '04': 'four', '05': 'five', '06': 'six', '07': 'seven',
    '08': 'eight', '09': 'nine', '10': 'ten', '11': 'eleven',
    '12': 'twelve', '13': 'thirteen', '14': 'fourteen', '15': 'fifteen',
    '16': 'sixteen', '17': 'seventeen', '18': 'eighteen', '19': 'nineteen',
    '20': 'twenty', '30': 'thirty', '40': 'forty', '50': 'fifty'
};

for (let i = 21; i < 60; i++) {
    if (!minutesWords[i.toString()]) {
        const tens = Math.floor(i / 10) * 10;
        const ones = i % 10;
        minutesWords[i.toString()] = minutesWords[tens.toString()] + 
                                     (ones ? (' ' + minutesWords[ones.toString().padStart(2, '0')]) : '');
    }
}

const [hours, minutes] = timeStr.split(':');

if (timeStr === "00:00") return "midnight";
if (timeStr === "12:00") return "noon";

const period = (parseInt(hours, 10) < 12) ? "am" : "pm";

const hourWord = hoursWords[hours];
let minuteWord = minutesWords[minutes];

if (parseInt(minutes, 10) > 0 && parseInt(minutes, 10) < 10) {
    minuteWord = "oh " + minuteWord;
}

if (!minuteWord) {
    return `${hourWord} o’clock ${period}`;
} else {
    return `${hourWord} ${minuteWord} ${period}`;
}
}

// Test
const testTimes = ["00:00", "00:12", "01:00", "06:01", "06:10", "06:18", "06:30", "10:34", "12:00", "12:09", "23:23"];
for (let time of testTimes) {
  console.log(`${time} -> ${timeToWords(time)}`);
}


module.exports = timeToWords;

