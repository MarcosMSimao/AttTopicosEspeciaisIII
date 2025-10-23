package com.example.projeto.model;

import java.lang.annotation.Inherited;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GeneratedType;

@Entity
@Table(name = "pessoas")
public class Pessoa {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private Integer idade;


    public Pessoa(){
        this("", 0);
    }

    public Pessoa(String nome, Integer idade){
        this.nome = nome;
        this.idade = idade;
    }

    public String getNome(){
        return this.nome;
    }

    public void setNome(String nome){
        this.nome = nome;
    }

    public integer getIdade(){
        return this.idade;
    }

    public void setIdade(Integer idade){
        this.idade = idade;
    }
}