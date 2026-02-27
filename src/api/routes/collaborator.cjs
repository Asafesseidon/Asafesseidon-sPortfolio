var express = require('express');
var router = express.Router();
const pool = require('../db/config.cjs');
const axios = require('axios');
const github = require('./githubConnection.cjs')

/* GET Collaborators listing. */
router.get('/', async function(req, res) {
  try{
    const result = await pool.query('SELECT * FROM Collaborators ORDER BY Collaborators.id');
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
    const result = await pool.query('SELECT * FROM Collaborators WHERE id = $1 ORDER BY Collaborators.id', [id]);
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

/* POST Create new Collaborators. */
router.post('/', async function(req, res) {
  try{
    const projects = await pool.query('SELECT projectName FROM Projects ORDER BY id')

    const contributorRequests = projects.rows.map(project => github.get(`/user/repos/${project.projectName}/contributors`)
    );

    const results = await Promise.all(contributorRequests);
    const contributors = []

    for (const response of results){
      // O axios coloca o corpo da resposta em .data
      // Usamos o spread operator (...) para inserir os itens individualmente
      contributors.push(...response.data)
    }
    const cadastrados =[]
    for (const contributor of contributors){
      
      // Validação de dados
      if( !contributor.login || !contributor.html_url || !contributor.avatar_url){

      }
      
      //Validação de existencia
      const existingContributor = await pool.query('SELECT id FROM Collaborators WHERE userName =$1 AND userlink = $2', [contributor.login, contributor.html_url]);
      if(existingContributor.rows.length===0){
        //Insert
        const result = await pool.query('INSERT INTO Collaborators(userName, userLink, userAvatar) Values($1, $2, $3) RETURNING id, userName, userLink, userAvatar', [contributor.login, contributor.html_url, contributor.avatar_url]);
      }
      cadastrados.push(result.rows[0]);
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

/* PUT - Atualizar Coçaborador */
router.put('/:id', async function(req, res) {
  try {
    const { id } = req.params;
    const { userName, userLink, userAvatar } = req.body;
    
    // Validação básica
    if (!userName  || !userLink || !userAvatar) {
      // http status 400 - Bad Request
      return res.status(400).json({
        success: false,
        message: 'Nome de colaborador, link do github e userAvatar são obrigatórios'
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
    query = 'UPDATE Collaborators SET userName = $1, userLink = $2, userAvatar = $3 WHERE id = $4 RETURNING id, userName, userLink, userAvatar';
    params = [userName, userLink, userAvatar, id];    
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
