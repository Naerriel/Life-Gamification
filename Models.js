function updateExp(addedExp, skillNr, callback){
    /* Increases skill's exp by a certain amount.
     *    */
    var skillName = allSkills[skillNr];
    var updateStorage = function (result) {
          var overallExp;
          if (skillName in result) {
                  overallExp = result[skillName] + addedExp;
                }
          else {
                  overallExp = addedExp;
                }
          var skillsDict = {};
          skillsDict[skillName] = overallExp;
          chrome.storage.sync.set(skillsDict);
          callback(skillNr);
        };
    chrome.storage.sync.get([skillName], updateStorage);
}

function getExp(skillName, callback){
    /* Gets exp of a skill from storage.
     *    */
    chrome.storage.sync.get([skillName], function (result) {
          var overallExp;
          if (skillName in result) {
                  overallExp = result[skillName];
                }
          else{
                  overallExp = 0;
                }
          callback(overallExp);
        });
}

function getLevel(exp) {
    /* Calculates current level and exp needed to next level.
     *    * O(max_level) - computational complexity
     *       */
    var level = 0;
    while(exp >= expTable[level + 1]){
            level++;
        }
    var levelExp = exp - expTable[level];
    var totalExpNeeded = expTable[level + 1] - expTable[level];
    var levelUpExp = totalExpNeeded - levelExp;
    var htmlCode = (`
          Level ` + level + `: ` + levelUpExp + ` more.
          `);
    return htmlCode;
}
