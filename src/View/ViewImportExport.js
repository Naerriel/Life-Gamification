(function(){
  LifeGamification.view.importExport = {};

  LifeGamification.view.importExport.render = function () {
	$('.import-export').html(`
    <button class="import-export__button import">Import</button>
    <button class="import-export__button export">Export</button>
    <textarea class="import-export__json" placeholder="Place JSON here"></textarea>
  `);
    handleImportExportButtons();
  }

  const handleImportExportButtons = function () {
    $('.export').click(function() {
      LifeGamification.repository.getSkills()
        .then(function(skills){
          $('.import-export__json').html(JSON.stringify(skills));
        })
    });
    $('.import').click(function() {
      const storage = $(".import-export__json").val();
      if (storage === "") {
        return;
      }
      const skills = JSON.parse(storage);

      LifeGamification.models.clearCollection();
      LifeGamification.repository.updateSkills(skills)
        .then(function () {
          LifeGamification.models.createSkillsCollection(skills);
          LifeGamification.view.resetView();
        });
    });
  }
})();
