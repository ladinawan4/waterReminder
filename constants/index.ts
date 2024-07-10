export const themes = [
  { value: "light", label: "Light", icon: "/assets/icons/sun.svg" },
  { value: "dark", label: "Dark", icon: "/assets/icons/moon.svg" },
  { value: "system", label: "System", icon: "/assets/icons/computer.svg" },
];
export const sidebarLinks = [
  {
    imgURL: "/assets/images/category.png",
    route: "/",
    label: "Dashboard",
  },
  {
    imgURL: "/assets/images/calendar.png",
    route: "/schedule-reminder",
    label: "Schedule Reminder",
  },
  {
    imgURL: "/assets/images/pie-chart.png",
    route: "/reports",
    label: "Reports",
  },
  {
    imgURL: "/assets/images/Notification Icon.png",
    route: "/notifications",
    label: "Notifications",
  },
  {
    imgURL: "/assets/images/settings.png",
    route: "/settings",
    label: "Settings",
  },
  // {
  //   imgURL: "/assets/icons/question.svg",
  //   route: "/ask-question",
  //   label: "Ask a question",
  // },
];
export const BADGE_CRITERIA = {
  QUESTION_COUNT: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  ANSWER_COUNT: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  QUESTION_UPVOTES: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  ANSWER_UPVOTES: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  TOTAL_VIEWS: {
    BRONZE: 1000,
    SILVER: 10000,
    GOLD: 100000,
  },
};
