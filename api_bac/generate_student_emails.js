const fs = require("fs");
const { faker } = require("@faker-js/faker/locale/ro");

const NUMBER_PEOPLE_PER_YEAR = 700;
const NUMBER_YEARS = 20;

// key: prenume.nume, value: id
const people_names = [];
const email_ids = { "george.radu": 4 };
// The password column contains the generated passwords when creating the accounts and sent to the students. The csv 
// doesn't contain the actual passwords of the students after they finished their registration on the faculty site.
const emails_data_rows = [["NUMAR_MATRICOL", "ADRESA_EMAIL", "NUME", "PRENUME", "PAROLA"]];

// generate emails to have multiple collisions
Array.from({ length: NUMBER_PEOPLE_PER_YEAR * 2 }).forEach((_, index) => {
  const prenume = faker.name.firstName();
  const nume = faker.name.lastName();
  people_names.push({ prenume, nume });
});

// generate data
Array.from({ length: NUMBER_YEARS }).forEach((_, index) => {
  const year = 2001 + index;
  Array.from({ length: NUMBER_PEOPLE_PER_YEAR }).forEach((_, index) => {
    const prenume = people_names[Math.floor(Math.random() * people_names.length)].prenume;
    const nume = people_names[Math.floor(Math.random() * people_names.length)].nume;
    let email = `${prenume.replace("'", "").toLowerCase()}.${nume.replace("'", "").toLowerCase()}`;
    const id = email_ids[email] || 0;

    if (id === 0) {
      email_ids[email] = 1;
    } else {
      email_ids[email] += 1;
      email = `${email}${id}`; // add number grater than 0 to the email
    }

    email = `${email}@s.unibuc.ro`;

    emails_data_rows.push([
      `${index + 1}/${year}`, // nr. matricol
      email,
      nume,
      prenume,
      faker.internet.password(),
    ]);
  });
});

// write emails_data_rows as csv to file
const csv = emails_data_rows.map((row) => row.join(",")).join("\n");
fs.writeFileSync("student_emails.csv", csv);
