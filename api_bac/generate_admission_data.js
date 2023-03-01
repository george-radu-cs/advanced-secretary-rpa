const fs = require("fs");
const { faker } = require("@faker-js/faker/locale/ro");

const NUMBER_PEOPLE = 20000;
const NUMBER_ADMISSIONS = 3000;

const bacData = {
  bac: [
    {
      // example data
      id: "5010101123456",
      nume: "Radu",
      prenume: "George-Mihai",
      proba_comuna_nota: 8.21,
      proba_comuna_disciplina: "ROMANA",
      proba_diferentiala_nota: 9.1,
      proba_diferentiala_disciplina: "MATEMATICA",
      proba_alegere_nota: 9.9,
      proba_alegere_disciplina: "INFORMATICA",
    },
  ],
};

const firstNameSeparatorOptions = ["-", " "];
const differentialSubjectOptions = ["ISTORIE", "MATEMATICA"];
const choiceSubjectOptions = [
  "LOGICA",
  "INFORMATICA",
  "ECONOMIE",
  "FIZICA",
  "CHIMIE",
  "BIOLOGIE",
  "GEOGRAFIE",
  "PSIHOLOGIE",
];

// function to generate 12 digit number
function generateCNP(index) {
  var cnp = "" + (5 + (index % 2)); // generate 5 or 6, encoding the sex and the 2000-2099 century for the CNP
  for (var i = 0; i < 12; i++) {
    cnp += Math.floor(Math.random() * 10);
  }
  return cnp;
}

// js code to generate number higher than 5.0 and lower or equal to 10, float with 2 decimal points
function generateNote(lower = 5, upper = 10) {
  return (Math.random() * (upper - lower) + lower).toFixed(2);
}

function formatDate(date) {
  // format date object to dd/mm/yyyy
  const dd = date.getDate();
  const mm = date.getMonth() + 1; //January is 0!
  const yyyy = date.getFullYear();
  return dd + "/" + mm + "/" + yyyy;
}

// generate bac data for json-server
Array.from({ length: NUMBER_PEOPLE }).forEach((_, index) => {
  bacData.bac.push({
    id: generateCNP(index),
    nume: faker.name.lastName(),
    prenume:
      faker.name.firstName() +
      firstNameSeparatorOptions[Math.floor(Math.random() * firstNameSeparatorOptions.length)] +
      faker.name.firstName(),
    proba_comuna_nota: generateNote(),
    proba_comuna_disciplina: "ROMANA",
    proba_diferentiala_nota: generateNote(),
    proba_diferentiala_disciplina:
      differentialSubjectOptions[Math.floor(Math.random() * differentialSubjectOptions.length)],
    proba_alegere_nota: generateNote(),
    proba_alegere_disciplina: choiceSubjectOptions[Math.floor(Math.random() * choiceSubjectOptions.length)],
  });
});

var bacDataJson = JSON.stringify(bacData);
fs.writeFileSync("bac_data_db.json", bacDataJson, "utf8", (err) => {
  if (err) throw err;
  console.log("Saved bac info!");
});

