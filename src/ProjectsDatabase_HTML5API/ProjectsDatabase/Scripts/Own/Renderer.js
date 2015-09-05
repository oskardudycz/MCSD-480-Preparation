$(document).ready(function () {
    var Key = 'Projects';
    var PopulateGrid = function (selector, rows, cols) {
        if (rows && rows.forEach) {
            rows.forEach(function (row, i) {
                $(selector).find('thead').append('<tr><td>' + row[cols[0]] + '</td><td>' + row[cols[1]] + '</td></tr>');
            });
        }
    };
    var QueryForConsultantsWebWorker = function () {
        var worker = new Worker('../Scripts/Own/ParseConsultants.js');
        worker.onmessage = function (e) {
            PopulateGrid('#consultants-webworker', e.data, ['Id', 'ProjectsInvolved'])
        };
        $('#consultants-webworker').parent().append('<button type="button">Terminate</button>').click(function (e) {
            worker.terminate();
        });
        worker.onerror = function (e) { console.log('error'); }
        $.ajax({
            url: "http://localhost:57205/api/consultants",
            method: "GET",
        }).done(function (consultants) {
            //var projectsDictionary = localStorage.getItem(Key) ? JSON.parse(localStorage.getItem(Key)) : null;
            //if (!projectsDictionary) {
                $.ajax({
                    url: "http://localhost:57205/api/projects",
                    method: "GET",
                }).done(function (projects) {
                    worker.postMessage({ consultants: consultants, projects: projects });
                });
            //}
        });

    };
    var QueryForConsultants = function () {
        /*var ParseConsultants = function (consultants, projects) {
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
        };*/
        $.ajax({
            url: "http://localhost:57205/api/consultants",
            method: "GET",
        }).done(function (consultants) {
            var projectsDictionary = localStorage.getItem(Key) ? JSON.parse(localStorage.getItem(Key)) : null;
            if (!projectsDictionary) {
                $.ajax({
                    url: "http://localhost:57205/api/projects",
                    method: "GET",
                }).done(function (projects) {
                    consultants = ParseConsultants(consultants, projects)
                    PopulateGrid('#consultants', consultants, ['Id', 'ProjectsInvolved']);
                });
            } else {
                consultants = ParseConsultants(consultants, projectsDictionary)
                PopulateGrid('#consultants', consultants, ['Id', 'ProjectsInvolved']);
            }
        });
    }
    var QueryForProjects = function () {
        if (!localStorage.getItem(Key)) {
            $.ajax({
                url: "http://localhost:57205/api/projects",
                method: "GET",
            }).done(function (data) {
                localStorage.setItem(Key, JSON.stringify(data));
                if (data) {
                    PopulateGrid('#projects', data, ['Id', 'Number']);
                }
            });
        } else {
            data = localStorage.getItem(Key);
            PopulateGrid('#projects', JSON.parse(data), ['Id', 'Number']);
        }
    };
    if($('#projects').length > 0)
        QueryForProjects();
    if ($('#consultants').length > 0)
        QueryForConsultants();
    if ($('#consultants-webworker').length > 0)
        QueryForConsultantsWebWorker();
});