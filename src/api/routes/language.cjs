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
    const projects = await pool.query('SELECT id, project_name, owner FROM Projects ORDER BY id')
    console.log(projects.rows[0])

    const languageRequests = projects.rows.map(project => {
      const apiPromise = github.get(`/repos/${project.owner}/${project.project_name}/languages`)

       .catch(err => {
          console.log(`Ignorando ${project.owner}/${project.project_name}: ${err.response?.status}`);
          return { data: [] }; // Evita que o erro de um projeto pare tudo
        });

      return {
        projectId: project.id,
        request: apiPromise 
      };
    });
      

    const results = await Promise.all(languageRequests.map(c => c.request));
    const cadastrados =[]
    console.log(results)
    const languages = []

    for (let i = 0; i < results.length; i++){
      const projectId = languageRequests[i].projectId
      const languagesData = results[i].data
    
     for (const [language_name, bytes] of Object.entries(languagesData)){
        let languageId;

        //Validação de existencia
        const existingLanguage = await pool.query('SELECT id FROM Languages WHERE language_name =$1', [language_name]);
        if(existingLanguage.rows.length===0){
          //Insert
          const insertLanguages = await pool.query('INSERT INTO Languages(language_name, type) Values($1, $2) ON CONFLICT (language_name) DO UPDATE SET language_name = EXCLUDED.language_name RETURNING id', [language_name, 'Placeholder']);

          languageId = insertLanguages.rows[0].id
          cadastrados.push(insertLanguages.rows[0]);
        }
        
        else {
          languageId = existingLanguage.rows[0].id;
        }
        await pool.query('INSERT INTO ProjectsLanguages(bytes, project_id, language_id) Values($1, $2, $3) ON CONFLICT DO NOTHING RETURNING id, bytes, project_id, language_id', [bytes, projectId, languageId])
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
