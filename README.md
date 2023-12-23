# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Installation

For Installation of the project you will need node installed, you can install node from [official docs](https://nodejs.org/en)

After successful installation of node you need to install all libraries for this project

run `npm install` command in the terminal.

after this run `npm start`

This runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### How to use the app

- Once the app is launched you can visit the app at [http://localhost:3000](http://localhost:3000)
- When the app launches it creates a new chat named "New Chat Auto" automatically so the user can directly come and interact with the application.
- User can use input field to type queries, and use send button to send the message.
- When the user sends a msg a mock api (Promise) is triggered and it gives response after 1 second each time, the delay was added to mock an api call
- Users can like or dislike the responses they get from the bot
- There is End Conversation button to end the conversation, this triggers a feedback modal where user can give rating and input feedback, after submitting the feedback this conversation is marked as ended and cannot be continued, but user can revisit it anytime
- There is a side panel in the left in which all the chats are available and user can create new chat from "New Chat" button at the top of side panel
- Also there a feedback page that is shown in the navigation at the top of the page
- In the feedback page there is a table in which all the conversations are listed (rated and unrated)
- This list is rendered in a sorted fashion by default so user don't have to sort it every time.

### Trade-Off/Technical Choices

- I used context API instead of Redux due to time constraint. I tried to built it in a very simple way.
- I used a simple Promise instead of setting up an express server, if I do this my application will need one more application that will run parallel. So using promise I made this application standalone.
- Increasing the number of features in the application may lead to user confusion, and will require additional time and effort to enhance the UI/UX.
- If I had more time, I might have used Redux which makes the application more scalable.
