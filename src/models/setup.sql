CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);

INSERT INTO organization (name, description, contact_email, logo_filename)
VALUES
('BrightFuture Builders', 'A nonprofit focused on improving community infrastructure through sustainable construction projects.', 'info@brightfuturebuilders.org', 'brightfuture-logo.png'),
('GreenHarvest Growers', 'An urban farming collective promoting food sustainability and education in local neighborhoods.', 'contact@greenharvest.org', 'greenharvest-logo.png'),
('UnityServe Volunteers', 'A volunteer coordination group supporting local charities and service initiatives.', 'hello@unityserve.org', 'unityserve-logo.png');

CREATE TABLE category (
	category_id SERIAL PRIMARY KEY,
	name VARCHAR(75) NOT NULL
);

INSERT INTO category (name)
VALUES
('Enironmental'),
('Educational'),
('Community Service'),
('Health and Wellness');

CREATE TABLE service_project (
	service_project_id SERIAL PRIMARY KEY,
	organization_id INTEGER,
	title VARCHAR(150) NOT NULL,
	description TEXT NOT NULL,
	location VARCHAR(150),
	date VARCHAR(150),
	FOREIGN KEY (organization_id) REFERENCES organization (organization_id) On DELETE SET NULL
);

INSERT INTO service_project (organization_id,title,description,location,date)
VALUES
(3,'Park Cleanup','Join us to clean up local parks and make them beautiful!','','2026/06/12'), -- 1
(3,'Food Drive','Help collect and distribute food to those in need.','Utah Food Bank','2026/05/10'), -- 2
(3,'Community Tutoring','Volunteer to tutor students in various subjects.','local schools','Tuesdays'), -- 3
(3,'Make Cards For Seniors','Come join us to uplift our seniors, by making thank you cards','Next left church','2026/03/20'), -- 4
(3,'Become A Mentor','Come volunteer to become a mentor for those looking to get a job','Work services building','Wednesdays'), -- 5
(1,'Build Swing Set','Volunteer to help set up a swing set in Rock River Park','Rock River Park','2026/04/01'), -- 6
(1,'Build Local Community Garden','Help us build a community garden next to Rim Rock Park','Rim Rock Park','2026/05/01'), -- 7
(1,'Trash Clean Up','Our roads need some TLC.  Come help the community clean up trash on our roads.','Get Good Park','2026/04/15'), -- 8
(1,'Public Mural','Our local grocery store would like to beautify its building.  Come help paint a public mural.','Tom Grocery Store','2026/03/20'), -- 9
(1,'Clean Graffiti','Help clean up our train station by removing graffiti.','Roger Train Station','2026/04/25'), -- 10
(2,'Community Garden Opening','Join us in planting our community garden and git a pot to take home with you.','Green River Community Garden','2026/03/20'), -- 11
(2,'Plant A Tree','Help to beautify our local community by planting a free tree in your yard.','Green River Green House','2026/04/11'), -- 12
(2,'Plant Vegitables','Come plan some vegitable in our community garden and take home some for yourself.','Rock Road Community Garden','2026/04/01'), -- 13
(2,'Green House Construction','Our community garden needs a new green house.  Please come and help put it up.','Rocky Sanders Gardens','2026/05/01'), -- 14
(2,'Learn To Grow','Help others learn how to keep a garden or come learn how to keep a garden.','Sam Community Park','2026/03/25'); -- 15

CREATE TABLE category_service (
	category_id INTEGER,
	service_project_id INTEGER,
	PRIMARY KEY (service_project_id,category_id),
	FOREIGN KEY (service_project_id) REFERENCES service_project (service_project_id),
	FOREIGN KEY (category_id) REFERENCES category (category_id)
);

INSERT INTO category_service (category_id,service_project_id)
VALUES
(1,1),(1,7),(1,8),(1,10),(1,11), -- Enironmental
(2,3),(2,5),(2,11),(2,12),(2,15), -- Educational
(3,1),(3,2),(3,3),(3,4),(3,6),(3,7),(3,8),(3,9),(3,10),(3,14), -- Community Service
(4,1),(4,2),(4,4),(4,7),(4,8),(4,11),(4,12),(4,15); -- Health and Wellness