## 📋 Project

PPDA - Projetos dos Programadores do Amanhã it's RestFul API to storage projects created by students from Programadores do Amanhã. 
<br>

## 💻 How to use?

This application was deployed on render.com, so, you can access the resources through the link: https://ppda-api.onrender.com

## 💻 Entities

### Student

students who register the projects

Method | Description | endpoint
---|---|---
`POST`| Read all students | `/student/read`
`POST`| read a student | `/student/readByID/:id`
`POST`| Create student | `/student/create`
`POST`| Login as student | `/student/login`
`PUT`| Update student | `/student/update/:id`
`DELETE`| Delete student | `/student/delete/:id`

* Example body to create student
  ```bash
  {
      "full_name": STRING,
      "email": STRING,
      "password": STRING,
      "date_birthday": STRING(optional)
      "admnistrador_id": STRING
      "class_id: STRING
  }
  ```

### Administrator

Responsible for accepting students and grading projects

Method | Description | endpoint
---|---|---
`POST`| Read all administrators | `/administrator/read`
`POST`| read a administrator | `/administrator/readByID/:id`
`POST`| Create administrator | `/administrator/create`
`POST`| Login as administrator | `/administrator/login`
`PUT`| Update administrator | `/administrator/update/:id`
`DELETE`| Delete administrator | `/administrator/delete/:id`

* Example body to create administrator
  ```bash
  {
      "full_name": STRING,
      "email": STRING,
      "password": STRING,
      "date_birthday": STRING(optional)
  }
  ```

### Class

Class the student studies in

Method | Description | endpoint
---|---|---
`POST`| Read all classes | `/class/read`
`POST`| read a class | `/class/readByID/:id`
`POST`| Create class | `/class/create`
`PUT`| Update class | `/class/update/:id`
`DELETE`| Delete class | `/class/delete/:id`

* Example body to create class
  ```bash
  {
      "name": STRING,
      "administrator_id": STRING
      "date_started": STRING(optional),
      "date_end": STRING(optional),
  }
  ```

### Module

Each class has several modules

Method | Description | endpoint
---|---|---
`POST`| Read all modules | `/module/read`
`POST`| read a module | `/module/readByID/:id`
`POST`| Create module | `/module/create`
`PUT`| Update module | `/module/update/:id`
`DELETE`| Delete module | `/module/delete/:id`

* Example body to create module
  ```bash
  {
      "name": STRING,
      "description": STRING(optional),
      "administrator_id": STRING,
      "class_id": STRING,
  }
  ```
### Projects

Student projects created in the modules

Method | Description | endpoint
---|---|---
`POST`| Read all projects | `/project/read`
`POST`| read a project | `/project/readByID/:id`
`POST`| Create project | `/project/create`
`PUT`| Update project | `/project/update/:id`
`DELETE`| Delete project | `/project/delete/:id`

* Example body to create project
  ```bash
  {
      "name": STRING,
      "date": STRING,
      "description": STRING(optional),
      "student_id": STRING,
      "link_github": STRING(optional)
  }
  ```
## 👨‍💻 Technologies

These are the technologies used in this project

**Backend:** [Node.js](https://nodejs.org/en/), [Express](https://expressjs.com/pt-br/), [Prisma](prisma.io). [PostgreSQL](https://www.postgresql.org/) <br>

## 📝 License

This project are is under the MIT license. See the [LICENSE](https://github.com/edsonaraujobr/ppda/blob/main/LICENSE) to get more details.












   




