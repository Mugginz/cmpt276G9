Promptitude
=====
Simon Fraser University  
CMPT 276, Spring 2016

Overview
-----
Promptitude is an online app allowing users to enahnce their experience with exercise and fitness routines.

Documentation
-----
Current build:  
[Alpha](http://cmpt276-group9.herokuapp.com/)  


Setting up a local (POSIX compliant) development environment:
* Make sure ruby version 1.9.3 or greater with rails 4.2 or greater is installed.
* Clone [this repo](https://github.com/Mugginz/cmpt276G9.git).
* `$ cd` into the project directory and run `$ bundle install --without production`.
* Ensure that postgresql is installed/configured.
* Initialize the database:
```
$ rake db:create;
$ rake db:migrate;
```
* Start a rails server with desired config for testing.
* Enjoy!  

Authors
-----
Jason Coo,   
Liangze Hao,  
Cesare Liu,  
Braeden Mulligan,  
Dan Wan,  
with thanks to Michael Hartl for providing a great beginners [guide](https://www.railstutorial.org/book) to Ruby on Rails.

Change Log
-----
read CHANGELOG  

Legal
-----
read LICENSE  
