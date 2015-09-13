/*
This is empty on purpose! Your code to build the resume will go here.
 */

var work = {
	"jobs" : [
		{
			"employer" : "Neuse Regional Library",
			"title" : "Reference Librarian and Grants Specialist",
			"location" : "Kinston, NC",
			"dates" : "October 2006 - present",
			"description" : "Managed the Library's integrated library system, as well as a migration to the Evergreen open source integrated library system; wrote proposals which were awarded over $1,000,000 from various sources, including government, corporate, and private foundation sources; assisted in leading several strategic library initiatives with library consultants funded by LSTA grant funding, including the development of a new technology plan and a new five-year strategic plan; completed the Library’s annual USAC E-Rate proposal and all necessary forms for reimbursement; assisted with two library renovation projects, while serving on the Building Committee for the second and coordinating communications between the owner and architect; implemented several new information technology systems funded by grant funding, including an RFID automated system, time and print management software for public computers, network upgrades, and a mobile training lab.",
			"url" : "http://www.neuselibrary.org"
		}
	]
};

var projects = {
	"projects" : [
		{
			"title" : "Portfolio",
			"dates" : "July 2015",
			"description" : "Interactive Portfolio",
			"images" : ["images/project1-1.png", "images/project1-2.png"],
			"url" : "http://www.github.com/jstout38/Project-1"
		},
		{
			"title" : "Resume",
			"dates" : "August 2015",
			"description" : "Interactive Resume",
			"images" : ["images/project2-1.png", "images/project2-2.png"],
			"url" : "http://www.github.com/jstout38/Project-2"
		}
	]
};

var bio = {
	"name" : "Justin Stout",
	"role" : "Web Developer",
	"welcomeMessage" : "Welcome to my resume!",
	"contacts" : {
		"mobile" : "252-525-0115",
		"email" : "jstout38@gmail.com",
		"github" : "jstout38",
		"twitter" : "@JustinMStout",
		"location" : "Kinston, NC"
	},
	"bioPic" : "images/picture.jpg",
	"skills" : ["HTML", "CSS", "Javascript", "jQuery"]
};

var education = {
	"schools" : [
		{
			"name" : "Duke University",
			"location" : "Durham, NC",
			"degree" : "B.S.",
			"majors" : ["Economics"],
			"dates" : "2006",
			"url" : "http://www.duke.edu"
		},
		{
			"name" : "North Carolina Central University",
			"location" : "Durham, NC",
			"degree" : "M.L.S.",
			"majors" : ["Library Science"],
			"dates" : "2014",
			"url" : "http://www.ncsu.edu"
		}
	],
	"onlineCourses" : [
		{
			"title" : "Front-End Developer Nanodegree",
			"school" : "Udacity",
			"dates" : "2015",
			"url" : "http://www.udacity.com"
		}
	]
};

bio.display = function() {
	var formattedName = HTMLheaderName.replace("%data%", bio.name + " ");
	var formattedRole = HTMLheaderRole.replace("%data%", bio.role);
	$("#header").prepend(formattedRole);
	$("#header").prepend(formattedName);
	var formattedMobile = HTMLmobile.replace("%data%", bio.contacts.mobile);
	var formattedEmail = HTMLemail.replace("%data%", bio.contacts.email);
	var formattedGithub = HTMLgithub.replace("%data%", bio.contacts.github);
	var formattedTwitter = HTMLtwitter.replace("%data%", bio.contacts.twitter);
	var formattedLocation = HTMLlocation.replace("%data%", bio.contacts.location);
	$("#topContacts").append(formattedMobile);
	$("#topContacts").append(formattedEmail);
	$("#topContacts").append(formattedGithub);
	$("#topContacts").append(formattedTwitter);
	$("#topContacts").append(formattedLocation);
	var formattedPicture = HTMLbioPic.replace("%data%", bio.bioPic);
	var formattedWelcome = HTMLwelcomeMsg.replace("%data%", bio.welcomeMessage);
	$("#header").append(formattedPicture);
	$("#header").append(formattedWelcome);
	$("#header").append(HTMLskillsStart);
	bio.skills.forEach(function(skill) {
		var formattedSkill = HTMLskills.replace("%data%",skill);
		$("#skills").append(formattedSkill);
	});
	$("#footerContacts").append(formattedMobile);
	$("#footerContacts").append(formattedEmail);
	$("#footerContacts").append(formattedGithub);
	$("#footerContacts").append(formattedTwitter);
	$("#footerContacts").append(formattedLocation);
};

