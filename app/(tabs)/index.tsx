import { Image, StyleSheet, Platform } from 'react-native';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
// aqui eswtou pensando na sinformações que vão vir da minha API, nesse caso, eu escrevi as informações que desejo pegar e declarei como um array, pq o que vem da api é um array de obvjetos, e depois vou poder iterá-los

type ICharcter = {
  id : number,
  name : string,
  image : string,
  status : string,
}[] // declarando como um array

export default function HomeScreen() {

  // aqui eu devo começar pensando como controlarei a paginação inputada peo user, bem como os carcateres exibidos. O jeito mais comum de fazer isso é com o hook useState

  const [page, setpage] = useState<string>('1') // defindio um page que poderá ser alterada pelo setPage pelo user
  const [char, setchar] = useState<ICharcter>([]) // definindo a lista que será exibida de acordo com a paginação
  const [loadingg, setloadingg] = useState<boolean>(true) // definindo uma var que vai controlar a págin acaso ela demore para carregar. isso é útil pois estou usando uma api, ou sejua, depende de um site externo a exibição, ter essa validação ajuda o user saber o que está acontecendo

  const fetchCharc = async (pagenumber : string) => {
    try {
      
      const response = await axios.get(`https://rickandmortyapi.com/api/character/?page=${pagenumber}`)
      setchar(response.data.results) // a ultima palavra é o nome dado aos dados quando eles vem da requisição, estou mudando o array de carcteres para abrir o array vindo da requisição
    } catch (error) {
      console.log('erro ao fazer requisição', error)
    } finally {
      setloadingg(false) // pq quando fazer a requisição é que o loading deve ficar aparecendo na tela, afinal, caso a requisição demorar a dar a 'resposta' isso será evidenciado pelo activindicator. Então se a requisição dá certo ou erro isso é uma resposta entt o loading é setado como false
    }
  }
  useEffect(() => {
    fetchCharc(page)
  }, []) // aciona a requisição a primeira vezx que carrega a página, pois a requisição posteriormente só é acionada com um click, a primeira vez que a pagina carregar nn haverá clique

  return (
    <>
    </>
  );
}

const styles = StyleSheet.create({
  
});
