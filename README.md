# WanderWorld
Our web ‘WanderWorld’ is a blog like site for prospective travelers and travel recorders.

Link to the website: http://front-deploy.s3-website.ap-northeast-2.amazonaws.com/
- frontend deploy: aws s3
- backend deploy: aws ec2

## Table of Contents
- [Introduction](#introduction)  
- [Development-Backend](#development-backend)
- [Development-Frontend](#development-frontend)
- [Features](#features)
  - [Log-in](#log-in)
  - [Posting](#posting)
  - [Following](#following)
  - [Searching](#searching)
  - [Liking](#liking)
  - [Hashtags](#hashtags)

## Introduction
WanderWorld is a place for you to record your personal travel experiences and also refer other people's travelling plans, share memories and connect with people. By recording your travel experience, you will be able to document your route with photos of the main places, which can be used as a guide for other prospective travelers. We hope to have an active travel community with the ability to follow each other like a social network, view each other's travel records, and make recommendations.
The goal is to create an effective platform for sharing travel experiences, and WanderWorld will be an interesting place for anyone who is planning to travel or has traveled.

## Development-Backend
The backend of this project is built using Spring Boot, a powerful Java-based framework. MongoDB is employed as the database, and Maven manages project dependencies.
The details about parameters, request and response bodies of each REST endpoint can be found on [our Postman page](https://documenter.getpostman.com/view/25534806/2s9YeHbr1a#d69f69c8-e755-41a3-a1dd-c43ea0b1fccd).

### Project Structure

The backend follows a structured architecture with separate packages for controllers, models, repositories, services, DTOs, mappers, and security configurations.

```plaintext
/backend
│
├── src
│   ├── main
│   │   ├── java
│   │   │   ├── team1.wanderworld
│   │   │   │   ├── auth
│   │   │   │   ├── common
│   │   │   │   ├── Controllers
│   │   │   │   ├── Dtos
│   │   │   │   ├── Mappers
│   │   │   │   ├── Models
│   │   │   │   ├── Repositories
│   │   │   │   └── Services
│   │   │   └── WanderWorldApplication.java
│   │   ├── resources
│   │   │   ├── application.properties
│   │   │   └── // Other configuration files
```
### Technologies Used
- *SpringBoot*: Provides a robust and efficient framework for building Java-based applications. Easy to implement queries using the built in feautures.
- *Maven*: Manages project dependencies and simplifies the build process.
- *MongoDB*: Serves as the database to store and retrieve data efficiently. Easy to manage and implement search query using MongoAtlas.
### Main Components
### Models
   
1. **User**: 
The `User` model represents the application users and is used for authentication and authorization.

##### Attributes
- `id` (String): Unique identifier for the user.
- `name` (String): The username chosen by the user to be shown to others.
- `username` (String): The username chosen by the user for login.
- `password` (String): Encrypted password for user authentication.
- `imageurl` (String): Storing the profile picture of the user.
- `followerlist` (List<String> ): Keeping track of the user's followers.
- `followinglist` (List<String> ): Keeping track of other users followed by the user.
- `likedposts` (List<String> ): Keeping track of the posts that the user liked.


2. **Post**: 
The `Post` model represents individual posts or articles created by users.
##### Attributes
- `id` (String): Unique identifier for the post.
- `userId` (String): Connecting the post with a specific user through that user's id.
- `content` (String): The main content of the post.
- `city` (String): The main region that the trip took place.
- `duration` (Integer): The time it takes to complete that trip.
- `likenum` (Integer): The number of likes that post gets.
- `creationDate` (LocalDateTime): The time that the post is created.
- `destinations` (List<String>): List of main destinations.
- `hashtags` (List<String>): List of hashtags that describe the post.
- `pictures` (List<String>): Pictures of main destinations.
- `comments` (List<String>): Comments related to that specific post.


3. **Comment**: 
The `Comment` model represents comments made by users on specific posts.

##### Attributes
- `id` (String): Unique identifier for the comment.
- `content` (String): The content of the comment.
- `userId` (User): The id of the user who wrote the comment.
- `postId` (String): The id of the post on which the comment is made.
- `creationDate` (LocalDateTime): Timestamp indicating when the comment was created.
  

4. **Hashtag**: 
The `Hashtag` model represents hashtags that are added by users on specific posts.

##### Attributes
- `id` (String): Unique identifier for the comment.
- `name` (String): Name of the hashtag.
- `postIdList` (List<String>): The list of posts that has this hashtag.
- `count` (long): The number of times that this hashtag is used. (used to find the popular hashtags)

### Controllers

1. **UserController**

The `UserController` is responsible for handling user-related operations.

#### Endpoints

- **Post /users**
  - **Description**: Create a user.
- **Put /users/edit**
  - **Description**: Edit user information.
- **Get /users/{user-id}**
  - **Description**: Retrieve information of a specific user.
- **Delete /users/delete**
  - **Description**: Delete a user.
- **Post /users/{follow-id}/follow**
  - **Description**: Following a new user.
- **Post /users/{unfollow-id}/unfollow**
  - **Description**: Unfollowing a user.
 
2. **PostController**

The `PostController` manages operations related to posts.
#### Endpoints

- **Post /posts**
  - **Description**: Creating a new post.
- **Put /posts/{post-id}/edit**
  - **Description**: Editing a post.
- **Delete /posts/{post-id}/delete**
  - **Description**: Deleting a post.
- **Get /posts/{post-id}**
  - **Description**: Retrieving a specific post.
- **Get /posts**
  - **Description**: Retrieving all posts.
- **Get /posts/user/{user-id}**
  - **Description**: Retrieving the posts of a specific user.
- **Post /posts/{post-id}/like**
  - **Description**: Adding a post to a user's liked posts list.
- **Post /posts/{post-id}/unlike**
  - **Description**: Removing a post from a user's liked posts list.

3. **CommentController**

The `CommentController` manages operations related to comments.
#### Endpoints

- **Post /posts/{postId}/comments**
  - **Description**: Creating a new comment under a post.
- **Get /posts/{postId}/comments**
  - **Description**: Retrieving the comments of a specific post.
- **Delete /comments/{commentId}**
  - **Description**: Deleting a comment.
- **Put /comments/{commentId}/edit**
  - **Description**: Editing a comment.
 
4. **HashtagController**

The `HashtagController` manages operations related to hashtags.
#### Endpoints

- **Get /hashtags**
  - **Description**: Retrieving all hashtags.
- **Get /hashtags/{name}**
  - **Description**: Retrieving the hashtags with the same name.
- **Post /hashtags/{name}**
  - **Description**: Creating a new hashtag.
- **Get /hashtags/get/top5**
  - **Description**: Retrieving the top 5 hashtags that are most popular.

5. **SearchController**

The `SearchController` manages the search operations.
#### Endpoints

- **Get /search/posts/{text}**
  - **Description**: Retrieves the posts that has that specific `text` used in their `content`, `city`, `destinations` or `hashtags` attributes.
- **Get /search/users/{text}**
  - **Description**: Retrieves the users with a specific `username`.

## Development-Frontend

The frontend of this project is developed using React, a powerful JavaScript library for building user interfaces. It interacts with the backend to provide a dynamic and responsive user experience.
+ We had difficulty making our UI prettier because it's our first time using react also developing frontend.
### Project Structure

```plaintext
/frontend
│
├── public
│   ├── index.html
│   ├── vite.svg
│   └── manifest.json
│
├── src
│   ├── assets
│   │   └── (Reusable UI materials) ...
│   │
│   ├── components
│   │   └── (Reusable UI components) ...
│   │
│   ├── contexts
│   │   └── DataContext.tsx
│   │
│   ├── Fonts
│   │   └── font.css
│   │
│   ├── pages
│   │   ├── Home.tsx
│   │   ├── index.tsx
│   │   ├── Login.tsx
│   │   ├── Main.tsx
│   │   ├── Profile.tsx
│   │   ├── SearchResult.tsx
│   │   └── Signup.tsx
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   ├── index.tsx
│   ├── main.tsx
│   ├── reportWebvitals.ts
│   └── vite-end.d.ts
```

## Features
### Log-in
Users can login through basic log-in for the website or social log-in through Google.
### Posting
Users can post their travel course plan including:
- main places to visit
- what time to visit which place
- hashtags that explain the keywords related to that specific travel course

The post will only show the main places that the course includes so that people
can choose according to their interests without having to read long texts. If they like a certain traveling course, they click to the arrow under the post and see the detailed long plan
### Following
People can follow specific people and see the places they visit, and the posts that the people you follow will appear on the main page according to the timeline.
### Searching
Users can search thourgh posts and filter them based on some specific keywords using the search bar.
### Liking
Users can like specific posts and then take a look at those posts anytime they want using the heart icon on the top right side of the page.
### Hashtags
Top five most used hashtags are displayed under the search bar. Users can click on those hastags to view the posts that has those hashtags. Users can also search keywords using the search bar and the posts including that keyword as an hashtag will appear with the same algorithm.
