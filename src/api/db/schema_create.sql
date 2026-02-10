-- DROP TABLES
-- Primeiro caem as tabelas que dependem de outras

DROP TABLE IF EXISTS ProjectsLanguages;
DROP TABLE IF EXISTS ProjectsCollaborators;
DROP TABLE IF EXISTS Languages;
DROP TABLE IF EXISTS Collaborators;
DROP TABLE IF EXISTS Projects;


CREATE TABLE Projects (
  id BIGINT PRIMARY KEY,
  projectName TEXT NOT NULL,
  link TEXT NOT NULL,
  creationDate TIMESTAMP

);


CREATE TABLE Languages (
  id BIGINT PRIMARY KEY,
  languageName TEXT NOT NULL,
  type TEXT NOT NULL

);

CREATE TABLE Collaborators (
  id BIGINT PRIMARY KEY,
  userName TEXT NOT NULL,
  userLink TEXT NOT NULL, 
  userAvatar TEXT NOT NULL

);

CREATE TABLE ProjectsLanguages (
  id BIGINT GENERATED ALWAYS AS IDENTITY,

  CONSTRAINT pk_projectLanguage PRIMARY KEY (id),
  project_id BIGINT NOT NULL,
  language_id BIGINT NOT NULL,
  FOREIGN KEY (project_id) REFERENCES Projects(id),
  FOREIGN KEY (language_id) REFERENCES Languages(id)

);

CREATE TABLE ProjectsCollaborators (
  id BIGINT GENERATED ALWAYS AS IDENTITY,

  CONSTRAINT pk_projectCollaborator PRIMARY KEY (id),
  project_id BIGINT NOT NULL,
  collaborator_id BIGINT NOT NULL,
  FOREIGN KEY (project_id) REFERENCES Projects(id),
  FOREIGN KEY (collaborator_id) REFERENCES Collaborators(id)

);
