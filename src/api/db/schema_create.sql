-- Active: 1772156282837@@127.0.0.1@5432@portfolio

-- DROP TABLES
-- Primeiro caem as tabelas que dependem de outras

DROP TABLE IF EXISTS ProjectsLanguages;
DROP TABLE IF EXISTS ProjectsCollaborators;
DROP TABLE IF EXISTS Languages;
DROP TABLE IF EXISTS Collaborators;
DROP TABLE IF EXISTS Projects;


CREATE TABLE Projects (
  id BIGINT GENERATED ALWAYS AS IDENTITY,
  projectName TEXT NOT NULL,
  link TEXT NOT NULL,
  creationDate TIMESTAMP,
  description TEXT,
    CONSTRAINT pk_project PRIMARY KEY (id)
);


CREATE TABLE Languages (
  id BIGINT GENERATED ALWAYS AS IDENTITY,
  languageName TEXT NOT NULL,
  type TEXT NOT NULL,
  CONSTRAINT pk_language PRIMARY KEY (id),
  CONSTRAINT unique_language_name UNIQUE (languageName)
);

CREATE TABLE Collaborators (
  id BIGINT GENERATED ALWAYS AS IDENTITY,
  userName TEXT NOT NULL,
  userLink TEXT NOT NULL, 
  userAvatar TEXT NOT NULL,
  CONSTRAINT pk_collaborator PRIMARY KEY (id),
  CONSTRAINT unique_user UNIQUE (userName, userLink)
);

CREATE TABLE ProjectsLanguages (
  id BIGINT GENERATED ALWAYS AS IDENTITY,
  bytes BIGINT,
  
  CONSTRAINT pk_projectLanguage PRIMARY KEY (id),
  project_id BIGINT NOT NULL,
  language_id BIGINT NOT NULL,
  FOREIGN KEY (project_id) REFERENCES Projects(id) ON DELETE CASCADE,
  FOREIGN KEY (language_id) REFERENCES Languages(id)ON DELETE CASCADE,
  CONSTRAINT unique_project_language UNIQUE (project_id, language_id)
);

CREATE TABLE ProjectsCollaborators (
  id BIGINT GENERATED ALWAYS AS IDENTITY,

  CONSTRAINT pk_projectCollaborator PRIMARY KEY (id),
  project_id BIGINT NOT NULL,
  collaborator_id BIGINT NOT NULL,
  FOREIGN KEY (project_id) REFERENCES Projects(id) ON DELETE CASCADE,
  FOREIGN KEY (collaborator_id) REFERENCES Collaborators(id) ON DELETE CASCADE,
  CONSTRAINT unique_project_collaborator UNIQUE (project_id, collaborator_id)
);