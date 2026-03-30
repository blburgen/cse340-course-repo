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
	name VARCHAR(100) NOT NULL
);

INSERT INTO category (name)
VALUES
('Environmental'),
('Educational'),
('Community Service'),
('Health and Wellness');

CREATE TABLE service_project (
	service_project_id SERIAL PRIMARY KEY,
	organization_id INTEGER,
	title VARCHAR(150) NOT NULL,
	description TEXT NOT NULL,
	location VARCHAR(150),
	date DATE,
	FOREIGN KEY (organization_id) REFERENCES organization (organization_id) ON DELETE SET NULL
);

INSERT INTO service_project (organization_id,title,description,location,date)
VALUES
(3,'Park Cleanup','Join us to clean up local parks and make them beautiful!','','2026-06-12'), -- 1
(3,'Food Drive','Help collect and distribute food to those in need.','Utah Food Bank','2026-05-10'), -- 2
(3,'Community Tutoring','Volunteer to tutor students in various subjects.','local schools','2026-11-18'), -- 3
(3,'Make Cards For Seniors','Come join us to uplift our seniors, by making thank you cards','Next left church','2026-03-20'), -- 4
(3,'Become A Mentor','Come volunteer to become a mentor for those looking to get a job','Work services building','2026-04-20'), -- 5
(1,'Build Swing Set','Volunteer to help set up a swing set in Rock River Park','Rock River Park','2026-04-01'), -- 6
(1,'Build Local Community Garden','Help us build a community garden next to Rim Rock Park','Rim Rock Park','2026-05-01'), -- 7
(1,'Trash Clean Up','Our roads need some TLC.  Come help the community clean up trash on our roads.','Get Good Park','2026-04-15'), -- 8
(1,'Public Mural','Our local grocery store would like to beautify its building.  Come help paint a public mural.','Tom Grocery Store','2026-03-20'), -- 9
(1,'Clean Graffiti','Help clean up our train station by removing graffiti.','Roger Train Station','2026-04-25'), -- 10
(2,'Community Garden Opening','Join us in planting our community garden and git a pot to take home with you.','Green River Community Garden','2026-03-20'), -- 11
(2,'Plant A Tree','Help to beautify our local community by planting a free tree in your yard.','Green River Green House','2026-04-11'), -- 12
(2,'Plant Vegitables','Come plan some vegitable in our community garden and take home some for yourself.','Rock Road Community Garden','2026-04-01'), -- 13
(2,'Green House Construction','Our community garden needs a new green house.  Please come and help put it up.','Rocky Sanders Gardens','2026-05-01'), -- 14
(2,'Learn To Grow','Help others learn how to keep a garden or come learn how to keep a garden.','Sam Community Park','2026-03-25'), --15
(1, 'Riverbank Revitalization','Renovate the downtown riverbank promenade with sustainable materials and native plants.','River City, TX','2024-09-15'), -- 16
(1, 'Community Playground Build','Construct an eco‑friendly playground with recycled wood and solar lighting.','River City, TX','2024-10-10'), -- 17
(1, 'Solar Roof Installation','Install photovoltaic panels on the roof of the local community center.','River City, TX','2024-11-05'), -- 18
(1, 'Green Roof Garden','Create a vegetable garden on the roof of the municipal library.','River City, TX','2024-12-01'), -- 19
(1, 'Bike‑Lane Expansion','Add protected bike lanes along Main Street to improve commuter safety.','River City, TX','2025-01-20'), -- 20
(2, 'Urban Farm Expansion','Add 30 new raised beds and a rain‑water harvesting system to the downtown farm.','Northside District, WA','2024-09-22'), -- 21
(2, 'School Garden Program','Build a teaching garden at Jefferson High School and provide curriculum materials.','Northside District, WA','2024-10-18'), -- 22
(2, 'Community Compost Hub','Set up a neighborhood compost drop‑off point and run workshops on composting.','Northside District, WA','2024-11-12'), -- 23
(2, 'Pollinator Meadow','Plant a 1‑acre meadow with native wildflowers to support bees and butterflies.','Northside District, WA','2024-12-08'), -- 24
(2, 'Winter Food‑Shelf Initiative','Grow and preserve winter vegetables for local food‑banks.','Northside District, WA','2025-01-15'), -- 25
(3, 'Food‑Bank Volunteer Day','Collect, sort, and distribute food donations for local families.','Eastside Community Center, NY','2024-09-30'), -- 26
(3, 'Senior Center Tech Workshop','Teach seniors basic computer and smartphone skills.','Eastside Community Center, NY','2024-10-25'), -- 27
(3, 'Neighborhood Cleanup','Organise a street‑wide litter pick‑up and recycling drive.','Eastside Community Center, NY','2024-11-20'), -- 28
(3, 'Holiday Toy Drive','Gather, sort, and deliver toys to children in need.','Eastside Community Center, NY','2024-12-15'), -- 29
(3, 'Emergency Shelter Staffing','Volunteer shifts to staff the local emergency shelter during winter.','Eastside Community Center, NY','2025-01-10');; -- 30

CREATE TABLE category_service (
	category_id INTEGER,
	service_project_id INTEGER,
	PRIMARY KEY (service_project_id,category_id),
	FOREIGN KEY (service_project_id) REFERENCES service_project (service_project_id),
	FOREIGN KEY (category_id) REFERENCES category (category_id)
);

INSERT INTO category_service (category_id,service_project_id)
VALUES
(1,1),(1,7),(1,8),(1,10),(1,11),(1,16),(1,17),(1,19),(1,21),(1,23),(1,24),(1,28), -- Enironmental
(2,3),(2,5),(2,11),(2,12),(2,15),(2,22),(2,27), -- Educational
(3,1),(3,2),(3,3),(3,4),(3,6),(3,7),(3,8),(3,9),(3,10),(3,14),(3,16),(3,17),(3,18),(3,19),(3,21),(3,25),(3,26),(3,27),(3,28),(3,29),(3,30), -- Community Service
(4,1),(4,2),(4,4),(4,7),(4,8),(4,11),(4,12),(4,15),(4,17),(4,19),(4,20),(4,25),(4,26); -- Health and Wellness

CREATE TABLE roles (
	role_id SERIAL PRIMARY KEY,
	role_name VARCHAR(50) NOT NULL UNIQUE,
	role_description TEXT
);

INSERT INTO roles (role_name, role_description)
VALUES ('user', 'Standard user with basic access'),
	('admin', 'Administrator with full system access');

SELECT * FROM roles;

CREATE TABLE users (
	user_id SERIAL PRIMARY KEY,
	name VARCHAR(100) NOT NULL,
	email VARCHAR(100) NOT NULL UNIQUE,
	password_hash VARCHAR(255) NOT NULL,
	role_id INTEGER REFERENCES roles(role_id),
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE volunteered(
	user_id INTEGER,
	service_project_id INTEGER,
	PRIMARY KEY (service_project_id,user_id),
	FOREIGN KEY (service_project_id) REFERENCES service_project (service_project_id),
	FOREIGN KEY (user_id) REFERENCES users (user_id)
);