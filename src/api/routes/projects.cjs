var express = require('express');
var router = express.Router();
const pool = require('../db/config.cjs');
const axios = require('axios');
const github = require('./githubConnection.cjs')

/* GET Projects listing. */
router.get('/', async function(req, res) {
  try{
    const result = await pool.query('SELECT * FROM Projects ORDER BY Projects.id');
    res.json({
      success: true,
      data: result.rows
    });
  }
   catch (error) {
    console.error('Erro ao buscar os projetos:', error);
    // http status 500 - Internal Server Error
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

/* GET Specific Project by id. */
router.get('/:id', async function(req, res) {
  try{
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM Projects WHERE id = $1 ORDER BY Projects.id', [id]);
    res.json({
      success: true,
      data: result.rows
    });
  }
   catch (error) {
    console.error('Erro ao buscar o projeto:', error);
    // http status 500 - Internal Server Error
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

/* POST Create new Projects. */
router.post('/', async function(req, res) {
  try{

    const response = await github.get(`/user/repos`);
    const projects = response.data;
    const cadastrados =[]

    for (const project of projects){
      
      //Validação de existencia
      const existingProject = await pool.query('SELECT id FROM Projects WHERE projectName =$1 AND link = $2', [project.name, project.html_url]);
      if(existingProject.rows.length===0){
        //Insert
        const result = await pool.query('INSERT INTO Projects(projectName, link, creationDate, description) Values($1, $2, $3, $4) RETURNING id, projectName, link, creationDate, description', [project.name, project.html_url, project.created_at, project.description]);

        cadastrados.push(result.rows[0]);
      }
      
    }
    // http status 201 - Created
      res.status(201).json({
        success: true,
        message:`${cadastrados.length} Projetos cadastrados com sucesso`,
        data: cadastrados
      });
  }

    catch (error) {
      console.error('Erro ao cadastrar o projeto:', error);

      // http status 500 - Internal Server Error
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
});

/* PUT - Atualizar Projeto */
router.put('/:id', async function(req, res) {
  try {
    const { id } = req.params;
    const { projectName, link, creationDate, description } = req.body;
    
    // Validação básica
    if (!projectName  || !link || !creationDate) {
      // http status 400 - Bad Request
      return res.status(400).json({
        success: false,
        message: 'Nome de projeto, link do github e data de criação são obrigatórios'
      });
    }
    
    // Verificar se o colaborador existe
    const languageExists = await pool.query('SELECT id FROM Projects WHERE id = $1', [id]);
    if (languageExists.rows.length === 0) {
      // http status 404 - Not Found
      return res.status(404).json({
        success: false,
        message: 'Projeto não encontrada'
      });
    }
    
    let query, params;    
    query = 'UPDATE Projects SET projectName = $1, link = $2, creationDate = $3, description = $4 WHERE id = $5 RETURNING id, projectName, link, creationDate, description';
    params = [projectName, link, creationDate, description, id];    
    const result = await pool.query(query, params);
    
    res.json({
      success: true,
      message: 'Projeto atualizado com sucesso',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Erro ao atualizar projeto:', error);
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


/* DELETE - Remover Projeto */
router.delete('/:id', async function(req, res) {
  try {
    const { id } = req.params;
    
    // Verificar se o usuário existe
    const userExists = await pool.query('SELECT id FROM Projects WHERE id = $1', [id]);
    if (userExists.rows.length === 0) {
      // http status 404 - Not Found
      return res.status(404).json({
        success: false,
        message: 'Projeto não encontrado'
      });
    }
    
    await pool.query('DELETE FROM Projects WHERE id = $1', [id]);
    
    res.json({
      success: true,
      message: 'Projeto deletado com sucesso'
    });
  } catch (error) {
    console.error('Erro ao deletar projeto:', error);
    // http status 500 - Internal Server Error
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

module.exports = router;
