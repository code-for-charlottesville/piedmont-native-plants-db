# Project Structure
## Backend
This is the main directory for the REST Api. 
It contains the models, views, urls, etc.

### Backend/Open_api
This directory stores all the configuration files necessary for generating 
the Api Client with Django-Spectacular.
* The client code is stored in `backend/open_api/client`.
* `config.yml` stores the configuration settings for the client code.
* `schema.yml` stores the structure for the api client. 
It should not be touched manually. 
Instead, it can be generated using: `python manage.py apischema`
* The api client can be generated using: `python manage.py apiclient`

## Manager
This folder stores all the settings for the django project.

# Running and Commands
* You can start the server using: `python manage.py runserver`
  * The API documentation can be accessed from [here](http://127.0.0.1:8000/api/schema/redoc/).
* Generate Client: `python manage.py apiclient`
* Generate Client Schema: `python manage.py apischema`
  * This should be run before generating the api client.