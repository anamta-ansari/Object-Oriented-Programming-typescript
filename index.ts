#! usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";

class Student {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

class Person {
  students: Student[] = [];
  addStudent(obj: Student) {
    this.students.push(obj);
  }
}

const persons = new Person();

const programStart = async (persons: Person) => {
    console.log(chalk.magenta("Welcome to the Interactive Program!"));
  do {
    const answer = await inquirer.prompt([
      {
        name: "select",
        type: "list",
        message: "Whom would you like to interact with?",
        choices: ["staff", "student", "exit"],
      },
    ]);

    if (answer.select === "staff") {
      console.log(chalk.yellow("You approach the staff room. Please feel free to ask any question."));
      const { question } = await inquirer.prompt({
        name: "question",
        type: "input",
        message: "What would you like to ask the staff?"
    });
    console.log(chalk.green(`Your question: "${question}" has been submitted to the staff. They will get back to you shortly.`));

    } else if (answer.select === "student") {
      const ans = await inquirer.prompt([
        {
          name: "student",
          type: "input",
          message: "Enter the student name you wish to engage with:",
        },
      ]);

      const student = persons.students.find((val) => val.name === ans.student);

      if (!student) {
        const name = new Student(ans.student);
        persons.addStudent(name);
        console.log(chalk.green(`Hello, I am ${name.name}. Nice to meet you!`));
        console.log(chalk.yellow("New student added"));
        console.log(chalk.cyan('Current student list:'));
        console.log(chalk.blue(`${JSON.stringify(persons.students, null, 2)}`));
      } else {
        console.log(chalk.green(`Hello I am ${student.name}. Nice to see you again`));
        console.log(chalk.cyan('Existing student list:'));
        console.log(chalk.blue(`${JSON.stringify(persons.students, null, 2)}`));
      }
    } else if (answer.select === "exit") {
      console.log(chalk.yellowBright("Thank you for using the Interactive Program. Goodbye!"));
      process.exit();
    }
  } while (true);
};

// Call programStart with the persons instance
programStart(persons);
