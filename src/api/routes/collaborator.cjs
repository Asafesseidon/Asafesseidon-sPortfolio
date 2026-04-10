var express = require('express');
var router = express.Router();
const pool = require('../db/config.cjs');
const axios = require('axios');
const github = require('./githubConnection.cjs');
const { list } = require('postcss');

/* GET Collaborators listing. */
router.get('/', async function(req, res) {
  try{
    const result = await pool.query('SELECT user_name AS name, user_link AS link, user_avatar AS avatar FROM Collaborators ORDER BY Collaborators.id');
    res.json({
      success: true,
      data: result.rows
    });
  }
   catch (error) {
    console.error('Erro ao buscar os colaboradores:', error);
    // http status 500 - Internal Server Error
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

/* GET Specific Collaborator by id. */
router.get('/:id', async function(req, res) {
  try{
    const { id } = req.params;
    const result = await pool.query('SELECT user_name AS name, user_link AS link, user_avatar AS avatar FROM Collaborators WHERE id = $1', [id]);
    res.json({
      success: true,
      data: result.rows
    });
  }
   catch (error) {
    console.error('Erro ao buscar o colaborador:', error);
    // http status 500 - Internal Server Error
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

/* GET Ammount of projects collaborated by each collaborator by id. */
router.get('/collaborations/', async function(req, res) {
  try{
    const result = await pool.query('SELECT user_name AS name, user_link AS link, user_avatar AS avatar FROM projectscollaborators JOIN collaborators ON projectscollaborators.collaborator_id = collaborators.id ORDER BY collaborators.id;');

    listOfNames=[];
    ammountOfCollaborations = {};

    for(const row of result.rows){
      if(ammountOfCollaborations[row.user_name]){
        ammountOfCollaborations[row.user_name] = ammountOfCollaborations[row.user_name]+1
      }
      else{
        ammountOfCollaborations[row.user_name] = 1
        }
    }
    for(const row in result.rows){
      row.collab = ammountOfCollaborations[row.user_name]
    }
    res.json({
      success: true,
      data: result.rows
    });
  }
   catch (error) {
    console.error('Erro ao buscar os colaboradores:', error);
    // http status 500 - Internal Server Error
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

/* POST Create new Collaborators. */
router.post('/', async function(req, res) {
  try{
    const projects = await pool.query('SELECT id, project_name, owner FROM Projects ORDER BY id')
    console.log(projects.rows[0])

    const contributorRequests = projects.rows.map(project => {
      const apiPromise = github.get(`/repos/${project.owner}/${project.project_name}/contributors`)

       .catch(err => {
          console.log(`Ignorando ${project.owner}/${project.project_name}: ${err.response?.status}`);
          return { data: [] }; // Evita que o erro de um projeto pare tudo
        });

      return {
        projectId: project.id,
        request: apiPromise 
      };
    });
      

    const results = await Promise.all(contributorRequests.map(c => c.request));
    const cadastrados =[]
    console.log(results)
    const contributors = []

    for (let i = 0; i < results.length; i++){
      const projectId = contributorRequests[i].projectId
      const contributorsData = results[i].data
    
      for (const contributor of contributorsData){
        let contributorId;
        
        //Validação de existencia
        const existingContributor = await pool.query('SELECT id FROM Collaborators WHERE user_name =$1 AND user_link = $2', [contributor.login, contributor.html_url]);
        if(existingContributor.rows.length===0){
          //Insert
          const insertCollab = await pool.query('INSERT INTO Collaborators(user_name, user_link, user_avatar) Values($1, $2, $3) RETURNING id, user_name, user_link, user_avatar', [contributor.login, contributor.html_url, contributor.avatar_url]);

          contributorId = insertCollab.rows[0].id
          cadastrados.push(insertCollab.rows[0]);
        }
        
        else {
            contributorId = existingContributor.rows[0].id;
        }
        await pool.query('INSERT INTO ProjectsCollaborators(project_id, collaborator_id) Values($1, $2) ON CONFLICT DO NOTHING RETURNING id, project_id, collaborator_id ', [projectId, contributorId])
      }
        
    }
    // http status 201 - Created
    res.status(201).json({
      success: true,
      message:`${cadastrados.length} Colaboradores cadastrados com sucesso`,
      data: cadastrados
    });
  }

    catch (error) {
      console.error('Erro ao cadastrar o colaborador:', error);

      // http status 500 - Internal Server Error
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
});

/* PUT - Atualizar Colaborador */
router.put('/:id', async function(req, res) {
  try {
    const { id } = req.params;
    const { user_name, user_link, user_avatar } = req.body;
    
    // Validação básica
    if (!user_name  || !user_link || !user_avatar) {
      // http status 400 - Bad Request
      return res.status(400).json({
        success: false,
        message: 'Nome de colaborador, link do github e user_avatar são obrigatórios'
      });
    }
    
    // Verificar se o colaborador existe
    const languageExists = await pool.query('SELECT id FROM Collaborators WHERE id = $1', [id]);
    if (languageExists.rows.length === 0) {
      // http status 404 - Not Found
      return res.status(404).json({
        success: false,
        message: 'Colaborador não encontrada'
      });
    }
    
    let query, params;    
    query = 'UPDATE Collaborators SET user_name = $1, user_link = $2, user_avatar = $3 WHERE id = $4 RETURNING id, user_name, user_link, user_avatar';
    params = [user_name, user_link, user_avatar, id];    
    const result = await pool.query(query, params);
    
    res.json({
      success: true,
      message: 'Colaborador atualizado com sucesso',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Erro ao atualizar colaborador:', error);
    // Verificar se é erro de constraint
    if (error.code === '23514') {
      return res.status(400).json({
        success: false,
        message: 'Dados inválidos. Verifique os campos e tente novamente.'
      });
    }
    // http status 500 - Internal Server Error
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});


/* DELETE - Remover Colaborador */
router.delete('/:id', async function(req, res) {
  try {
    const { id } = req.params;
    
    // Verificar se o usuário existe
    const userExists = await pool.query('SELECT id FROM Collaborators WHERE id = $1', [id]);
    if (userExists.rows.length === 0) {
      // http status 404 - Not Found
      return res.status(404).json({
        success: false,
        message: 'Colaborador não encontrado'
      });
    }
    
    await pool.query('DELETE FROM Collaborators WHERE id = $1', [id]);
    
    res.json({
      success: true,
      message: 'Colaborador deletado com sucesso'
    });
  } catch (error) {
    console.error('Erro ao deletar colaborador:', error);
    // http status 500 - Internal Server Error
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

module.exports = router;