// generate personal data for csv
const personalDataRows = [
  [
    "NUMAR_MATRICOL", // 1/2023
    "NUME", // string, luat din bacData
    "PRENUME", // string, luat din bacData
    "INITIALA_PARINTE", // string
    "NUME_PRENUME_CERTIFICAT_NASTERE", // string
    "SEX", // M/F
    "SERIE_BI_CI", // 2 letters uppercase
    "NUMAR_BI_CI", // 6 digits
    "BI_CI_ELIBERAT_DE", // society name
    "DATA_ELIBERARE_BI_CI", // dd/mm/yyyy
    "DATA_EXPIRARE_BI_CI", // dd/mm/yyyy
    "CNP", // 13 digits, luat din bacData
    "CETATENIE", // "ROMAN"
    "ETNIE", // ROMAN, RROM
    "STARE_CIVILA_CASATORIT", // boolean, True or False
    "STARE_SOCIALA_SPECIALA_ORFAN", // boolean, True or False
    "STARE_SOCIALA_SPECIALA_PROVENIT_CASE_COPII", // boolean, True or False
    "STARE_SOCIALA_SPECIALA_FAMILIE_MONOPARENTALA", // boolean, True or False
    "DATA_NASTERE", // dd/mm/yyyy
    "LOC_NASTERE", // string, adresa full
    "DOMICILIU_ACTUAL_TARA", // string
    "DOMICILIU_ACTUAL_JUDET_SECTOR", // string
    "DOMICILIU_ACTUAL_LOCALITATE", // string
    "DOMICILIU_ACTUAL_STRADA", // string
    "DOMICILIU_ACTUAL_NUMAR", // string
    "DOMICILIU_ACTUAL_BLOC", // string
    "DOMICILIU_ACTUAL_SCARA", // string
    "DOMICILIU_ACTUAL_ETAJ", // string
    "DOMICILIU_ACTUAL_APARTAMENT", // string
    "DOMICILIU_ACTUAL_COD_POSTAL", // string
    "TELEFON_PREFIX", // string
    "TELEFON_NUMAR", // string
    "ADRESA_EMAIL", // string
    // informatii parinti
    "NUME_PARINTE_1", // string
    "PRENUME_PARINTE_1", // string
    "NUME_PARINTE_2", // string
    "PRENUME_PARINTE_2", // string
    "DOMICILIU_PARINTI_TARA", // string
    "DOMICILIU_PARINTI_JUDET_SECTOR", // string
    "DOMICILIU_PARINTI_LOCALITATE", // string
    "DOMICILIU_PARINTI_STRADA", // string
    "DOMICILIU_PARINTI_NUMAR", // string
    "DOMICILIU_PARINTI_BLOC", // string
    "DOMICILIU_PARINTI_SCARA", // string
    "DOMICILIU_PARINTI_ETAJ", // string
    "DOMICILIU_PARINTI_APARTAMENT", // string
    "DOMICILIU_PARINTI_COD_POSTAL", // string
    "TELEFON_PREFIX_PARINTE", // string
    "TELEFON_NUMAR_PARINTE", // string
    "ADRESA_EMAIL_PARINTE", // string
    "OCUPATIE_PARINTE_TATA",
    "OCUPATIE_PARINTE_MAMA",
    "NUME_PRENUME_SUSTINATOR_LEGAL",
    "FUNCTIE_LOC_DE_MUNCA_SUSTINATOR_LEGAL",
    // informatii alte studii superioare
    "INSCRIS_ACTIV_LA_INCA_O_FACULTATE", // boolean, True or False, pentru false restul ""
    "FAC_ACTIVA_NUME_UNIVERSITATE", // string
    "FAC_ACTIVA_NUME_FACULTATE", // string
    "FAC_ACTIVA_NUME_PROGRAM_DE_STUDII", // string
    "FAC_ACTIVA_FORMA_FINANTARE_CU_TAXA", // boolean, True or False
    "FAC_ACTIVA_AN_STUDII", // Int 1-6
    "ABSOLVIT_ALTA_FACULTATE", // boolean, True or False, pentru false restul ""
    "FAC_ABSOLVITA_NUME_UNIVERSITATE", // string
    "FAC_ABSOLVITA_NUME_FACULTATE", // string
    "FAC_ABSOLVITA_NUME_PROGRAM_DE_STUDII", // string
    "FAC_ABSOLVITA_FORMA_FINANTARE_CU_TAXA", // boolean, True or False
    "FAC_ABSOLVITA_PROMOTIE", // string an, ex 2023
    "FAC_ABSOLVITA_CU_EXAMEN", // boolean, True or False
    "FAC_ABSOLVITA_SESIUNEA", // string an, ex an 2023
    "FAC_ABSOLVITA_ANI_STUDIU_FINANTATI", // Int 1-6
  ],
];
Array.from({ length: NUMBER_ADMISSIONS }).forEach((_, index) => {
  const person = bacData.bac[3 * index];
  const activeSecondFaculty = Math.random() < 0.1;
  const secondAbsolvedFaculty = Math.random() < 0.1;

  personalDataRows.push([
    `${index + 1}/2023`, // numar matricol
    person.nume,
    person.prenume,
    `${faker.random.alpha(1).toUpperCase()}.`, // initiala parinte
    `${person.nume} ${person.prenume}`, // nume certificat de nastere
    Math.random() < 0.5 ? "M" : "F", // sex
    faker.random.alpha(2).toUpperCase(), // SERIE BI/CI
    faker.random.numeric(6), // NUMAR BI/CI
    `SPCLEP ${faker.address.cityName()}`, // ORGAN EMISSOR BI/CI
    formatDate(faker.date.past()), // DATA EMISSIUNII BI/CI
    formatDate(faker.date.future()), // DATA EXPIRARI BI/CI
    person.id, // CNP
    "ROMANA", // cetatenie
    Math.random() < 0.95 ? "ROMAN" : "RROM", // etnie
    Math.random() < 0.05, // stare civila casatorit
    Math.random() < 0.05, // stare sociala orfan
    Math.random() < 0.1, // stare sociala provenit case copii
    Math.random() < 0.2, // stare sociala familie monoparentala
    formatDate(faker.date.past(18)), // data nastere
    faker.address.secondaryAddress().replace(",", " "), // localitate nasterii
    "ROMANIA", // tara domiciliu actual
    faker.address.county().replace(",", " "), // judet domiciliu actual
    faker.address.cityName().replace(",", " "), // localitate domiciliu actual
    faker.address.streetName().replace(",", " "), // strada domiciliu actual
    faker.random.numeric(3), // numar domiciliu actual
    faker.address.buildingNumber(), // bloc domiciliu actual
    faker.random.numeric(2), // scara domiciliu actual
    faker.random.numeric(2), // etaj domiciliu actual
    faker.random.numeric(4), // apartament domiciliu actual
    faker.address.zipCode(), // cod postal domiciliu actual
    "+40", // prefix telefon
    faker.phone.number().slice(1), // telefon
    faker.internet.email(), // email
    // informatii parinti
    faker.name.lastName(), // nume parinte 1
    faker.name.firstName(), // prenume parinte 1
    faker.name.lastName(), // nume parinte 2
    faker.name.firstName(), // prenume parinte 2
    "ROMANIA", // tara domiciliu parinti
    faker.address.county().replace(",", " "), // judet domiciliu parinti
    faker.address.cityName().replace(",", " "), // localitate domiciliu parinti
    faker.address.streetName().replace(",", " "), // strada domiciliu parinti
    faker.random.numeric(3), // numar domiciliu parinti
    faker.address.buildingNumber(), // bloc domiciliu parinti
    faker.random.numeric(2), // scara domiciliu parinti
    faker.random.numeric(2), // etaj domiciliu parinti
    faker.random.numeric(4), // apartament domiciliu parinti
    faker.address.zipCode(), // cod postal domiciliu parinti
    "+40", // prefix telefon
    faker.phone.number().slice(1), // telefon
    faker.internet.email(), // email
    faker.name.jobTitle().replace(",", " "), //"OCUPATIE_PARINTE_TATA",
    faker.name.jobTitle().replace(",", " "), //"OCUPATIE_PARINTE_MAMA",
    faker.name.lastName() + " " + faker.name.firstName(), //"NUME_PRENUME_SUSTINATOR_LEGAL",
    faker.name.jobTitle().replace(",", " "), //"FUNCTIE_LOC_DE_MUNCA_SUSTINATOR_LEGAL",
    // informatii alte studii superioare
    activeSecondFaculty, // facultate activa
    activeSecondFaculty ? faker.company.name().replace(",", " ") : "", // nume universitate
    activeSecondFaculty ? faker.company.name().replace(",", " ") : "", // nume facultate
    activeSecondFaculty ? faker.company.bs() : "", // nume program de studii
    activeSecondFaculty ? Math.random() < 0.5 : false, // forma finantare cu taxa
    activeSecondFaculty ? faker.random.numeric(1) : 0, // ani studiu finantati
    secondAbsolvedFaculty,
    secondAbsolvedFaculty ? faker.company.name().replace(",", " ") : "", // nume universitate
    secondAbsolvedFaculty ? faker.company.name().replace(",", " ") : "", // nume facultate
    secondAbsolvedFaculty ? faker.company.bs() : "", // nume program de studii
    secondAbsolvedFaculty ? Math.random() < 0.5 : false, // forma finantare cu taxa
    secondAbsolvedFaculty ? faker.date.past(15).getFullYear() : 0, // promotie
    secondAbsolvedFaculty ? Math.random() < 0.7 : false, // examen
    secondAbsolvedFaculty ? faker.date.past(15).getFullYear() : 0, // sesiunea
    secondAbsolvedFaculty ? faker.random.numeric(1) : 0, // ani studiu finantati
  ]);
});
// write as csv to file
const personalDataCSV = personalDataRows.map((row) => row.join(",")).join("\n");
fs.writeFileSync("personal_data.csv", personalDataCSV);

