const ffmpeg = require("fluent-ffmpeg");
const ArgsX = require("./_Z/ArgsX");
const Fs = require("./_Z/Fs");
const _ = require("lodash");
const inquirer = require("inquirer");

const inputFolder = "./Origin";
const outputFolder = "./Output";

const questions = [
  {
    type: "input",
    name: "percent",
    message: "What %?",
  },
];

async function Start(){

  let ans = await inquirer.prompt(questions);
  let files = await Fs.readdir(inputFolder);
  for (const o of files){
    ffmpeg(inputFolder + "/" + o)
    .size(ans?.percent + "%")
    .output(outputFolder + "/" + o)
    .on("start", (msg) => {
      console.log("Processing " + o + "...");
    })
    .on("error", (err) => {
      console.log("An error occurred: " + err.message);
    })  
    .on("progress", (progress) => { 
      console.log("... frames: " + progress.frames + " ...");
    })
    .on("end", () => { 
      console.log("Finished processing " + o); 
    })
    .run();
  }
};


Start();