work.display = function() {
	work.jobs.forEach(function(job) {
		$("#workExperience").append(HTMLworkStart);
		var formattedEmployer = HTMLworkEmployer.replace("%data%",job.employer);
		formattedEmployer = formattedEmployer.replace("#",job.url);
		var formattedTitle = HTMLworkTitle.replace("%data%",job.title);
		$(".work-entry:last").append(formattedEmployer + formattedTitle);
		var formattedDates = HTMLworkDates.replace("%data%",job.dates);
		var formattedLocation = HTMLworkLocation.replace("%data%",job.location);
		var formattedDescription = HTMLworkDescription.replace("%data%",job.description);
		$(".work-entry:last").append(formattedDates);
		$(".work-entry:last").append(formattedLocation);
		$(".work-entry:last").append(formattedDescription);
	});
};


projects.display = function() {
	projects.projects.forEach(function(project) {
		$("#projects").append(HTMLprojectStart);
		var formattedTitle = HTMLprojectTitle.replace("%data%", project.title);
		formattedTitle = formattedTitle.replace("#", project.url);
		var formattedDates = HTMLprojectDates.replace("%data%", project.dates);
		var formattedDescription = HTMLprojectDescription.replace("%data%", project.description);
		$(".project-entry:last").append(formattedTitle);
		$(".project-entry:last").append(formattedDates);
		$(".project-entry:last").append(formattedDescription);
		project.images.forEach(function(image) {
			var formattedPicture = HTMLprojectImage.replace("%data%",image);
			$(".project-entry:last").append(formattedPicture);
		});
	});
};

education.display = function() {
	education.schools.forEach(function(school) {
		$("#education").append(HTMLschoolStart);
		var formattedName = HTMLschoolName.replace("%data%", school.name);
		formattedName = formattedName.replace("#", school.url);
		var formattedDegree = HTMLschoolDegree.replace("%data%", school.degree);
		var formattedDates = HTMLschoolDates.replace("%data%", school.dates);
		var formattedLocation = HTMLschoolLocation.replace("%data%", school.location);
		$(".education-entry:last").append(formattedName + formattedDegree);
		$(".education-entry:last").append(formattedDates);
		$(".education-entry:last").append(formattedLocation);
		school.majors.forEach(function (major) {
			var formattedMajor = HTMLschoolMajor.replace("%data%",major);
			$(".education-entry:last").append(formattedMajor);
		});
	});
	$("#education").append("<br>");
	$("#education").append(HTMLonlineClasses);
	education.onlineCourses.forEach(function(school) {
		$("#education").append(HTMLschoolStart);
		var formattedTitle = HTMLonlineTitle.replace("%data%", school.title);
		formattedTitle = formattedTitle.replace("#", school.url);
		var formattedSchool = HTMLonlineSchool.replace("%data%", school.school);
		var formattedDates = HTMLonlineDates.replace("%data%", school.dates);
		var formattedURL = HTMLonlineURL.replace("%data%", school.url);
		formattedURL = formattedURL.replace("#", school.url);
		$(".education-entry:last").append(formattedTitle + formattedSchool);
		$(".education-entry:last").append(formattedDates);
		$(".education-entry:last").append(formattedURL);
	});
};

bio.display();
work.display();
projects.display();
education.display();

$("#mapDiv").append(googleMap);
