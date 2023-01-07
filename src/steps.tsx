import { StepType } from "@reactour/tour";

const click = (node: HTMLElement) => {
  // check if node is valid
  if (!node) return;
  // click on the node
  node.click();
};

export const homeSteps = [
  {
    selector: ".tut-home",
    content:
      "Welcome to Grow 🌱! Let's help you become more productive, reflect, develop better habits, keep track of tasks, and most importantly GROW 🌞!",
  },
  {
    selector: ".tut-home-help",
    content:
      "Need help? Just click the (🆘?) icon anytime and we'll guide you through the app!",
  },
  {
    selector: ".tut-home-places",
    content:
      "Looking to manage tasks? Head to the 📅 Task Manager. Want to try the Pomodoro technique? Check out the ⏰ timer. Want to reflect and journal? Click on the 📝 Reflect/Journal button. And for all your stats, click on the 📊 Stats button!",
    position: "top",
    stepInteraction: false,
  },
  {
    selector: ".tut-home-brief",
    content:
      "Get a quick briefing on your day with the 🗓 Daily Briefing section!",
    action: click,
    position: "left",
  },
  {
    selector: ".tut-home-goals",
    content:
      "Check out your 🎯 Goals in the Daily Briefing section. These are tasks and notes you set for yourself the previous night in your nightly journal. If you're new, it might be empty now, but don't worry - you'll be setting goals in no time!",
    position: "top",
    action: click,
  },
  {
    selector: ".tut-home-habits",
    content:
      "Head to the Habits tab 🧑‍💼 in the Daily Briefing section to see all the habits you should be working on, like exercise, eating healthy, etc. If you're new, you might not have any habits set yet, but you can easily set them in the Settings section 🔧!",
    action: click,
    position: "top",
  },
  {
    selector: ".tut-home-progress",
    content:
      "Check out the Overview graph 📈 to see how you're doing on a scale of 0-100, taking into account your work, habits, and more. If you're new, the graph might be empty now, but it will start filling up as you use the app and track your progress!",
    action: click,
    position: "top",
  },
  {
    selector: ".tut-home-settings",
    content:
      "Don't forget about the Settings button 🔧! This is where you can manage your habits, customize the app to your liking, and more.",
  },
] as StepType[];

export const settingsSteps = [
  {
    selector: ".tut-settings-tags",
    content:
      "Ready to organize your tasks and see what skills you're developing over time? Check out the 🏷 Tags feature! Use tags to categorize your tasks and represent the type of work you're doing. You can even add multiple tags to a single task. For example, as a computer science student, you might use tags like 'Study', 'Engineering', 'Research', 'Planning', and 'Chore'.",
  },
  {
    selector: ".tut-settings-created-tags",
    content:
      "Looking at the default tags (Work, Chores, Personal)? Feel free to customize them to your liking and make them your own! 💪",
  },
  {
    selector: ".tut-settings-create-tag",
    content:
      "Ready to create your own tags? Head to the 'Create a tag' section 💡 and get started! Don't be shy, create a few before you move on. The more tags you have, the better you can organize and track your tasks and skills!",
  },
  {
    selector: ".tut-settings-stickers",
    content:
      "Check out the 🏷 Stickers feature to assign stickers to your overarching goals and track your progress! Only one sticker can be assigned to a task or timer, so choose wisely. You might use stickers to represent the name of courses you're studying, activities you're tracking, project names, and more.",
  },
  {
    selector: ".tut-settings-create-sticker",
    content:
      "Ready to create your own stickers? Head to the 'Create a sticker' section 💡 and get started! Don't be shy, create a few before you move on. The more stickers you have, the better you can track your progress and achieve your goals!",
  },
  {
    selector: ".tut-settings-create-tag-habit",
    action: click,
    content:
      "Ready to improve your scores and track your progress in the Statistics section? Head to the Tag and Sticker Habits section 📈 and select the tags and stickers you want to work on. Assign the days and duration for each, and watch your scores soar! Just remember to refresh the page after making any changes to your tags and stickers.",
  },
  {
    selector: ".tut-settings-create-tag-habit-day",
    content:
      "Great job selecting your first habit! Now it's time to choose the days of the week you want to work on it. Just click on the days you want to include and you're all set. 📅",
  },
  {
    selector: ".tut-settings-create-tag-habit-duration",
    action: click,
    content:
      "Now it's time to choose the duration you want to work on this habit. Just click on the plus and minus signs to increase or decrease the time, and you're all set. ⏰",
  },
  {
    selector: ".tut-settings-create-habit",
    content:
      "Ready to create custom habits and track specific, personal things you want to improve on? Head to the Habits section 🧑‍💼 and get started! These habits will appear in your nightly journaling sessions and can be used to track things like meditation, brushing teeth, and more. Just click on the 'Create a custom habit' button to get started. 🤗",
  },
  {
    selector: ".tut-navbar-overview",
    content:
      "Don't forget about the bottom navigation bar! 🔝 Use it to easily access all the sections we talked about earlier, like the Task Manager, Pomodoro timer, Reflect/Journal, Stats, and more. Just click on the corresponding icon to go to the section you want. 🤓",
  },
] as StepType[];

