var express = require('express');
var router = express.Router();
const pool = require('../db/config.cjs');
const axios = require('axios');
const github = require('./githubConnection.cjs')

/* GET Languages listing. */
router.get('/', async function(req, res) {
  try{
    const result = await pool.query('SELECT * FROM Languages ORDER BY Languages.id');
    res.json({
      success: true,
      data: result.rows
    });
  }
   catch (error) {
    console.error('Erro ao buscar as linguagens:', error);
    // http status 500 - Internal Server Error
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

/* GET Specific Language by id. */
router.get('/:id', async function(req, res) {
  try{
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM Languages WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Linguagem não encontrada'
      });
}
    
    res.json({
      success: true,
      data: result.rows[0]
    });
  }
   catch (error) {
    console.error('Erro ao buscar a linguagem:', error);
    // http status 500 - Internal Server Error
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

/* POST Create new Language. */
router.post('/', async function(req, res) {
  try{
    const { languageName, type } = req.params;

  // Validação de dados
    if( !languageName || !type){
      // Res Status Bad Request
      return res.status(400).json({
        success: false,
        message:'Nome da linguagem e tipo necessários para o cadastro'
      });
    }
    
    //Validação de existencia
    const existingLanguage = await pool.query('SELECT id FROM Languages WHERE languageName = $1 AND type = $2', [languageName, type]);
    if(existingLanguage.rows.length>0){
      return res.status(409).json({
        success: false,
        message: 'Linguagem já existe'
      });
    }

    //Insert
    const result = await pool.query('INSERT INTO Languages(languageName, type) Values($1, $2) RETURNING id, languageName, type', [languageName, type]);

    // http status 201 - Created
    res.status(201).json({
      success: true,
      message:'Linguagem cadastrada com sucesso',
      data: result.rows[0]
    });
  }

    catch (error) {
      console.error('Erro ao cadastrar a linguagem:', error);

      if (error.code === '23514'){
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

/* PUT - Update Language */
router.put('/:id', async function(req, res) {
  try {
    const { id } = req.params;
    const { languageName, type } = req.body;
    
    // Validação básica
    if (!languageName  || !type) {
      // http status 400 - Bad Request
      return res.status(400).json({
        success: false,
        message: 'Nome de linguagem e tipo são obrigatórios'
      });
    }
    
    // Verificar se o usuário existe
    const languageExists = await pool.query('SELECT id FROM Languages WHERE id = $1', [id]);
    if (languageExists.rows.length === 0) {
      // http status 404 - Not Found
      return res.status(404).json({
        success: false,
        message: 'Linguagem não encontrada'
      });
    }
    
    let query, params;    
    query = 'UPDATE Languages SET languageName = $1, type = $2 WHERE id = $3 RETURNING id, languageName, type';
    params = [languageName, type, id];    
    const result = await pool.query(query, params);
    
    res.json({
      success: true,
      message: 'Linguagem atualizado com sucesso',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Erro ao atualizar linguagem:', error);
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


/* DELETE - Remove Language */
router.delete('/:id', async function(req, res) {
  try {
    const { id } = req.params;
    
    // Verificar se o usuário existe
    const userExists = await pool.query('SELECT id FROM Languages WHERE id = $1', [id]);
    if (userExists.rows.length === 0) {
      // http status 404 - Not Found
      return res.status(404).json({
        success: false,
        message: 'Linguagem não encontrada'
      });
    }
    
    await pool.query('DELETE FROM Languages WHERE id = $1', [id]);
    
    res.json({
      success: true,
      message: 'Materia deletada com sucesso'
    });
  } catch (error) {
    console.error('Erro ao deletar materia:', error);
    // http status 500 - Internal Server Error
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

module.exports = router;
