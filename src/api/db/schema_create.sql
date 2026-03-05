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
  project_name TEXT NOT NULL,
  display_name TEXT,           
  owner TEXT NOT NULL DEFAULT 'Asafesseidon', 
  link TEXT NOT NULL,
  creation_date TIMESTAMP,
  description TEXT,
  is_private BOOLEAN DEFAULT false,   -- Útil para o filtro que você queria!
  github_id BIGINT UNIQUE, 
  CONSTRAINT pk_project PRIMARY KEY (id)
);


CREATE TABLE Languages (
  id BIGINT GENERATED ALWAYS AS IDENTITY,
  language_name TEXT NOT NULL,
  type TEXT NOT NULL,
  CONSTRAINT pk_language PRIMARY KEY (id),
  CONSTRAINT unique_language_name UNIQUE (language_name)
);

CREATE TABLE Collaborators (
  id BIGINT GENERATED ALWAYS AS IDENTITY,
  user_name TEXT NOT NULL,
  user_link TEXT NOT NULL, 
  user_avatar TEXT NOT NULL,
  CONSTRAINT pk_collaborator PRIMARY KEY (id),
  CONSTRAINT unique_user UNIQUE (user_name, user_link)
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