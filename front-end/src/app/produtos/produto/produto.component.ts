import { Component, OnInit } from '@angular/core';
import { ProdutoService } from 'src/app/shared/produto.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit {

  constructor(private service:ProdutoService, private toaster:ToastrService) { }  

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?:NgForm){
    if(form != null)
      form.resetForm()
    this.service.formData = {
      id: null,
      nome: '',
      descricao: ''
    }
  }

  onSubmit(form : NgForm){
    console.log(form.value.id)
    if(form.value.id == null)
      this.insert(form);
    else
      this.update(form);
  }

  insert(form: NgForm){
    this.service.postProduto(form.value).subscribe(res =>{
      this.toaster.success('Inserido com Sucesso', 'Resgistro de Produtos');
      this.resetForm(form);
      this.service.refreshList();
    })
  }

  update(form: NgForm){
    this.service.putProduto(form.value.id, form.value).subscribe(res =>{
      this.toaster.info('Alterado com Sucesso', 'Resgistro de Produtos');
      this.resetForm(form);
      this.service.refreshList();
    })
  }
}
