const Tarefa = require('../Model/tarefaModel'); 
const tarefas = [];

async function getTarefas(req, res) { 
	let tarefas= await Tarefa.listarTarefas(req.body); 
	res.render('outra', { tarefas }); 
} 

async function editarTarefa(req, res) { 
	res.render('outra', { tarefas }); 
	let tarefa = req.body;
	let idTarefa=req.params.id;
	if(await  Tarefa.atualizar(idTarefa, tarefa)){
		msg = 'Sucesso!';
	}else{
	  msg = 'Falha!';
	}
	res.redirect('/tarefas');
} 

async function addTarefa(req, res) { 
	const { id, title } = req.body; 
	const tarefa = new Tarefa(id, title, false); 
	await tarefa.salvar();
	  
	res.redirect('/tarefas'); 
} 

async function deleteTarefa(req, res){
 
	let idTarefa=req.params.id;
	let msg='';
	if(await Tarefa.deleteTarefa(idTarefa)){
		msg = 'Sucesso!';
	}else{
	  msg = 'Falha!';
	}
	res.redirect('/tarefas');
  
  }
  


module.exports = { getTarefas, addTarefa, deleteTarefa,editarTarefa};
