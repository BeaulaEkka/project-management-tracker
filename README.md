<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

# Table of contents

Project workflow and git commits

- [x] Installation
- [x] [Set up Models, Factories, tables](#set-up-models-factories-migrations-and-tables)
- [x] [Set up Controllers-ProjectController,TaskControllers](#set-up-controllers)
- [x] [Seeding](#seeding)
- [x] [Set up routes](#set-up-routes)
- [x] [Set up views](#set-up-views)
- [x] [Pagination](#pagination)
- [x] [Filtering](#filtering)
- [x] [All Tasks Page](#all-tasks-page)
- [x] [Creating New Project(CRUD)](#creating-new-projectcrud)
- [x] [useForm(from Inertia)](#useformfrom-inertia)
- [x] [File Storage ( handle image upload)](#file-storage--handle-image-upload)
- [x] [ThemeToggle](#theme-toggle-dark-and-light)

## #Set up Models,Factories,Tables

## Set up Models, Factories, migrations and tables

## Seeding

## set-up-views

## Set up routes

## Pagination

## Filtering

use of forwardRef() and where()

## All Tasks Page

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

# Set up Controllers

Created TaskController, ProjectController, UserController with --model=<MODELNAME> --requests --resource

## Creating New Project(CRUD)

## useForm(from Inertia)

## File Storage ( handle image upload)

## Theme Toggle (dark and light)
