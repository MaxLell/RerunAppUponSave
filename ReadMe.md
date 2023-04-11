# Description
This is a cli application which watches for changes in a project directory. If one of the files was saved, the application will rerun the application.
It mimiks what the `nodemon` package does, but it is written by myself for learning purposes. (It also is not as sophisticated)

Major features:
1. Detects file changes: This application detects, when ANY file in the current directory is changed. -> For this chokidar is used. It is more platform agnostic then the regular nodeJS filesystem commands for this application.
2. It provides a 'help' prompt, that the user can access -> For this caporal is used. It provides a lot of features to create proper CLI applications, yet for the current case, only the 'help' generation is used
3. It executes JS Code within a JS Program -> This is done with the child_process functionality which are provided by nodeJS. If the file is changed, the previous instance of the child_process is terminated and a new process is started with the updated binary.

# Installation
1. Clone the repository
2. Run `npm install` to install all dependencies
3. Run `npm link` to link the application to the global node_modules folder
4. Run `watchit` to start the application

# Usage
- Run `watchit` to start the application
- The application will ask you for the name of the file you want to watch
- If the file is changed, the application will rerun the file

You can also run `watchit --help` to get a list of all available commands




# Sources
This project is based on the udemy javascript course by Colt Steele and Stephen Grider. The course can be found here: [Course](https://www.udemy.com/course/javascript-beginners-complete-tutorial/)