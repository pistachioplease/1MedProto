const jobTitles = [
  "Internal Medicine",
  "Pediatrician",
  "Family Medicine",
  "General Surgery",
  "Psychiatry",
  "Neurology",
  "Pathology",
  "Geriatrics",
];

class Util {
  capitalize(s) {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

  randomJobTitles() {
    return jobTitles[Math.floor(Math.random() * jobTitles.length)];
  }

  uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}

const U = new Util();
export default U;
