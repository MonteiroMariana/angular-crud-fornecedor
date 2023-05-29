import { Component, OnInit } from '@angular/core';
import { FornecedoresService } from '../fornecedores.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Supplier } from '../supplier';

@Component({
  selector: 'app-fornecedores',
  templateUrl: './fornecedores.component.html',
  styleUrls: ['./fornecedores.component.css']
})
export class FornecedoresComponent implements OnInit{

  formGroupSupplier : FormGroup;
  suppliers : Supplier[] = [];
  constructor (private clientService: FornecedoresService, formBuilder: FormBuilder){
    this.formGroupSupplier = formBuilder.group({
      id : [''],
      name : [''],
      category : [''],
      active : [''],
      contact : [''],
    });
  }

  ngOnInit(): void {
    this.carregarLista();
  }
  carregarLista(){
    this.clientService.listar().subscribe(
      {
          next:  data =>  this.suppliers = data,
          error: msg  => console.log("Erro ao chamar o endpoint " + msg)
      }
    )
  }

  salvar() {
    var obj : Supplier = this.formGroupSupplier.value;
    this.clientService.criar(this.formGroupSupplier.value).subscribe({
      next: data => {
        this.suppliers.push(data);
        this.formGroupSupplier.reset();
      }
    });
  }

  excluir(obj : Supplier)
  {
    this.clientService.remover(obj).subscribe({
      next: () => this.carregarLista()
    });
  }

  editar(obj : Supplier)
  {
    if(confirm("Alterar dados? Id: " + obj.id))
      this.clientService.alterar(this.formGroupSupplier.value, obj.id).subscribe({
        next : () => {
          this.carregarLista();
          this.formGroupSupplier.reset();
        }
      });
  }

  preencher(obj : Supplier)
  {
    this.formGroupSupplier.reset();
    var obj2: Supplier = this.formGroupSupplier.value();
    obj2.name = obj.name;
    obj2.category = obj.category;
    obj2.contact = obj.contact;
    obj2.active = obj.active;
    this.formGroupSupplier.setValue(obj2);
  }
}
