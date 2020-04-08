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
}

const U = new Util();
export default U;