// generate admission data for csv
const admissionDataRows = [
  [
    "NUMAR_MATRICOL", // index/an
    "OPTIUNE_MATEMATICA_IF", // order number
    "OPTIUNE_INFORMATICA_IF", // order number
    "OPTIUNE_CTI_IF", // order number
    "OPTIUNE_INFORMATICA_SRI", // order number
    "OPTIUNE_CTI_SRI", // order number
    "PUNCTAJ_P", // 0-5 float 1 decimal point
    "NOTA_SUBIECT_MATEMATICA", // 0-10 float 2 decimal points
    "NOTA_SUBIECT_SPECIALITATE", // 0-10 float 2 decimal points
    "SUBIECT_SPECIALITATE_ALES", // "MATEMATICA", "INFORMATICA", "FIZICA"
    "ADMIS_OLIMPIC", // boolean, True or False
    "CAZ_RURAL", // boolean, True or False
    "CAZ_ETNIC", // boolean, True or False
  ],
];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function generateDomainOptions() {
  // generate options, we need a shuffled array of 5 elements, can contain as many -1, option not wanted
  // and the other options are the order number of the preference, from 1 to max 5, cannot have duplicates
  const options = [1];
  let i = 2;
  while (i <= 5) {
    if (Math.random() < 0.6) {
      options.push(i);
    } else {
      break;
    }
    i++;
  }
  while (i <= 5) {
    options.push(-1);
    i++;
  }
  shuffleArray(options);
  return options;
}

