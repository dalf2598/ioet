# ioet
## __Recruitment process exercise__

The company ACME offers their employees the flexibility to work the hours they want
But due to some external circumstances they need to know what employees have been at the office within the same time frame

The goal of this exercise is to output a table containing pairs of employees and how often they have coincided in the office

## __Solution__
1. How to run	
	
	The solution was build in VanillaJS, in order to run it you require: 
	- Node.js
		
		You can download it from https://nodejs.org
	
		To verify Node.js is installed correctly, open a terminal and run the command 'node -v'
	
		The output should look like this: 
			
			'v16.15.1' (depending on the version you installed, the numbers might differ)
	
	- VS Code
		
		You can download it from https://code.visualstudio.com

		It is not mandatory to install VS Code, but it is highly recommended

	After installing this tools, follow these steps:

	- Clone the repo to your PC
	- Open the project using VS Code
	- Inside VS Code, open a terminal (please verify that terminal points to the folder containing the project)
	- In the terminal, run the command 'node Main.js'
	- The output should look like this:
		
			********Valid-Rows**********
			[
			  'RENE=MO10:00-12:00,TU10:00-12:00,TH01:00-03:00,SA14:00-18:00,SU20:00-21:00',
			  'ASTRID=MO10:00-12:00,TH12:00-14:00,SU20:00-21:00',
			  'ANDRES=MO10:00-12:00,TH12:00-14:00,SU20:00-21:00'
			]
			********Coincidences*********
			[ 'RENE-ASTRID: 2', 'RENE-ANDRES: 2', 'ASTRID-ANDRES: 3' ]

2. Structure 

	The solutions contains 3 folders and 2 files

	Folders 
	
		- Models
			Includes the classes: 
			- Employee, used to represent an employe of the company
			- Workday, used to represent the day and time an employee is working at the company

		- Functions
			Includes the classes: 
			- Reader, used to read input from the 'txt' file and map it to Employee objects
			- Validator, used to validate the input read from the 'txt' file
			- Finder, contains the logic to find overlapping working days/hours

		- Inputs
			Includes five 'txt' files that work as input for the program. 
			The expected output of each of files goes as follows:
			- Data 1 (example provided in the email)
				[ 'RENE-ASTRID: 2', 'RENE-ANDRES: 2', 'ASTRID-ANDRES: 3' ]
			- Data 2 (example provided in the email)
				[ 'RENE-ASTRID: 3' ]
			- Data 3 
				[ 'BRYAN-CARLOS: 3', 'BRYAN-DAVID: 1', 'BRYAN-DIEGO: 1', 'BRYAN-KEVIN: 3',
				'CARLOS-DIEGO: 2', 'CARLOS-KEVIN: 2', 'DAVID-DIEGO: 1', 'DIEGO-KEVIN: 2']
			- Data 4
				[ 'ANA-MARIA: 5', 'ANA-PEDRO: 3', 'ANA-DANIELA: 2', 'MARIA-PEDRO: 2',
				'MARIA-DANIELA: 3', 'MARIA-CAMILA: 5', 'PEDRO-DANIELA: 2', 'PEDRO-CAMILA: 2',
				'DANIELA-CAMILA: 3' ]
			- Data 5 (this dataset contains some faulty data to verify the Validator usefulness) 
				 [ 'HECTOR-CARMEN: 3' ]

	Files 
	
		- Main 
			Primary file 
			Change line 8 to run the program with other txt files (example is provided inside the code)

		- Package json
			Config file required to export and import classes from other js files

3. Solution Overview
	
	The logic of the solution is straightforward:

	- Read the input data and verify its on the appropriate format
	- Map each employee data to an employee object and add them to an array called 'employees'
	- Each employee object contains its name and an array of working days called schedule 
	- Each working day contains: day, start (represents the starting time in minutes) and end (represents the ending time in minutes)  
	- After the mapping work has been completed, a linear search is perform in the 'employees' array. 
	- Compare each employee schedule to each of his/her coworkers and find any overlaps. 
	- Show the findings. 		

