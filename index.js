const express = require('express');
const session = require('express-session');
const expressLayouts = require('express-ejs-layouts')
const path = require('path');

const tarefaController = require('./Controller/tarefaController'); 
const usuarioController = require('./Controller/usuarioController');

const app = express(); 
const port = 3000; 

app.set('view engine', 'ejs');// carrega o recurso ejs
//carrega recursos do express-ejs-layouts
app.set('layout', 'layouts/layout')
//Arquivos estáticos
app.use(expressLayouts)

app.use('/static', express.static('public'))

app.use(express.static(path.join(__dirname, 'public')))
app.use(session({secret:'i1n2f3o4'})); // uso de sessões
// começo de rotas
app.get('/', (req, res)=>{	res.redirect('/login');});

app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.locals.layoutVariables = {
url : process.env.URL,
img : "/img/",
style : "/css/",
title: 'Tarefas Agora' 
  };
  next();	
});
app.get('/login', usuarioController.login); 
app.use((req, res, next) => {
	if(!req.session.user){
		if(req.originalUrl == "/login" || req.originalUrl == "/usuario/autenticar"){
			app.set('layout', './layouts/login');
			res.locals.layoutVariables = {
				url : process.env.URL,
				img : "/img/",
				style : "/css/",
				title: 'Login'
        
			};
			next();			
		}else{
			res.redirect('/login');
		}	
	}else{
		app.set('layout', './layouts/layout');
		res.locals.layoutVariables = {
			url : process.env.URL,
			img : "/img/",
			style : "/css/",
			title: 'Tarefas',
			user: req.session.user, 
		};
    if(req.session.msg){
			res.locals.layoutVariables.msg = req.session.msg;
			delete req.session.msg;
		}
		next();// Contínua para a próxima etapa (rota ou middleware)
	}	
});

 
app.get('/tarefas', (req, res)=>{
  if(req.session.user){
    tarefaController.getTarefas(req,res);
  }else{
    return res.redirect('/login');
  }
});
  
app.post('/tarefas', tarefaController.addTarefa); 
app.get('/tarefas/atualizar/:id', tarefaController.editarTarefa); 
app.get('/tarefa/delete/:id', tarefaController.deleteTarefa);
app.post('/usuario/autenticar', usuarioController.autenticar);



app.listen(port, () => { 
console.log(`Servidor rodando em http://localhost:${port}`);
});
