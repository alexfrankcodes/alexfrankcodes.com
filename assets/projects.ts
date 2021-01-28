import { ProjectInfo } from "../common/types";

export const projects: Array<ProjectInfo> = [
  {
    title: "Name Walker",
    image: "name-walker.png",
    codeURL: "github.com/alexfrankcodes/name-walker",
    description:
      "An application that takes in a name, converts it into a number, and generates a random walk using that number as a seed. The end result is a unique random walk specific to each user's name.",
    demo: "https://alexfrankcodes.github.io/rainbow-sorts/",
    technologies: ["React", "p5.js"],
  },
  {
    title: "Rainbow Sorts",
    image: "https://media1.giphy.com/media/sKe7HpVPDGbcsFYUW5/giphy.gif",
    codeURL: "github.com/alexfrankcodes/rainbow-sorts",
    description:
      "Visualizations of sorting algorithms through rainbows. Arcs of various colors are drawn and then sorted by their hue value(or the 'H' in HSL).",
    demo: "https://alexfrankcodes.github.io/rainbow-sorts/",
    technologies: ["HTML", "CSS", "p5.js", "Algorithms"],
  },
  {
    title: "Twitter Opinion Analyzer",
    image: "https://i.imgur.com/LNs4HeK.png",
    codeURL: "github.com/alexfrankcodes/twitter-opinion-analyzer",
    description:
      "A python web app that lets a user enter a topic and get the current polarity on that topic through sentiment analysis on recent tweets.",
    demo: "https://twitter-opinion-analyzer.herokuapp.com/",
    technologies: ["Python", "Flask", "Heroku"],
  },
  {
    title: "Galaxy Fighter",
    image: "https://i.imgur.com/4h0mDsM.gif",
    codeURL: "github.com/alexfrankcodes/arcade-shooter",
    description:
      "A 2D Arcade Shooter game, built in C++ w/ OpenFrameworks as a part of my Computer Game Design course (CS134 @ SJSU).",
    technologies: ["C++", "OpenFrameworks"],
  },
  {
    title: "Random Emoji",
    codeURL: "github.com/alexfrankcodes/random-emoji",
    description:
      "A small JS library for generating random emojis. By working on this project, I learned the basics of building, testing, and deploying my own JavaScript library.",
    technologies: ["JavaScript", "Chai", "Mocha"],
  },
  {
    title: "React Task Manager",
    codeURL: "github.com/alexfrankcodes/react-task-tracker",
    description:
      "A straightforward React app for keeping track of tasks. Built to demonstrate basic React Skills. State is handled by using React Hooks, and styling was done through Sass. Data is stored on a mock backend made with json-server.",
    technologies: ["React", "Sass"],
  },
];
