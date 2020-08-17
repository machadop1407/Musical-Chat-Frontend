# Musical Chat - Real Time Chat Between People with Similar Taste in Music


## Description:

Musical Chat is a platform where users are able to connect and
Chat with people who have similar taste in music as them. The
user needs to login with their Spotify account, which allows the
platform to have access to the songs and genres they listen to.
I created an algorithm which takes into account the favorite
genres from users and match people based on it. Since there are
several different genres, the algorithm takes into account how
similar the genres are based on string similarity. When matched,
they are able to chat in real time with each other using Web
Sockets.

## Time Taken:

1 Month

## Technologies Used:

- ReactJS
- NodeJS
- WebSockets (Socket.io)
- MySQL
- HTML
- CSS
- Spotify API
- Heroku

### Front End:

This repository is for the front-end. The front-end is hosted on Netlify.

### Back End

The back-end is hosted on two different Heroku Dynos. One for the Musical Chat Rest API, and the other for the Spotify Authentication.
The back-end repository is: https://github.com/machadop1407/musical-connection


## Design:

### Database:

2 tables:
- Users: Stores everything about the user including username, spotifyId, favorite genre, currentmatch, and current socket room.
- Messages: Stores all messages and info about them including the message itself, the id of the user that sent, and the id of the user that recived.


### Server-Side:
Rest API: 
- Express server with 3 routes:
  - Login: login route that checks if user already has an account in the platform. If not, it inserts a new row in the Users table and fetches all relevant info.
  - Matching: matching route that handles all matching requests. It also includes the matching algorithm described above.
  - Messages: messaging route that handles all CRUD operations related to messages.
  
Spotify Authentication:
- Seperate server that utilizes Spotify's Authorization Code Flow method.

### Front-End:

Front End fully developed in ReactJS using the create-react-app boiler plate






