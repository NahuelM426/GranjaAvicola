
// import { produce } from "immer";
import React from 'react';
import Select from 'react-select'
import TodoForm from "./TodoFord";
import Todo from './Todo';

class registrarPesaje extends React.Component{
    constructor(props) {
        super(props);
    
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.agregagregarPesajeAGalpon=this.agregagregarPesajeAGalpon.bind(this);
        this.estadoInicial = this.estadoInicial.bind(this);
        this.state = {
          selectedOption: null,
          nombreGalpon:{},
          galpones:{},
          todos:[],
          todoToSho:'all',
          pesaje:{
            fecha:"",
            pesos:[]
          }
        }
      }   
      estadoInicial = ()=>{
        this.setState({fecha:""});
        this.setState({todos:[]});
        this.setState({nombreGalpon:{}});
        this.setState({selectedOption: null});
      }
      handleChange =(event)=> {
        var newPesaje = Object.assign({}, this.state.pesaje);
        newPesaje[event.target.name] = event.target.value;
        console.log("pesaje",newPesaje)
        this.setState({pesaje: newPesaje});
      }
      componentDidMount() {
        fetch(`http://localhost:8888/galpones`)     
        .then( res => res.json())     
        .then( prds =>{
          this.setState({galpones: prds});
          this.setState({nombreGalpon:prds.map(function(prds){
            const nombre = prds.nombre
            const nombre2 = {label:nombre};
            return nombre2;
            })
          });
        })

      }
      agregagregarPesajeAGalpon = (event) => {
        const resultado = this.state.galpones.find( galpones => galpones.nombre === this.state.selectedOption.label);
        console.log("resultado",resultado)
        let _id = resultado._id;
        console.log("acaaaaa" + event);
        console.log("idGalpon",this.state.galpones[0]._id)
        console.log("galpones",this.state.galpones)
        fetch(`http://localhost:8888/galpones/` + _id, {
          method: "PUT",
          body: JSON.stringify(this.state.pesaje),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        })
          .then(this.estadoInicial())
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
        this.agregagregarPesajeAGalpon(event)
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
      handleChangeGalpon = selectedOption => {
        this.setState({selectedOption},this.pesosPorFecha);
      };
    

      render() {
        let todos = [];
        const { selectedOption } = this.state;
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
         <div class="row align-items-start">
          <div class="col-8">
            <Select
              placeholder = {"Select Galpon"}
              value={selectedOption}
              onChange={this.handleChangeGalpon}
              options={this.state.nombreGalpon}
            />
          </div>
        </div>       
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