function getPScore() {
  if (Math.random() < 0.8) {
    return 0;
  }
  return (Math.random() * (2 - 0) + 0).toFixed(1);
}

function generateSpecialitySubject(optionsSelected) {
  // selectand doar optiunea de matematica, subiectul de specialitate este matematica
  if (optionsSelected[0] === 1 && optionsSelected.every((option) => option === -1 || option === 1)) {
    return "MATEMATICA";
  }
  // selectand doar optiunea de cti, subiectul de specialitate poate fi fizica pe langa informatica
  if (
    (optionsSelected[2] === 1 || optionsSelected[2] === 2 || optionsSelected[4] === 1 || optionsSelected[4] === 2) &&
    optionsSelected.every((option) => option === -1 || option === 1 || option === 2)
  ) {
    if (Math.random() < 0.5) {
      return "FIZICA";
    } else {
      return "INFORMATICA";
    }
  }
  // altfel, subiectul de specialitate este informatica pentru orice alta combinatie
  return "INFORMATICA";
}

Array.from({ length: NUMBER_ADMISSIONS }).forEach((_, index) => {
  const selectedOptions = generateDomainOptions();
  const olimpicAdmission = Math.random() < 0.1;
  admissionDataRows.push([
    `${index + 1}/2023`, // numar matricol
    ...selectedOptions,
    getPScore(),
    olimpicAdmission ? 10 : generateNote(3, 10),
    olimpicAdmission ? 10 : generateNote(3, 10),
    generateSpecialitySubject(selectedOptions),
    olimpicAdmission,
    Math.random() < 0.05, // rural
    Math.random() < 0.01, // etnic
  ]);
});
// write as csv to file
const admissionDataCSV = admissionDataRows.map((row) => row.join(",")).join("\n");
fs.writeFileSync("admission_data.csv", admissionDataCSV);
