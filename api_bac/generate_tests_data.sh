#!/bin/bash
i=1
while [[ $i -le 5 ]]; do
    rm -rf test_data_$i
    mkdir test_data_$i
    node generate_student_emails.js
    mv student_emails.csv test_data_$i
    node generate_admission_data.js
    mv bac_data_db.json test_data_$i
    mv personal_data.csv test_data_$i
    mv admission_data.csv test_data_$i
    i=$((i+1))
done
exit