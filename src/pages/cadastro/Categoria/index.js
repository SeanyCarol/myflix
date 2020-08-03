import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';
import useForm from '../../../hooks/useForm';
import categoryRepository from '../../../repositories/categorias';

function CadastroCategoria() {
  const history = useHistory();
  const valoresIniciais = {
    titulo: '',
    descricao: '',
    cor: '',
  };

  const { values, handleChange, clearForm } = useForm(valoresIniciais);

  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const URL = window.location.hostname.includes('localhost')
      ? 'http://localhost:8080/categorias'
      : 'https://myflix-omega.herokuapp.com/categorias';
    fetch(URL)
      .then(async (respostaDoServer) => {
        const resposta = await respostaDoServer.json();
        setCategorias([
          ...resposta,
        ]);
      });
  });

  return (
    <PageDefault>
      <h1>
        Cadastro de Categoria:
        {values.titulo}
      </h1>

      <form onSubmit={function HandleSubmit(infosDoEvento) {
        infosDoEvento.preventDefault();
        categoryRepository.create({
          titulo: values.titulo,
          descricao: values.descricao,
          cor: values.cor,
        })
          .then(() => {
            // eslint-disable-next-line no-alert
            alert('Cadastrou a categoria com sucesso!!!');
            history.push('/');
          });
        clearForm();
      }}
      >

        <FormField
          label="Nome da Categoria"
          type="text"
          value={values.titulo}
          name="titulo"
          onChange={handleChange}
        />

        <FormField
          label="Descrição"
          type="textarea"
          value={values.descricao}
          name="descricao"
          onChange={handleChange}
        />

        <FormField
          label="Cor"
          type="color"
          value={values.cor}
          name="cor"
          onChange={handleChange}
        />

        <Button>
          Cadastrar
        </Button>
      </form>

      {categorias.lenght === 0 && (
        <div>
          Loading...
        </div>
      )}

      <ul>
        {categorias.map((categoria) => (
          <li key={`${categoria.titulo}`}>
            {categoria.titulo}
          </li>
        ))}
      </ul>

      <Button as={Link} to="/">
        Ir para home
      </Button>
    </PageDefault>
  );
}

export default CadastroCategoria;
