
// import { produce } from "immer";
import React from 'react';
import TodoForm from "./TodoFord";
import Todo from './Todo';

class registrarPesaje extends React.Component{
    constructor(props) {
        super(props);
    
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.estadoInicial = this.estadoInicial.bind(this);
        this.state = {
          todos:[],
          todoToSho:'all',
          pesaje:{
            fecha:"",
            pesos:[]
          }
        }
      }   
      handleChange =(event)=> {
        var newPesaje = Object.assign({}, this.state.pesaje);
        newPesaje[event.target.name] = event.target.value;
        console.log("pesaje",newPesaje)
        this.setState({pesaje: newPesaje});
      }
      estadoInicial(){
        this.setState({fecha:""});
        this.setState({todos:[]})
      }
      agregarPesaje =(event)=>{
        fetch(`http://localhost:8888/pesaje`, {
            method: "POST",
            body: JSON.stringify(this.state.pesaje),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        })
        .then(this.estadoInicial);
      }
      listo = () => {
        let text =  this.state.todos.map(function(p){return p.text}).map(Number);
        console.log("listas",this.state.todos);
        console.log("text",text);
        var {pesaje} = this.state;
        pesaje.pesos = text;
        this.setState(
          {pesaje: pesaje},
          console.log(this.state.pesaje)
          );
        
      }
      handleSubmit =(event)=> {
        this.listo();
        this.agregarPesaje()
        event.preventDefault();
      }
      event = (event)=>{
        event.preventDefault()
      }
  
      addTodo = todo => {
        this.setState({
          todos: [todo, ...this.state.todos]
        });
      };

      toggleComplete = (id) =>{
        this.setState({
          todos: this.state.todos.map(todo =>{
            if (todo.id === id ){
              return{
                ...todo,
                complete: !todo.complete
              }
            }else{
              return todo
            }
          })
        })
      }
      updateTodoToShow = (s) => {
        this.setState({
          todoToSho:s
        })
      }
      handleDeleteTodo = (id) =>{
        this.setState({
          todos: this.state.todos.filter(todo => todo.id !== id)
        })
      }
      removeAllTodosLosTachados = () =>{
        this.setState({
          todos: this.state.todos.filter(todo => !todo.complete)
        })
      }

    

      render() {
        let todos = [];
        if(this.state.todoToSho === 'all'){
          todos = this.state.todos;
        }
        else if (this.state.todoToSho === 'active'){
          todos = this.state.todos.filter(todo => !todo.complete);
        }
        else if (this.state.todoToSho === 'complete'){
          todos = this.state.todos.filter(todo => todo.complete);
        }
        return (
        <div style={{ textAlign: "center" }}>        
          <form onSubmit={this.event}>
             <label class="sr-only" for="inlineFormInputName2">Fecha</label>      
                <div>
                  <input type="datetime-local" 
                    class="form-control" 
                    placeholder="Fecha"
                    name="fecha"
                    value={this.state.fecha} 
                    onChange={this.handleChange}
                    />
                </div>
          <div >
          <TodoForm onSubmit={this.addTodo}/>
            {todos.map(todo => (
              <Todo 
                key={todo.id}
                toggleComplete={() => this.toggleComplete(todo.id)} 
                onDelete = {() => this.handleDeleteTodo(todo.id)}
                todo={todo}
              />
            ))}  
          <div>
            Total:{this.state.todos.filter(todo => !todo.complete).length}
          </div>
          <div>
          <button style={ {margin :"5px"}} onClick={()=> this.updateTodoToShow("all")} class="btn btn-primary mb-2" >
          Todos
          </button>
          <button style={ {margin :"5px"}} onClick={()=> this.updateTodoToShow("active")} class="btn btn-primary mb-2">
          activo
          </button>
          <button style={ {margin :"5px"}} onClick={()=> this.updateTodoToShow("complete")} class="btn btn-primary mb-2">
          Tachados
          </button>
          <div >
          {this.state.todos.some(todo => todo.complete) ? ( 
            <div>
                <button onClick = {this.removeAllTodosLosTachados} class="btn btn-danger mb-2">
                 Borrar Todos Los Tachados
                </button>
            </div>
          ): null}
          </div>
        </div>
      </div>
      <button style={ {margin :"5px"}}class="btn btn-outline-success" onClick={this.handleSubmit}> Listo</button>
    </form>  
    </div>
  );
  }
}
    export default registrarPesaje