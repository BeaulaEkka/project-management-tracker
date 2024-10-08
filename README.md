# Project Management Tracker
Live Website: https://beaula-management.nl

This is a project management web application built with Laravel. This app helps users manage projects and tasks effectively, with features like task filtering, creating, deleting, editing, project assignment, mark complete or pending, edit status, pagination, image uploads, theme toggling, and notifications. This project also a dashboard where it reflects completed tasks, total open and closed tasks, champions of the month etc.

# Usage:
**All Tasks Page:** View all tasks associated with different projects. Use filtering options to find specific tasks.  
**Creating New Projects:** Use the form provided to create, update, or delete projects and tasks.  
**File Storage:** Upload images or other files related to tasks or projects.  
**Theme Toggle:** Switch between light and dark themes using the theme toggle button.  
**Real-time Alerts:** Receive instant notifications for different actions using React Toastify.  

![Dashboard](https://github.com/BeaulaEkka/project-management-tracker/blob/main/public/images/dashboard.jpeg)
![Dashboard](https://github.com/BeaulaEkka/project-management-tracker/blob/main/public/images/dark-dashboard.jpeg)

###  Project workflow and git commits

-   [x] Installation
-   [x] [Set up Models, Factories, tables](#set-up-models-factories-migrations-and-tables)
-   [x] [Set up Controllers-ProjectController,TaskControllers](#set-up-controllers)
-   [x] [Seeding](#seeding)
-   [x] [Set up routes](#set-up-routes)
-   [x] [Set up views](#set-up-views)
-   [x] [Pagination](#pagination)
-   [x] [Filtering](#filtering)
-   [x] [All Tasks Page](#all-tasks-page)
-   [x] [Creating New Project(CRUD)](#creating-new-projectcrud)
-   [x] [useForm(from Inertia)](#useformfrom-inertia)
-   [x] [File Storage ( handle image upload)](#file-storage--handle-image-upload)
-   [x] [ThemeToggle](#theme-toggle-dark-and-light)
-   [x] [React Tostify](#)

# Features

**CRUD Operations:** Create, Read, Update, and Delete projects and tasks.  
**Seeding:** Pre-populate the database with sample data.  
**Pagination:** Efficiently navigate through large sets of tasks.  
**Filtering:** Filter tasks based on various criteria.  
**Image Upload:** Handle file storage and image uploads.  
**Dynamic Theming:** Toggle between light and dark themes.  
**Real-time Notifications:** Use React Toastify for user notifications.  

### Tasks

| Id  | name | description | image_path | status | priority | due_date | assigned_user_id | created_by | updated_by | project_id |
| --- | ---- | ----------- | ---------- | ------ | -------- | -------- | ---------------- | ---------- | ---------- | ---------- |
|     |      |             |            |        |          |          |                  |            |            |            |
|     |      |             |            |        |          |          |                  |            |            |            |

### Projects

| Id  | name | description | image_path | status | due_date | created_by | updated_by |
| --- | ---- | ----------- | ---------- | ------ | -------- | ---------- | ---------- |
|     |      |             |            |        |          |            |            |
|     |      |             |            |        |          |            |            |


