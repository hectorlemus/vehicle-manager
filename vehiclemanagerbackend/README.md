#### INSTRUCIONES

<hr>

- Crear entorno virtual  
``python3 -m venv venv``

- Instalar las dependecias
``pip install -r requirements.txt``

- Realizar las migraciones  
 ``python manage.py migrate``

- Crear super usuario  
``python manage.py createsuperuser``

- Levantar servicio  
`python manage.py runserver`


<hr><br>

- El API se levanta en [http://localhost:8000/graphql](http://localhost:8000/graphql), ahi esta la documentacion necesario para realizar las consultas y las mutaciones
- Se puede ingresar al panel de administracion en [localhost:8000/admin](localhost:8000/admin), con el usuario creado en pasos anteriores, ahi se pueden crear mas usuarios

<hr/>

- GraphQL

![](docs/img/graphql.png?raw=true "")

