import moment from 'moment';

const skillNameIsCorrect = (name = "", pattern = "") => {
  name.toLowerCase();
  pattern.toLowerCase();
  if(pattern === "" || pattern === "all" || pattern === "all skills"){
    return true;
  }
  return name.includes(pattern);
}

const dateIsBefore = (date1, date2) => {
  if(date1 === "all" || date2 === "all") return true;
  return (moment(date1, "YYYY-MM-DD") <= moment(date2, "YYYY-MM-DD"));
}

const dateIsCorrect = (begin, shouldBegin, shouldEnd) => {
  return(dateIsBefore(shouldBegin, begin) && dateIsBefore(begin, shouldEnd));
}

const filteringElementsAreEmpty = (elements) => {
  return !("skill" in elements);
}

export const filterLogs = (logs = [], filteringElements) => {
  if(filteringElementsAreEmpty(filteringElements)) {
    return logs;
  }
  return logs.filter(log => {
    if(!skillNameIsCorrect(log.skillName, filteringElements.skill)){
      return false;
    }
    if(!dateIsCorrect(log.timeStarted,
          filteringElements.begin, filteringElements.end)){
      return false;
    }
    return true;
  });
}