export const taskSteps = [
  // First we show the task creation
  // Then we click on create task
  // Then we show the title
  // Then we show sticker picker
  // Then we show the tag picker
  // Then we show the subtasks
  // Then we show the description
  // Then we show the save button
  // Then we click on the save button

  // add appropriate description in the content
  {
    selector: ".tut-task-create",
    content:
      "Welcome to the Tasks page! 📅 Here you can create tasks, view them, and see how they integrate seamlessly with your journaling and Pomodoro timer. Don't be shy, use the 'Create a task' button 🆕 a lot and feel right at home. The more tasks you create, the more organized and productive you'll be! ------ Ready to get started? Click on the 'Create a task' button 🆕 to continue.",
    disableActions: true,
  },
] as StepType[];

export const createTaskSteps = [
  // Then we show the title
  // Then we show sticker picker
  // Then we show the tag picker
  // Then we show the subtasks
  // Then we show the description
  // Then we show the save button
  // Then we click on the save button

  // add appropriate description in the content
  {
    selector: ".tut-task-overview",
    content:
      "Great job clicking on the 'Create a task' button! 🆕 Here we'll walk you through the process of creating a new task. It's easy and straightforward, just fill in the fields and click 'Create' when you're done. Let's get started! 💪",
    position: "bottom",
    disableActions: false,
  },
  {
    selector: ".tut-task-title",
    content:
      "First up is the Title of the task. 📝 This is the most important part, as it will help you identify and remember the task later on. Make it short, catchy, and descriptive.",
    position: "top",
  },
  {
    selector: ".tut-task-priority",
    content:
      "Next up is the Task Priority. 🔥 If you want to mark a task as a priority, just toggle the exclamation mark. This will help you focus on the most important tasks first and make sure they get done.",
    actionAfter: click,
    position: "top",
  },
  {
    selector: ".tut-task-sticker",
    content:
      "Now it's time to choose a Task Sticker. 🏷 These are the same stickers you created in the Settings section, and they help you categorize and track your tasks. If you haven't created any stickers yet, don't worry - you can always do it later in the Settings. Just choose the sticker that best represents this task.",
    position: "left",
  },
  {
    selector: ".tut-task-tag",
    content:
      "Now it's time to choose Task Tags. 🏷 These are the same tags you created in the Settings section, and they help you categorize and track your tasks and skills. If you haven't created any tags yet, don't worry - you can always do it later in the Settings. Just choose the tags that best represent this task and the skills you're developing. Remember, you can add multiple tags to a single task.",
    position: "left",
  },
  {
    selector: ".tut-task-subtasks",
    content:
      "Next up are Subtasks. 🔎 Sometimes a task can be too big or complex to handle all at once, so it helps to break it down into smaller, more manageable pieces. That's where subtasks come in. Just click on the 'Add a subtask' button to create as many subtasks as you need for this task. Don't worry about getting it perfect - you can always add, delete, or modify subtasks later on.",
    position: "left",
  },
  {
    selector: ".tut-task-description",
    content:
      "Finally, we have the Description field. 📝 This is where you can add more details and context to your task. You can use it to describe the task in more detail, list out the steps you need to take, or add any notes or resources you might need. Don't worry if you don't have much to add here - some tasks might not require a lot of description. Just skip this field if you don't need it.",
    position: "left",
  },
  {
    selector: ".tut-task-save",
    content:
      "You're almost done! 🎉 Just click the 'Create' button to save your new task. 💾 Don't worry if you're not sure you got everything right - you can always go back and modify the task later on. Once you click 'Create', your new task will be added to the Task Manager, ready for you to tackle. Good luck! 💪",
    position: "right",
    disableActions: true,
  },
] as StepType[];

import React from "react";
import { Close } from "@mui/icons-material";
import { IconButton } from "@mui/material";

export const closeBtn = ({ onClick }: any) => (
  <IconButton
    size="large"
    onClick={onClick}
    style={{
      position: "absolute",
      top: 0,
      right: 0,
      cursor: "pointer",
    }}
  >
    <Close />
  </IconButton>
);
