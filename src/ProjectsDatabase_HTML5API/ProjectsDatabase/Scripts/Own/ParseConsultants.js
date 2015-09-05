var GetById = function (collection, id) {
    for (var i = 0; i < collection.length; i++) {
        if (collection[i].Id == id)
            return collection[i];
    }
    return '';
}
var ParseConsultants = function (consultants, projects) {
    consultants.forEach(function (consultant, i) {
        for (var j = 0; j < 2000000000; j++);
        var projectIds = consultant.ProjectsInvolved.split(',');
        var projectNumbers = [];
        projectIds.forEach(function (projectId, i) {
            projectNumbers.push(GetById(projects, projectId) ? GetById(projects, projectId).Number : 'Unknown');
        });
        consultants[i].ProjectsInvolved = projectNumbers.join(',');
    });
    return consultants;
};
function messageHandler(e) {
    var result = ParseConsultants(e.data.consultants, e.data.projects);
    postMessage(result);
};
addEventListener('message', messageHandler, true);

