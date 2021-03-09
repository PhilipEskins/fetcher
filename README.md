# _Isabelle's Fetcher_

#### _This app will help people with picking out something to watch._

#### By _**Philip Eskins**_

## Description

_You will be able to sign up and create a list of movies and/or tv shows you are interested in watching. When you aren't able to decide on what to watch this app will pick a random item from your list. Once you watch it you'll be able to remove the item from your list._

## Current Features
* Users can sign up
* Users can sign in
* Users can sign out

## Future Features
* Let users search a movie/tv database to more easily add shows

## Process

#### Monday 3/8/21
_You can now view a single movie info page_

#### Sunday 3/7/21
_Movie info now gets saved to the database_

#### Thursday 3/4/21
_Created a submit movie page. Headers and footers are now consolidated into one file that is included for each main page._

#### Wednesday 3/3/21
_Profile picture can now accept gravatar_

#### Tuesday 3/2/21
_Added flash messages for errors with registration and after signing in you now go directly to the dashboard_

#### Monday 3/1/21
_Added flash messages for errors_

#### Sunday 2/28/21
_Users can now log out and there is no more weird text messages after signing in_

#### Saturday 2/27/21
_Set up session in the app to save user info between http requests and saves it to the database_

#### Friday 2/26/21
_User's password is now saved as a hash in the database_

#### Thursday 2/25/21
_Refactored log in function to use a Promise instead of a callback_

#### Wednesday 2/24/21
_You can now log in and get a text message saying you where either successful or not_

#### Tuesday 2/23/21
_App now passes registration data into a mongodb database on atlas_

#### Monday 2/22/21
_Added validator package to project to help check for valid email and username. Added a bunch of checks for registration form and clean up the registration data._

#### Sunday 2/21/21
_Started to split the code into MVC to keep the code cleaner._

#### Saturday 2/20/21
_Started app, going to work on register function first. Using [Learn JavaScript: Full-Stack from Scratch](https://www.udemy.com/course/learn-javascript-full-stack-from-scratch/learn/lecture/14678098#overview) by [Brad Schiff](https://www.udemy.com/user/bradschiff/) as a guide._


## Setup/Installation Requirements

* _Download repository from https://github.com/PhilipEskins/fetcher/_
* _Type npm install from the command line interface_
* _Type npm run start from the command line interface_
* _Create a .env file, add CONNECTIONSTRING and PORT, CONNECTIONSTRING will be the info for your database connection and PORT is what port the app should listen on_
* _If you'd like to alter or see the code for the project, after downloading open the project up in your favorite code editor._

## Known Bugs

_New app, no known bugs at this time_

## Support and contact details

_If you have problems or would like to comment about something feel free to contact me at philipeskins@gmail.com_

## Technologies/packages used

_This website uses HTML, CSS, JavaScript, express, ejs, nodemon, validator, mongodb, dotenv, bcryptjs, express-session, connect-mongo, connect-flash, md5_

### License

*MIT*

Copyright (c) 2021 **_Philip Eskins_**
