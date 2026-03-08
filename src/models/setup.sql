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
	FOREIGN KEY (organization_id) REFERENCES organization (organization_id)
);

CREATE TABLE category_service (
	category_id INTEGER,
	service_project_id INTEGER,
	PRIMARY KEY (service_project_id,category_id),
	FOREIGN KEY (service_project_id) REFERENCES service_project (service_project_id),
	FOREIGN KEY (category_id) REFERENCES category (category_id)
);

INSERT INTO service_project (title,description)
VALUES
('Park Cleanup','Join us to clean up local parks and make them beautiful!'),
('Food Drive','Help collect and distribute food to those in need.'),
('Community Tutoring','Volunteer to tutor students in various subjects.');

INSERT INTO category_service (category_id,service_project_id)
VALUES
(1,1),
(2,3),
(3,1),(3,2),(3,3),
(4,1),(4,2);